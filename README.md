# knowme

Personal portfolio of Anwesh Kabiraj, built with Vite, React and TypeScript, deployed to GitHub Pages.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve dist/ locally
```

## Where things live

| What | File |
|---|---|
| Name, links, headline, CV path | `src/data/profile.ts` |
| Roles, education | `src/data/experience.ts` |
| Projects (+ detail pages) | `src/data/projects.ts` |
| Publications, patents, honours | `src/data/research.ts` |
| Skills constellation | `src/data/skills.ts` |
| Gallery photos | `src/data/photos.ts` + `public/photos/` |
| Portrait | drop a photo at `public/portrait.jpg` |

Counts on the site (publications, patents, projects, years) are computed in `src/data/stats.ts`, so adding a paper or project updates every number automatically.

New gallery photos: `python3 scripts/photos.py path/to/*.jpg` (strips EXIF/GPS, makes full + thumb sizes), then add entries to `src/data/photos.ts`.

## Deploy

Pushing `main` runs `.github/workflows/deploy.yml`, which builds and publishes `dist/` to GitHub Pages.
One-time setup in the repo: **Settings → Pages → Source: GitHub Actions**, and set the custom domain there.
