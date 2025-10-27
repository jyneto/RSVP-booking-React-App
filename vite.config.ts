import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Load env for this config (ensures .env.local is read if present when running via Vite)
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // Accept certificate paths from environment first (recommended), else fall back to project-root files
  const envKeyPath = env.VITE_HTTPS_KEY_PATH || process.env.VITE_HTTPS_KEY_PATH
  const envCertPath = env.VITE_HTTPS_CERT_PATH || process.env.VITE_HTTPS_CERT_PATH

  const projectKeyPath = path.resolve(__dirname, 'localhost-key.pem')
  const projectCertPath = path.resolve(__dirname, 'localhost.pem')

  const resolvedKeyPath = envKeyPath ? path.resolve(envKeyPath) : projectKeyPath
  const resolvedCertPath = envCertPath ? path.resolve(envCertPath) : projectCertPath

  let httpsConfig: { key: Buffer; cert: Buffer } | undefined = undefined
  if (fs.existsSync(resolvedKeyPath) && fs.existsSync(resolvedCertPath)) {
    httpsConfig = {
      key: fs.readFileSync(resolvedKeyPath),
      cert: fs.readFileSync(resolvedCertPath),
    }
  }

  // https://vite.dev/config/
  return {
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
  }
})
