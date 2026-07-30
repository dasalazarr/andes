import { defineConfig, configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setupTests.ts'],
    css: true,
    // Ignore git worktrees created under .claude/ — their duplicated test files
    // (and separate node_modules) otherwise pollute the suite with false failures.
    exclude: [...configDefaults.exclude, '**/.claude/**'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },

  },
});
