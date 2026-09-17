import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    // Ultra-smooth, responsive delta-damped physics (Industry gold standard for smooth scrolling)
    const lenis = new Lenis({
      lerp: 0.1,             // Instant response on wheel tick with silky smooth decay
      smoothWheel: true,     // Butter-smooth mouse wheel interpolation
      syncTouch: false,      // Preserve 100% native 120Hz hardware momentum on touchpads & mobile
      wheelMultiplier: 1.0,  // Natural 1:1 scroll distance
      autoRaf: true,         // Built-in high-precision internal RAF loop
    });

    // Store globally for programmatic scroll triggers
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // Synchronize geometry with window resizing
    const handleResize = () => lenis.resize();
    window.addEventListener("resize", handleResize);

    // Intercept internal hash links for buttery smooth animated jumps
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        if (href === "#" || href === "#top") {
          lenis.scrollTo(0, { lerp: 0.08 });
        } else {
          const el = document.querySelector(href);
          if (el) {
            lenis.scrollTo(el as HTMLElement, { offset: -70, lerp: 0.08 });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Initial resize to ensure geometry is perfectly aligned with viewport
    requestAnimationFrame(() => lenis.resize());

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return null;
}
