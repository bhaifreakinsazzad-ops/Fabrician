# Validation Notes

## What was changed
- replaced the generic repository README with a Fabrician-specific one
- added `CLAUDE.md` so Claude Code receives the real product objective at repo root
- added focused product/UX/rewrite docs under `docs/`
- updated `package.json` name/version to reflect the project handoff
- removed the generic `info.md`

## Build note
The unpacked ZIP did not include installed dependencies in this environment, so a local `npm install` is required before running `npm run dev` or `npm run build`.

## Intent of this package
This package is meant to be given to Claude Code as a corrected starting point. The scaffold remains, but the direction is now explicit and product-specific.
