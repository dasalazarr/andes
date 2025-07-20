import { useRef, useEffect, RefObject, MutableRefObject } from 'react';

export function useCombinedRefs<T>(...refs: (RefObject<T> | MutableRefObject<T> | ((instance: T) => void) | null)[]): RefObject<T> {
  const targetRef = useRef<T>(null);

  useEffect(() => {
    refs.forEach(ref => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current as T);
      } else {
        (ref as MutableRefObject<T>).current = targetRef.current as T;
      }
    });
  }, [refs]);

  return targetRef;
}