import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Copy,
  Check,
  Menu,
  X,
  Sparkles,
  ShoppingBag,
  Phone,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  Leaf,
  Layers,
  MessageCircle,
  ExternalLink,
  ZoomIn,
  MapPin,
  Search,
  Truck,
  Heart,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { toast } from "sonner";
import { SmoothScroll } from "@/lib/smooth-scroll";
import { SURAT_LOCALITIES, FREZZ_DREZZ_FAQS } from "@/lib/seo-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Frezz Drezz | 100% Real Freeze-Dried Fruit & Ice Cream Alternative (Surat, Gujarat)",
      },
      {
        name: "description",
        content:
          "Surat's guilt-free 100% real fruit crunch alternative to ice cream. Zero added sugar, zero preservatives, 100% Jain & vegan compliant. Same-day delivery across Adajan, Vesu, City Light, Piplod & all 34 Surat localities.",
      },
      { property: "og:image", content: "https://frezzdrezz.com/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: "https://frezzdrezz.com/og-image.png" },
    ],
    links: [
      { rel: "preload", as: "image", href: "/assets/logo-384.png", type: "image/png" },
      { rel: "preload", as: "video", href: "/assets/hero-loop-720p.mp4", type: "video/mp4" },
      { rel: "preload", as: "image", href: "/assets/pineapple.webp", type: "image/webp" },
      { rel: "preload", as: "image", href: "/assets/banana.webp", type: "image/webp" },
    ],
  }),
  component: Home,
});

/* -------------------------------------------------------------------------- */
/*                                PRODUCT DATA                                */
/* -------------------------------------------------------------------------- */

export interface ProductItem {
  id: string;
  name: string;
  tag: string;
  category: "tropical" | "berries-orchard";
  img: string;
  tint: string;
  accent: string;
  accentBg: string;
  flavorNote: string;
  sweetness: string;
  crispness: string;
  nutrients: string[];
  netWeight: string;
  ingredients: string;
}

const products: ProductItem[] = [
  {
    id: "pineapple",
    name: "Pineapple",
    tag: "Tropical Sunlit",
    category: "tropical",
    img: "/assets/pineapple.webp",
    tint: "oklch(0.88 0.13 92)",
    accent: "#C99A2E",
    accentBg: "rgba(201, 154, 46, 0.15)",
    flavorNote: "Vibrant, zesty tropical burst with sweet golden sunshine finish.",
    sweetness: "Naturally Sweet & Tangy",
    crispness: "10 / 10 Pure Crunch",
    nutrients: ["High in Vitamin C", "Rich in Bromelain", "Digestive Enzymes", "Zero Added Sugar"],
    netWeight: "35g (from ~350g fresh fruit)",
    ingredients: "100% Pure Fresh Pineapple. Nothing else.",
  },
  {
    id: "banana",
    name: "Banana",
    tag: "Golden Cream",
    category: "tropical",
    img: "/assets/banana.webp",
    tint: "oklch(0.92 0.10 95)",
    accent: "#B8933A",
    accentBg: "rgba(184, 147, 58, 0.15)",
    flavorNote: "Smooth golden sweetness with an airy, satisfying melt-in-mouth crunch.",
    sweetness: "Rich Natural Honeyed",
    crispness: "9.5 / 10 Light Crunch",
    nutrients: ["Rich in Potassium", "Prebiotic Fiber", "Natural Electrolytes", "Sustained Energy"],
    netWeight: "40g (from ~400g fresh bananas)",
    ingredients: "100% Pure Ripe Bananas. Nothing else.",
  },
  {
    id: "strawberry",
    name: "Strawberry",
    tag: "Wild Berry",
    category: "berries-orchard",
    img: "/assets/strawberry.webp",
    tint: "oklch(0.85 0.10 15)",
    accent: "#C4436E",
    accentBg: "rgba(196, 67, 110, 0.15)",
    flavorNote: "Intense ruby brightness with a balanced sweet-tart berry rush.",
    sweetness: "Bright Berry Sweet-Tart",
    crispness: "10 / 10 Airy Crunch",
    nutrients: ["Packed with Vitamin C", "High Antioxidants", "Polyphenols", "Low Calorie"],
    netWeight: "30g (from ~300g fresh strawberries)",
    ingredients: "100% Pure Handpicked Strawberries. Nothing else.",
  },
  {
    id: "kiwi",
    name: "Kiwi",
    tag: "Fresh Verdant",
    category: "berries-orchard",
    img: "/assets/kiwi.webp",
    tint: "oklch(0.86 0.09 130)",
    accent: "#7A8F3E",
    accentBg: "rgba(122, 143, 62, 0.15)",
    flavorNote: "Exhilarating emerald tanginess with a delightful pop of edible seeds.",
    sweetness: "Zesty & Refreshing",
    crispness: "9.8 / 10 Seed-Popping Crunch",
    nutrients: [
      "High in Vitamin E & C",
      "Immunity Booster",
      "Dietary Fiber",
      "Cellular Protection",
    ],
    netWeight: "30g (from ~300g fresh kiwi)",
    ingredients: "100% Pure Sliced Green Kiwi. Nothing else.",
  },
  {
    id: "apple",
    name: "Apple",
    tag: "Orchard Ruby",
    category: "berries-orchard",
    img: "/assets/apple.webp",
    tint: "oklch(0.80 0.14 25)",
    accent: "#B0362C",
    accentBg: "rgba(176, 54, 44, 0.15)",
    flavorNote: "Classic orchard crunch with delicate floral sweetness and crisp bite.",
    sweetness: "Crisp Orchard Sweet",
    crispness: "10 / 10 Firm Crunch",
    nutrients: ["Rich in Apple Pectin", "Fiber Rich", "Heart Healthy", "Zero Preservatives"],
    netWeight: "35g (from ~350g fresh apples)",
    ingredients: "100% Pure Orchard Apples. Nothing else.",
  },
];

const foundersData = [
  { name: "Rudrax", tel: "+916355255862", display: "+91 63552 55862", raw: "916355255862" },
  { name: "Aditya", tel: "+919376136009", display: "+91 93761 36009", raw: "919376136009" },
];

/* -------------------------------------------------------------------------- */
/*                    LIGHTNING-FAST ULTRA-LUXURY PRELOADER                   */
/* -------------------------------------------------------------------------- */

const craftPhases = [
  { threshold: 0, text: "Selecting peak-harvest orchard fruit..." },
  { threshold: 22, text: "Flash freezing whole at −40°C..." },
  { threshold: 48, text: "Sublimating moisture under deep vacuum..." },
  { threshold: 72, text: "Locking 100% natural crunch & 97% nutrients..." },
  { threshold: 92, text: "Pure craft ready to experience." },
];

