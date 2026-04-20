import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Redirect all 404s back to index.html so React Router can handle client-side routes.
    // Without this, refreshing on /dashboard (or any route) asks the server for a file
    // that doesn't exist and returns a 404.
    historyApiFallback: true,
  },
})
