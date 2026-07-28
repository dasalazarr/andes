import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Canary de invariantes freemium.
 *
 * La fuente de verdad de estos números vive en el backend:
 *   v3/v3/docs/12-freemium-premium-model.md (bloque JSON canónico).
 * Aquí solo fijamos que el copy de la landing (content.tsx) NO cambie estos números
 * en silencio: si alguien edita el trial, el cap o el precio, este test falla y obliga
 * a sincronizar docs/12 (y el backend) en el mismo cambio. Guarda barata, sin acoplar repos.
 */
const here = dirname(fileURLToPath(import.meta.url));
const content = readFileSync(resolve(here, '../../src/data/content.tsx'), 'utf8');

const INVARIANTS: Array<{ label: string; needles: string[] }> = [
  { label: 'trial 15 días', needles: ['15 días', '15 days'] },
  { label: 'cap 30 mensajes inteligentes', needles: ['30 mensajes', '30 smart messages'] },
  { label: 'precio Premium €9,99', needles: ['€9,99', '€9.99'] },
];

describe('freemium invariants presentes en el copy (source of truth: v3 docs/12)', () => {
  for (const { label, needles } of INVARIANTS) {
    it(`${label} sigue en content.tsx (ES + EN)`, () => {
      for (const needle of needles) {
        expect(content, `falta "${needle}" — ¿cambió un invariante freemium sin sincronizar docs/12?`).toContain(needle);
      }
    });
  }
});
