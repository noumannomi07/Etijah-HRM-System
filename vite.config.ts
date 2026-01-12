/// <reference types="vite/client" />
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import path from "path";
import ViteImagemin from "vite-plugin-imagemin";
import macrosPlugin from 'vite-plugin-babel-macros';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 85,
      },
      webp: {
        quality: 75,
      },
    }),
    macrosPlugin(),
  ],
  resolve: {
    alias: {
      "@components": "/src/components/",
      '@assets': '/src/assets/',
      "@": path.resolve(__dirname, "./src")
    },
  },
  esbuild: {
    loader: 'tsx',
    include: /\.(ts|tsx|jsx)?$/,
    exclude: /node_modules/,
  },
  optimizeDeps: {
    include: ["@hassanmojab/react-modern-calendar-datepicker"],
    esbuildOptions: {
      sourcemap: true,
      minify: true,
      target: "es2020",
      format: "esm",
      loader: {
        '.js': 'jsx',
        '.ts': 'tsx'
      },
    }
  },
  build: {
    minify: "esbuild",
  },
  server: {
    proxy: {
      "/tenant": {
        target: "https://backend.etijah.sa",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tenant/, ""),
      },
    },
  }
});
