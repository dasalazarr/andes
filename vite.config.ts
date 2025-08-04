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
    emptyOutDir: true,
    sourcemap: false, // Disable sourcemaps in production for smaller bundles
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('react-router')) {
              return 'router-vendor';
            }
            if (id.includes('framer-motion') || id.includes('gsap')) {
              return 'animation-vendor';
            }
            if (id.includes('@radix-ui') || id.includes('@headlessui')) {
              return 'ui-vendor';
            }
            if (id.includes('react-hook-form') || id.includes('@hookform')) {
              return 'form-vendor';
            }
            if (id.includes('lucide-react') || id.includes('clsx') || id.includes('tailwind-merge')) {
              return 'utils-vendor';
            }
            // All other vendor dependencies
            return 'vendor';
          }

          // Split large content files
          if (id.includes('/data/content')) {
            return 'content-data';
          }

          // Split components by section
          if (id.includes('/components/') && !id.includes('/ui/')) {
            if (id.includes('Hero') || id.includes('Benefits') || id.includes('Pricing')) {
              return 'critical-components';
            }
            if (id.includes('Modal') || id.includes('Form')) {
              return 'modal-components';
            }
            return 'secondary-components';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  }
  };
});
