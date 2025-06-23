import path from "path";
import { defineConfig, type Connect } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tempo } from "tempo-devtools/dist/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on the mode
  const env = process.env;

  const lang = env.VITE_APP_LANG || 'en';
  const isDev = mode === 'development';

  return {
  base: isDev ? '/' : (lang === 'es' ? '/es/' : '/'),
  optimizeDeps: {
    entries: ["src/main.tsx", "src/tempobook/**/*"],
  },
  plugins: [
    react(),
    tempo(),
  ],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // @ts-ignore
    allowedHosts: true,
    configure: (app: Connect.Server) => {
      app.use((req, res, next) => {
        if (req.originalUrl?.endsWith('.mp4')) {
          res.setHeader('Content-Type', 'video/mp4');
        }
        if (req.originalUrl?.endsWith('.webm')) {
          res.setHeader('Content-Type', 'video/webm');
        }
        next();
      });
    },
  },
  build: {
    outDir: lang === 'es' ? 'dist/es' : 'dist',
    emptyOutDir: true, // Clean the output directory before building
  }
  };
});
