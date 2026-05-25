# Avatar

> Gradient avatars by URL. Drop any name, email, or string into the path and get a unique, deterministic avatar back in PNG or SVG.

Live: **[avatar.pavlo.sh](https://avatar.pavlo.sh)**

## Why

Most apps still ship a grey silhouette where a user's face should be. Avatar replaces that placeholder in one line of HTML. No editor, no signup, no asset pipeline. Every string maps to the same gradient forever, so the same user always gets the same avatar across your app, your emails, and your docs.

## Quick start

```html
<img src="https://avatar.pavlo.sh/anyname" width="180" height="180" />
```

Works with anything: usernames, emails, IDs, slugs.

## URL patterns

| URL                                         | Result                                  |
| ------------------------------------------- | --------------------------------------- |
| `/<seed>`                                   | PNG, 180×180                            |
| `/<seed>?size=N`                            | PNG, `N×N` (clamped to `16–1024`)       |
| `/<seed>?rounded=N`                         | PNG with `N` px border-radius           |
| `/<seed>?size=120&rounded=60`               | PNG, full circle at custom size         |
| `/<seed>.svg`                               | SVG instead of PNG (same `size`/`rounded` rules) |

A few live examples:

- `https://avatar.pavlo.sh/ada`
- `https://avatar.pavlo.sh/marco@example.com?rounded=90`
- `https://avatar.pavlo.sh/team-1?size=320`
- `https://avatar.pavlo.sh/notification-bot.svg`

## Parameters

| Param     | Type    | Default | Range          | Notes                                            |
| --------- | ------- | ------- | -------------- | ------------------------------------------------ |
| `size`    | integer | `180`   | `16–1024`      | Square edge in pixels                            |
| `rounded` | integer | `0`     | `0 – size/2`   | Border-radius in pixels. `size/2` = full circle. |

Both parameters are clamped server-side, so invalid input never returns an error; it returns the closest valid avatar. Responses are pure functions of `(seed, size, rounded, format)` and ship with `Cache-Control: public, max-age=31536000, immutable`.

## How it works

- Seed → 32-bit FNV-1a hash → two HSL colors + an angle bucket.
- PNG: rendered with [Next.js `ImageResponse`](https://nextjs.org/docs/app/api-reference/functions/image-response) (Satori + Resvg).
- SVG: a hand-built `<linearGradient>` + `<rect>`, no runtime dependencies.

Everything lives in two files: `lib/avatar.ts` (hash, gradient, parsing) and `app/[username]/route.tsx` (the route handler).

## Local development

Requires Node 20+.

```bash
npm install
npm run dev
# open http://localhost:3000
```

```bash
npm run build   # production build
npm run start   # serve the build
npm run lint    # eslint
```

## Deployment

Built on Next.js 16 (App Router, Turbopack). Deploys to Vercel without configuration; runs anywhere that supports a Node Next.js runtime.

## License

[MIT](./LICENSE). Free to use, fork, and self-host. A link back to the project is appreciated but not required.

---

Made by [Pavlo Golovatyy](https://pavlo.sh).
