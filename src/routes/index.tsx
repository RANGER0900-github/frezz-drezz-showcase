import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
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
  ShieldCheck,
  Leaf,
  Layers,
  MessageCircle,
  ExternalLink,
  ZoomIn,
} from "lucide-react";
import { toast } from "sonner";
import { SmoothScroll } from "@/lib/smooth-scroll";
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
      { title: "Frezz Drezz — Pure by Nature, Crisp by Craft" },
      {
        name: "description",
        content:
          "Freeze-dried fruit made from 100% real fruit. No added sugar. No preservatives. Just pure crunch.",
      },
    ],
    links: [
      { rel: "preload", as: "video", href: "/assets/hero-loop.mp4", type: "video/mp4" },
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
  { threshold: 25, text: "Flash freezing whole at −40°C..." },
  { threshold: 50, text: "Sublimating moisture under deep vacuum..." },
  { threshold: 75, text: "Locking 100% natural crunch & 97% nutrients..." },
  { threshold: 92, text: "Pure craft ready to experience." },
];

function LuxuryPreloader({ onFinish }: { onFinish: () => void }) {
  // Start immediately at 15% for instantaneous progression feeling
  const [progress, setProgress] = useState(15);

  // Parallel WebP asset cache warm-up
  useEffect(() => {
    const assets = [
      "/assets/pineapple.webp",
      "/assets/banana.webp",
      "/assets/strawberry.webp",
      "/assets/kiwi.webp",
      "/assets/apple.webp",
      "/assets/founders.webp",
    ];

    assets.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Lightning fast 850ms fluid progress curve
  useEffect(() => {
    let cancelled = false;
    const startTime = performance.now();
    const duration = 850; // 850ms super snappy, responsive experience

    const step = (now: number) => {
      if (cancelled) return;
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);

      // Fast-accelerating smooth easeOutQuart curve
      const eased = 0.15 + 0.85 * (1 - Math.pow(1 - t, 4));
      const current = Math.min(100, Math.round(eased * 100));
      setProgress(current);

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        setProgress(100);
        setTimeout(() => {
          if (!cancelled) onFinish();
        }, 120);
      }
    };

    const animId = requestAnimationFrame(step);

    return () => {
      cancelled = true;
      cancelAnimationFrame(animId);
    };
  }, [onFinish]);

  // Current craftsmanship message
  const currentStatus = useMemo(() => {
    for (let i = craftPhases.length - 1; i >= 0; i--) {
      if (progress >= craftPhases[i].threshold) {
        return craftPhases[i].text;
      }
    }
    return craftPhases[0].text;
  }, [progress]);

  return (
    <motion.div
      key="preloader"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.01,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-cream px-6 select-none overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 size-96 rounded-full bg-gold/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 size-96 rounded-full bg-butter/40 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-md w-full">
        {/* Animated Brand Emblem */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6"
        >
          {/* Outer rotating crystal ring */}
          <div className="size-20 rounded-full border border-gold/40 flex items-center justify-center bg-butter/40 shadow-lg shadow-gold/15">
            <svg viewBox="0 0 100 100" className="size-14 text-gold-deep animate-spin-slow">
              <path
                d="M50 5 L53 35 L68 18 L58 45 L85 35 L62 55 L95 50 L65 65 L85 82 L58 70 L68 95 L50 75 L32 95 L42 70 L15 82 L35 65 L5 50 L38 55 L15 35 L42 45 L32 18 L47 35 Z"
                fill="currentColor"
                opacity="0.9"
              />
            </svg>
            <div className="absolute size-3.5 rounded-full bg-cream border-2 border-gold-deep" />
          </div>
        </motion.div>

        {/* Established badge */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.3 }}
          className="inline-flex items-center gap-1.5 rounded-full bg-butter/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-deep border border-gold/30 mb-3"
        >
          <Sparkles className="size-3" />
          <span>Pure Fruit Craft</span>
        </motion.div>

        {/* Brand Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.4 }}
          className="font-display text-4xl sm:text-5xl tracking-tight text-ink text-center"
        >
          Frezz<span className="text-gold-deep italic font-serif ml-1">Drezz</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12, duration: 0.4 }}
          className="mt-2 text-xs uppercase tracking-[0.25em] text-ink/65 font-medium text-center font-sans"
        >
          Pure by Nature · Crisp by Craft
        </motion.p>

        {/* Progress Bar Container */}
        <div className="mt-8 w-full max-w-[280px] flex flex-col items-center gap-3">
          <div className="w-full h-2 bg-ink/10 rounded-full overflow-hidden p-0.5 relative shadow-inner">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-deep relative"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.05 }}
            />
          </div>

          <div className="flex items-center justify-between w-full text-[11px] font-mono text-ink/65 font-medium">
            <span className="tracking-wider flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-gold-deep animate-ping" />
              CRUNCH ENGINE
            </span>
            <span className="font-semibold text-gold-deep">{progress}%</span>
          </div>

          {/* Dynamic Craft Phase Message */}
          <div className="h-6 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentStatus}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.15 }}
                className="text-xs font-serif italic text-ink/75 text-center"
              >
                {currentStatus}
              </motion.p>
            </AnimatePresence>
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
    { label: "Products", href: "#products" },
    { label: "Our Craft", href: "#story" },
    { label: "Founders", href: "#founders" },
    { label: "Contact", href: "#contact" },
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
            className="group flex items-center gap-2 font-display text-2xl font-semibold text-ink tracking-tight hover:opacity-90 transition"
          >
            <div className="size-8 rounded-full bg-butter border border-gold/40 flex items-center justify-center text-gold-deep shadow-sm">
              <span className="font-display text-sm font-bold">F</span>
            </div>
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

function Hero({ onOpenQuickOrder }: { onOpenQuickOrder: () => void }) {
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

    return () => {
      clearTimeout(fallbackTimeout);
      v.removeEventListener("loadeddata", startPlayback);
      v.removeEventListener("canplay", startPlayback);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-[92vh] md:min-h-screen overflow-hidden flex items-center bg-cream"
    >
      {/* Optimized faststart looping video layer */}
      <div className="absolute inset-0 overflow-hidden transform-gpu">
        <video
          ref={videoRef}
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover will-change-transform transform-gpu transition-opacity duration-500"
          style={{ opacity: videoVisible ? 0.95 : 0 }}
        >
          <source src="/assets/hero-loop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-cream/20 via-cream/50 to-cream pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-cream/35 to-cream pointer-events-none" />
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
            <span>100% Real Fruit · Zero Added Sugar</span>
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
            Freeze-dried fruit at its most honest. No preservatives, no syrups. Just peak-season
            fruit locked at maximum freshness and delivered in a weightless, pure crunch.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-10 flex flex-wrap gap-4 items-center"
          >
            <a href="#products" className="btn-primary">
              <span>Explore 5 Flavors</span>
              <ArrowRight className="size-4" />
            </a>
            <button onClick={onOpenQuickOrder} className="btn-ghost">
              <ShoppingBag className="size-4" />
              <span>Quick Order</span>
            </button>
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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [15, -15]);

  const waMessage = encodeURIComponent(
    `Hello Frezz Drezz! I would like to order *${p.name}* (${p.tag}) 🍃\n\nQuantity = 2 pouches\nName = \nDelivery Address = \n`,
  );
  const waLink = `https://wa.me/916355255862?text=${waMessage}`;

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.2, 0.8, 0.2, 1] }}
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
        <motion.img
          src={p.img}
          alt={`Frezz Drezz ${p.name} freeze-dried fruit pouch`}
          style={{ y }}
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
      <DialogContent className="max-w-3xl bg-cream border-gold/30 p-0 overflow-hidden rounded-3xl shadow-2xl max-h-[90vh]">
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
        <a href="#top" className="font-display text-xl text-ink font-semibold">
          Frezz<span className="text-gold-deep italic font-serif">Drezz</span>
        </a>
        <div>
          © {new Date().getFullYear()} Frezz Drezz. Pure by nature, crisp by craft. Handcrafted with
          pride.
        </div>
        <div className="flex items-center gap-4">
          <a href="#products" className="hover:text-gold-deep transition">
            Flavors
          </a>
          <a href="#story" className="hover:text-gold-deep transition">
            Our Craft
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
    <div className="relative min-h-screen bg-cream text-ink antialiased selection:bg-gold selection:text-ink">
      <AnimatePresence mode="wait">
        {!loaded && <LuxuryPreloader onFinish={handlePreloaderFinish} />}
      </AnimatePresence>

      <SmoothScroll />
      <Nav onOpenQuickOrder={handleOpenGeneralOrder} />
      <Hero onOpenQuickOrder={handleOpenGeneralOrder} />
      <Marquee />
      <Products onSelectProduct={setSelectedProduct} />
      <Story />
      <Founders />
      <Contact />
      <Footer />

      {/* Interactive Product Quick View & Order Configurator */}
      <ProductQuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
