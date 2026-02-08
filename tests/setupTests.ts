import '@testing-library/jest-dom';
import { afterEach, beforeAll, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Configure Jest DOM matchers for Vitest
beforeAll(() => {
  // Ensure Jest DOM matchers are available globally
  expect.extend(require('@testing-library/jest-dom/matchers'));

  if (!window.matchMedia) {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  }

  if (!(globalThis as any).IntersectionObserver) {
    class MockIntersectionObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    }

    (globalThis as any).IntersectionObserver = MockIntersectionObserver;
  }
});

// Clean up DOM after each test
afterEach(() => {
  cleanup();
});
