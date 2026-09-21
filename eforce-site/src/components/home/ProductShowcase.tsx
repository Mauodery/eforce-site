import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { usePageTransition } from "@/context/TransitionContext";
import { getTranslatedProduct } from "@/hooks/useTranslatedProduct";

const COMING_SOON_IDS = ["ef7v1"];

export default function ProductShowcase() {
  const { lang } = useParams();
  const { t, i18n } = useTranslation();
  const { navigateWithCurtain } = usePageTransition();
  const [isMobile, setIsMobile] = useState(false);

  const translateSpecLabel = (label: string) => {
    const map: Record<string, string> = {
      'sons': t('home.stats.sounds'),
      'kits\ncustomizáveis': t('home.stats.kits'),
      'kits customizáveis': t('home.stats.kits'),
      'tipos de reverb': t('home.stats.reverbs'),
      'tipos de\nreverb': t('home.stats.reverbs'),
      'módulo': t('home.stats.module'),
    };
    return map[label.toLowerCase()] ?? label;
  };
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section>
      {products.map((rawProduct, i) => {
        const product = getTranslatedProduct(rawProduct, i18n.language);
        const isEven = i % 2 === 0;
        const bg = isEven ? "#ffffff" : "#f5f3ef";
        const isComingSoon = COMING_SOON_IDS.includes(product.id);

        return (
          <div key={product.id}>
            {/* Section divider */}
            {i > 0 && (
              <div
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent)",
                  height: "1px",
                }}
              />
            )}

            <div
              onClick={isComingSoon ? undefined : () => navigateWithCurtain(`/${lang}/kits/${product.slug}`)}
              className={`group block ${isComingSoon ? "cursor-default" : "cursor-pointer"}`}
              style={{ background: bg }}
            >
              <div
                style={{
                  padding:
                    "clamp(6rem, 15vh, 12rem) clamp(1.5rem, 6vw, 6rem)",
                }}
                className="max-w-[1400px] mx-auto"
              >
                <div
                  className={`flex flex-col ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center`}
                  style={{ gap: "clamp(2rem, 5vw, 5rem)" }}
                >
                  {/* Product Image — 55% (60% for coming soon) */}
                  <motion.div
                    className={`w-full ${isComingSoon ? "md:w-[60%]" : "md:w-[55%]"} relative`}
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Ambient glow */}
                    <div
                      className="absolute inset-0 -z-10"
                      style={{
                        background:
                          "radial-gradient(ellipse, rgba(255,74,28,0.06) 0%, transparent 70%)",
                      }}
                    />
                    {isComingSoon ? (
                      <img
                        src={product.showcaseImage ?? product.heroImage}
                        alt={product.name}
                        className="w-full object-contain"
                        style={{
                          maxHeight: isMobile ? "clamp(260px, 70vw, 400px)" : "clamp(550px, 85vh, 1000px)",
                          filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))",
                        }}
                        loading={i < 2 ? "eager" : "lazy"}
                      />
                    ) : (
                      <img
                        src={product.showcaseImage ?? product.heroImage}
                        alt={product.name}
                        className="w-full object-contain group-hover:scale-[1.03] group-hover:-translate-y-2"
                        style={{
                          maxHeight: isMobile ? (product.id === "ef2v1" ? "clamp(320px, 90vw, 500px)" : "clamp(260px, 70vw, 400px)") : "clamp(450px, 75vh, 900px)",
                          filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))",
                          transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                          ...(product.id === "ef2v1" && { transform: isMobile ? "scale(1.25)" : "scale(1.75)" }),
                          ...(product.id === "ef2v2" && { transform: isMobile ? "scale(1.20)" : "scale(1.61)" }),
                          ...(product.id === "ef2v3" && { transform: isMobile ? "scale(1.20)" : "scale(1.61)" }),
                          ...(product.id === "ef5v2" && { transform: isMobile ? "scale(1.10)" : "scale(1.55)" }),
                        }}
                        loading={i < 2 ? "eager" : "lazy"}
                      />
                    )}
                  </motion.div>

                  {/* Info — 45% */}
                  <motion.div
                    className={`w-full ${isComingSoon ? "md:w-[40%]" : "md:w-[45%]"} ${
                      isEven ? "" : "md:text-right"
                    }`}
                    style={isComingSoon ? { paddingRight: "0", overflow: "hidden" } : undefined}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      delay: 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {isComingSoon ? (
                      /* Coming soon layout: EM BREVE → números → nome → tagline */
                      <>
                        <h2
                          style={{
                            fontSize: isComingSoon ? (isMobile ? "clamp(1.5rem, 7vw, 2rem)" : "clamp(1.5rem, 3vw, 3.5rem)") : "clamp(2rem, 5vw, 5.5rem)",
                            lineHeight: 0.95,
                            letterSpacing: "-0.04em",
                            fontWeight: 700,
                            color: "#0a0a0a",
                            marginTop: 0,
                            marginBottom: "clamp(1rem, 2vh, 2rem)",
                            whiteSpace: "normal",
                          }}
                        >
                          {(() => {
                            const words = product.name.split(" ");
                            const mid = Math.ceil(words.length / 2);
                            return <>{words.slice(0, mid).join(" ")}<br />{words.slice(mid).join(" ")}</>;
                          })()}
                        </h2>

                        <div style={{ marginBottom: "clamp(1.5rem, 3vh, 3rem)" }}>
                          <span style={{
                            fontSize: "clamp(1.1rem, 2vw, 1.6rem)",
                            fontWeight: 800,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "#ff4a1c",
                          }}>
                            {t("coming_soon")}
                          </span>
                        </div>

                        {product.specsHighlight && product.specsHighlight.length > 0 && (
                          <div
                            className={`flex ${isEven ? "" : "md:justify-end"}`}
                            style={{ gap: "clamp(1.5rem, 4vw, 3rem)", marginTop: 0 }}
                          >
                            {product.specsHighlight.slice(0, 3).map((spec) => (
                              <div key={spec.label}>
                                <div style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.85, color: "#0a0a0a" }}>
                                  {spec.value}
                                </div>
                                <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(0,0,0,0.35)", marginTop: "0.5rem", whiteSpace: "pre-line" }}>
                                  {translateSpecLabel(spec.label)}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <p style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", lineHeight: 1.6, fontWeight: 300, color: "rgba(0,0,0,0.5)", marginTop: "clamp(1.5rem, 3vh, 3rem)", letterSpacing: "-0.01em" }}>
                          {product.tagline}
                        </p>
                      </>
                    ) : (
                      /* Normal layout: nome → tagline → números → badge */
                      <>
                        <h2
                          className="group-hover:text-[#ff4a1c]"
                          style={{
                            fontSize: "clamp(2.8rem, 7vw, 7rem)",
                            lineHeight: 0.92,
                            letterSpacing: "-0.04em",
                            fontWeight: 700,
                            color: "#0a0a0a",
                            transition: "color 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                            marginTop: 0,
                          }}
                        >
                          {product.name}
                        </h2>

                        <p style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", lineHeight: 1.6, fontWeight: 300, color: "rgba(0,0,0,0.5)", marginTop: "clamp(0.5rem, 1.5vh, 1.5rem)", letterSpacing: "-0.01em" }}>
                          {product.tagline}
                        </p>

                        {product.specsHighlight && product.specsHighlight.length > 0 && (
                          <div
                            className={`flex ${isEven ? "" : "md:justify-end"}`}
                            style={{ gap: "clamp(1.5rem, 4vw, 3rem)", marginTop: "clamp(1.5rem, 3vh, 3rem)" }}
                          >
                            {product.specsHighlight.slice(0, 3).map((spec) => (
                              <div key={spec.label}>
                                <div style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.85, color: "#0a0a0a" }}>
                                  {spec.value}
                                </div>
                                <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(0,0,0,0.35)", marginTop: "0.5rem", whiteSpace: "pre-line" }}>
                                  {translateSpecLabel(spec.label)}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div style={{ marginTop: "clamp(1.5rem, 3vh, 3rem)" }}>
                          <span style={{ display: "inline-block", background: "#f0f0f0", color: "#ff4a1c", fontSize: "11px", fontWeight: 600, padding: "6px 14px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                            {product.module}
                          </span>
                        </div>
                      </>
                    )}

                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
