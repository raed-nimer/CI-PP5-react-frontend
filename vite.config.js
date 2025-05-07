import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['5173-raednimer-cipp5reactfro-m5ypu1hxz6y.ws-eu118.gitpod.io', 'localhost']
  }
})
