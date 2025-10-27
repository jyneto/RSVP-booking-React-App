import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Try to load local mkcert files if they exist in project root:
const keyPath = path.resolve(__dirname, 'localhost-key.pem')
const certPath = path.resolve(__dirname, 'localhost.pem')

let httpsConfig: { key: Buffer; cert: Buffer } | undefined = undefined
if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
  httpsConfig = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server: {
    host: true,
    port: 5173,
  https: httpsConfig,
  },
})
