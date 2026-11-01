# CommunityServe Client

## Commands

- Install dependencies: `npm install` (or `npm ci` for a lockfile-exact install).
- Start the Turbopack development server: `npm run dev`.
- Run the full ESLint check: `npm run lint`.
- Lint one file or directory: `npm run lint -- app/page.tsx components/Navbar.tsx`.
- Create a production build: `npm run build`.
- Start the production build locally: `npm run start`.
- Run lint before build or dev work.

There is no test runner script, Jest/Vitest configuration, or test directory in the current repository. Do not claim `npm test` works.

## Architecture

- This is a Next.js 16 App Router application using React 19 and TypeScript.
- `app/layout.tsx` is the shared document shell. It loads global CSS, configures Geist fonts, sets metadata, and renders the current navigation shell and `<main>` content.
- `app/page.tsx` is the `/` route. Route pages should be composed from components rather than placing reusable site chrome in page files.
- `components/Navbar.tsx` is the primary shared navigation component. The current route shell renders `Navbar` in `app/layout.tsx`; `app/page.tsx` also renders it, so avoid introducing another copy and reconcile existing duplication when changing the page shell.
- `components/ui/` contains the shadcn/Base UI component library. Use these primitives for new UI rather than inventing parallel unstyled equivalents.
- `hooks/` contains client hooks; `use-mobile.ts` is a client-side breakpoint hook and relies on browser APIs.
- `lib/utils.ts` re-exports `cn` for class-name merging. UI components may import `cn` directly from `cn` as the existing generated components do.
- `public/assect/logo.png` is currently the navbar logo asset; public URLs are rooted at `/`, so this file is referenced as `/assect/logo.png`.
- `next.config.ts` enables `cacheComponents`, partial prefetching, the `agentFeedback` experimental setting, and a Turbopack rule that loads Tailwind's Turbopack integration for CSS.

## Repository Conventions

- Use TypeScript strict mode and the `@/*` path alias for workspace imports (for example, `@/components/Navbar`).
- The project uses the Next.js App Router and Server Components by default. Add `"use client"` only to components that need React state, effects, browser APIs, or client event handlers.
- Keep shared navigation and layout concerns in `app/layout.tsx`/`components/`, not in individual routes.
- Tailwind CSS v4 is configured through `app/globals.css`; theme colors and fonts are primarily CSS custom properties under `@theme inline`, `:root`, and `.dark`.
- Preserve dark-mode support by using the theme variables defined in `app/globals.css` (for example, `bg-background`, `text-foreground`, and `border-border`) instead of hard-coded colors when adding UI.
- Use shadcn component conventions from `components.json`:
  - style: `base-nova`
  - Tailwind CSS file: `app/globals.css`
  - icon library: Lucide React
  - aliases: `@/components`, `@/components/ui`, `@/lib`, and `@/hooks`
- Generate shadcn primitives with `npx shadcn@latest add <component-name>` instead of manually creating a parallel implementation.
- Existing UI primitives generally use `class-variance-authority`, `cn`, Base UI primitives, data-slot attributes, and Tailwind variant classes. Match those patterns when extending components in `components/ui/`.
- Use `next/image` for image assets and provide meaningful `alt` text.
- Lucide React is the established icon library.
