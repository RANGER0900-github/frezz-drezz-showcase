import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Copy, Check } from "lucide-react";
import { SmoothScroll } from "@/lib/smooth-scroll";

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
  }),
  component: Home,
});

const products = [
  {
    name: "Pineapple",
    tag: "Tropical Sunlit",
    img: "/assets/pineapple.jpg",
    tint: "oklch(0.88 0.13 92)",
    accent: "#C99A2E",
  },
  {
    name: "Banana",
    tag: "Golden Cream",
    img: "/assets/banana.jpg",
    tint: "oklch(0.92 0.10 95)",
    accent: "#B8933A",
  },
  {
    name: "Strawberry",
    tag: "Wild Berry",
    img: "/assets/strawberry.jpg",
    tint: "oklch(0.85 0.10 15)",
    accent: "#C4436E",
  },
  {
    name: "Kiwi",
    tag: "Fresh Verdant",
    img: "/assets/kiwi.jpg",
    tint: "oklch(0.86 0.09 130)",
    accent: "#7A8F3E",
  },
  {
    name: "Apple",
    tag: "Orchard Ruby",
    img: "/assets/apple.jpg",
    tint: "oklch(0.80 0.14 25)",
    accent: "#B0362C",
  },
];

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-cream/40 border-b border-ink/5 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink/80">
          <a href="#products" className="hover:text-gold-deep transition">
            Products
          </a>
          <a href="#story" className="hover:text-gold-deep transition">
            Our Story
          </a>
          <a href="#founders" className="hover:text-gold-deep transition">
            Founders
          </a>
          <a href="#contact" className="hover:text-gold-deep transition">
            Contact
          </a>
        </nav>
        <a href="#contact" className="btn-primary text-sm !py-2 !px-5 ml-auto md:ml-0 shadow-md">
          Order Now
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoVisible, setVideoVisible] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // v.load() resets the video's network state to start from frame 0
    v.load();

    const onPlaying = () => setVideoVisible(true);

    const onTimeUpdate = () => {
      // Freeze smoothly on the last 0.1s of the clip
      if (v.duration && v.currentTime >= v.duration - 0.1) {
        v.pause();
        setVideoVisible(true);
      }
    };

    const onEnd = () => {
      // Fallback freeze on last frame
      try {
        if (v.duration) v.currentTime = Math.max(0, v.duration - 0.05);
      } catch {
        // Ignore seek error if duration is unavailable
      }
      v.pause();
      setVideoVisible(true);
    };

    const onError = () => setVideoVisible(true); // fallback: show section even if video fails

    v.addEventListener("playing", onPlaying);
    v.addEventListener("timeupdate", onTimeUpdate);
    v.addEventListener("ended", onEnd);
    v.addEventListener("error", onError);

    // Safety fallback: if video hasn't started after 3.5s, reveal the section
    const t = setTimeout(() => setVideoVisible(true), 3500);

    return () => {
      clearTimeout(t);
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("timeupdate", onTimeUpdate);
      v.removeEventListener("ended", onEnd);
      v.removeEventListener("error", onError);
    };
  }, []);

  return (
    <section id="top" className="relative min-h-screen overflow-hidden flex items-center bg-cream">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src="/assets/logo-animation.mp4"
          muted
          autoPlay
          playsInline
          preload="auto"
          className="w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: videoVisible ? 1 : 0 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/10 via-cream/40 to-cream" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-40 pb-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-butter/70 backdrop-blur px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-gold-deep border border-gold/40">
            <span className="size-1.5 rounded-full bg-gold-deep animate-pulse" /> 100% Real Fruit
          </span>
          <h1 className="mt-6 text-6xl md:text-8xl leading-[0.92] text-ink">
            Pure by nature.
            <br />
            <span className="text-gold-deep italic font-serif font-normal">Crisp</span> by craft.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-ink/70 max-w-xl font-serif">
            Freeze-dried fruit at its most honest. No sugar. No preservatives. Just fruit — locked
            at peak ripeness, delivered in a satisfying crunch.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#products" className="btn-primary">
              Explore Flavors →
            </a>
            <a href="#contact" className="btn-ghost">
              Place an Order
            </a>
          </div>
        </motion.div>
      </div>

      <ScrollHint />
    </section>
  );
}

function ScrollHint() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-ink/60">
      <span>Scroll</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="h-8 w-px bg-ink/40"
      />
    </div>
  );
}