function LuxuryPreloader({ onFinish }: { onFinish: () => void }) {
  const barRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const phaseRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let cancelled = false;
    const startTime = performance.now();
    const duration = 850; // Snappy, responsive 850ms load

    // 1. Parallel lightweight asset warm-up (only essential small webp icons)
    const criticalAssets = [
      "/assets/logo-384.png",
      "/assets/logo-128.png",
      "/assets/pineapple.webp",
      "/assets/banana.webp",
    ];

    criticalAssets.forEach((src) => {
      const img = new Image();
      img.src = src;
      if (img.decode) img.decode().catch(() => {});
    });

    let lastPhaseIdx = 0;

    // 2. High-performance direct DOM 60fps animation (Zero React state re-render overhead)
    const animate = (now: number) => {
      if (cancelled) return;
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);

      // Fast-accelerating smooth easeOutQuart curve
      const eased = 1 - Math.pow(1 - t, 4);
      const currentVal = Math.min(100, Math.round(eased * 100));

      if (barRef.current) {
        barRef.current.style.width = `${Math.max(4, currentVal)}%`;
      }
      if (pctRef.current) {
        pctRef.current.textContent = `${currentVal}%`;
      }

      // Update text only at milestone thresholds
      for (let i = craftPhases.length - 1; i >= 0; i--) {
        if (currentVal >= craftPhases[i].threshold) {
          if (lastPhaseIdx !== i) {
            lastPhaseIdx = i;
            if (phaseRef.current) {
              phaseRef.current.textContent = craftPhases[i].text;
            }
          }
          break;
        }
      }

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          if (!cancelled) onFinish();
        }, 100);
      }
    };

    const animId = requestAnimationFrame(animate);

    return () => {
      cancelled = true;
      cancelAnimationFrame(animId);
    };
  }, [onFinish]);

  return (
    <motion.div
      key="preloader"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.02,
        filter: "blur(4px)",
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-cream px-6 select-none overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 size-96 rounded-full bg-gold/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 size-96 rounded-full bg-butter/40 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-md w-full">
        {/* Animated Brand Emblem - Official Logo */}
        <div className="relative mb-6">
          <div className="relative size-24 sm:size-28 rounded-full border-2 border-gold/60 p-1 bg-cream shadow-2xl shadow-gold/30 flex items-center justify-center overflow-hidden">
            <img
              src="/assets/logo-384.png"
              srcSet="/assets/logo-128.png 1x, /assets/logo-384.png 2x"
              alt="Frezz Drezz Official Logo"
              width={112}
              height={112}
              loading="eager"
              decoding="sync"
              className="w-full h-full rounded-full object-cover shadow-sm"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (!target.dataset.fallback) {
                  target.dataset.fallback = "1";
                  target.src = "/logo.png";
                }
              }}
            />
            {/* Ambient pulse ring */}
            <div className="absolute -inset-2 rounded-full border border-gold/40 animate-ping opacity-25 pointer-events-none" />
          </div>
        </div>

        {/* Established badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-butter/90 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-deep border border-gold/40 mb-3 shadow-xs">
          <Sparkles className="size-3" />
          <span>Pure Fruit Craft</span>
        </div>

        {/* Brand Typography */}
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-ink text-center">
          Frezz<span className="text-gold-deep italic font-serif ml-1">Drezz</span>
        </h1>

        {/* Tagline */}
        <p className="mt-2 text-xs uppercase tracking-[0.25em] text-ink/65 font-medium text-center font-sans">
          Pure by Nature · Crisp by Craft
        </p>

        {/* High-End Progressive Loading Container */}
        <div className="mt-8 w-full max-w-[280px] flex flex-col items-center gap-3">
          <div className="w-full h-2.5 bg-ink/10 rounded-full overflow-hidden p-0.5 relative shadow-inner border border-gold/20">
            {/* Animated Gradient Bar with Leading Flare and Shimmer */}
            <div
              ref={barRef}
              id="preloader-bar"
              className="h-full rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-deep relative transition-all duration-75 ease-out overflow-hidden shadow-sm"
              style={{ width: "4%" }}
            >
              {/* Shimmer light sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent preloader-shine pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center justify-between w-full text-[11px] font-mono text-ink/65 font-medium">
            <span className="tracking-wider flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-gold-deep animate-ping" />
              CRUNCH ENGINE
            </span>
            <span
              ref={pctRef}
              id="preloader-pct"
              className="font-semibold text-gold-deep font-mono text-xs"
            >
              0%
            </span>
          </div>

          {/* Dynamic Craft Phase Message with Smooth Crossfade */}
          <div className="h-6 flex items-center justify-center">
            <p
              ref={phaseRef}
              id="preloader-craft-phase"
              className="text-xs font-serif italic text-ink/80 text-center transition-all duration-200"
            >
              Selecting peak-harvest orchard fruit...
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                            NAVIGATION & HEADER                             */
/* -------------------------------------------------------------------------- */

function Nav({ onOpenQuickOrder }: { onOpenQuickOrder: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Flavors", href: "#products" },
    { label: "Ice Cream Alternative", href: "#healthy-alternative" },
    { label: "Our Craft", href: "#story" },
    { label: "Surat Delivery", href: "#surat-delivery" },
    { label: "FAQ", href: "#faq" },
    { label: "Founders", href: "#founders" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3 bg-cream/85 backdrop-blur-md border-b border-gold/20 shadow-sm" : "py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#top"
            className="group flex items-center gap-2.5 font-display text-2xl font-semibold text-ink tracking-tight hover:opacity-90 transition"
          >
            <img
              src="/assets/logo-128.png"
              srcSet="/assets/logo-384.png 2x"
              alt="Frezz Drezz Official Logo"
              width={36}
              height={36}
              loading="eager"
              decoding="sync"
              className="size-9 rounded-full object-cover shadow-sm ring-1 ring-gold/40 group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (!target.dataset.fallback) {
                  target.dataset.fallback = "1";
                  target.src = "/logo.png";
                }
              }}
            />
            <span>
              Frezz<span className="text-gold-deep italic font-serif">Drezz</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 rounded-full bg-cream/60 border border-ink/10 px-4 py-1.5 backdrop-blur shadow-sm">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-1.5 text-sm font-medium text-ink/75 hover:text-ink hover:bg-butter/60 rounded-full transition duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenQuickOrder}
              className="btn-primary text-sm !py-2 !px-5 shadow-sm"
            >
              <ShoppingBag className="size-4" />
              Order Now
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="size-10 rounded-full border border-ink/15 bg-cream/90 flex items-center justify-center text-ink shadow-sm active:scale-95 transition"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[68px] z-40 bg-cream/95 backdrop-blur-xl border-b border-ink/10 px-6 py-8 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {/* Mobile Drawer Header with Official Logo */}
              <div className="flex items-center gap-3 pb-3 border-b border-ink/10">
                <img
                  src="/assets/logo-128.png"
                  alt="Frezz Drezz Logo"
                  width={40}
                  height={40}
                  loading="eager"
                  className="size-10 rounded-full object-cover shadow-xs ring-1 ring-gold/40"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (!target.dataset.fallback) {
                      target.dataset.fallback = "1";
                      target.src = "/logo.png";
                    }
                  }}
                />
                <div>
                  <div className="font-display text-lg font-semibold text-ink leading-none">
                    Frezz<span className="text-gold-deep italic font-serif">Drezz</span>
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-ink/60 font-sans mt-0.5">
                    Pure Fruit Craft
                  </div>
                </div>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-2 text-lg font-serif font-medium text-ink border-b border-ink/5 hover:text-gold-deep transition"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="size-4 text-ink/40" />
                </a>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenQuickOrder();
                  }}
                  className="btn-primary w-full justify-center"
                >
                  <ShoppingBag className="size-4" />
                  Configure Order
                </button>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <a
                    href="https://wa.me/916355255862"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-ink/15 bg-butter/40 py-3 text-xs font-semibold text-ink"
                  >
                    <MessageCircle className="size-3.5 text-gold-deep" />
                    WhatsApp
                  </a>
                  <a
                    href="https://www.instagram.com/frezzdrezz"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-ink/15 bg-butter/40 py-3 text-xs font-semibold text-ink"
                  >
                    <ExternalLink className="size-3.5 text-berry" />
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                     BUTTERY SMOOTH HERO VIDEO SECTION                      */
/* -------------------------------------------------------------------------- */

