import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Limpia el DOM después de cada prueba
afterEach(() => {
  cleanup();
});
