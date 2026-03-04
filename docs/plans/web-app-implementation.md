# Plan: DC Decade Web App (Phase 1 of App Strategy)

## Context

The `comics-n-stuff-gql` GraphQL API is deployed and serving DC Comics data from the 1980s. The original `app-strategy.md` planned 4 client apps simultaneously. This plan extracts the **web app** as a standalone first phase. Mobile apps (iOS native, React Native, Android) will follow later in a separate phase.

The web app must work well on mobile browsers since native mobile apps aren't coming immediately. The monorepo structure and shared foundation (tokens, homepage content, assets) are built up front so mobile apps can plug in later without restructuring.

---

## Repo: `dc-decade` (new monorepo, separate from API repo)

```
dc-decade/
  package.json                    # npm workspaces: ["shared", "web"]
  tsconfig.base.json
  .gitignore
  .nvmrc                          # Node 22

  shared/                         # @dc-decade/shared
    package.json
    schema.graphql                # from API typeDefs (includes coverImageUrl)
    operations/
      series.graphql              # updated: add coverImageUrl to GetSeries
      issues.graphql              # updated: add coverImageUrl, remove variants
      creators.graphql            # copied as-is
      stories.graphql             # copied as-is
      homepage.graphql            # NEW: GetSeriesWithCover query
    content/
      homepage.yaml               # curated sections with real series IDs
      homepage.json               # generated from YAML
    assets/
      banner.png                  # homepage hero image
      dc-placeholder.png          # fallback for missing covers
      favicon.ico
      app-tile.png                # 1024x1024 source icon
    design-tokens/
      tokens.yaml                 # colors, typography, spacing, cloudinary transforms
      tokens.ts                   # generated from YAML (JS/TS only, no Swift/Kotlin)
    scripts/
      generate-tokens.ts          # YAML → tokens.ts
      compile-homepage.ts         # YAML → homepage.json
    codegen/
      codegen-web.ts              # @graphql-codegen/cli config for web/

  web/                            # @dc-decade/web (Next.js 15)
    package.json
    next.config.ts
    tailwind.config.ts            # imports tokens from @dc-decade/shared
    vitest.config.ts
    src/
      app/
        layout.tsx                # ApolloWrapper, BottomNav, CreditsFooter
        page.tsx                  # Homepage (Server Component)
        search/page.tsx           # Search (Client Component)
        series/[id]/page.tsx      # Series Detail (Server Component)
        issue/[id]/page.tsx       # Issue Detail (Server Component)
        creator/[id]/page.tsx     # Creator Detail (Server Component)
      components/
        layout/                   # BottomNav, CreditsFooter
        homepage/                 # HeroSection, HomepageSection, SeriesCard
        search/                   # SearchBar, SearchTabs, result components
        series/                   # SeriesHeader, IssueList, IssueCard
        issue/                    # CoverImage, IssueHeader, StoryList, StoryCard
        creator/                  # CreatorHeader, NameVariants
        ui/                       # LoadingSpinner, ErrorMessage, EmptyState
      lib/
        apollo-client.ts          # Server-side Apollo (registerApolloClient)
        apollo-provider.tsx       # Client-side ApolloWrapper
        cloudinary.ts             # buildCoverUrl helper using token transforms
      generated/
        graphql.ts                # codegen output (committed)
      __tests__/                  # Vitest + RTL + MSW
```

---

## Operations Updates (from API repo → shared/)

When copying operations from the API repo, these changes are needed:

**`issues.graphql` — `GetIssue`**: Remove `variants { ... }` block (not in live schema), add `coverImageUrl`
**`issues.graphql` — `GetIssues`**: Add `coverImageUrl` to selection
**`series.graphql` — `GetSeries`**: Add `coverImageUrl` to issues selection
**`homepage.graphql`** (new): `GetSeriesWithCover` query fetching series + first issue cover for homepage cards

---

## Key Design Decisions

1. **Mobile-first responsive** — All layouts built mobile-first with Tailwind breakpoints. Bottom tab bar (Home/Search) fixed to viewport. Touch targets ≥44px. Horizontal scroll with snap for homepage sections. `env(safe-area-inset-bottom)` for iPhone home indicator.

2. **Server Components by default** — Homepage, series detail, issue detail, creator detail are all Server Components using `getClient()` for fast initial loads. Only search uses Client Components for interactive debounced queries.

3. **Cloudinary transforms via tokens** — `buildCoverUrl()` helper inserts transform strings from `tokens.cloudinary` into Cloudinary URLs. Defined once in `tokens.yaml`, consumed everywhere.

