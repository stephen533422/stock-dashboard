import { useCallback, useRef, useState } from "react";

interface Options {
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

export function useIntersectionObserver<T extends Element>({
  rootMargin = "0px",
  threshold = 0,
  once = true,
}: Options = {}): [(node: T | null) => void, boolean] {
  const [inView, setInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const frozen = useRef(false);

  const ref = useCallback(
    (node: T | null) => {
      observerRef.current?.disconnect();
      if (!node) {
        setInView(false);
        return;
      }
      if (frozen.current) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          setInView(entry.isIntersecting);
          if (entry.isIntersecting && once) {
            frozen.current = true;
            observer.disconnect();
          }
        },
        { rootMargin, threshold },
      );
      observer.observe(node);
      observerRef.current = observer;
    },
    [rootMargin, threshold, once],
  );

  return [ref, inView];
}
