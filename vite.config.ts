import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/web-patita-verde/', // 👈 Reemplaza por el nombre exacto de tu repo en GitHub (ej. /patita-verde/)
})
