import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams, Navigate, Link } from "react-router-dom";
import { ModelsCTA } from "@/components/product/ModelsCTA";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import SEO from "@/components/layout/SEO";
import { getProductBySlug } from "@/data/products";
import type { Product } from "@/data/products";
import { useTranslatedProduct } from "@/hooks/useTranslatedProduct";
import { StickyContextBar } from "@/components/product/StickyContextBar";
import { ModelSwitcher } from "@/components/product/ModelSwitcher";
import { ParticleHeroBackground } from "@/components/product/ParticleHeroBackground";
import { isLowPowerDevice } from "@/hooks/useDevicePerf";

/* ── mobile hook ────────────────────────────────────── */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

/* ── animation helpers ──────────────────────────────── */
const ease = [0.16, 1, 0.3, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

function AnimatedSection({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ── animated counter ──────────────────────────────── */
function CountUp({ value, duration = 1.5, delay = 0.6 }: { value: number; duration?: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => {
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - start) / (duration * 1000), 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(eased * value));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [inView, value, duration, delay]);

  return <span ref={ref}>{display}</span>;
}


/* ── highlights fallback data ──────────────────────── */
const defaultHighlights = [
  { title: "Design.", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { title: "Tecnologia.", description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { title: "Performance.", description: "Ut enim ad minim veniam, quis nostrud exercitation." },
  { title: "Acabamento.", description: "Duis aute irure dolor in reprehenderit in voluptate velit." },
];

/* ═══════════════════════════════════════════════════════
   SECTION 1 — HERO (Porsche-style warm gray bg)
   ═══════════════════════════════════════════════════════ */
function HeroSection({ product, isMobile }: { product: Product; isMobile: boolean }) {
  /* Nomes longos (ex.: EF7 Odery Eyedentity Hybrid) estouram a linha no tamanho padr\u00e3o. */
  const longName = product.name.length > 16;
  return (
    <section
      style={{
        background: "#ffffff",
        position: "relative",
        overflow: isMobile ? "hidden" : "visible",
        padding: "clamp(5rem, 10vh, 8rem) clamp(1.5rem, 6vw, 6rem) 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Background — video covering top half of hero */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: isMobile ? "42vh" : "58vh",
          background: "#0a0a0a",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {(product.slug.startsWith("ef2-") || product.slug === "ef5-v2") ? (
          (isMobile || isLowPowerDevice()) ? (
            /* Fallback estático do fundo de partículas — sem canvas nem blur animado */
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.9,
                background:
                  "radial-gradient(60% 70% at 50% 0%, rgba(124,145,182,0.28) 0%, rgba(124,145,182,0.08) 45%, transparent 75%)",
              }}
            />
          ) : (
            <div style={{ position: "absolute", inset: 0, opacity: 0.9 }}>
              <ParticleHeroBackground />
            </div>
          )
        ) : isMobile ? (
          <img
            src="/assets/video/hero-bg-poster.jpg"
            alt=""
            aria-hidden="true"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.3 }}
          />
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/video/hero-bg-poster.jpg"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.3 }}
          >
            <source src="/assets/video/hero-bg.mp4" type="video/mp4" />
          </video>
        )}
      </div>
      {/* Model name above the product */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease }}
        style={{
          position: "absolute",
          top: isMobile ? "clamp(8rem, 15vh, 11rem)" : "clamp(5.5rem, 11vh, 9rem)",
          left: 0,
          right: 0,
          zIndex: 1,
          textAlign: "center",
          fontSize: longName
            ? (isMobile ? "clamp(1.25rem, 6.4vw, 2.2rem)" : "clamp(2.2rem, 5.2vw, 4.6rem)")
            : (isMobile ? "clamp(2.8rem, 14vw, 5rem)" : "clamp(4rem, 10vw, 9rem)"),
          fontWeight: 800,
          fontStyle: "italic",
          color: "rgba(255,255,255,0.9)",
          lineHeight: 1,
          userSelect: "none",
          whiteSpace: isMobile ? "normal" : "nowrap",
          letterSpacing: "-0.04em",
          pointerEvents: "none",
        }}
      >
        {product.name}
        {product.subtitle && (
          <div style={{
            fontSize: "clamp(0.9rem, 1.8vw, 1.5rem)",
            fontWeight: 400,
            fontStyle: "normal",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
            marginTop: isMobile ? "3.5em" : "0.4em",
          }}>
            {product.subtitle}
          </div>
        )}
      </motion.div>

      {/* PBO background — fades out over 3s */}
      <motion.img
        src="/assets/images/brand/pbo-bco.webp"
        aria-hidden
        initial={{ opacity: 0.85 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
        style={{
          position: "absolute",
          top: isMobile ? "55%" : "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "clamp(322px, 63vw, 828px)",
          objectFit: "contain",
          zIndex: 1,
          pointerEvents: "none",
          mixBlendMode: "screen",
        }}
      />

      {/* Product image */}
      <div style={{ overflow: "hidden", width: "100%", display: "flex", justifyContent: "center" }}>
        <motion.img
          src={product.heroImage}
          alt={product.name}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.15 }}
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: product.slug === "ef2-v4" ? (isMobile ? "min(160vw, 910px)" : "min(65vw, 910px)") : product.slug === "ef2-v2" ? (isMobile ? "min(160vw, 1127px)" : "min(80vw, 1127px)") : product.slug === "ef5-v2" ? (isMobile ? "min(130vw, 1024px)" : "min(73vw, 1024px)") : product.slug === "ef2-v3" ? (isMobile ? "min(160vw, 1260px)" : "min(90vw, 1260px)") : product.slug === "ef2-v1" ? (isMobile ? "min(160vw, 1400px)" : "min(100vw, 1400px)") : "min(80vw, 1100px)",
            width: product.slug === "ef2-v4" ? (isMobile ? "110%" : "65%") : product.slug === "ef2-v2" ? (isMobile ? "160%" : "80%") : product.slug === "ef5-v2" ? (isMobile ? "90%" : "73%") : product.slug === "ef2-v3" ? (isMobile ? "160%" : "90%") : product.slug === "ef2-v1" ? (isMobile ? "160%" : "100%") : "75%",
            marginTop: product.slug === "ef2-v4" ? (isMobile ? "clamp(8rem, 15vh, 11rem)" : "clamp(7rem, 11vh, 10rem)") : product.slug === "ef2-v2" ? (isMobile ? "clamp(8rem, 15vh, 11rem)" : "clamp(8rem, 14vh, 12rem)") : product.slug === "ef5-v2" ? (isMobile ? "clamp(10rem, 16vh, 13rem)" : "clamp(6rem, 10vh, 9rem)") : product.slug === "ef2-v1" ? (isMobile ? "clamp(8rem, 15vh, 11rem)" : "clamp(5rem, 9vh, 8rem)") : product.slug === "ef2-v3" ? (isMobile ? "clamp(5rem, 9vh, 8rem)" : "clamp(0rem, 2vh, 1.5rem)") : "clamp(2rem, 5vh, 4rem)",
            objectFit: "contain",
            filter: isMobile ? "none" : "drop-shadow(0 30px 60px rgba(0,0,0,0.15))",
          }}
          fetchPriority="high"
        />
      </div>

    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 2 — KEY SPECS (left specs, right aerial image)
   ═══════════════════════════════════════════════════════ */
function KeySpecsSection({ product, isMobile }: { product: Product; isMobile: boolean }) {
  const { t } = useTranslation();
  const [showTechPanel, setShowTechPanel] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const translateSpecLabel = (label: string) => {
    const map: Record<string, string> = {
      'sons': t('home.stats.sounds'),
      'kits\ncustomizáveis': t('home.stats.kits'),
      'kits customizáveis': t('home.stats.kits'),
      'tipos de reverb': t('home.stats.reverbs'),
      'tipos de\nreverb': t('home.stats.reverbs'),
      'módulo': t('home.stats.module'),
      'play alongs': 'Play Alongs',
    };
    return map[label.toLowerCase()] ?? label;
  };
  // Use PNG transparent if available, otherwise aerial/hero
  const hasNobg = product.galleryImages.some(img => img.includes("nobg"));
  const aerialImage = hasNobg
    ? product.galleryImages.find(img => img.includes("nobg"))!
    : product.galleryImages[1] || product.heroImage;
  const specs = product.specsHighlight.slice(0, 3);

  return (
    <section
      style={{
        background: "#fff",
        padding: "clamp(3rem, 6vh, 5rem) clamp(1.5rem, 6vw, 6rem)",
      }}
    >
      <AnimatedSection>
        <div
          style={{
            maxWidth: "1300px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr",
            gap: isMobile ? "0.5rem" : "clamp(1rem, 3vw, 2rem)",
            alignItems: "center",
          }}
        >
          {/* Left: specs */}
          <div style={{ display: "flex", flexDirection: isMobile ? "row" : "column", gap: isMobile ? "clamp(1.5rem, 5vw, 3rem)" : "clamp(2rem, 4vh, 3.5rem)", marginLeft: 0, paddingRight: isMobile ? "0" : "clamp(1rem, 2vw, 2rem)", position: "relative", zIndex: 5 }}>
            {specs.map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontSize: isMobile ? "clamp(1.8rem, 9vw, 3rem)" : "clamp(3rem, 8vw, 6rem)",
                    fontWeight: 300,
                    color: "#0a0a0a",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {/^\d+$/.test(s.value) ? <CountUp value={parseInt(s.value)} /> : s.value}
                  {s.unit && <span style={{ fontSize: "0.4em", marginLeft: "4px" }}>{s.unit}</span>}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "rgba(0,0,0,0.5)",
                    marginTop: "4px",
                    fontWeight: 400,
                  }}
                >
                  {translateSpecLabel(s.label)}
                </div>
              </div>
            ))}

          </div>

          {/* Right: product image — LARGE */}
          <div style={{ overflow: "visible", marginTop: isMobile ? 0 : "-2rem", marginBottom: isMobile ? 0 : "-2rem" }}>
            <img
              src={product.specsImage ?? aerialImage}
              alt={`${product.name} view`}
              style={isMobile
                ? { width: "100%", objectFit: "contain", transform: product.slug === "ef2-v2" ? "scale(1.8) translateY(15%)" : "none" }
                : product.slug === "ef2-v4"
                ? { width: "97%", maxWidth: "none", objectFit: "contain", marginLeft: "1.5%", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.1))" }
                : product.slug === "ef2-v2"
                  ? { width: isMobile ? "160%" : "170%", maxWidth: "none", objectFit: "contain", marginLeft: isMobile ? "-30%" : "-34%", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.1))" }
                  : product.slug === "ef2-v1"
                  ? { width: "85%", maxWidth: "none", objectFit: "contain", marginLeft: "7.5%", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.1))" }
                  : product.slug === "ef2-v3"
                  ? { width: "105%", maxWidth: "none", objectFit: "contain", marginLeft: "-2%", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.1))" }
                  : product.slug === "ef5-v2"
                  ? { width: "112%", maxWidth: "none", objectFit: "contain", marginLeft: "-16%", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.1))" }
                  : product.slug === "ef7-eye-hybrid"
                  ? { width: "112%", maxWidth: "none", objectFit: "contain", marginLeft: "-10%", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.1))" }
                  : { width: "200%", maxWidth: "none", objectFit: "contain", marginLeft: "-50%", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.1))" }
              }
              loading="lazy"
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Technical details panel — Porsche style */}
      <AnimatePresence>
      {showTechPanel && (
        <motion.div
          key="tech-panel-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            display: "flex",
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowTechPanel(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              backdropFilter: isMobile ? "none" : "blur(12px)",
            }}
          />
          {/* Panel — slides in from right */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "relative",
              marginLeft: "auto",
              width: "min(600px, 90vw)",
              height: "100%",
              background: "#fff",
              overflowY: "auto",
              padding: "clamp(2rem, 4vw, 3rem)",
              boxShadow: "-4px 0 20px rgba(0,0,0,0.15)",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
              <div>
                <div style={{ fontSize: "14px", color: "rgba(0,0,0,0.5)" }}>{product.name}</div>
                <div style={{ fontSize: "20px", fontWeight: 700, color: "#0a0a0a" }}>Dados t&eacute;cnicos</div>
              </div>
              <button
                onClick={() => setShowTechPanel(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "#0a0a0a",
                  padding: "8px",
                }}
              >
                &times;
              </button>
            </div>

            {/* Product image */}
            <div style={{ background: "#f5f5f5", borderRadius: "8px", padding: "2rem", marginBottom: "1.5rem", display: "flex", justifyContent: "center" }}>
              <img
                src={product.heroImage}
                alt={product.name}
                style={{ maxHeight: "200px", objectFit: "contain" }}
              />
            </div>

            {/* Specs overview card */}
            <div style={{ background: "#f5f5f5", borderRadius: "8px", padding: "1.5rem", marginBottom: "2rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                {product.specsHighlight.map((s) => (
                  <div key={s.label}>
                    <div style={{ fontSize: "12px", color: "rgba(0,0,0,0.5)", marginBottom: "4px" }}>{s.label}</div>
                    <div style={{ fontSize: "20px", fontWeight: 700, color: "#0a0a0a" }}>
                      {s.value} {s.unit || ""}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Accordion sections */}
            {[
              {
                title: "Módulo",
                items: [
                  ["Modelo", product.specsHighlight.find(s => s.label === "Módulo")?.value || "—"],
                  ["Sons", product.specsHighlight.find(s => s.label === "Sons")?.value || "—"],
                  ["Faixas de acompanhamento", product.specsHighlight.find(s => s.label === "Faixas")?.value || "—"],
                  ["Display", "LCD"],
                  ["Conexão USB", "Sim"],
                  ["MIDI", "USB-MIDI"],
                ],
              },
              {
                title: "Pads",
                items: [
                  ["Total de pads", product.specsHighlight.find(s => s.label === "Pads")?.value || "—"],
                  ["Snare", "8\" dual-zone mesh"],
                  ["Toms", "8\" mesh"],
                  ["Kick", "Pedal pad"],
                  ["Hi-hat", "10\" com pedal"],
                  ["Crash", "10\""],
                  ["Ride", "12\""],
                ],
              },
              {
                title: "Conectividade",
                items: [
                  ["Saída de áudio", "P10 estéreo (L/R)"],
                  ["Fone de ouvido", "P10 estéreo"],
                  ["USB", "Tipo B"],
                  ["Aux In", "P2 estéreo"],
                ],
              },
              {
                title: "Estrutura",
                items: [
                  ["Material do rack", "Aço tubular"],
                  ["Peso", "~25 kg"],
                  ["Alimentação", "Fonte DC 9V"],
                ],
              },
            ].map((section) => (
              <div key={section.title} style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}>
                <button
                  onClick={() => setOpenAccordion(openAccordion === section.title ? null : section.title)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1.25rem 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#0a0a0a",
                  }}
                >
                  {section.title}
                  <span style={{ fontSize: "18px", fontWeight: 300 }}>
                    {openAccordion === section.title ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence>
                {openAccordion === section.title && (
                  <motion.div
                    key={section.title + "-content"}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: "hidden", paddingBottom: "1.25rem" }}
                  >
                    {section.items.map(([label, value], idx) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.25, delay: idx * 0.04 }}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "8px 0",
                          fontSize: "14px",
                          borderBottom: "1px solid rgba(0,0,0,0.05)",
                        }}
                      >
                        <span style={{ color: "rgba(0,0,0,0.6)" }}>{label}</span>
                        <span style={{ fontWeight: 500, color: "#0a0a0a" }}>{value}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 4+5 — EDITORIAL: Porsche Boxster style
   Two photos side-by-side, right photo extends down,
   text on the left below the photos
   ═══════════════════════════════════════════════════════ */
function EditorialSection({ product, isMobile }: { product: Product; isMobile: boolean }) {
  const rightImage = product.editorialVerticalImage || "/assets/images/kits/ef2v3/ef2v3-closeup-logo.webp";
  const bottomImage = product.editorialHorizontalImage || "/assets/images/kits/ef2v3/ef2v3-closeup-trigger.webp";
  const headline = product.editorialHeadline || "Projetado para quem vive a m\u00fasica.";
  const body =
    product.editorialBody ||
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.";

  const rightImgRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: rightImgRef, offset: ["start end", "end start"] });
  const rightY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [80, -80]);

  const loopVideo = product.editorialLoopVideo || "/assets/video/hero-loop.mp4";
  const loopPoster = product.editorialLoopPoster || "/assets/video/hero-poster.jpg";
  /* Quando definido, o loop aparece pequeno e centralizado, na propor\u00e7\u00e3o dele. */
  const loopWidth = product.editorialLoopMaxWidth;

  const bottomImgRef = useRef(null);
  const { scrollYProgress: bottomProgress } = useScroll({ target: bottomImgRef, offset: ["start end", "end start"] });
  const bottomX = useTransform(bottomProgress, [0, 1], isMobile ? [0, 0] : [-80, 80]);

  return (
    <section style={{ background: "#fff", position: "relative" }}>
      {/* Large italic model logo */}
      <AnimatedSection>
        <div
          style={{
            textAlign: "center",
            fontSize: product.name.length > 16 ? "clamp(2rem, 6vw, 5rem)" : "clamp(4rem, 12vw, 10rem)",
            fontWeight: 800,
            fontStyle: "italic",
            color: "#0a0a0a",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            padding: "clamp(2rem, 4vh, 3rem) 0 clamp(1rem, 2vh, 2rem) 0",
          }}
        >
          {product.name}
        </div>
      </AnimatedSection>

      {/* Main photo — taller, narrower, with black bg starting at 50% */}
      <div
        style={{
          position: "relative",
          background: "linear-gradient(to bottom, #ffffff 50%, #0a0a0a 50%)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(1.5rem, 6vw, 6rem)", overflow: "hidden", borderRadius: "20px", ...(loopWidth ? { display: "flex", justifyContent: "center" } : {}) }}>
          {isMobile ? (
            <img
              src={loopPoster}
              alt=""
              aria-hidden="true"
              style={{
                width: loopWidth ?? "100%",
                height: loopWidth ? "auto" : "clamp(200px, 55vw, 350px)",
                objectFit: "cover",
                display: "block",
                position: "relative",
                zIndex: 1,
                borderRadius: "12px",
              }}
            />
          ) : (
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={loopPoster}
              style={{
                width: loopWidth ?? "100%",
                height: loopWidth ? "auto" : "clamp(400px, 50vw, 700px)",
                objectFit: "cover",
                display: "block",
                position: "relative",
                zIndex: 1,
                borderRadius: "12px",
              }}
            >
              <source key={loopVideo} src={loopVideo} type="video/mp4" />
            </video>
          )}
        </div>
      </div>

      {/* Bottom row: text left + smaller photo right — black bg */}
      <div style={{ background: "#0a0a0a", paddingBottom: isMobile ? "clamp(2rem, 4vh, 3rem)" : 0 }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: isMobile ? "clamp(2rem, 4vh, 3rem) clamp(1rem, 4vw, 2rem) 0" : product.slug === "ef5-v2" ? "clamp(10rem, 18vh, 14rem) clamp(1.5rem, 6vw, 6rem) clamp(3rem, 6vh, 5rem)" : "clamp(7rem, 14vh, 11rem) clamp(1.5rem, 6vw, 6rem) clamp(3rem, 6vh, 5rem)",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "clamp(2rem, 5vw, 4rem)",
            alignItems: "start",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{ fontSize: "clamp(0.7rem, 0.85vw, 0.8rem)", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#E8500A", margin: "0 0 0.75rem 0" }}>DNA</p>
            <h2
              style={{
                fontSize: "clamp(1.6rem, 2.8vw, 2.6rem)",
                fontWeight: 400,
                color: "#ffffff",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                margin: "0 0 clamp(1rem, 2vh, 1.5rem) 0",
              }}
            >
              {headline}
            </h2>
            <p
              style={{
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {body}
            </p>
          </motion.div>

          <motion.div ref={rightImgRef} style={{ borderRadius: "16px", position: "relative", zIndex: 2, marginLeft: isMobile ? 0 : "clamp(0%, 10vw, 25%)", marginTop: isMobile ? "1.5rem" : "clamp(-8rem, -10vw, -12rem)", marginRight: isMobile ? 0 : "clamp(-6rem, -10vw, -14rem)", y: rightY }}>
            <img
              src={rightImage}
              alt={`${product.name} detail`}
              style={{ width: isMobile ? "100%" : "180%", height: isMobile ? "clamp(220px, 55vw, 320px)" : "clamp(500px, 30vw, 650px)", objectFit: "cover", borderRadius: "16px" }}
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Second large photo — half black, half white bg */}
        {!isMobile && <div style={{ background: "linear-gradient(to bottom, #0a0a0a 50%, #ffffff 50%)", overflow: "hidden" }}>
          <motion.div ref={bottomImgRef} style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(1.5rem, 6vw, 6rem) clamp(3rem, 6vh, 4rem)", x: bottomX }}>
            <img
              src={bottomImage}
              alt={`${product.name} lifestyle`}
              loading="lazy"
              style={{
                width: "100%",
                display: "block",
                marginLeft: isMobile ? 0 : "clamp(-15rem, -10vw, 0px)",
                marginTop: "-3rem",
                position: "relative",
                zIndex: 10,
                height: isMobile ? "clamp(180px, 50vw, 280px)" : "clamp(300px, 35vw, 450px)",
                objectFit: "cover",
                borderRadius: "12px",
                marginBottom: "3rem",
              }}
            />
          </motion.div>
        </div>}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION 6 — HIGHLIGHTS CAROUSEL
   ═══════════════════════════════════════════════════════ */
const CARD_WIDTHS = [
  "clamp(280px, 80vw, 660px)",
  "clamp(300px, 85vw, 820px)",
  "clamp(260px, 75vw, 560px)",
  "clamp(290px, 82vw, 750px)",
  "clamp(275px, 78vw, 700px)",
  "clamp(265px, 76vw, 620px)",
];

function HighlightCard({ card, cardHeight, index = 0, isMobile }: { card: { image: string; title: string; description: string; objectFit?: "cover" | "contain"; objectPosition?: string; cardWidth?: string; scale?: number; link?: { label: string; href: string } }, cardHeight: string, index?: number, isMobile?: boolean }) {
  const { t } = useTranslation();
  const width = isMobile ? "min(85vw, 420px)" : (card.cardWidth ?? CARD_WIDTHS[index % CARD_WIDTHS.length]);
  return (
    <div
      style={{
        flex: "0 0 auto",
        position: "relative",
        overflow: "hidden",
        borderRadius: "12px",
        width,
        height: cardHeight,
      }}
    >
      <img
        src={card.image}
        alt={card.title}
        draggable={false}
        style={{
          width: "100%",
          height: cardHeight,
          objectFit: card.objectFit ?? "cover",
          objectPosition: card.objectPosition ?? "center",
          display: "block",
          pointerEvents: "none",
          borderRadius: "12px",
          background: card.objectFit === "contain" ? "#f5f5f5" : undefined,
          ...(card.scale != null ? { transform: `scale(${card.scale})`, transformOrigin: card.objectPosition ?? "center" } : {}),
        }}
        loading="lazy"
      />
      {(card.title || card.description) && (
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
          padding: "clamp(1.5rem, 3vw, 2.5rem) 1.5rem 1.5rem",
        }}
      >
        <div style={{ maxWidth: "350px" }}>
          <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "clamp(1rem, 1.6vw, 1.35rem)", margin: "0 0 0.4rem 0" }}>
            {card.title}
          </h3>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "clamp(0.75rem, 0.9vw, 0.85rem)", lineHeight: 1.5, margin: 0 }}>
            {card.description}
            {card.link && (
              <a
                href={card.link.href}
                style={{ display: "inline-block", marginTop: "0.5rem", color: "#ff4a1c", fontWeight: 600, fontSize: "clamp(0.75rem, 0.9vw, 0.85rem)", textDecoration: "none" }}
                onClick={e => e.stopPropagation()}
              >
                {t('product.learnMore')} →
              </a>
            )}
          </p>
        </div>
      </div>
      )}
    </div>
  );
}

