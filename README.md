# DeathGuess

A historical knowledge game about the human toll of real events, disasters, conflicts and criminal cases.

Players choose between two modes:

- `Exact Number`: enter a death-toll estimate and score according to its accuracy.
- `Higher Toll`: compare two events and choose which one caused more deaths.

## Run locally

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:3000`.

## Validation

```bash
npm run typecheck
npm run lint
npm run build
```

## Content and architecture

- The event archive, sources and image credits live in `data/events.ts`.
- Scoring and final statistics live in `lib/scoring.ts`.
- Round selection lives in `lib/game.ts` and accepts a seed. A future Daily Challenge can pass an ISO date to generate the same game for every player.
- Historical and contextual images are stored locally in `public/events`.
- Each stage of the experience is separated into components under `components/game`.

The archive currently contains 25 sourced cases. Each game randomly selects 10 events or 10 unique pairs, depending on the selected mode.

## Deploy to Vercel

1. Push this directory to a Git repository.
2. Import the repository at [vercel.com/new](https://vercel.com/new).
3. Vercel detects Next.js automatically. Keep `npm run build` as the build command; no environment variables are required.
4. If the final domain differs from `https://deathguess.vercel.app`, update `metadataBase` in `app/layout.tsx`.

You can also deploy from the command line with `npx vercel`.

## Editorial notes

Every displayed count is backed by the source linked in its result panel. Approximate totals are labeled `estimated`; lower-bound totals are labeled `at least`. New events should always include a source and an image credit/license.
