import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['5173-raednimer-cipp5reactfro-ggwep0nv2yk.ws-eu119.gitpod.io', 'localhost']
  }
})