function Hero({
  onOpenQuickOrder,
  overlayOpacity = 35,
}: {
  onOpenQuickOrder: () => void;
  overlayOpacity?: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoVisible, setVideoVisible] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const startPlayback = () => {
      setVideoVisible(true);
      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay fallback (mute guaranteed)
          v.muted = true;
          v.play().catch(() => {});
        });
      }
    };

    if (v.readyState >= 2) {
      startPlayback();
    } else {
      v.addEventListener("loadeddata", startPlayback, { once: true });
      v.addEventListener("canplay", startPlayback, { once: true });
      v.addEventListener("playing", () => setVideoVisible(true));
    }

    // Direct immediate trigger
    startPlayback();

    const fallbackTimeout = setTimeout(() => setVideoVisible(true), 600);

    // Pause video when scrolled out of viewport to free GPU/CPU decoding cycles
    let observer: IntersectionObserver | null = null;
    if (sectionRef.current && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(sectionRef.current);
    }

    return () => {
      clearTimeout(fallbackTimeout);
      if (observer) observer.disconnect();
      v.removeEventListener("loadeddata", startPlayback);
      v.removeEventListener("canplay", startPlayback);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-[92vh] md:min-h-screen overflow-hidden flex items-center bg-cream"
    >
      {/* Optimized faststart looping video layer */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: videoVisible ? 1 : 0 }}
        >
          <source src="/assets/hero-loop-720p.mp4" type="video/mp4" />
        </video>

        {/* Dynamic tunable overlays */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-cream/20 via-cream/50 to-cream pointer-events-none transition-opacity duration-200"
          style={{ opacity: overlayOpacity / 50 }}
        />
        <div
          className="absolute inset-0 bg-radial from-transparent via-cream/35 to-cream pointer-events-none transition-opacity duration-200"
          style={{ opacity: overlayOpacity / 50 }}
        />
      </div>

      {/* Hero content - synchronized immediate entrance without 2.2s blank gap */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 md:pt-40 pb-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          {/* Real fruit artisanal badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-butter/90 backdrop-blur px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-gold-deep border border-gold/40 shadow-sm"
          >
            <span className="size-2 rounded-full bg-gold-deep animate-pulse" />
            <span>100% Real Fruit · 0g Added Sugar · Jain &amp; Vegan</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-6 text-6xl sm:text-7xl md:text-8xl leading-[0.92] text-ink"
          >
            Pure by nature.
            <br />
            <span className="text-gold-deep italic font-serif font-normal">Crisp</span> by craft.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-6 text-lg md:text-xl text-ink/75 max-w-xl font-serif leading-relaxed"
          >
            The 100% natural, guilt-free fruit crunch alternative to ice cream. Zero preservatives, zero
            added sugar, and zero dairy bloat. Handcrafted in Surat, delivered fresh across Gujarat.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-8 flex flex-wrap gap-4 items-center"
          >
            <a href="#products" className="btn-primary min-h-[44px]">
              <span>Explore 5 Flavors</span>
              <ArrowRight className="size-4" />
            </a>
            <button onClick={onOpenQuickOrder} className="btn-ghost min-h-[44px]">
              <ShoppingBag className="size-4" />
              <span>Quick Order</span>
            </button>
          </motion.div>

          {/* Surat Local Delivery Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8 flex flex-wrap items-center gap-2.5 text-xs text-ink/75 font-medium"
          >
            <a
              href="#surat-delivery"
              className="inline-flex items-center gap-1.5 bg-butter/60 hover:bg-butter border border-gold/40 px-3.5 py-1.5 rounded-full transition-colors"
            >
              <Truck className="size-3.5 text-gold-deep" />
              <span>Doorstep Delivery in Surat (Vesu, Adajan, Pal, Varachha &amp; 30+ Areas)</span>
            </a>
            <a
              href="#healthy-alternative"
              className="inline-flex items-center gap-1.5 bg-butter/60 hover:bg-butter border border-gold/40 px-3.5 py-1.5 rounded-full transition-colors"
            >
              <Heart className="size-3.5 text-berry" />
              <span>#1 Healthy Ice Cream Alternative</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      <ScrollHint />
    </section>
  );
}

function ScrollHint() {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[10px] uppercase tracking-widest text-ink/60 pointer-events-none">
      <span>Discover</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="h-7 w-px bg-ink/30"
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               MARQUEE STRIP                                */
/* -------------------------------------------------------------------------- */

function Marquee() {
  const items = [
    "100% Real Fruit",
    "Freeze Dried at −40°C",
    "No Added Sugar",
    "97% Nutrients Retained",
    "Zero Preservatives",
    "Pure Crunch Craft",
  ];
  const doubled = [...items, ...items, ...items];
  return (
    <div className="relative py-8 border-y border-ink/10 bg-butter/40 overflow-hidden shadow-inner">
      <div className="marquee">
        {doubled.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-8 font-display text-2xl md:text-4xl text-ink/80 whitespace-nowrap"
          >
            {t}
            <span className="inline-block size-2 rounded-full bg-gold-deep" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              PRODUCTS SECTION                              */
/* -------------------------------------------------------------------------- */

function Products({ onSelectProduct }: { onSelectProduct: (p: ProductItem) => void }) {
  const [filter, setFilter] = useState<"all" | "tropical" | "berries-orchard">("all");

  const filteredProducts = useMemo(() => {
    if (filter === "all") return products;
    return products.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section id="products" className="relative py-28 md:py-36 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold-deep font-semibold">
              The Artisan Collection
            </span>
            <h2 className="mt-3 text-5xl md:text-7xl text-ink leading-none">
              Five pure flavors.
              <br />
              <span className="font-serif italic font-normal text-gold-deep">Infinite</span> crunch.
            </h2>
          </div>
          <p className="max-w-md font-serif text-lg text-ink/70">
            Each pouch is a single fruit at peak maturity, gently sublimated to preserve vibrant
            aroma, cellular nutrition, and an irresistible airy crisp.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { id: "all", label: "All Flavors (5)" },
            { id: "tropical", label: "Tropical Sun (2)" },
            { id: "berries-orchard", label: "Berries & Orchard (3)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as typeof filter)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                filter === tab.id
                  ? "bg-ink text-cream shadow-md"
                  : "bg-butter/50 text-ink/70 border border-ink/10 hover:bg-butter hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredProducts.map((p, i) => (
              <ProductCard key={p.id} p={p} index={i} onQuickView={() => onSelectProduct(p)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({
  p,
  index,
  onQuickView,
}: {
  p: ProductItem;
  index: number;
  onQuickView: () => void;
}) {
  const waMessage = encodeURIComponent(
    `Hello Frezz Drezz! I would like to order *${p.name}* (${p.tag}) 🍃\n\nQuantity = 2 pouches\nName = \nDelivery Address = \n`,
  );
  const waLink = `https://wa.me/916355255862?text=${waMessage}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-ink/10 bg-cream flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-500"
      style={{ background: `linear-gradient(180deg, ${p.tint} 0%, var(--cream) 70%)` }}
    >
      {/* Decorative SVG curves */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <path d="M0,120 Q100,60 200,120 T400,120 L400,0 L0,0 Z" fill={p.accent} opacity="0.2" />
          <path
            d="M0,300 Q100,240 200,300 T400,300 L400,400 L0,400 Z"
            fill={p.accent}
            opacity="0.12"
          />
        </svg>
      </div>

      {/* Top details & badges */}
      <div className="relative p-6 pb-2 flex items-start justify-between z-10">
        <div>
          <span
            className="text-[10px] uppercase tracking-[0.25em] font-semibold px-2.5 py-1 rounded-full border"
            style={{
              color: p.accent,
              backgroundColor: p.accentBg,
              borderColor: `${p.accent}40`,
            }}
          >
            {p.tag}
          </span>
          <h3 className="mt-2 text-3xl text-ink font-display">{p.name}</h3>
        </div>
        <div className="text-right">
          <span className="text-[11px] font-mono text-ink/60 bg-cream/80 px-2 py-0.5 rounded-md border border-ink/10">
            {p.crispness}
          </span>
        </div>
      </div>

      {/* Luxury Framed Image Container - Fills beautifully without awkward white margins */}
      <div
        className="relative aspect-[4/5] overflow-hidden cursor-pointer mx-3.5 mt-2 rounded-2xl border border-ink/10 shadow-md bg-butter/20 group-hover:shadow-xl transition-all duration-500"
        onClick={onQuickView}
      >
        <img
          src={p.img}
          alt={`Frezz Drezz ${p.name} freeze-dried fruit pouch`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Bottom info & actions */}
      <div className="relative p-6 pt-4 z-10 flex flex-col gap-3">
        <p className="text-xs text-ink/75 font-serif line-clamp-2 leading-relaxed">
          {p.flavorNote}
        </p>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={onQuickView}
            className="group/btn relative overflow-hidden flex-1 rounded-full border border-ink/20 bg-cream/90 py-2.5 px-3 text-xs font-semibold text-ink transition-all duration-300 hover:border-gold-deep hover:bg-gold/15 hover:text-ink hover:shadow-md hover:shadow-gold-deep/10 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {/* Shimmer sweep effect */}
            <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-gold/30 to-transparent pointer-events-none" />
            <Sparkles className="size-3.5 text-gold-deep transition-transform duration-300 group-hover/btn:scale-125 group-hover/btn:rotate-12" />
            <span className="relative z-10 transition-colors duration-300">Taste &amp; Info</span>
          </button>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-ink text-cream py-2.5 text-xs font-semibold transition-all duration-300 hover:bg-gold-deep hover:shadow-lg hover:shadow-gold-deep/20 active:scale-98 shadow-sm cursor-pointer"
          >
            <MessageCircle className="size-3.5" />
            Buy Now
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                     PRODUCT QUICK-VIEW / ORDER MODAL                       */
/* -------------------------------------------------------------------------- */

function ProductQuickViewModal({
  product,
  onClose,
}: {
  product: ProductItem | null;
  onClose: () => void;
}) {
  const [quantity, setQuantity] = useState(2);
  const [customAddress, setCustomAddress] = useState("");
  const [zoomPos, setZoomPos] = useState<{ x: number; y: number; active: boolean }>({
    x: 50,
    y: 50,
    active: false,
  });

  useEffect(() => {
    setQuantity(2);
    setCustomAddress("");
    setZoomPos({ x: 50, y: 50, active: false });
  }, [product]);

  if (!product) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setZoomPos({ x, y, active: true });
  };

  const handleMouseLeave = () => {
    setZoomPos((prev) => ({ ...prev, active: false }));
  };

  const waText = encodeURIComponent(
    `Hello Frezz Drezz! I would like to order *${product.name}* freeze-dried fruit 🍃\n\n• Flavor: ${product.name} (${product.tag})\n• Quantity: ${quantity} pouch(es)\n• Address: ${customAddress || "[Please deliver to my address]"}\n\nPlease share payment details and dispatch time!`,
  );
  const waUrl = `https://wa.me/916355255862?text=${waText}`;

  const handleCopyMessage = () => {
    const rawMessage = `Hello Frezz Drezz! I would like to order *${product.name}* (${product.tag})\nQuantity: ${quantity} pouch(es)\nAddress: ${customAddress || "[My address]"}`;
    navigator.clipboard.writeText(rawMessage);
    toast.success("Order details copied to clipboard!");
  };

  return (
    <Dialog open={!!product} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl bg-cream border-gold/30 p-0 overflow-y-auto max-h-[85vh] rounded-3xl shadow-2xl">
        <div className="grid md:grid-cols-12 items-stretch">
          {/* Left Column: Focused Artwork Showcase with Interactive Zoom Lens (5 cols) */}
          <div
            className="md:col-span-5 relative p-5 md:p-6 flex flex-col justify-between items-center overflow-hidden bg-butter/30 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
            style={{
              background: `radial-gradient(circle at center, ${product.tint} 0%, var(--cream) 100%)`,
            }}
          >
            {/* Top Badges */}
            <div className="w-full flex items-center justify-between z-10">
              <span
                className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-0.5 rounded-full border shadow-xs"
                style={{
                  color: product.accent,
                  backgroundColor: product.accentBg,
                  borderColor: `${product.accent}40`,
                }}
              >
                {product.tag}
              </span>
              <span className="text-[11px] font-mono text-ink/75 bg-cream/90 px-2 py-0.5 rounded-md border border-ink/10 shadow-xs font-medium">
                {product.crispness}
              </span>
            </div>

            {/* Product Image with Amazon-Style Interactive Zoom Lens */}
            <div
              className="relative my-3 w-full aspect-[4/5] max-w-[220px] md:max-w-[240px] rounded-2xl overflow-hidden shadow-xl border border-ink/10 bg-cream/50 cursor-crosshair group select-none"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={product.img}
                alt={`Frezz Drezz ${product.name}`}
                className="w-full h-full object-cover pointer-events-none transition-transform duration-150 ease-out"
                style={{
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transform: zoomPos.active ? "scale(2.3)" : "scale(1)",
                }}
              />
              {/* Zoom hint badge */}
              <div
                className={`absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-ink/80 text-cream text-[10px] px-2 py-0.5 pointer-events-none transition-opacity duration-300 ${
                  zoomPos.active ? "opacity-0" : "opacity-90"
                }`}
              >
                <ZoomIn className="size-3 text-gold" />
                <span>Hover to zoom</span>
              </div>
            </div>

            {/* Bottom Ingredient Badge */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-ink/80 bg-cream/90 px-3 py-1 rounded-full border border-ink/10 shadow-xs z-10 text-center w-full max-w-[240px]">
              <ShieldCheck className="size-3.5 text-gold-deep shrink-0" />
              <span className="truncate">{product.ingredients}</span>
            </div>
          </div>

          {/* Right Column: Flavor Breakdown & WhatsApp Configurator (7 cols) */}
          <div className="md:col-span-7 p-5 md:p-6 flex flex-col justify-between bg-cream">
            <div>
              <DialogHeader className="text-left">
                <DialogTitle className="font-display text-2xl md:text-3xl text-ink">
                  {product.name}
                </DialogTitle>
                <DialogDescription className="font-serif text-ink/75 text-xs md:text-sm mt-1 leading-relaxed">
                  {product.flavorNote}
                </DialogDescription>
              </DialogHeader>

              {/* Untruncated, Clean Specs Breakdown */}
              <div className="mt-3 space-y-1.5 border-y border-ink/10 py-2.5 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] uppercase tracking-wider text-ink/60 font-semibold shrink-0">
                    Taste Profile
                  </span>
                  <span className="font-medium text-ink text-right">{product.sweetness}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] uppercase tracking-wider text-ink/60 font-semibold shrink-0">
                    Crunch Factor
                  </span>
                  <span className="font-semibold text-gold-deep text-right">
                    {product.crispness}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] uppercase tracking-wider text-ink/60 font-semibold shrink-0">
                    Net Weight
                  </span>
                  <span className="font-mono text-[11px] font-medium text-ink bg-butter/60 px-2 py-0.5 rounded-md border border-gold/30">
                    {product.netWeight}
                  </span>
                </div>
              </div>

              {/* Nutritional Highlights */}
              <div className="mt-2.5 flex flex-wrap gap-1">
                {product.nutrients.map((n) => (
                  <span
                    key={n}
                    className="text-[10px] bg-butter/60 px-2 py-0.5 rounded-full text-ink font-medium border border-gold/30"
                  >
                    {n}
                  </span>
                ))}
              </div>

              {/* Luxury Quantity Selector */}
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-ink/60 font-semibold">
                    Select Quantity:
                  </label>
                  <span className="text-xs font-serif font-medium text-gold-deep">
                    {quantity === 1
                      ? "Single Taster"
                      : quantity === 2
                        ? "Duo Pack (Popular)"
                        : quantity === 3
                          ? "Trio Pack"
                          : `${quantity} Pouches`}
                  </span>
                </div>

                {/* Interactive Stepper */}
                <div className="flex items-center gap-2 bg-butter/40 border border-ink/10 rounded-xl p-1 mb-2">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="size-8 rounded-lg bg-cream border border-ink/15 flex items-center justify-center text-ink font-bold hover:bg-gold hover:text-ink active:scale-95 transition cursor-pointer text-sm"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <div className="flex-1 text-center font-display text-base text-ink font-semibold">
                    {quantity}{" "}
                    <span className="text-xs font-sans text-ink/60 font-normal">
                      {quantity === 1 ? "Pouch" : "Pouches"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="size-8 rounded-lg bg-cream border border-ink/15 flex items-center justify-center text-ink font-bold hover:bg-gold hover:text-ink active:scale-95 transition cursor-pointer text-sm"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Quick Pack Presets */}
                <div className="grid grid-cols-4 gap-1">
                  {[
                    { q: 1, label: "1 Pouch" },
                    { q: 2, label: "2 Pack", badge: "★" },
                    { q: 3, label: "3 Pack" },
                    { q: 5, label: "5 Pack" },
                  ].map((preset) => (
                    <button
                      key={preset.q}
                      type="button"
                      onClick={() => setQuantity(preset.q)}
                      className={`py-1.5 px-1 rounded-lg text-[11px] font-semibold tracking-tight transition-all duration-200 text-center cursor-pointer ${
                        quantity === preset.q
                          ? "bg-ink text-cream shadow-xs"
                          : "bg-cream border border-ink/10 text-ink/75 hover:bg-butter hover:text-ink"
                      }`}
                    >
                      <span>{preset.label}</span>
                      {preset.badge && (
                        <span className="ml-0.5 text-gold text-[10px]">{preset.badge}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-3 border-t border-ink/10 flex flex-col gap-1.5">
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary w-full justify-center text-xs !py-2.5 shadow-md cursor-pointer"
              >
                <MessageCircle className="size-3.5" />
                Order {quantity} {quantity === 1 ? "Pouch" : "Pouches"} on WhatsApp
              </a>
              <button
                onClick={handleCopyMessage}
                className="flex items-center justify-center gap-1.5 py-1 text-[11px] font-medium text-ink/70 hover:text-ink transition cursor-pointer"
              >
                <Copy className="size-3" />
                Copy Order Text
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* -------------------------------------------------------------------------- */
/*                  ICE CREAM ALTERNATIVE COMPARISON (SEO & PRODUCT)          */
/* -------------------------------------------------------------------------- */

interface IceCreamAlternativeSectionProps {
  onOpenQuickOrder: () => void;
}

function IceCreamAlternativeSection({ onOpenQuickOrder }: IceCreamAlternativeSectionProps) {
  const whatsappUrl =
    "https://wa.me/919426868840?text=" +
    encodeURIComponent(
      "Hello Frezz Drezz! I would like to try your healthy zero-sugar fruit crunch alternative to traditional ice cream. Please share your flavor pouches and delivery options across Surat."
    );

  return (
    <section id="healthy-alternative" className="relative py-24 md:py-32 px-6 bg-cream overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 -left-32 size-96 rounded-full bg-gold/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 size-96 rounded-full bg-butter/40 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-butter/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep border border-gold/40 shadow-xs mb-4">
            <Heart className="size-3.5 text-berry" />
            <span>Guilt-Free Sweet Indulgence</span>
          </div>
          <h2 className="text-4xl md:text-6xl text-ink font-display tracking-tight leading-[1.05]">
            Why Surat is Swapping Ice Cream for{" "}
            <span className="italic font-serif font-normal text-gold-deep">Frezz Drezz</span>
          </h2>
          <p className="mt-6 font-serif text-lg md:text-xl text-ink/75 leading-relaxed">
            All the sweet, crisp satisfaction of an exquisite dessert—with{" "}
            <strong className="font-semibold text-ink">zero added sugar</strong>, zero dairy
            heaviness, and zero melting mess in Gujarat's sunny climate.
          </p>
        </div>

        {/* Head-to-Head Comparison Cards */}
        <div className="mt-14 grid md:grid-cols-2 gap-8 items-stretch">
          {/* Commercial Ice Cream & Kulfi */}
          <div className="rounded-3xl bg-cream/70 border border-ink/10 p-8 md:p-10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-ink/10">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-ink/50 font-semibold">
                    Traditional Treat
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display text-ink/80 mt-0.5">
                    Commercial Ice Cream &amp; Kulfi
                  </h3>
                </div>
                <div className="size-10 rounded-full bg-ink/5 flex items-center justify-center text-ink/40 text-lg font-bold">
                  ✕
                </div>
              </div>

              <ul className="mt-6 space-y-4 text-sm text-ink/70">
                <li className="flex items-start gap-3">
                  <span className="text-berry font-bold text-base mt-[-2px]">✕</span>
                  <div>
                    <strong className="text-ink font-medium">20g - 35g Refined Sugar:</strong> Causes
                    sharp glucose spikes, mid-day lethargy, and calorie overload.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-berry font-bold text-base mt-[-2px]">✕</span>
                  <div>
                    <strong className="text-ink font-medium">Dairy &amp; Saturated Fats:</strong>{" "}
                    High in heavy cream, milk fats, and emulsifiers that cause post-dessert sluggishness.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-berry font-bold text-base mt-[-2px]">✕</span>
                  <div>
                    <strong className="text-ink font-medium">Artificial Additives:</strong> Chemical
                    stabilizers, synthetic flavors, and color enhancers to simulate real fruit taste.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-berry font-bold text-base mt-[-2px]">✕</span>
                  <div>
                    <strong className="text-ink font-medium">Melts in 5 Minutes:</strong> In Surat’s
                    weather, it rapidly turns into a sticky, messy liquid requiring deep freezers.
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-ink/10 text-xs text-ink/50 font-serif italic">
              Heavy on calories · Requires strict -18°C cold chain · High sugar crash
            </div>
          </div>

          {/* Frezz Drezz Real Fruit Crunch */}
          <div className="relative rounded-3xl bg-gradient-to-b from-butter/40 via-cream to-cream border-2 border-gold/60 p-8 md:p-10 shadow-xl flex flex-col justify-between">
            <div className="absolute -top-3.5 right-8 bg-gold-deep text-cream text-[11px] font-semibold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5">
              <Sparkles className="size-3 text-gold" />
              Surat's Healthy Choice
            </div>

            <div>
              <div className="flex items-center justify-between pb-5 border-b border-gold/30">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-gold-deep font-semibold">
                    The Modern Pure Choice
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display text-ink mt-0.5">
                    Frezz Drezz Fruit Crunch
                  </h3>
                </div>
                <div className="size-10 rounded-full bg-gold/30 flex items-center justify-center text-gold-deep text-lg font-bold">
                  ✓
                </div>
              </div>

              <ul className="mt-6 space-y-4 text-sm text-ink/85">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-gold-deep shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-ink font-semibold">0g Added Sugar:</strong> 100% natural
                    fruit fructose. Sweet, crisp, and completely guilt-free.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-gold-deep shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-ink font-semibold">100% Dairy-Free &amp; Jain Friendly:</strong>{" "}
                    0% fat, zero cholesterol, vegan, and clean for every lifestyle.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-gold-deep shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-ink font-semibold">97% Nutrient Retention:</strong>{" "}
                    Sublimation at -40°C locks in natural vitamins, bio-enzymes, and fiber.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-gold-deep shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-ink font-semibold">Crisp Room-Temp Storage:</strong> No
                    melting! Stays airy and crisp anywhere for up to 12 months.
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-serif text-ink/75">
                <strong className="text-ink font-semibold">100% Pure Fruit.</strong> Nothing else inside.
              </div>
              <button
                onClick={onOpenQuickOrder}
                className="btn-primary text-xs !py-2.5 !px-5 w-full sm:w-auto justify-center shadow-md cursor-pointer"
              >
                <ShoppingBag className="size-3.5" />
                Explore Flavors
              </button>
            </div>
          </div>
        </div>

        {/* Dessert Topping Pro-Tip Banner */}
        <div className="mt-12 rounded-3xl bg-butter/50 border border-gold/40 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-2xl bg-cream border border-gold/40 flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="size-6 text-gold-deep" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-gold-deep font-semibold">
                Chef &amp; Dessert Lover's Secret
              </div>
              <h4 className="font-display text-xl md:text-2xl text-ink mt-0.5">
                Love Gelato or Acai Bowls? Upgrade Your Topping!
              </h4>
              <p className="mt-1 text-sm font-serif text-ink/75 leading-relaxed max-w-2xl">
                Crush Frezz Drezz wild strawberries, pineapples, or bananas over artisanal gelatos,
                Greek yogurt, smoothie bowls, or breakfast oats. Experience an explosion of pure fruit
                crunch without soggy artificial sprinkles.
              </p>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary shrink-0 text-xs !py-3 !px-6 shadow-md w-full md:w-auto justify-center"
          >
            <MessageCircle className="size-4" />
            Order on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                               STORY & CRAFT                                */
/* -------------------------------------------------------------------------- */

function Story() {
  return (
    <section id="story" className="relative py-28 md:py-36 px-6 overflow-hidden">
      <div className="absolute -top-20 -left-20 size-96 wavy-blob opacity-50 float" />
      <div
        className="absolute bottom-0 -right-24 size-[28rem] wavy-blob opacity-40"
        style={{ background: "color-mix(in oklab, var(--berry) 20%, var(--butter))" }}
      />
      <div className="mx-auto max-w-5xl text-center relative z-10">
        <span className="text-xs uppercase tracking-[0.3em] text-gold-deep font-semibold">
          The Science &amp; Art
        </span>
        <h2 className="mt-4 text-5xl md:text-7xl text-ink leading-[0.95]">
          We picked the fruit.
          <br />
          <span className="italic font-serif font-normal text-gold-deep">
            Time &amp; cold did the rest.
          </span>
        </h2>
        <p className="mt-8 max-w-2xl mx-auto font-serif text-xl text-ink/75 leading-relaxed">
          Freeze-drying preserves 97% of the fresh fruit's original vitamins, minerals, and cell
          structure. We add zero sugar. Zero preservatives. Zero chemical additives. What arrives is
          fruit in its purest, crispiest state.
        </p>

        {/* 3 Steps */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 text-left">
          {[
            {
              n: "01",
              t: "Sourced at Peak",
              d: "Hand-selected from orchards at maximal natural sweetness and ripeness.",
              icon: Leaf,
            },
            {
              n: "02",
              t: "Frozen at −40°C",
              d: "Rapid deep-freezing crystalizes moisture while protecting cellular vitamins.",
              icon: Layers,
            },
            {
              n: "03",
              t: "Vacuum Sublimation",
              d: "Under gentle vacuum, water converts straight to vapor, leaving pure airy crunch.",
              icon: Sparkles,
            },
          ].map((s) => (
            <div
              key={s.n}
              className="rounded-3xl bg-cream/80 backdrop-blur border border-ink/10 p-8 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl text-gold-deep font-semibold">{s.n}</span>
                <s.icon className="size-6 text-gold-deep/60" />
              </div>
              <h3 className="mt-5 text-2xl text-ink font-display">{s.t}</h3>
              <p className="mt-2 text-ink/70 font-serif leading-relaxed text-sm">{s.d}</p>
            </div>
          ))}
        </div>

        {/* 4 Trust stats */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: "97%", label: "Nutrient Retention" },
            { val: "100%", label: "Single Real Fruit" },
            { val: "0g", label: "Added Sugar or Syrups" },
            { val: "12 Mo", label: "Shelf Life (Crisp Sealed)" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-5 rounded-2xl bg-butter/40 border border-gold/30 text-center"
            >
              <div className="font-display text-3xl font-bold text-ink">{stat.val}</div>
              <div className="text-xs text-ink/65 font-medium mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                  SURAT DOORSTEP DELIVERY HUB & LOCALITY FINDER             */
/* -------------------------------------------------------------------------- */

const SURAT_ZONES = [
  "All Localities",
  "South Surat",
  "West Surat",
  "Central Surat",
  "East Surat",
  "North Surat",
  "Outer Surat",
] as const;

function SuratDeliveryHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState<string>("All Localities");

  const filteredLocalities = useMemo(() => {
    return SURAT_LOCALITIES.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        item.zone.toLowerCase().includes(searchQuery.toLowerCase().trim());
      const matchesZone =
        selectedZone === "All Localities" || item.zone.includes(selectedZone);
      return matchesSearch && matchesZone;
    });
  }, [searchQuery, selectedZone]);

  const createWhatsAppOrderLink = (localityName: string) => {
    const message = `Hello Frezz Drezz! I would like to order fresh freeze-dried fruit pouches for doorstep delivery in ${localityName}, Surat. Please share current flavor availability and delivery timing.`;
    return `https://wa.me/919426868840?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="surat-delivery" className="relative py-24 md:py-32 px-6 bg-butter/20 border-y border-ink/5">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep border border-gold/40 shadow-xs mb-4">
            <Truck className="size-3.5 text-gold-deep" />
            <span>Direct-To-Door Artisanal Dispatch</span>
          </div>
          <h2 className="text-4xl md:text-6xl text-ink font-display tracking-tight leading-[1.05]">
            Fresh Doorstep Delivery Across{" "}
            <span className="italic font-serif font-normal text-gold-deep">All of Surat</span>
          </h2>
          <p className="mt-6 font-serif text-lg md:text-xl text-ink/75 leading-relaxed">
            Handcrafted with devotion in Surat. We operate our dedicated dispatch kitchen serving homes,
            offices, and celebrations across{" "}
            <strong className="font-semibold text-ink">34+ Surat localities</strong> via express WhatsApp concierge.
          </p>
        </div>

        {/* 4 Trust Feature Cards */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              title: "Artisanal Surat Kitchen",
              desc: "Freshly freeze-dried in small batches locally in Surat for peak freshness.",
              icon: Sparkles,
            },
            {
              title: "Direct WhatsApp Order",
              desc: "Personalized concierge order directly with founders Rudrax & Aditya.",
              icon: MessageCircle,
            },
            {
              title: "100% Jain Compliant",
              desc: "Zero animal products, 100% vegan, clean dedicated preparation.",
              icon: ShieldCheck,
            },
            {
              title: "No Cold Chain Hassle",
              desc: "Crisp-sealed pouches don't melt in Surat heat. Enjoy anywhere.",
              icon: Leaf,
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="p-5 rounded-2xl bg-cream border border-gold/30 shadow-xs text-left flex flex-col justify-between"
            >
              <div className="size-10 rounded-xl bg-butter/60 border border-gold/30 flex items-center justify-center mb-3">
                <feature.icon className="size-5 text-gold-deep" />
              </div>
              <div>
                <h4 className="font-display text-base text-ink font-semibold">{feature.title}</h4>
                <p className="mt-1.5 text-xs font-serif text-ink/70 leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Locality Search & Zone Filter Bar */}
        <div className="mt-14 p-6 md:p-8 rounded-3xl bg-cream border border-gold/40 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-ink/10">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-ink/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your locality (e.g. Vesu, Adajan, Pal, Varachha...)"
                className="w-full pl-10 pr-10 py-2.5 rounded-full bg-butter/30 border border-ink/15 text-sm text-ink placeholder:text-ink/45 focus:outline-none focus:border-gold-deep focus:ring-1 focus:ring-gold-deep transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 size-5 rounded-full bg-ink/10 hover:bg-ink/20 flex items-center justify-center text-ink/60 text-xs transition cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Result count */}
            <div className="text-xs font-serif text-ink/60 self-center">
              Serving <strong className="font-sans font-semibold text-ink">{filteredLocalities.length}</strong> localities in Surat
            </div>
          </div>

          {/* Zone Filter Chips */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {SURAT_ZONES.map((zone) => (
              <button
                key={zone}
                onClick={() => setSelectedZone(zone)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                  selectedZone === zone
                    ? "bg-ink text-cream shadow-xs"
                    : "bg-butter/40 text-ink/75 border border-ink/10 hover:bg-butter hover:text-ink"
                }`}
              >
                {zone}
              </button>
            ))}
          </div>

          {/* Localities Grid */}
          <div className="mt-6 max-h-96 overflow-y-auto pr-1">
            {filteredLocalities.length === 0 ? (
              <div className="text-center py-12">
                <MapPin className="size-8 text-gold-deep mx-auto mb-2 opacity-50" />
                <p className="font-display text-lg text-ink">No exact locality match found</p>
                <p className="text-xs font-serif text-ink/65 mt-1">
                  Don't worry! We deliver all across Surat. Contact us on WhatsApp for custom doorstep delivery.
                </p>
                <a
                  href={createWhatsAppOrderLink(searchQuery || "Surat")}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary text-xs !py-2 !px-4 mt-4 inline-flex items-center gap-2"
                >
                  <MessageCircle className="size-3.5" />
                  Order to {searchQuery || "Surat"} via WhatsApp
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredLocalities.map((loc) => (
                  <div
                    key={loc.name}
                    className="p-3.5 rounded-2xl bg-cream border border-ink/10 hover:border-gold/60 transition-all group flex items-center justify-between gap-3 shadow-2xs hover:shadow-xs"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="size-3.5 text-gold-deep shrink-0" />
                        <span className="font-display font-semibold text-ink text-sm truncate">
                          {loc.name}
                        </span>
                        <span className="text-[11px] font-serif text-ink/55 font-normal shrink-0">
                          ({loc.nameGu})
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-ink/55 font-medium ml-5 mt-0.5 truncate">
                        <span className="truncate">{loc.zone}</span>
                        <span>·</span>
                        <span className="font-mono font-medium text-ink/70 shrink-0">{loc.pincode}</span>
                      </div>
                    </div>

                    <a
                      href={createWhatsAppOrderLink(loc.name)}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 size-8 rounded-full bg-butter/60 group-hover:bg-gold-deep group-hover:text-cream text-ink/75 flex items-center justify-center transition shadow-2xs"
                      title={`Order delivery to ${loc.name}`}
                      aria-label={`Order delivery to ${loc.name} via WhatsApp`}
                    >
                      <MessageCircle className="size-4" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Notice */}
          <div className="mt-6 pt-4 border-t border-ink/10 flex flex-col sm:flex-row items-center justify-between text-xs text-ink/65 gap-2">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Direct delivery dispatch active across Surat today</span>
            </div>
            <a
              href="https://wa.me/919426868840?text=Hello%20Frezz%20Drezz!%20I%20would%20like%20to%20know%20delivery%20details%20for%20my%20area%20in%20Surat."
              target="_blank"
              rel="noreferrer"
              className="text-gold-deep font-semibold hover:underline flex items-center gap-1"
            >
              Have a bulk/gifting order for a Surat event? Chat on WhatsApp ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                  SURAT FAQ SECTION (MATCHES FAQPAGE SCHEMA)                */
/* -------------------------------------------------------------------------- */

function SuratFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex((curr) => (curr === idx ? null : idx));
  };

  return (
    <section id="faq" className="relative py-24 md:py-32 px-6 bg-cream overflow-hidden">
      <div className="mx-auto max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-butter/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep border border-gold/40 shadow-xs mb-4">
            <HelpCircle className="size-3.5 text-gold-deep" />
            <span>Questions &amp; Clarity</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-ink font-display tracking-tight leading-[1.1]">
            Frequently Asked{" "}
            <span className="italic font-serif font-normal text-gold-deep">Questions</span>
          </h2>
          <p className="mt-4 font-serif text-lg text-ink/75 leading-relaxed">
            Everything you need to know about our freeze-drying craft, ingredients, Jain compliance,
            and doorstep dispatch across Surat.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-12 space-y-4">
          {FREZZ_DREZZ_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-butter/30 border-gold/50 shadow-sm"
                    : "bg-cream/80 border-ink/10 hover:border-gold/30"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg md:text-xl text-ink font-medium leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`size-8 rounded-full border border-ink/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-gold-deep text-cream border-transparent" : "text-ink/60 bg-cream"
                    }`}
                  >
                    <ChevronDown className="size-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm md:text-base font-serif text-ink/75 leading-relaxed border-t border-gold/15">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Help Box */}
        <div className="mt-10 p-6 rounded-2xl bg-butter/50 border border-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-display text-lg text-ink font-semibold">Still have a question?</h4>
            <p className="text-xs font-serif text-ink/70 mt-0.5">
              Talk directly with founders Rudrax &amp; Aditya on WhatsApp. We respond promptly!
            </p>
          </div>
          <a
            href="https://wa.me/919426868840?text=Hello%20Rudrax%20and%20Aditya!%20I%20have%20a%20question%20about%20Frezz%20Drezz."
            target="_blank"
            rel="noreferrer"
            className="btn-primary shrink-0 text-xs !py-2.5 !px-5 shadow-sm"
          >
            <MessageCircle className="size-4" />
            Chat with Founders
          </a>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                               FOUNDERS SECTION                             */
/* -------------------------------------------------------------------------- */

function Founders() {
  return (
    <section id="founders" className="relative py-28 md:py-36 px-6">
      <div className="mx-auto max-w-7xl grid md:grid-cols-5 gap-12 items-center">
        {/* Photo with tilted gold frame */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:col-span-3 relative"
        >
          <div className="absolute -inset-4 bg-gold/30 rounded-3xl -rotate-2 blur-xs" />
          <div className="relative overflow-hidden rounded-3xl border border-ink/10 shadow-xl bg-butter/30 aspect-[4/3] md:aspect-auto">
            <img
              src="/assets/founders.webp"
              alt="Rudrax and Aditya, founders of Frezz Drezz"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 md:-right-6 bg-cream/95 backdrop-blur border border-gold/30 rounded-2xl px-6 py-3 shadow-xl">
            <div className="text-[10px] uppercase tracking-widest text-gold-deep font-semibold">
              Founders &amp; Craft Makers
            </div>
            <div className="font-display text-xl text-ink font-semibold">Rudrax &amp; Aditya</div>
          </div>
        </motion.div>

        {/* Text & Contact Links */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="md:col-span-2"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-gold-deep font-semibold">
            The Story Behind the Crunch
          </span>
          <h2 className="mt-3 text-5xl text-ink leading-tight">
            Two friends,
            <br />
            one obsession.
          </h2>
          <p className="mt-6 font-serif text-lg text-ink/75 leading-relaxed">
            Frezz Drezz began at a kitchen table in 2024. We were tired of packaged snacks that
            pretended to be fruit while loaded with palm oils and sugar glaze. So we built one that
            simply <em>is real fruit</em>.
          </p>
          <div className="mt-8 space-y-3">
            {foundersData.map((f) => (
              <div
                key={f.name}
                className="flex items-center justify-between rounded-2xl border border-ink/15 bg-cream/70 p-4 hover:bg-butter/60 transition"
              >
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-gold-deep font-semibold">
                    {f.name} · Founder
                  </div>
                  <div className="font-semibold text-ink text-sm">{f.display}</div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${f.raw}`}
                    target="_blank"
                    rel="noreferrer"
                    className="size-8 rounded-full bg-ink text-cream grid place-items-center hover:bg-gold-deep transition"
                    title={`WhatsApp ${f.name}`}
                  >
                    <MessageCircle className="size-3.5" />
                  </a>
                  <a
                    href={`tel:${f.tel}`}
                    className="size-8 rounded-full border border-ink/20 grid place-items-center hover:bg-ink hover:text-cream transition"
                    title={`Call ${f.name}`}
                  >
                    <Phone className="size-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                CONTACT HUB                                 */
/* -------------------------------------------------------------------------- */

function Contact() {
  const [copiedNum, setCopiedNum] = useState("");

  const copy = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedNum(val);
    toast.success(`Copied ${val} to clipboard!`);
    setTimeout(() => setCopiedNum(""), 2000);
  };

  const comboWaLink = `https://wa.me/916355255862?text=${encodeURIComponent("Hello! I would like to order the *Frezz Drezz 5-Flavor Taster Box* 🍓🍍🍌🥝🍎\n\nName =\nDelivery Address =\n")}`;

  return (
    <section id="contact" className="relative py-28 md:py-36 px-6">
      <div className="mx-auto max-w-6xl relative overflow-hidden rounded-[2.5rem] bg-ink text-cream p-8 md:p-16 shadow-2xl">
        <div className="absolute -top-24 -right-24 size-96 rounded-full bg-gold-deep/25 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-20 size-96 rounded-full bg-berry/25 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold">
              Direct Orders &amp; Inquiries
            </span>
            <h2 className="mt-4 text-5xl md:text-7xl leading-[0.95]">
              Ready to
              <br />
              <span className="italic font-serif font-normal text-gold">crunch?</span>
            </h2>
            <p className="mt-6 font-serif text-lg text-cream/80 max-w-md leading-relaxed">
              We take orders directly via WhatsApp, call, or Instagram DM. Perfect for individual
              snacking, custom gift hampers, corporate packs, and retail distribution.
            </p>

            {/* Quick 5-Flavor Combo Box CTA */}
            <div className="mt-8">
              <a
                href={comboWaLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-gold text-ink px-6 py-3 font-semibold text-sm hover:bg-cream transition shadow-lg shadow-gold/20"
              >
                <Sparkles className="size-4" />
                <span>Order 5-Flavor Taster Box</span>
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            {foundersData.map((c) => (
              <div
                key={c.name}
                className="rounded-2xl bg-cream/5 border border-cream/10 p-5 backdrop-blur hover:bg-cream/10 transition"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-gold font-semibold">
                      {c.name}
                    </div>
                    <div className="text-xl font-semibold text-cream mt-0.5">{c.display}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${c.raw}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-gold text-ink px-4 py-2 text-xs font-semibold hover:bg-cream transition"
                    >
                      WhatsApp
                    </a>
                    <a
                      href={`tel:${c.tel}`}
                      className="rounded-full border border-cream/40 px-4 py-2 text-xs font-semibold hover:bg-cream hover:text-ink transition"
                    >
                      Call
                    </a>
                    <button
                      onClick={() => copy(c.display)}
                      className="rounded-full border border-cream/20 size-8 grid place-items-center hover:bg-cream/15 transition"
                      aria-label={`Copy ${c.name}'s phone number`}
                    >
                      {copiedNum === c.display ? (
                        <Check className="size-3.5 text-gold" />
                      ) : (
                        <Copy className="size-3.5 text-cream/70" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <a
              href="https://www.instagram.com/frezzdrezz"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-gold-deep via-gold to-berry p-5 text-cream hover:brightness-110 transition shadow-lg"
            >
              <div>
                <div className="text-[10px] uppercase tracking-widest text-cream/80 font-medium">
                  Follow Our Journey
                </div>
                <div className="text-xl font-semibold mt-0.5">@frezzdrezz on Instagram</div>
              </div>
              <span className="text-2xl font-bold">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   FOOTER                                   */
/* -------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="px-6 pb-12 pt-8 border-t border-ink/10">
      <div className="mx-auto max-w-7xl flex flex-wrap gap-6 items-center justify-between text-xs text-ink/65 font-medium">
        <a
          href="#top"
          className="group flex items-center gap-2.5 font-display text-xl text-ink font-semibold hover:opacity-90 transition"
        >
          <img
            src="/assets/logo-128.png"
            alt="Frezz Drezz Official Logo"
            width={28}
            height={28}
            loading="lazy"
            className="size-7 rounded-full object-cover shadow-xs ring-1 ring-gold/30 group-hover:scale-105 transition-transform"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              if (!target.dataset.fallback) {
                target.dataset.fallback = "1";
                target.src = "/logo.png";
              }
            }}
          />
          <span>
            Frezz<span className="text-gold-deep italic font-serif">Drezz</span>
          </span>
        </a>
        <div>
          © {new Date().getFullYear()} Frezz Drezz. Pure by nature, crisp by craft. Handcrafted with
          pride.
        </div>
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-5 gap-y-2">
          <a href="#products" className="hover:text-gold-deep transition">
            Flavors
          </a>
          <a href="#healthy-alternative" className="hover:text-gold-deep transition">
            Ice Cream Alternative
          </a>
          <a href="#story" className="hover:text-gold-deep transition">
            Our Craft
          </a>
          <a href="#surat-delivery" className="hover:text-gold-deep transition">
            Surat Delivery
          </a>
          <a href="#faq" className="hover:text-gold-deep transition">
            FAQ
          </a>
          <a href="#founders" className="hover:text-gold-deep transition">
            Founders
          </a>
          <a
            href="https://www.instagram.com/frezzdrezz"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gold-deep transition"
          >
            Instagram ↗
          </a>
        </div>
      </div>
    </footer>
  );
}

/**
 * Hero Background Video Overlay Darkness / Cream Opacity setting
 * 0 = 100% Raw Original Video
 * 23 = User chosen balanced vibrant look (23% cream overlay)
 * 50 = Soft editorial look
 */
const HERO_VIDEO_OVERLAY_PERCENT = 23;

/* -------------------------------------------------------------------------- */
/*                                 HOME ROOT                                  */
/* -------------------------------------------------------------------------- */

function Home() {
  const [loaded, setLoaded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const handlePreloaderFinish = useCallback(() => {
    setLoaded(true);
  }, []);

  const handleOpenGeneralOrder = useCallback(() => {
    setSelectedProduct(products[0]);
  }, []);

  // Lock scroll while preloading
  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loaded]);

  return (
    <div className="relative min-h-screen bg-cream text-ink antialiased selection:bg-gold selection:text-ink w-full">
      {/* WCAG 2.1 Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:bg-ink focus:text-cream focus:px-4 focus:py-2 focus:rounded-xl focus:shadow-2xl focus:ring-2 focus:ring-gold font-medium text-sm transition"
      >
        Skip to main content
      </a>

      <AnimatePresence mode="wait">
        {!loaded && <LuxuryPreloader onFinish={handlePreloaderFinish} />}
      </AnimatePresence>

      {loaded && <SmoothScroll />}
      <Nav onOpenQuickOrder={handleOpenGeneralOrder} />
      <main id="main-content" tabIndex={-1}>
        <Hero onOpenQuickOrder={handleOpenGeneralOrder} overlayOpacity={HERO_VIDEO_OVERLAY_PERCENT} />
        <Marquee />
        <Products onSelectProduct={setSelectedProduct} />
        <IceCreamAlternativeSection onOpenQuickOrder={handleOpenGeneralOrder} />
        <Story />
        <SuratDeliveryHub />
        <SuratFaqSection />
        <Founders />
        <Contact />
      </main>
      <Footer />

      {/* Interactive Product Quick View & Order Configurator */}
      <ProductQuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
