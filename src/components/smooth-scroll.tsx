"use client";

import * as React from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  React.useEffect(() => {
    const lenis = new Lenis({
      duration: 2,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 0.7,
      touchMultiplier: 1.5,
    });

    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return null;
}
