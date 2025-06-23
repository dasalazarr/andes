import { MutableRefObject, Ref, useCallback } from 'react';

/**
 * Combines multiple refs into a single callback ref.
 * This is useful when a component needs to both forward a ref and use a local ref.
 */
export function useCombinedRefs<T>(...refs: (Ref<T> | undefined)[]): Ref<T> {
  return useCallback(
    (element: T) => {
      refs.forEach(ref => {
        if (!ref) return;

        if (typeof ref === 'function') {
          ref(element);
        } else {
          (ref as MutableRefObject<T | null>).current = element;
        }
      });
    },
    [refs]
  );
}
