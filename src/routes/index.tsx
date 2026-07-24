import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Copy, Check } from "lucide-react";
import { SmoothScroll } from "@/lib/smooth-scroll";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Frezz Drezz — Pure by Nature, Crisp by Craft" },
      { name: "description", content: "Freeze-dried fruit made from 100% real fruit. No added sugar. No preservatives. Just pure crunch." },
    ],
  }),
  component: Home,
});

const products = [
  { name: "Pineapple", tag: "Tropical Sunlit", img: "/assets/pineapple.jpg", tint: "oklch(0.88 0.13 92)", accent: "#C99A2E" },
  { name: "Banana",    tag: "Golden Cream",    img: "/assets/banana.jpg",    tint: "oklch(0.92 0.10 95)", accent: "#B8933A" },
  { name: "Strawberry",tag: "Wild Berry",      img: "/assets/strawberry.jpg",tint: "oklch(0.85 0.10 15)", accent: "#C4436E" },
  { name: "Kiwi",      tag: "Fresh Verdant",   img: "/assets/kiwi.jpg",      tint: "oklch(0.86 0.09 130)",accent: "#7A8F3E" },
  { name: "Apple",     tag: "Orchard Ruby",    img: "/assets/apple.jpg",     tint: "oklch(0.80 0.14 25)", accent: "#B0362C" },
];

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        <a href="#top" className="font-display text-2xl text-ink tracking-tight">
          Frezz<span className="text-gold-deep">Drezz</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink/80">
          <a href="#products" className="hover:text-gold-deep transition">Products</a>
          <a href="#story"    className="hover:text-gold-deep transition">Our Story</a>
          <a href="#founders" className="hover:text-gold-deep transition">Founders</a>
          <a href="#contact"  className="hover:text-gold-deep transition">Contact</a>
        </nav>
        <a href="#contact" className="btn-primary text-sm !py-2 !px-4">Order Now</a>
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

    // v.load() is the correct API to reset the video's network state —
    // it clears any cached currentTime so the browser always starts from frame 0.
    v.load();

    const onPlaying = () => setVideoVisible(true);

    const onEnd = () => {
      // Freeze on last frame after playing once.
      try { v.currentTime = Math.max(0, v.duration - 0.05); } catch {}
      v.pause();
      setVideoVisible(true);
    };

    const onError = () => setVideoVisible(true); // fallback: remove black flash

    v.addEventListener("playing", onPlaying);
    v.addEventListener("ended",   onEnd);
    v.addEventListener("error",   onError);

    // Safety fallback: if video hasn't started after 4s, reveal the section.
    const t = setTimeout(() => setVideoVisible(true), 4000);

    return () => {
      clearTimeout(t);
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("ended",   onEnd);
      v.removeEventListener("error",   onError);
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
            Pure by nature.<br />
            <span className="text-gold-deep italic font-serif font-normal">Crisp</span> by craft.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-ink/70 max-w-xl font-serif">
            Freeze-dried fruit at its most honest. No sugar. No preservatives. Just fruit — locked at peak ripeness, delivered in a satisfying crunch.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#products" className="btn-primary">Explore Flavors →</a>
            <a href="#contact"  className="btn-ghost">Place an Order</a>
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
  const items = ["Freeze Dried", "No Added Sugar", "No Preservatives", "100% Real Fruit", "Natural & Pure", "Crisp By Craft"];
  const doubled = [...items, ...items];
  return (
    <div className="relative py-10 border-y border-ink/10 bg-butter/30 overflow-hidden">
      <div className="marquee">
        {doubled.map((t, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-3xl md:text-5xl text-ink/80 whitespace-nowrap">
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
            <span className="text-xs uppercase tracking-[0.3em] text-gold-deep font-semibold">The Range</span>
            <h2 className="mt-3 text-5xl md:text-7xl text-ink leading-none">Five flavors,<br/>infinite crunch.</h2>
          </div>
          <p className="max-w-md font-serif text-lg text-ink/70">
            Each pouch is a single fruit at its ripest, gently freeze-dried to lock every drop of flavor into a light, weightless bite.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => <ProductCard key={p.name} p={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ p, index }: { p: typeof products[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

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
          <path d="M0,300 Q100,240 200,300 T400,300 L400,400 L0,400 Z" fill={p.accent} opacity="0.10" />
        </svg>
      </div>
      <div className="relative aspect-[3/4] overflow-hidden">
        <motion.img
          src={p.img}
          alt={`Frezz Drezz ${p.name} freeze-dried fruit pouch`}
          style={{ y }}
          className="absolute inset-0 h-[115%] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="relative p-6 flex items-end justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold" style={{ color: p.accent }}>
            {p.tag}
          </span>
          <h3 className="mt-1 text-3xl text-ink">{p.name}</h3>
        </div>
        <span className="shrink-0 size-11 rounded-full bg-ink text-cream grid place-items-center text-lg transition-transform group-hover:rotate-45">
          →
        </span>
      </div>
    </motion.div>
  );
}

function Story() {
  return (
    <section id="story" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute -top-20 -left-20 size-96 wavy-blob opacity-60 float" />
      <div className="absolute bottom-0 -right-24 size-[28rem] wavy-blob opacity-50"
           style={{ background: "color-mix(in oklab, var(--berry) 25%, var(--butter))" }} />
      <div className="mx-auto max-w-5xl text-center relative">
        <span className="text-xs uppercase tracking-[0.3em] text-gold-deep font-semibold">Our Craft</span>
        <h2 className="mt-4 text-5xl md:text-7xl text-ink leading-[0.95]">
          We picked the fruit.<br/>
          <span className="italic font-serif font-normal">Time did the rest.</span>
        </h2>
        <p className="mt-8 max-w-2xl mx-auto font-serif text-xl text-ink/75 leading-relaxed">
          Freeze-drying preserves 97% of a fruit's nutrients. We add nothing. We take nothing away. What arrives is fruit — lighter, crunchier, more itself.
        </p>
        <div className="mt-16 grid md:grid-cols-3 gap-6 text-left">
          {[
            { n: "01", t: "Sourced Ripe",  d: "Only peak-season fruit from farms we trust." },
            { n: "02", t: "Frozen Whole",  d: "Locked in at −40°C to protect flavor and nutrients." },
            { n: "03", t: "Vacuum Dried",  d: "Water sublimates, leaving pure crunch behind." },
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
            <div className="text-xs uppercase tracking-widest text-gold-deep font-semibold">Founders</div>
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
          <span className="text-xs uppercase tracking-[0.3em] text-gold-deep font-semibold">The Team</span>
          <h2 className="mt-3 text-5xl text-ink leading-tight">Two friends,<br/>one obsession.</h2>
          <p className="mt-6 font-serif text-lg text-ink/70">
            Frezz Drezz began at a kitchen table in 2024. We were tired of snacks that pretended to be fruit. So we built one that simply <em>is</em>.
          </p>
          <div className="mt-8 space-y-3">
            {[
              { label: "Rudrax", tel: "+916355255862",  display: "+91 63552 55862" },
              { label: "Aditya", tel: "+919376136009",  display: "+91 93761 36009" },
            ].map((f) => (
              <a key={f.label} href={`tel:${f.tel}`}
                 className="flex items-center justify-between rounded-xl border border-ink/15 px-5 py-4 hover:bg-butter transition group">
                <div>
                  <div className="text-xs uppercase tracking-widest text-ink/60">{f.label}</div>
                  <div className="font-semibold text-ink">{f.display}</div>
                </div>
                <span className="text-gold-deep group-hover:translate-x-1 transition-transform">→</span>
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
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold">Order Now</span>
            <h2 className="mt-4 text-5xl md:text-7xl leading-[0.95]">
              Ready to<br/>
              <span className="italic font-serif font-normal text-gold">crunch?</span>
            </h2>
            <p className="mt-6 font-serif text-lg text-cream/75 max-w-md">
              Reach out directly — we take orders over WhatsApp, call, or DM. Bulk, gifting, and retail welcome.
            </p>
          </div>

          <div className="space-y-3">
            {contacts.map((c) => (
              <div key={c.name} className="rounded-2xl bg-cream/5 border border-cream/10 p-5 backdrop-blur">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-gold">{c.name}</div>
                    <div className="text-xl font-semibold">{c.num}</div>
                  </div>
                  <div className="flex gap-2">
                    <a href={`https://wa.me/${c.raw}`} target="_blank" rel="noreferrer"
                       className="rounded-full bg-gold text-ink px-4 py-2 text-sm font-semibold hover:bg-cream transition">
                      WhatsApp
                    </a>
                    <a href={`tel:+${c.raw}`}
                       className="rounded-full border border-cream/40 px-4 py-2 text-sm font-semibold hover:bg-cream hover:text-ink transition">
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

            <a href="https://www.instagram.com/frezzdrezz" target="_blank" rel="noreferrer"
               className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-gold-deep to-berry p-5 hover:brightness-110 transition">
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
        <div className="font-display text-xl text-ink">Frezz<span className="text-gold-deep">Drezz</span></div>
        <div>© {new Date().getFullYear()} Frezz Drezz. Pure by nature, crisp by craft.</div>
        <a href="https://www.instagram.com/frezzdrezz" target="_blank" rel="noreferrer"
           className="hover:text-gold-deep transition">Instagram ↗</a>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <div className="relative">
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
