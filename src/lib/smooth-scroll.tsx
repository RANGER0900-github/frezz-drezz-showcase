import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    // Proven ultra-responsive lerp config from commit 11e8c39 (zero lag, silky 60-120fps)
    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      syncTouch: false,
    });

    // Store globally for custom programmatic scroll triggers
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Keep Lenis geometry synchronized with window resizing
    const handleResize = () => lenis.resize();
    window.addEventListener("resize", handleResize);

    // Intercept internal hash links for silky smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        if (href === "#" || href === "#top") {
          lenis.scrollTo(0);
        } else {
          const el = document.querySelector(href);
          if (el) {
            lenis.scrollTo(el as HTMLElement, { offset: -70 });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Immediate resize to ensure exact viewport dimensions
    requestAnimationFrame(() => lenis.resize());

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return null;
}
