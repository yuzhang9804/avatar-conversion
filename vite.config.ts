import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import WindiCSS from 'vite-plugin-windicss'

export default ({ mode }) => defineConfig({
  base: mode === 'development' ? '/' : '/avatar-conversion/',
  build: {
    outDir: 'docs'
  },
  plugins: [react(), WindiCSS()],
})
