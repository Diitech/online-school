import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref and a boolean `isVisible`.
 * The element must set `ref` and the image will only load once
 * the element enters (or is close to entering) the viewport.
 *
 * Uses IntersectionObserver with a generous rootMargin so images
 * start loading before the user scrolls to them.
 */
export function useLazyImage(rootMargin = "200px") {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(
    () => typeof IntersectionObserver === "undefined"
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, isVisible]);

  return { ref, isVisible };
}
