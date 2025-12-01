# Contributing Guide

Thank you for considering a contribution! This guide keeps things smooth and welcoming for everyone.

## Ways to contribute
- Bug reports and reproduction steps
- UX polish, accessibility, and performance improvements
- New features: small, focused PRs are best
- Documentation improvements

## Local development
Requirements: Node.js 18+

- cd timetable
- npm install
- npm start (dev)
- npm run build (prod)
- npm test (watch mode)

## Code style and conventions
- Follow CRA/ESLint defaults already in the project
- Keep existing design tokens/variables intact (colors, CSS variables, breakpoints)
- Prefer accessible HTML and keyboard-friendly interactions
- Keep components focused; extract helpers when complexity grows

## Commit messages
Use clear, imperative messages. Conventional Commits are welcome (e.g., `feat: add Excel sheet summary`).

## Pull requests
- Base your branch off the latest main (or current active branch)
- Keep PRs small and scoped
- Include before/after screenshots or GIFs when changing UI
- Ensure `npm run build` succeeds and no ESLint errors
- Add tests if logic is non-trivial

## Issue reports
- Describe expected vs. actual behavior
- Include steps to reproduce and environment (OS, browser)
- Add screenshots or logs when helpful

## Security
If you believe you’ve found a security issue, please open a private channel first (see contact below) and avoid public disclosure until we coordinate a fix.

## Contact
- Email: timetable@vignan.ac.in
- Or open a GitHub Discussion/Issue in the repository
