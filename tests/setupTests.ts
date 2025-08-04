import '@testing-library/jest-dom';
import { afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';

// Configure Jest DOM matchers for Vitest
beforeAll(() => {
  // Ensure Jest DOM matchers are available globally
  expect.extend(require('@testing-library/jest-dom/matchers'));
});

// Clean up DOM after each test
afterEach(() => {
  cleanup();
});
