# Homepage Slug Migration — Post-API Data Parity

## Context

The comics-n-stuff-gql API moved from Railway to a Digital Ocean Droplet at `https://api.dcdecade.com/graphql`. The move broke two things for this app:

1. Every homepage cover image rendered as the placeholder. Root cause was on the API side: `Issue.coverImageUrl` was null on every row in the new database. That has now been backfilled (PR #3 on comics-n-stuff-gql).
2. The integer series IDs this app pinned in `shared/content/homepage.yaml` (e.g. `2876` for "Crisis on Infinite Earths") do not resolve against the new database. The API fixed this forward by adding a stable `Series.slug: String!` field and a `seriesBySlug(slug: String!): Series` query. Consumers are expected to pin by slug going forward.

What the user currently sees at `www.dcdecade.com` is stale Vercel ISR cache from the last successful Railway build (`x-vercel-cache: HIT`, `age ~2.6d`). Nothing is actually talking to the new API yet — this app still hardcodes the dead Railway URL as the Apollo fallback, and `shared/content/homepage.yaml` still references integer IDs that do not exist on the new backend.

This plan migrates the homepage pipeline to slugs, points the Apollo client at `api.dcdecade.com`, and forces a redeploy to drop the stale cache. Routes like `/series/[id]`, `/issue/[id]`, and `/creator/[id]` are intentionally out of scope — they still resolve against the new API via `series(id: Int!)` and migrating them to slugs is polish, not a blocker.

## API contract we are consuming

Confirmed live as of 2026-04-20:

```bash
curl -s -X POST https://api.dcdecade.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ seriesBySlug(slug: \"crisis-on-infinite-earths-1985\") { id name slug yearBegan issues(limit: 3) { id coverImageUrl } } }"}'
```

Returns the series with populated Cloudinary cover URLs. Slug scheme is usually `kebab-case-name-yearBegan`, but collisions are disambiguated with a trailing `-<id>` (e.g. `batman-the-dark-knight-returns-1986-3141`, `batman-year-one-1988-14212`). Slugs must be sourced from the API, not recomputed locally.

## Out of scope

- `/series/[id]`, `/issue/[id]`, `/creator/[id]` route migrations. These keep working unchanged.
- Search page. Unaffected.
- Any change to `SeriesCard`'s link target. It continues to link to `/series/${id}` because the API still exposes `id` alongside `slug`.

## Critical files

- `shared/schema.graphql` — add `slug: String!` to `Series` and `seriesBySlug(slug: String!): Series` to `Query`.
- `shared/operations/homepage.graphql` — rewrite `GetSeriesWithCover` to take `$slug: String!` and call `seriesBySlug`.
- `shared/content/homepage.yaml` — replace `seriesIds: [Int]` with `seriesSlugs: [String]` in every section.
- `shared/content/homepage.json` — regenerate via `shared/scripts/compile-homepage.ts`.
- `web/src/generated/graphql.ts` — regenerate via `npm run codegen`.
- `web/src/components/homepage/HomepageSection.tsx` — prop name `seriesIds: number[]` → `seriesSlugs: string[]`; pass `slug` as the query variable.
- `web/src/lib/apollo-client.ts`, `web/src/lib/apollo-provider.tsx` — replace the Railway URL in the `||` fallback with `https://api.dcdecade.com/graphql`.
- `web/src/__tests__/integration/search.test.tsx` — update the hardcoded `API_URL` constant so MSW intercepts the same URL the client now uses.

## Reused utilities (no new abstractions)

- `shared/scripts/compile-homepage.ts` — existing YAML→JSON compile step. No change to the script itself.
- `buildCoverUrl()` in `web/src/lib/cloudinary.ts` — already handles Cloudinary transform insertion; unchanged.
- `getClient()` in `web/src/lib/apollo-client.ts` — already reads `NEXT_PUBLIC_GRAPHQL_URL`; only the fallback string changes.

---

## Step 0 — Branch, PR bootstrap, pre-flight checks ✅

Rename this plan file to the agreed name, create the feature branch, confirm infrastructure is in place, confirm the live API still serves what this plan assumes, and open the PR with the plan file as the first commit.

- **Files**: `docs/plans/<renamed>.md` (move), no source changes.
- **Not TDD; not tests-alongside.** Pre-flight is shell verification.
- **Model / effort**: **Sonnet / medium**.
- **Effort justification**: Routine branch-and-PR work, but the pre-flight includes a live API check against `api.dcdecade.com` and a local env check; a failure in either means later steps are unsafe. No novel reasoning. Haiku is under-tooled if a TLS/DNS/auth failure surfaces during the curl checks.
- **Context-clear**: yes. Fresh session after the plan is committed.
- **Verify**:
  - `git status` clean; `git rev-parse --abbrev-ref HEAD` reports `feature/homepage-slug-migration` (or the confirmed branch name); `main` pulled and up to date before branching.
  - CI exists: `.github/workflows/` contains at least one workflow that runs `npm test` and `npm run build`. If missing, stop and surface to the user before proceeding.
  - Baseline green: `npm test` and `npm run build` pass on the branch before any source changes.
  - API reachable and slug resolver live:
    ```bash
    curl -s -X POST https://api.dcdecade.com/graphql \
      -H "Content-Type: application/json" \
      -d '{"query":"{ a: seriesBySlug(slug: \"crisis-on-infinite-earths-1985\") { id slug issues(limit: 1) { coverImageUrl } } b: seriesBySlug(slug: \"watchmen-1986\") { id slug } c: seriesBySlug(slug: \"batman-the-dark-knight-returns-1986-3141\") { id slug } }"}'
    ```
    All three aliases return non-null; `a.issues[0].coverImageUrl` is a `res.cloudinary.com` URL.
  - Local env already carries the target URL: `web/.env.local` contains `NEXT_PUBLIC_GRAPHQL_URL=https://api.dcdecade.com/graphql`.
  - Plan file renamed; commit message references Step 0; PR opened (non-draft) against `main` with the plan file as the only change.

## Step 1 — Schema, operation, codegen ✅

Update `shared/schema.graphql` to add `slug: String!` on `Series` and `seriesBySlug(slug: String!): Series` on `Query`. Rewrite `shared/operations/homepage.graphql` so `GetSeriesWithCover` takes `$slug: String!` and selects `seriesBySlug(slug: $slug)`; add `slug` to the returned Series selection set. Run `npm run codegen` and commit the regenerated `web/src/generated/graphql.ts`.

- **Files**: `shared/schema.graphql`, `shared/operations/homepage.graphql`, `web/src/generated/graphql.ts` (generated).
- **Tests-alongside.** Codegen and build are the verification; no business logic to TDD.
- **Model / effort**: **Sonnet / medium**.
- **Effort justification**: No ambiguity — the API surface is already documented and verified. No third-party internals. Low compounding-mistake risk — `npm run codegen` will fail loudly if the schema edit is malformed. Correctness is easy to verify by diffing generated output.
- **Context-clear**: no. Continues directly from Step 0.
- **Verify**:
  - `npm run codegen` exits 0.
  - `grep "seriesBySlug" web/src/generated/graphql.ts` shows the new document and hook.
  - `grep "slug: Scalars\\['String'\\]\\['output'\\]" web/src/generated/graphql.ts` shows `slug` on the Series type.
  - `npm run build` exits 0 (the app still uses the old prop shape here; build should pass because `GetSeriesWithCoverDocument` still compiles even though its variables changed).

## Step 2 — Homepage content and component ✅

Rewrite every section in `shared/content/homepage.yaml` to use `seriesSlugs: [string]` instead of `seriesIds: [int]`. Source slugs from the live API — do not derive them locally. Recompile `homepage.json` with `npx tsx shared/scripts/compile-homepage.ts`. Update `HomepageSection.tsx`: rename the prop, pass `{ slug }` as the query variable, and pull the series off `data.seriesBySlug` instead of `data.series`.

- **Files**: `shared/content/homepage.yaml`, `shared/content/homepage.json` (generated), `web/src/components/homepage/HomepageSection.tsx`, `web/src/app/page.tsx` only if spreading the section objects breaks (it shouldn't — the prop rename flows through the spread automatically).
- **Tests-alongside.** No existing unit test for `HomepageSection`; end-to-end rendering against the live API is the verification.
- **Model / effort**: **Sonnet / medium**.
- **Effort justification**: Mechanical rewrite. The one subtlety is sourcing the 35 slugs from the API with the correct disambiguation suffix — a single batched query resolves that. Low compounding-mistake risk because the dev server will 404 visibly on any wrong slug.
- **Context-clear**: no.
- **Verify**:
  - Run a single curl batch against `api.dcdecade.com` that queries every slug in the yaml under an alias; confirm every response is non-null. Script this inline — do not add it to the repo.
  - `npm test` passes.
  - `npm run build` exits 0.
  - `npm run dev`, load `http://localhost:3000`: every section renders a row of covers with real Cloudinary images, no placeholders.

## Step 3 — Apollo client URL and test constant ✅

In `web/src/lib/apollo-client.ts` and `web/src/lib/apollo-provider.tsx`, replace the Railway URL in the `||` fallback with `https://api.dcdecade.com/graphql`. In `web/src/__tests__/integration/search.test.tsx`, update the `API_URL` constant to match so the MSW handler intercepts the same URL the client emits.

- **Files**: `web/src/lib/apollo-client.ts`, `web/src/lib/apollo-provider.tsx`, `web/src/__tests__/integration/search.test.tsx`.
- **Tests-alongside.** The test file edit is itself the test update.
- **Model / effort**: **Sonnet / medium**.
- **Effort justification**: Three-line change. No ambiguity. The only risk is forgetting to update the test constant, which would surface as an MSW miss — caught by `npm test`.
- **Context-clear**: no.
- **Verify**:
  - `npm test` passes.
  - `npm run dev`, browse `/search`, open DevTools Network — POSTs go to `api.dcdecade.com`, not railway.
  - `grep -R "railway.app" web/ shared/` returns nothing.

## Step 4 — Vercel env var and redeploy

Confirm `NEXT_PUBLIC_GRAPHQL_URL=https://api.dcdecade.com/graphql` is set in the Vercel project for Production (and Preview, for consistency). Trigger a redeploy after the PR merges so the stale ISR cache rolls over.

- **Files**: none in this repo. External (Vercel dashboard).
- **No tests.** Production-verification only.
- **Model / effort**: **Sonnet / low**.
- **Effort justification**: Ops action with no code. Low ambiguity. Easy to verify.
- **Context-clear**: no.
- **Verify**:
  - `curl -sI https://www.dcdecade.com/` shows `x-vercel-cache: MISS` (or `age` < 60) on the first request after deploy.
  - `curl -s https://www.dcdecade.com/ | grep -o 'res.cloudinary.com/dke4phurv/[^"]*' | head -5` returns actual Cloudinary URLs in the rendered HTML.
  - Manually load `https://www.dcdecade.com/` on a mobile viewport: all six sections render with real covers.

---

## Verification end-to-end

Once all four steps are complete:

1. `npm test` green.
2. `npm run build` green.
3. Local dev server: all homepage sections render real covers from `api.dcdecade.com`.
4. Production: stale ISR cache dropped, live covers visible at `www.dcdecade.com`.
5. No references to `railway.app` remain anywhere in the repo.
