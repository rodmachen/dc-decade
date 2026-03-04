# DC Decade

A monorepo for DC Comics 1980s client apps, starting with a mobile-first web app.

## Tech Stack

- **Monorepo**: npm workspaces (`shared/`, `web/`)
- **Web**: Next.js 15 (App Router), TypeScript
- **GraphQL**: Apollo Client + `@apollo/experimental-nextjs-app-support`
- **Codegen**: `@graphql-codegen/cli` (typescript + typescript-operations + typescript-react-apollo)
- **Styling**: Tailwind CSS 4
- **Testing**: Vitest + React Testing Library + MSW
- **Deploy**: Vercel → dcdecade.com
- **Node**: 22

## Architecture

### Server Components by default
Homepage, series detail, issue detail, creator detail are all Server Components using `getClient()`. Only the search page uses Client Components for interactive debounced queries.

### Data source
Production GraphQL API: `https://comics-n-stuff-gql-production.up.railway.app/graphql`

### Image handling
Cover images are stored in Cloudinary (cloud: `dke4phurv`), referenced via `coverImageUrl` on Issue. The `buildCoverUrl()` helper in `web/src/lib/cloudinary.ts` inserts Cloudinary transform strings from shared design tokens into URLs. Use `dc-placeholder.png` as fallback when `coverImageUrl` is null.

### Shared package (`@dc-decade/shared`)
Contains schema, GraphQL operations, design tokens, homepage content, and static assets. Web app imports from here. Designed so future mobile apps can also consume it.

## Key Conventions

- Mobile-first responsive layouts with Tailwind breakpoints
- Bottom tab bar navigation (Home / Search), fixed to viewport
- Touch targets ≥ 44px
- Horizontal scroll with snap for homepage sections
- `env(safe-area-inset-bottom)` for iPhone home indicator
- All GraphQL operations live in `shared/operations/`, not in component files
- Generated types committed to `web/src/generated/graphql.ts`

## Commands

```bash
npm test              # run vitest
npm run codegen       # regenerate GraphQL types
npm run build         # build web app
npm run dev           # start dev server (from web/)
```

## Credits Footer

```
Copyright @ 2026 Rod Machen | Comics data: GCD | Image data: Comic Vine
```
