"use client";

import * as React from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

export function SmoothScroll() {
  const lenisRef = React.useRef<Lenis | null>(null);
  const pathname = usePathname();
  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
    });
    lenisRef.current = lenis;

    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // New route's content height can differ from the previous page's —
    // Lenis caches the scrollable content height, so without recomputing
    // it here, scroll gets capped at the old (often shorter) page's height
    // until something else happens to trigger a resize.
    lenisRef.current?.resize();
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
