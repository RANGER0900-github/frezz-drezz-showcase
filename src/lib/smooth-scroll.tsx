import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09,           // Silky interpolation — low = buttery, floaty glide
      smoothWheel: true,     // Smooth mouse-wheel scrolling
      wheelMultiplier: 0.8,  // Dampen scroll-wheel velocity for a calmer feel
      touchMultiplier: 1.8,  // Keep touch/swipe responsive on mobile
    });

    let raf: number;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
