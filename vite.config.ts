import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { stats } from './src/data/stats.ts'

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`

// SPA fallback for GitHub Pages: the build script copies dist/index.html to dist/404.html
// so deep links like /projects/normaengine load the app and route client-side.
export default defineConfig({
  plugins: [
    react(),
    {
      // index.html is static, so counts in its meta tags are filled from src/data/stats.ts at build time.
      name: 'html-stats',
      transformIndexHtml: (html) =>
        html
          .replaceAll('%STATS_PUBLICATIONS%', plural(stats.publications, 'peer-reviewed publication'))
          .replaceAll('%STATS_PATENTS%', plural(stats.patents, 'patent')),
    },
  ],
})
