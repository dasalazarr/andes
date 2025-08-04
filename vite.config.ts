import path from "path";
import { defineConfig, type Connect } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on the mode
  const env = process.env;

  const lang = env.VITE_APP_LANG || 'en';
  const isDev = mode === 'development';

  return {
  base: isDev ? '/' : (lang === 'es' ? '/es/' : '/'),
  optimizeDeps: {
    entries: ["src/main.tsx"],
    exclude: ["tempo-devtools", "tempo-routes"]
  },
  plugins: [
    react(),
    // tempo() disabled for production
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
    emptyOutDir: lang === 'es' ? false : true, // Don't empty when building ES version
    sourcemap: false, // Disable sourcemaps in production for smaller bundles
    minify: 'terser',
    assetsDir: 'assets',
    cssCodeSplit: true,
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Simplified vendor chunks to avoid React hook issues
          'react-vendor': ['react', 'react-dom'],
          'vendor': ['framer-motion', 'gsap', 'lucide-react', 'clsx', 'tailwind-merge'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  }
  };
});
