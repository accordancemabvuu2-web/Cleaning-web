import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  /** Fraction of the element that must be visible. */
  threshold?: number;
  rootMargin?: string;
  /** When false the element toggles back out of view. */
  once?: boolean;
}

/**
 * Small IntersectionObserver wrapper used for scroll reveals.
 * Falls back to "visible" where the API is unavailable or during SSR.
 */
export function useInView<T extends HTMLElement>({
  threshold = 0.15,
  rootMargin = '0px 0px -8% 0px',
  once = true,
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