function Marquee() {
  const items = [
    "Freeze Dried",
    "No Added Sugar",
    "No Preservatives",
    "100% Real Fruit",
    "Natural & Pure",
    "Crisp By Craft",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="relative py-10 border-y border-ink/10 bg-butter/30 overflow-hidden">
      <div className="marquee">
        {doubled.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-12 font-display text-3xl md:text-5xl text-ink/80 whitespace-nowrap"
          >
            {t}
            <span className="inline-block size-3 rounded-full bg-gold-deep" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Products() {
  return (
    <section id="products" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold-deep font-semibold">
              The Range
            </span>
            <h2 className="mt-3 text-5xl md:text-7xl text-ink leading-none">
              Five flavors,
              <br />
              infinite crunch.
            </h2>
          </div>
          <p className="max-w-md font-serif text-lg text-ink/70">
            Each pouch is a single fruit at its ripest, gently freeze-dried to lock every drop of
            flavor into a light, weightless bite.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <ProductCard key={p.name} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ p, index }: { p: (typeof products)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const waMessage = encodeURIComponent(
    `Hello! I want to buy *${p.name}* flavour 🍃\n\nQuantity = \nAddress = \n`,
  );
  const waLink = `https://wa.me/916355255862?text=${waMessage}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-ink/10"
      style={{ background: `linear-gradient(180deg, ${p.tint} 0%, var(--cream) 65%)` }}
    >
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <path d="M0,120 Q100,60 200,120 T400,120 L400,0 L0,0 Z" fill={p.accent} opacity="0.18" />
          <path
            d="M0,300 Q100,240 200,300 T400,300 L400,400 L0,400 Z"
            fill={p.accent}
            opacity="0.10"
          />
        </svg>
      </div>
      <div className="relative aspect-[3/4] overflow-hidden">
        <div className="absolute inset-0 h-[115%] w-full transition-transform duration-700 group-hover:scale-105">
          <motion.img
            src={p.img}
            alt={`Frezz Drezz ${p.name} freeze-dried fruit pouch`}
            style={{ y }}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="relative p-6 flex items-end justify-between gap-4">
        <div>
          <span
            className="text-[10px] uppercase tracking-[0.25em] font-semibold"
            style={{ color: p.accent }}
          >
            {p.tag}
          </span>
          <h3 className="mt-1 text-3xl text-ink">{p.name}</h3>
        </div>
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 inline-flex items-center gap-2 rounded-full bg-ink text-cream px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:bg-gold-deep hover:shadow-lg hover:shadow-gold-deep/25 hover:-translate-y-0.5 active:scale-95"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Buy Now
        </a>
      </div>
    </motion.div>
  );
}

function Story() {
  return (
    <section id="story" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute -top-20 -left-20 size-96 wavy-blob opacity-60 float" />
      <div
        className="absolute bottom-0 -right-24 size-[28rem] wavy-blob opacity-50"
        style={{ background: "color-mix(in oklab, var(--berry) 25%, var(--butter))" }}
      />
      <div className="mx-auto max-w-5xl text-center relative">
        <span className="text-xs uppercase tracking-[0.3em] text-gold-deep font-semibold">
          Our Craft
        </span>
        <h2 className="mt-4 text-5xl md:text-7xl text-ink leading-[0.95]">
          We picked the fruit.
          <br />
          <span className="italic font-serif font-normal">Time did the rest.</span>
        </h2>
        <p className="mt-8 max-w-2xl mx-auto font-serif text-xl text-ink/75 leading-relaxed">
          Freeze-drying preserves 97% of a fruit's nutrients. We add nothing. We take nothing away.
          What arrives is fruit — lighter, crunchier, more itself.
        </p>
        <div className="mt-16 grid md:grid-cols-3 gap-6 text-left">
          {[
            { n: "01", t: "Sourced Ripe", d: "Only peak-season fruit from farms we trust." },
            {
              n: "02",
              t: "Frozen Whole",
              d: "Locked in at −40°C to protect flavor and nutrients.",
            },
            { n: "03", t: "Vacuum Dried", d: "Water sublimates, leaving pure crunch behind." },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl bg-card border border-ink/10 p-8">
              <div className="font-display text-4xl text-gold-deep">{s.n}</div>
              <h3 className="mt-4 text-2xl text-ink">{s.t}</h3>
              <p className="mt-2 text-ink/70 font-serif">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Founders() {
  return (
    <section id="founders" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl grid md:grid-cols-5 gap-12 items-center">
        {/* Photo — large, tilted gold glow, floating name badge */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="md:col-span-3 relative"
        >
          <div className="absolute -inset-4 bg-gold/30 rounded-3xl -rotate-2" />
          <div className="relative overflow-hidden rounded-3xl border border-ink/10">
            <img
              src="/assets/founders.jpg"
              alt="Rudrax and Aditya, founders of Frezz Drezz"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-cream border border-ink/10 rounded-2xl px-5 py-3 shadow-xl">
            <div className="text-xs uppercase tracking-widest text-gold-deep font-semibold">
              Founders
            </div>
            <div className="font-display text-xl text-ink">Rudrax &amp; Aditya</div>
          </div>
        </motion.div>

        {/* Text + contact links */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="md:col-span-2"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-gold-deep font-semibold">
            The Team
          </span>
          <h2 className="mt-3 text-5xl text-ink leading-tight">
            Two friends,
            <br />
            one obsession.
          </h2>
          <p className="mt-6 font-serif text-lg text-ink/70">
            Frezz Drezz began at a kitchen table in 2024. We were tired of snacks that pretended to
            be fruit. So we built one that simply <em>is</em>.
          </p>
          <div className="mt-8 space-y-3">
            {[
              { label: "Rudrax", tel: "+916355255862", display: "+91 63552 55862" },
              { label: "Aditya", tel: "+919376136009", display: "+91 93761 36009" },
            ].map((f) => (
              <a
                key={f.label}
                href={`tel:${f.tel}`}
                className="flex items-center justify-between rounded-xl border border-ink/15 px-5 py-4 hover:bg-butter transition group"
              >
                <div>
                  <div className="text-xs uppercase tracking-widest text-ink/60">{f.label}</div>
                  <div className="font-semibold text-ink">{f.display}</div>
                </div>
                <span className="text-gold-deep group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState("");
  const copy = (v: string) => {
    navigator.clipboard.writeText(v);
    setCopied(v);
    setTimeout(() => setCopied(""), 1500);
  };

  const contacts = [
    { name: "Rudrax", num: "+91 63552 55862", raw: "916355255862" },
    { name: "Aditya", num: "+91 93761 36009", raw: "919376136009" },
  ];

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl relative overflow-hidden rounded-[2.5rem] bg-ink text-cream p-10 md:p-20">
        <div className="absolute -top-24 -right-24 size-96 rounded-full bg-gold-deep/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 size-96 rounded-full bg-berry/20 blur-3xl" />

        <div className="relative grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold">
              Order Now
            </span>
            <h2 className="mt-4 text-5xl md:text-7xl leading-[0.95]">
              Ready to
              <br />
              <span className="italic font-serif font-normal text-gold">crunch?</span>
            </h2>
            <p className="mt-6 font-serif text-lg text-cream/75 max-w-md">
              Reach out directly — we take orders over WhatsApp, call, or DM. Bulk, gifting, and
              retail welcome.
            </p>
          </div>

          <div className="space-y-3">
            {contacts.map((c) => (
              <div
                key={c.name}
                className="rounded-2xl bg-cream/5 border border-cream/10 p-5 backdrop-blur"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-gold">{c.name}</div>
                    <div className="text-xl font-semibold">{c.num}</div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`https://wa.me/${c.raw}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-gold text-ink px-4 py-2 text-sm font-semibold hover:bg-cream transition"
                    >
                      WhatsApp
                    </a>
                    <a
                      href={`tel:+${c.raw}`}
                      className="rounded-full border border-cream/40 px-4 py-2 text-sm font-semibold hover:bg-cream hover:text-ink transition"
                    >
                      Call
                    </a>
                    {/* Enhanced copy button — lucide icons, smooth fill transition */}
                    <button
                      onClick={() => copy(c.num)}
                      className="rounded-full border border-cream/20 size-9 grid place-items-center hover:bg-cream/10 transition-all duration-200"
                      aria-label="Copy number"
                    >
                      {copied === c.num ? (
                        <Check className="size-4 text-gold" />
                      ) : (
                        <Copy className="size-4 text-cream/80" />
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
              className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-gold-deep to-berry p-5 hover:brightness-110 transition"
            >
              <div>
                <div className="text-xs uppercase tracking-widest text-cream/80">Instagram</div>
                <div className="text-xl font-semibold">@frezzdrezz</div>
              </div>
              <span className="text-2xl">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 pb-10 pt-6">
      <div className="mx-auto max-w-7xl flex flex-wrap gap-4 items-center justify-between text-sm text-ink/60">
        <div className="font-display text-xl text-ink">
          Frezz<span className="text-gold-deep">Drezz</span>
        </div>
        <div>© {new Date().getFullYear()} Frezz Drezz. Pure by nature, crisp by craft.</div>
        <a
          href="https://www.instagram.com/frezzdrezz"
          target="_blank"
          rel="noreferrer"
          className="hover:text-gold-deep transition"
        >
          Instagram ↗
        </a>
      </div>
    </footer>
  );
}

function LoadingScreen({ onReady }: { onReady: () => void }) {
  const [progress, setProgress] = useState(0);
  const [, setPhase] = useState<"loading" | "completing" | "done">("loading");

  useEffect(() => {
    let cancelled = false;

    // Smooth progress simulation
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 88) return p;
        // Ease-out curve: fast start, slow finish
        const remaining = 88 - p;
        return p + remaining * 0.06 + Math.random() * 2;
      });
    }, 120);

    // Wait for fonts + preload hero video
    const fontsReady =
      typeof document !== "undefined" && document.fonts ? document.fonts.ready : Promise.resolve();

    const videoPreload = new Promise<void>((resolve) => {
      if (typeof document === "undefined") {
        resolve();
        return;
      }
      const vid = document.createElement("video");
      vid.preload = "auto";
      vid.muted = true;
      vid.src = "/assets/logo-animation.mp4";
      vid.oncanplaythrough = () => resolve();
      vid.onerror = () => resolve(); // don't block on error
      setTimeout(() => resolve(), 4000); // safety
    });
    const timeout = new Promise<void>((resolve) => setTimeout(resolve, 4500));

    Promise.all([fontsReady, Promise.race([videoPreload, timeout])]).then(() => {
      if (cancelled) return;
      clearInterval(interval);
      setPhase("completing");
      // Animate to 100%
      let p = 88;
      const finish = setInterval(() => {
        p += 3;
        if (p >= 100) {
          clearInterval(finish);
          setProgress(100);
          setTimeout(() => {
            if (!cancelled) {
              setPhase("done");
              setTimeout(() => {
                if (!cancelled) onReady();
              }, 500);
            }
          }, 300);
        } else {
          setProgress(p);
        }
      }, 30);
    });

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [onReady]);

  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 40%, oklch(0.93 0.06 90 / 0.8), oklch(0.965 0.028 88) 70%)",
      }}
    >
      {/* Ambient golden glows */}
      <div
        className="absolute top-1/4 left-1/4 size-[30rem] rounded-full blur-[100px] pointer-events-none"
        style={{
          background: "oklch(0.82 0.14 82 / 0.15)",
          animation: "golden-pulse 4s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 size-[25rem] rounded-full blur-[80px] pointer-events-none"
        style={{
          background: "oklch(0.62 0.19 22 / 0.08)",
          animation: "golden-pulse 5s ease-in-out infinite 1s",
        }}
      />

      <div className="relative flex flex-col items-center gap-10">
        {/* Spinning ring */}
        <div className="relative size-20">
          <svg className="size-full -rotate-90" viewBox="0 0 80 80">
            {/* Track */}
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="oklch(0.22 0.05 60 / 0.06)"
              strokeWidth="1.5"
            />
            {/* Progress arc */}
            <motion.circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="url(#gold-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 36}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 36 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 36 * (1 - progress / 100) }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="oklch(0.82 0.14 82)" />
                <stop offset="100%" stopColor="oklch(0.62 0.14 72)" />
              </linearGradient>
            </defs>
          </svg>
          {/* Percentage inside */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-semibold text-ink/70 tabular-nums">
              {Math.round(progress)}
            </span>
          </div>
        </div>

        {/* Brand wordmark with shimmer */}
        <div className="relative">
          <h1 className="font-display text-5xl md:text-6xl tracking-tight text-ink/90">
            Frezz<span className="text-gold-deep">Drezz</span>
          </h1>
          {/* Shimmer overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 30%, oklch(0.82 0.14 82 / 0.3) 50%, transparent 70%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2.5s ease-in-out infinite",
              mixBlendMode: "overlay",
            }}
          />
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-[11px] uppercase tracking-[0.35em] text-ink/40 font-medium"
        >
          Pure by nature · Crisp by craft
        </motion.p>

        {/* Slim progress bar */}
        <div className="w-56 h-px bg-ink/8 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, oklch(0.82 0.14 82), oklch(0.62 0.14 72))",
            }}
            initial={{ width: "0%" }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function Home() {
  const [loaded, setLoaded] = useState(false);
  const handleReady = useCallback(() => setLoaded(true), []);

  // Prevent scroll while loading
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
    <div className="relative">
      <AnimatePresence mode="wait">
        {!loaded && <LoadingScreen onReady={handleReady} />}
      </AnimatePresence>
      <SmoothScroll />
      <Nav />
      <Hero />
      <Marquee />
      <Products />
      <Story />
      <Founders />
      <Contact />
      <Footer />
    </div>
  );
}
