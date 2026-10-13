import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// SPA fallback for GitHub Pages: the build script copies dist/index.html to dist/404.html
// so deep links like /projects/normaengine load the app and route client-side.
export default defineConfig({
  plugins: [react()],
})