function HighlightsCarousel({ product, isMobile }: { product: Product; isMobile: boolean }) {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);

  /* Build cards from product highlights or gallery + fallback text */
  const cards = (() => {
    if (product.highlights && product.highlights.length > 0) {
      return product.highlights;
    }
    /* Fallback: use the DETAIL images (index 3+) from gallery, skip full-kit shots */
    const detailImages = product.galleryImages.filter(img => img.includes("detail") || img.includes("studio"));
    const imgs = detailImages.length >= 4 ? detailImages.slice(0, 4) : product.galleryImages.slice(-4);
    return imgs.map((img, i) => ({
      image: img,
      title: defaultHighlights[i]?.title || `Feature ${i + 1}.`,
      description: defaultHighlights[i]?.description || "",
      objectFit: undefined as "cover" | "contain" | undefined,
    }));
  })();

  if (cards.length === 0) return null;

  const twoRows = cards.length >= 8;
  const mid = Math.ceil(cards.length / 2);
  const row1 = twoRows ? cards.slice(0, mid) : cards;
  const row2 = twoRows ? cards.slice(mid) : [];
  const tallCards = product.slug === "ef7-eye-hybrid";
  const cardHeight = isMobile
    ? (tallCards ? "clamp(280px, 70vw, 400px)" : "clamp(220px, 55vw, 320px)")
    : (tallCards ? "clamp(420px, 46vw, 620px)" : "clamp(350px, 40vw, 500px)");

  const scrollBoth = (delta: number) => {
    scrollRef.current?.scrollBy({ left: delta, behavior: "smooth" });
    scrollRef2.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  const makeMouseDown = (refs: React.RefObject<HTMLDivElement | null>[]) => (e: React.MouseEvent) => {
    e.preventDefault();
    refs.forEach(r => {
      if (!r.current) return;
      r.current.style.cursor = "grabbing";
      r.current.style.scrollBehavior = "auto";
      r.current.style.scrollSnapType = "none";
    });
    const startX = e.pageX;
    const startScrolls = refs.map(r => r.current?.scrollLeft ?? 0);
    const onMove = (ev: MouseEvent) => {
      ev.preventDefault();
      refs.forEach((r, idx) => {
        if (!r.current) return;
        r.current.scrollLeft = startScrolls[idx] - (ev.pageX - startX);
      });
    };
    const onUp = () => {
      refs.forEach(r => {
        if (!r.current) return;
        r.current.style.cursor = "grab";
        r.current.style.scrollBehavior = "smooth";
        r.current.style.scrollSnapType = "none";
      });
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const rowStyle = {
    display: "flex",
    gap: "clamp(16px, 2vw, 28px)",
    overflowX: "auto" as const,
    paddingLeft: isMobile ? "1rem" : "clamp(3rem, 6vw, 6rem)",
    paddingRight: isMobile ? "1rem" : "clamp(3rem, 6vw, 6rem)",
    paddingBottom: "0.5rem",
    scrollBehavior: "smooth" as const,
    cursor: "grab",
    userSelect: "none" as const,
  };

  return (
    <section style={{ background: "#fff", padding: "clamp(5rem, 12vh, 10rem) 0" }}>
      <AnimatedSection>
        <h2
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            fontWeight: 700,
            color: "#0a0a0a",
            margin: "0 0 1rem 0",
            paddingLeft: "clamp(1.5rem, 6vw, 6rem)",
          }}
        >
          {t('product.highlightsOf')} {product.name}.
        </h2>

        {/* Arrow navigation */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", paddingRight: "clamp(1.5rem, 6vw, 6rem)", marginBottom: "clamp(1.5rem, 3vh, 2rem)" }}>
          <button
            onClick={() => scrollBoth(-400)}
            style={{ background: "none", border: "1px solid rgba(0,0,0,0.2)", width: "40px", height: "40px", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}
            aria-label={t('product.previous')}
          >←</button>
          <button
            onClick={() => scrollBoth(400)}
            style={{ background: "none", border: "1px solid rgba(0,0,0,0.2)", width: "40px", height: "40px", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}
            aria-label={t('product.next')}
          >→</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(12px, 1.5vw, 20px)" }}>
          {/* Row 1 */}
          <div
            ref={scrollRef}
            style={rowStyle}
            className="no-scrollbar scrollbar-light"
            onMouseDown={makeMouseDown([scrollRef, scrollRef2])}
          >
            {row1.map((card, i) => (
              <HighlightCard key={i} card={card} cardHeight={cardHeight} index={i} isMobile={isMobile} />
            ))}
          </div>

          {/* Row 2 (only when twoRows) */}
          {twoRows && (
            <div
              ref={scrollRef2}
              style={rowStyle}
              className="no-scrollbar scrollbar-light"
              onMouseDown={makeMouseDown([scrollRef, scrollRef2])}
            >
              {row2.map((card, i) => (
                <HighlightCard key={i} card={card} cardHeight={cardHeight} index={i + mid} isMobile={isMobile} />
              ))}
            </div>
          )}
        </div>
      </AnimatedSection>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════ */
export default function ProductDetailPage() {
  const { model, lang } = useParams();
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get("preview") === "1";
  const { t } = useTranslation();
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const isMobile = useIsMobile();

  const rawProduct = getProductBySlug(model || "");
  const product = useTranslatedProduct(rawProduct);

  if (!product) {
    return <Navigate to={`/${lang}/line`} replace />;
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `https://eforcedrums.com${product.heroImage}`,
    sku: product.id,
    brand: { "@type": "Brand", name: "E-Force" },
  };

  /* P\u00e1ginas prontas, mas ainda n\u00e3o publicadas.
     Abrir com ?preview=1 mostra a p\u00e1gina completa para revis\u00e3o interna. */
  const COMING_SOON_IDS = ["ef7eye"];
  if (COMING_SOON_IDS.includes(product.id) && !isPreview) {
    return (
      <>
        <SEO title={`${product.name} | E-Force`} description={product.description} lang={lang ?? "en"} path={`/kits/${product.slug}`} schema={productSchema} />
        <section style={{ background: "#0a0a0a", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
          <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: "#ff4a1c" }}>{t('coming_soon')}</span>
          <h1 style={{ fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 800, color: "#fff", lineHeight: 0.92, letterSpacing: "-0.04em", marginTop: "1rem", marginBottom: "1.5rem" }}>
            {product.name}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)", maxWidth: "480px", lineHeight: 1.7 }}>
            {product.description}
          </p>
          <Link to={`/${lang}/line`} style={{ marginTop: "2.5rem", display: "inline-block", fontSize: "13px", fontWeight: 600, color: "#fff", border: "1px solid rgba(255,255,255,0.2)", padding: "14px 32px", letterSpacing: "0.05em", textDecoration: "none" }}>
            ← {t('product.viewAllModels')}
          </Link>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${product.name} | E-Force`}
        description={product.description}
        image={product.heroImage}
        lang={lang ?? "en"}
        path={`/kits/${product.slug}`}
        schema={{
          ...productSchema,
          offers: {
            "@type": "Offer",
            url: `https://eforcedrums.com/${lang ?? "en"}/kits/${product.slug}`,
            priceCurrency: "BRL",
            price: product.priceValue,
          },
        }}
      />

      <div className="bg-white min-h-screen">
          {/* Section 3: Sticky context bar (appears on scroll) */}
          <StickyContextBar
            product={product}
            onSwitchModel={() => setSwitcherOpen(true)}
          />

          {/* Section 1: Hero */}
          <HeroSection product={product} isMobile={isMobile} />

          {/* Section 2: Key Specs */}
          <KeySpecsSection product={product} isMobile={isMobile} />


          {/* Intro text — driven by product.introLines */}
          {product.introLines && product.introLines.length > 0 && (() => {
            const pStyle: React.CSSProperties = { fontSize: "clamp(1.15rem, 1.6vw, 1.5rem)", fontWeight: 400, fontStyle: "normal", color: "#111", lineHeight: 1.7, margin: 0 };
            const pStyleMt: React.CSSProperties = { ...pStyle, marginTop: "1.2rem" };
            return (
              <section style={{ background: "#fff", padding: "clamp(2.5rem, 5vh, 4rem) clamp(1.5rem, 6vw, 6rem)" }}>
                <AnimatedSection style={{ textAlign: "center" }}>
                  {product.introLines.map((line, i) => (
                    <p key={i} style={i === 0 ? pStyle : pStyleMt}>{line}</p>
                  ))}
                  <p style={{ fontSize: "clamp(1.15rem, 1.6vw, 1.5rem)", fontWeight: 400, color: "rgba(17,17,17,0.9)", lineHeight: 1.7, marginTop: "1.5rem" }}>
                    {t('product.techFooter')}
                  </p>
                </AnimatedSection>
              </section>
            );
          })()}

          {/* Foto do kit logo após o texto introdutório */}
          {product.introImage && (
            <section style={{ background: "#fff", padding: "0 clamp(1.5rem, 6vw, 6rem) clamp(2rem, 4vh, 3.5rem)" }}>
              <AnimatedSection style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={product.introImage}
                  alt={product.name}
                  loading="lazy"
                  style={{ width: "100%", maxWidth: "1100px", display: "block", objectFit: "contain" }}
                />
              </AnimatedSection>
            </section>
          )}

          {/* Finish gallery */}
          {product.finishGallery && product.finishGallery.length > 0 && (
            <section style={{ background: "#fff", padding: "clamp(2rem, 4vh, 3.5rem) clamp(1.5rem, 6vw, 6rem)" }}>
              <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <p style={{ fontSize: "clamp(1.2rem, 2vw, 1.8rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#111", marginBottom: "clamp(1.5rem, 3vh, 2.5rem)" }}>
                  {t('product.availableFinishes')}
                </p>
                {product.finishGallery.length === 1 && product.finishGallery[0].image ? (
                  <img
                    src={product.finishGallery[0].image}
                    alt={product.finishGallery[0].label || `${product.name} acabamentos`}
                    style={{ width: "100%", display: "block", objectFit: "contain" }}
                  />
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : `repeat(${Math.min(product.finishGallery!.length, 3)}, 1fr)`, gap: "clamp(1rem, 2vw, 2rem)", maxWidth: product.finishGallery!.length < 3 ? "860px" : undefined }}>
                    {product.finishGallery.map((finish, fi) => {
                      const label = finish.labelKey ? t(finish.labelKey) : finish.label;
                      return (
                      <div key={finish.labelKey || finish.label || fi} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        <div style={{ aspectRatio: "3 / 2", background: "#fff", borderRadius: "4px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {finish.image ? (
                            <img src={finish.image} alt={label} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                          ) : (
                            <span style={{ fontSize: "clamp(0.75rem, 1vw, 0.9rem)", color: "rgba(0,0,0,0.25)", letterSpacing: "0.05em" }}>{t('coming_soon')}</span>
                          )}
                        </div>
                        {label && <p style={{ margin: 0, textAlign: "center", fontSize: "clamp(0.8rem, 1vw, 0.95rem)", fontWeight: 600, color: "#111", letterSpacing: "-0.01em" }}>{label}</p>}
                      </div>
                      );
                    })}
                  </div>
                )}

              </div>
            </section>
          )}

          {/* Section 4+5: Editorial — horizontal photo + vertical overlap + text */}
          <EditorialSection product={product} isMobile={isMobile} />

          {/* Full drum kit image between editorial and highlights */}
          {(product.fullKitImage || product.galleryImages.length > 0) && (
          <section style={{ background: "#ffffff", padding: "clamp(1rem, 3vh, 2.5rem) 0 clamp(1rem, 3vh, 2.5rem) clamp(1.5rem, 6vw, 6rem)", display: "flex", justifyContent: "center", overflow: "hidden" }}>
            {product.kitConfig ? (
              <AnimatedSection style={{ width: "100%", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : (product.slug === "ef5-v2" ? "flex-start" : "center"), gap: "clamp(1.5rem, 4vw, 4rem)", marginRight: isMobile ? 0 : "-2%", justifyContent: isMobile ? undefined : (product.slug === "ef2-v4" ? "center" : undefined) }}>
                <div style={{ flexShrink: 0, paddingLeft: "clamp(1rem, 3vw, 3rem)", paddingTop: product.slug === "ef5-v2" ? "clamp(3rem, 8vh, 7rem)" : undefined, minWidth: 0, width: isMobile ? "100%" : undefined, maxWidth: product.slug === "ef2-v1" ? "680px" : product.slug === "ef5-v2" ? "780px" : "600px" }}>
                  <h3 style={{ fontSize: "clamp(1rem, 1.2vw, 1.25rem)", fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", color: "#333", marginBottom: "1.4rem", whiteSpace: "nowrap" }}>{t('product.kitConfiguration')}</h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                    {product.kitConfig.map((item, i) => (
                      item.startsWith("—") ? (
                        <li key={i} style={{ fontSize: "clamp(1rem, 1.2vw, 1.25rem)", fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", color: "#333", margin: "1.2rem 0 0.8rem", whiteSpace: "nowrap" }}>{item.replace(/^—\s*/, "").replace(/\s*—$/, "")}</li>
                      ) : (
                        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "clamp(0.95rem, 1.15vw, 1.15rem)", fontWeight: 700, color: "#111", lineHeight: 1.5 }}>
                          <span style={{ color: "#E8500A", marginTop: "0.2em", flexShrink: 0 }}>•</span>
                          <span>
                            {item}
                            {item.includes(product.module) && (
                              <>
                                {" "}
                                <Link
                                  to={`/${lang}/technology`}
                                  style={{ color: "#E8500A", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: "0.2em" }}
                                >
                                  ({t('product.accessHere')})
                                </Link>
                              </>
                            )}
                          </span>
                        </li>
                      )
                    ))}
                  </ul>
                </div>
                <img
                  src={product.fullKitImage || product.galleryImages[0]}
                  alt={`${product.name} full angle`}
                  style={{ marginLeft: isMobile ? 0 : (product.slug === "ef2-v1" ? "clamp(1rem, 3vw, 3rem)" : product.slug === "ef2-v3" || product.slug === "ef2-v2" ? "clamp(2rem, 5vw, 5rem)" : product.slug === "ef2-v4" ? "clamp(1.5rem, 3vw, 3rem)" : product.slug === "ef5-v2" ? "calc(-1 * clamp(4rem, 12vw, 16rem))" : "auto"), width: isMobile ? "100%" : (product.slug === "ef2-v1" ? "46%" : product.slug === "ef2-v2" ? "55%" : product.slug === "ef2-v3" ? "50%" : product.slug === "ef2-v4" ? "56%" : product.slug === "ef5-v2" ? "61%" : "68%"), maxWidth: isMobile ? "100%" : (product.slug === "ef2-v1" ? "790px" : product.slug === "ef2-v2" ? "942px" : product.slug === "ef2-v3" ? "858px" : product.slug === "ef2-v4" ? "958px" : product.slug === "ef5-v2" ? "1047px" : "1163px"), display: "block", objectFit: "contain" }}
                />
              </AnimatedSection>
            ) : (
            <AnimatedSection style={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <img
                src={product.fullKitImage || "/assets/images/kits/ef2v3/ef2v3-full-kit.webp"}
                alt={`${product.name} full angle`}
                style={{
                  width: "100%",
                  maxWidth: "1710px",
                  display: "block",
                  objectFit: "contain",
                }}
              />
            </AnimatedSection>
            )}
          </section>
          )}

        {/* Video antes dos destaques */}
        {(["ef5-v2", "ef2-v1", "ef2-v2", "ef2-v3", "ef2-v4", "ef7-eye-hybrid"] as const).includes(product.slug as any) && (() => {
          const videoIds: Record<string, string> = {
            "ef5-v2": "uKXTqqVa-DA",
            "ef2-v1": "Jux50AKrrJw",
            "ef2-v2": "rXeNjRfy7vU",
            "ef2-v3": "YGQdWYZ_d70",
            "ef2-v4": "sk32_ptcBig",
            // Placeholder: o Mauricio ainda vai definir o v\u00eddeo da EF7.
            "ef7-eye-hybrid": "uKXTqqVa-DA",
          };
          return (
            <section style={{ background: "#000", padding: "clamp(2rem, 5vh, 4rem) 0" }}>
              <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(1.5rem, 6vw, 6rem)" }}>
                <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: "4px" }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${videoIds[product.slug]}`}
                    title={product.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                  />
                </div>
              </div>
            </section>
          );
        })()}

        {/* Section 6: Highlights carousel */}
        <HighlightsCarousel product={product} isMobile={isMobile} />

        {/* CTA: todos os modelos */}
        <ModelsCTA />

      </div>

      <ModelSwitcher
        isOpen={switcherOpen}
        onClose={() => setSwitcherOpen(false)}
        currentProduct={product}
      />
    </>
  );
}