4. **Search UX** — Series and Creators tabs use simple text search. Issues tab: search by series first, then browse issues (since `searchIssues` requires both series name and issue number).

5. **Homepage content** — `homepage.json` imported statically for section structure. Series data fetched server-side at request time per section. Next.js caching prevents redundant API calls.

---

## Implementation Sequence

### Phase 0: Foundation — Model: Opus

| Step | What |
|------|------|
| 1 | Create `dc-decade` repo, root `package.json` with workspaces, `tsconfig.base.json`, `.gitignore`, `.nvmrc` |
| 2 | Set up `shared/` workspace: copy + update schema and operations from API repo, place assets |
| 3 | Write `tokens.yaml`, write + run `generate-tokens.ts` → produces `tokens.ts` |
| 4 | Query production API for real series IDs, write `homepage.yaml`, write + run `compile-homepage.ts` → produces `homepage.json` |
| 5 | Write `codegen-web.ts` config |
| 6 | Scaffold `web/` with `create-next-app`, install deps, run codegen, commit to `main` |

### Phase 1: Web App — Model: Sonnet

All work on `feature/web-app` branch, files only in `web/`.

| Step | What |
|------|------|
| 7 | Apollo Client setup (server + client), Cloudinary helper, Tailwind config with tokens |
| 8 | Layout: root layout with ApolloWrapper, BottomNav (fixed bottom), CreditsFooter |
| 9 | Homepage: HeroSection, HomepageSection (horizontal scroll), SeriesCard |
| 10 | Search: SearchBar (debounced), SearchTabs, result components, client-side queries |
| 11 | Detail pages: Series (header + issue grid), Issue (cover + metadata + stories), Creator (name + variants) |
| 12 | Tests: Vitest + RTL + MSW — unit, component, integration tests |

### Phase 2: Integration — Model: Opus

| Step | What |
|------|------|
| 13 | Merge to `main`, full test suite, mobile viewport review, verify against production API, deploy to Vercel |

---

## Tech Stack

| Concern | Choice |
|---------|--------|
| Framework | Next.js 15 (App Router) |
| GraphQL | Apollo Client + `@apollo/experimental-nextjs-app-support` |
| Codegen | `@graphql-codegen/cli` + typescript + typescript-operations + typescript-react-apollo |
| Styling | Tailwind CSS 4 |
| Testing | Vitest + React Testing Library + MSW |
| Images | Cloudinary (via `coverImageUrl` + URL transforms) |
| Deploy | Vercel |
| Domain | dcdecade.com |

---

## Testing Strategy

| Layer | Tool | Scope |
|-------|------|-------|
| Unit | Vitest | `cloudinary.ts`, token validation |
| Component | Vitest + RTL | All components with mock data, loading/error/empty states |
| Integration | Vitest + MSW | Homepage load, search flow, detail page fetches |
| E2E | Playwright (post-agent, manual) | Full navigation flows, mobile viewport |

---

## Screens

1. **Homepage** — Hero banner + vertical list of `HomepageSection` components. Each section: title, subtitle, horizontal scrolling row of `SeriesCard` (cover image + series name + year range).
2. **Search** — Search bar + segmented tabs (Series / Creators / Issues) + vertical results list.
3. **Series Detail** — Series metadata (name, publisher, years, format, issue count) + issue grid with covers.
4. **Issue Detail** — Cover image (Cloudinary detail transform, placeholder fallback) + metadata (series, number, date, price, pages) + expandable stories list with credits.
5. **Creator Detail** — Official name, bio, name variants.

Navigation: Bottom tab bar (Home / Search). Detail pages accessed via links from cards/results.

---

## Critical Source Files (in API repo)

- `src/graphql/typeDefs/index.ts` — Authoritative schema (has `coverImageUrl` that the standalone `schema.graphql` file may lack)
- `operations/issues.graphql` — Has stale `variants` reference to remove; missing `coverImageUrl`
- `operations/series.graphql` — `GetSeries` issues selection missing `coverImageUrl`
- `operations/creators.graphql` — Copy as-is
- `operations/stories.graphql` — Copy as-is

---

## Credits Footer

```
Copyright @ 2026 Rod Machen | Comics data: GCD | Image data: Comic Vine
```

---

## Verification

1. `npm test` passes all unit, component, and integration tests
2. Homepage renders sections with real cover images from Cloudinary
3. Search returns results for all three tabs (series, creators, issues)
4. All detail pages render correctly with production API data
5. Mobile viewport (375px) renders correctly: bottom nav, horizontal scroll, touch targets
6. Cloudinary transforms produce correctly sized images
7. Placeholder image displays when `coverImageUrl` is null
8. Deploy to Vercel succeeds and serves at production URL
