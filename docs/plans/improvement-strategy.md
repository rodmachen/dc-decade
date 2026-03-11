# Plan: DC Decade Web App Improvements

## Context

The web app at dcdecade.com is live and functional. This plan addresses improvements across five areas: asset integration & brand alignment, UI/visual design, error handling & resilience, accessibility, and code quality. Priorities are based on user-facing impact.

Prior plans: `app-strategy.md` (overall vision), `web-app-implementation.md` (Phase 0–2, completed).

---

## Updated Assets (2026-03-07)

Four professional assets have been placed in `shared/assets/` and copied to `web/public/`:

| File | Description | Design notes |
|------|-------------|--------------|
| `banner.png` | Horizontal "THE DC DECADE" logo with classic DC bullet (circle with stars + "DC"). Transparent background. | Bold italic white/silver lettering with 3D shadow effect. Bright DC blue (#3878C7 range) circle with white stars. Designed to be shown prominently, not as a background texture. |
| `app-tile.png` | Square app icon: "THE / DC bullet / DECADE" stacked on solid steel-blue background with rounded corners. Transparent outer area. | Same bright DC blue as banner. Suitable for OG image and Apple touch icon. |
| `dc-placeholder.png` | Portrait placeholder (2:3 ratio) with DC Decade branding centered on dark charcoal background. | Uses same logo/bullet. Dark gray background (#2a2a2a range). This is the fallback when `coverImageUrl` is null. |
| `favicon.png` | Square favicon with DC Decade branding (same logo as app-tile). Transparent background. | Ready to use directly — copy to `web/public/` and reference in layout metadata. No `.ico` conversion needed. |

### Brand Color Mismatch

The current design tokens use a dark navy palette:
- `primary-dark: #1a2847` / `primary: #2b4075` / `primary-light: #4a6199`

The new assets use a **brighter, more saturated DC blue** (~#3878C7). The site's color scheme needs to shift to match, particularly in:
- Hero section background
- Bottom navigation bar
- Series detail page header
- Search page header
- Any area currently using `bg-primary-dark`

---

## Area 1: Asset Integration & Brand Alignment

The new assets require design token updates, hero section redesign, placeholder integration, and favicon/metadata improvements.

### Improvements

| # | What | Details |
|---|------|---------|
| 1.0a | Update design tokens to match asset colors | Update `tokens.yaml` primary palette to match the brighter DC blue from the assets. Suggested: `primary-dark: #2B5A9B`, `primary: #3878C7`, `primary-light: #5A94D4`. Update `tokens.ts` (run generate script) and `globals.css` `@theme` block accordingly. Keep accent gold, background warm off-white, and text colors as-is. |
| 1.0b | Redesign hero section around the banner logo | The banner.png is a proper logo — it should be the hero, not a background texture. Remove the overlaid `<h1>` text and subtitle. Display banner.png as the primary visual element at full opacity on a matching DC blue gradient background. Add the subtitle "The 1980s — the decade that changed comics forever" below the logo in a lighter weight. |
| 1.0c | Use dc-placeholder.png as the cover fallback | The placeholder is now a branded portrait image. Verify `buildCoverUrl()` in `cloudinary.ts` returns `/dc-placeholder.png` when `coverImageUrl` is null. The current implementation should already do this — confirm the path is correct and the new file is being served. |
| 1.0d | Install favicon and icon sizes | Copy `favicon.png` from `shared/assets/` to `web/public/`. Remove the old `favicon.ico` stub. Generate `apple-touch-icon.png` (180x180) from `app-tile.png`. Update `layout.tsx` metadata with `icons` config pointing to `favicon.png`. |
| 1.0e | OG/social metadata | Use `app-tile.png` as the `og:image` in root layout metadata. Add `twitter:card`, `og:title`, `og:description` for social sharing. |
| 1.0f | Align BottomNav with new blue | The bottom nav currently uses `bg-primary-dark`. After the token update, this will automatically shift to the brighter blue. Verify the contrast ratio of white text on the new blue meets WCAG AA (4.5:1). If needed, darken slightly. |
| 1.0g | Align search page header | The search header uses `bg-primary-dark`. Same as BottomNav — verify it looks right with the updated tokens. |
| 1.0h | Series detail header alignment | SeriesHeader uses `bg-primary-dark` for its dark band. Verify it works with the new palette. |

---

## Area 2: UI & Visual Design

Observations from the live site:

- **Series cards** on the homepage are small (144px wide) with cramped text; year ranges are barely legible
- **Issue detail page** has a floating cover image in a dark band with excessive empty space around it; metadata below is sparse and unstyled
- **Stories list** is bare — just sequence numbers and plain text, no visual grouping of credits
- **Series detail page** issue grid works but covers are edge-to-edge with no hover/focus feedback
- **Search page** empty state is a single line of muted text in a sea of blank space
- **No back navigation** on detail pages other than browser back button
- **No page titles** in the browser tab beyond "The DC Decade" for all routes

### Improvements

| # | What | Details |
|---|------|---------|
| 2.1 | Enlarge homepage series cards | Increase from w-36/h-52 to w-44/h-64. Increase text size from text-xs to text-sm for year range. Add gap between cards. |
| 2.2 | Improve issue detail layout | Make cover image larger (w-64 h-96). Add series name as a styled breadcrumb above the cover. Add subtle gradient overlay on the dark band (use new DC blue gradient). Put metadata in a card-like container with clear typographic hierarchy. |
| 2.3 | Enrich stories list | Show story credits (writer, penciller, etc.) under each story title. Add a subtle background alternation or card styling. Remove bare sequence numbers; use type badge instead (e.g., "cover", "story", "letters page"). |
| 2.4 | Add hover/focus states to all cards | Scale transform on hover (scale-105), ring on focus-visible, transition duration. Applies to SeriesCard, IssueCard, search result items. |
| 2.5 | Improve search empty state | Replace plain text with the DC Decade logo (small) + message + suggestion (e.g., "Try searching for 'Batman' or 'Crisis'"). Use the branded placeholder style. |
| 2.6 | Add breadcrumb navigation on detail pages | Issue page: "Home > Series Name > Issue #N". Series page: "Home > Series Name". Creator page: "Home > Creator Name". Use simple text links, not a full breadcrumb component. |
| 2.7 | Dynamic page titles | Add `generateMetadata()` to series, issue, and creator pages. Format: "Batman - The DC Decade", "Batman #404 - The DC Decade", "Frank Miller - The DC Decade". |
| 2.8 | Add loading skeletons | Replace LoadingSpinner with skeleton placeholders that match the layout of each page (card grids, detail pages). Reduces layout shift. |
| 2.9 | Issue grid improvements | Add issue title on hover/tooltip. Add subtle border-radius and shadow consistent with homepage cards. |

---

## Area 3: Error Handling & Resilience

Currently, detail pages call `getClient().query()` with no try-catch and no `error.tsx` boundary. A network failure crashes the page.

### Improvements

| # | What | Details |
|---|------|---------|
| 3.1 | Add `error.tsx` boundaries | Create `error.tsx` in `app/series/[id]/`, `app/issue/[id]/`, `app/creator/[id]/`, and `app/` (root). Each shows a styled error message (using DC Decade branding) with a retry button. |
| 3.2 | Wrap server queries in try-catch | In each detail page, catch query errors and either throw for the error boundary or render an inline error. Prevents raw crash pages. |
| 3.3 | Add `not-found.tsx` pages | Custom 404 pages for each route segment. Use the dc-placeholder image and "This issue/series/creator doesn't exist" with a link back to search. |
| 3.4 | Apollo error link | Add an `onError` link to both server and client Apollo instances for consistent error logging. |

---

## Area 4: Accessibility

No `aria-*` attributes exist in the codebase. Several WCAG 2.1 AA issues.

### Improvements

| # | What | Details |
|---|------|---------|
| 4.1 | BottomNav aria labels | Add `aria-label="Home"` and `aria-label="Search"` to nav links. Add `aria-current="page"` to the active tab. Add `aria-label="Main navigation"` to the `<nav>` element. |
| 4.2 | SearchBar label | Add a visually hidden `<label>` associated with the search input via `htmlFor`/`id`. |
| 4.3 | SearchTabs aria states | Add `role="tablist"` to the container, `role="tab"` and `aria-selected` to each tab button. |
| 4.4 | Image alt text improvements | SeriesCard: already good. IssueCard: improve to `"Cover of [Series Name] #[Number]"` (requires passing series name). Story cards: no images, fine. |
| 4.5 | Semantic HTML | Use `<article>` for cards in lists (StoryCard, IssueCard, search results). Use `<main>` wrapper in layout. |
| 4.6 | Focus management | Reset focus to results area when search tab changes. Ensure all interactive elements have visible focus indicators. |
| 4.7 | Skip to content link | Add a visually hidden "Skip to main content" link at the top of the layout. |
| 4.8 | Color contrast verification | After updating primary colors (1.0a), verify all text-on-blue combinations meet WCAG AA contrast ratio (4.5:1 for normal text, 3:1 for large text). The new brighter blue is lighter than the old navy, so white text contrast must be checked. |

---

## Area 5: Code Quality & Infrastructure

### Improvements

| # | What | Details |
|---|------|---------|
| 5.1 | Centralize API URL | Move `https://comics-n-stuff-gql-production.up.railway.app/graphql` to `NEXT_PUBLIC_GRAPHQL_URL` env var. Create `.env.local` and `.env.example`. Update both `apollo-client.ts` and `apollo-provider.tsx` to read from it. |
| 5.2 | Security headers | Add `headers()` config to `next.config.ts`: Content-Security-Policy (scripts, styles, images from self + Cloudinary), X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin. |
| 5.3 | Image lazy loading | Add `loading="lazy"` to all non-priority images: SeriesCard, IssueCard, search result images. |
| 5.4 | Debounce cleanup | Add `useEffect` cleanup in SearchBar to clear the timeout ref on unmount. |
| 5.5 | Expand test coverage | Add page-level tests for series, issue, and creator detail routes. Add error state tests. Add homepage integration test. Target: 70+ tests. |
| 5.6 | Nav height CSS variable | Extract `h-14` bottom nav height to a CSS custom property. Use it for both the nav and the body `pb-*` padding. |

---

## Implementation Phases

### Phase 1: Brand Alignment — Model: Opus

The highest-impact change. Updates the entire visual identity to match the new professional assets.

| Step | Items | Files touched |
|------|-------|---------------|
| 1 | 1.0a Update design tokens | `shared/design-tokens/tokens.yaml`, `shared/design-tokens/tokens.ts`, `web/src/app/globals.css` |
| 2 | 1.0b Redesign hero section | `web/src/components/homepage/HeroSection.tsx` |
| 3 | 1.0c Verify placeholder integration | `web/src/lib/cloudinary.ts` (verify only) |
| 4 | 1.0d Install favicon and icon sizes | `web/public/favicon.png` (copied from shared/assets), remove `favicon.ico`; new `apple-touch-icon.png`; `web/src/app/layout.tsx` |
| 5 | 1.0e OG/social metadata | `web/src/app/layout.tsx` |
| 6 | 1.0f–h Verify nav/header alignment | `BottomNav.tsx`, search page, `SeriesHeader.tsx` — visual review after token update, adjust if needed |
| 7 | 4.8 Color contrast verification | All blue-on-white and white-on-blue text — adjust token values if contrast fails |

### Phase 2: Quick Wins — COMPLETED 2026-03-08

Low-risk, high-impact changes. No structural refactors.

| Step | Items | Files touched |
|------|-------|---------------|
| 8 | 2.7 Dynamic page titles | `series/[id]/page.tsx`, `issue/[id]/page.tsx`, `creator/[id]/page.tsx` |
| 9 | 5.1 Centralize API URL | `apollo-client.ts`, `apollo-provider.tsx`, `.env.local`, `.env.example` |
| 10 | 4.1 BottomNav accessibility | `BottomNav.tsx` |
| 11 | 4.2 SearchBar label | `SearchBar.tsx` |
| 12 | 5.3 Image lazy loading | `SeriesCard.tsx`, `IssueCard.tsx` |
| 13 | 5.4 Debounce cleanup | `SearchBar.tsx` |
| 14 | 2.4 Hover/focus states | `SeriesCard.tsx`, `IssueCard.tsx`, search result components |

### Phase 3: UI Polish — COMPLETED 2026-03-08

Visual improvements that enhance the browsing experience. Now using the updated brand colors.

| Step | Items | Files touched |
|------|-------|---------------|
| 15 | 2.1 Larger homepage cards | `SeriesCard.tsx`, `HomepageSection.tsx` |
| 16 | 2.2 Issue detail layout | `CoverImage.tsx`, `IssueHeader.tsx`, `issue/[id]/page.tsx` |
| 17 | 2.3 Enrich stories list | `StoryCard.tsx`, `StoryList.tsx` — requires updating GraphQL query to fetch story credits |
| 18 | 2.6 Breadcrumb navigation | `series/[id]/page.tsx`, `issue/[id]/page.tsx`, `creator/[id]/page.tsx` |
| 19 | 2.5 Search empty state | `search/page.tsx` or new `SearchEmptyState` component |
| 20 | 2.8 Loading skeletons | New skeleton components, update detail pages |

### Phase 4: Resilience — COMPLETED 2026-03-08

Error handling and robustness. Error/404 pages use the DC Decade branding.

| Step | Items | Files touched |
|------|-------|---------------|
| 21 | 3.1 Error boundaries | New `error.tsx` files in each route segment |
| 22 | 3.2 Server query try-catch | `series/[id]/page.tsx`, `issue/[id]/page.tsx`, `creator/[id]/page.tsx` |
| 23 | 3.3 Custom not-found pages | New `not-found.tsx` files (with dc-placeholder branding) |
| 24 | 3.4 Apollo error link | `apollo-client.ts`, `apollo-provider.tsx` |

### Phase 5: Accessibility & Testing — COMPLETED 2026-03-08

| Step | Items | Files touched |
|------|-------|---------------|
| 25 | 4.3–4.7 Remaining a11y | `SearchTabs.tsx`, `layout.tsx`, various components |
| 26 | 5.2 Security headers | `next.config.ts` |
| 27 | 5.5 Expanded tests | New test files in `__tests__/` |
| 28 | 5.6 Nav height CSS variable | `globals.css`, `BottomNav.tsx`, `layout.tsx` |

### Phase 6: Verification

| Check | What |
|-------|------|
| 1 | `npm test` passes all tests (old + new) |
| 2 | `npm run build` succeeds with no warnings |
| 3 | All detail pages show correct dynamic titles |
| 4 | Error boundaries render gracefully on network failure |
| 5 | Lighthouse accessibility score >= 90 |
| 6 | Mobile viewport review: all UI changes responsive |
| 7 | Visual review: hero section shows banner logo prominently |
| 8 | Visual review: site blues match banner/app-tile blue |
| 9 | Visual review: placeholder image displays for issues with no cover |
| 10 | Favicon displays correctly in browser tab |
| 11 | Social sharing card (OG image) renders correctly |
| 12 | WCAG contrast check passes for all text on updated blue backgrounds |

---

## Files Summary

**Modified** (existing):
- `shared/design-tokens/tokens.yaml` — updated primary blue palette to match assets
- `shared/design-tokens/tokens.ts` — regenerated from tokens.yaml
- `web/src/app/globals.css` — updated `@theme` block with new blues, nav height variable, skeleton styles
- `web/src/app/layout.tsx` — favicon/icon metadata, OG metadata, `<main>` wrapper, skip link
- `web/src/lib/apollo-client.ts` — env var for API URL
- `web/src/lib/apollo-provider.tsx` — env var for API URL, error link
- `web/src/app/series/[id]/page.tsx` — metadata, breadcrumb, try-catch
- `web/src/app/issue/[id]/page.tsx` — metadata, breadcrumb, try-catch, layout
- `web/src/app/creator/[id]/page.tsx` — metadata, breadcrumb, try-catch
- `web/src/app/search/page.tsx` — empty state with branding
- `web/src/components/layout/BottomNav.tsx` — aria labels, contrast check
- `web/src/components/homepage/HeroSection.tsx` — redesigned: banner logo as hero, no overlaid text
- `web/src/components/homepage/SeriesCard.tsx` — larger, hover states, lazy loading
- `web/src/components/homepage/HomepageSection.tsx` — layout adjustments for larger cards
- `web/src/components/series/IssueCard.tsx` — hover states, lazy loading
- `web/src/components/issue/CoverImage.tsx` — larger image, gradient with new blue
- `web/src/components/issue/IssueHeader.tsx` — card-style layout
- `web/src/components/issue/StoryCard.tsx` — credits, type badge, styling
- `web/src/components/issue/StoryList.tsx` — layout changes
- `web/src/components/search/SearchBar.tsx` — label, debounce cleanup
- `web/src/components/search/SearchTabs.tsx` — ARIA roles
- `web/next.config.ts` — security headers

**New**:
- `web/public/favicon.png` — copied from `shared/assets/favicon.png` (replaces old `favicon.ico` stub)
- `web/public/apple-touch-icon.png` — 180x180 generated from app-tile.png
- `web/.env.local` — NEXT_PUBLIC_GRAPHQL_URL
- `web/.env.example` — documented env vars
- `web/src/app/error.tsx` — root error boundary (branded)
- `web/src/app/series/[id]/error.tsx` — series error boundary
- `web/src/app/issue/[id]/error.tsx` — issue error boundary
- `web/src/app/creator/[id]/error.tsx` — creator error boundary
- `web/src/app/not-found.tsx` — custom 404 (with dc-placeholder branding)
- `web/src/app/series/[id]/not-found.tsx` — series 404
- `web/src/app/issue/[id]/not-found.tsx` — issue 404
- `web/src/app/creator/[id]/not-found.tsx` — creator 404
- New test files for detail pages and error states

---

## Notes

- The banner.png has a **transparent background**, so the hero section must set a background color or gradient behind it. Use a gradient from the new `primary-dark` to `primary` to match the logo's blue tones.
- A dedicated `favicon.png` is provided in `shared/assets/` — use it directly rather than deriving from app-tile.png. The `apple-touch-icon.png` should still be generated from `app-tile.png` (resize to 180x180 with `sharp` or `sips`).
- Story credits (item 2.3) depend on what the `GetIssue` query already returns. Check if `stories` includes credit/creator data. If not, the GraphQL query in `shared/operations/issues.graphql` needs to be updated and codegen re-run.
- Security headers (item 5.2) should be tested with a CSP evaluator before deploying to avoid breaking Cloudinary image loading or inline styles.
- Loading skeletons (item 2.8) are lower priority than the other UI items — the current spinner works, skeletons are a polish item.
- All phases can be run on a single branch (`feature/improvements`) or split into per-phase branches.
- After the token update (1.0a), every component using `bg-primary-dark`, `bg-primary`, `text-primary`, etc. will automatically pick up the new colors via the CSS custom properties — no per-component color changes needed.
- The hero section redesign (1.0b) is the single biggest visual change. Current: banner at 40% opacity behind an `<h1>` with "The DC Decade" text. New: banner.png displayed prominently as the hero graphic at full opacity, since it already contains the title text as part of the logo artwork. The subtitle moves below the logo.
