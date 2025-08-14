import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [react(), tailwindcss(), visualizer({ open: true })],
  base: '/', // 部署在根目录
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React 基础库
          react: ['react', 'react-dom', 'react-router-dom'],
          // 富文本编辑器
          tiptap: ['@tiptap/react', '@tiptap/starter-kit'],
          // PDF 生成
          pdf: ['jspdf'],
        }
      }
    }
  }
})