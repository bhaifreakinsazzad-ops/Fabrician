# Fabrician — Claude-Ready Restructured Base

This package restructures the Kimi-generated scaffold into a **Claude Code handoff repo**.

## What this is
A working React/Vite ecommerce scaffold for Fabrician, now paired with a clear product brief so Claude Code can continue development in the right direction.

## What this is not
This is **not** the final product experience. The current implementation is still too generic and must be rebuilt experience-first.

## Start here
1. Read `CLAUDE.md`
2. Read `docs/FABRICIAN-OBJECTIVE.md`
3. Read `docs/KEEP-REWRITE-MAP.md`
4. Read `docs/CLAUDE-CODE-STARTER-PROMPT.md`

## Repo intent
- reuse the scaffold
- do not trust the current visual direction
- rebuild the core front-facing experience first
- keep Fabrician Studio as a trial / preview feature for now
- keep the ready-stock baby clothing store as the real revenue layer

## Existing stack
- React
- Vite
- TypeScript
- Tailwind
- shadcn-style UI primitives
- Zustand stores
- Framer Motion available

## Recommended next build order
1. Home experience reset
2. Shop and product detail rewrite
3. Studio rewrite
4. Cart / checkout refinement
5. Admin cleanup and controls

## Scripts
- `npm install`
- `npm run dev`
- `npm run build`

## Notes
- `src/pages/HomePage.tsx` is currently generic and should be rewritten.
- `src/pages/StudioPage.tsx` is currently usable as a logic reference only.
- `src/pages/Home.tsx` appears redundant and can likely be removed during cleanup.
