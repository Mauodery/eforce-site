import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePageTransition } from '@/context/TransitionContext';
import { products } from '@/data/products';

const COMING_SOON: string[] = [];

export function ModelsCTA() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang ?? 'pt';
  const { navigateWithCurtain } = usePageTransition();

  const visibleProducts = products;

  return (
    <section style={{ background: "#0a0a0a", padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 6vw, 5rem)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        <h2 style={{
          fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "-0.03em",
          margin: "0 0 0.75rem 0",
          lineHeight: 1.1,
        }}>
          {t('modelsCta.headline')}
        </h2>
        <p style={{
          fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
          color: "rgba(255,255,255,0.45)",
          lineHeight: 1.7,
          margin: "0 0 clamp(2rem, 5vh, 3.5rem) 0",
          maxWidth: "480px",
          marginLeft: "auto",
          marginRight: "auto",
        }}>
          {t('modelsCta.subtitle')}
        </p>

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(0.5rem, 1.5vw, 1rem)",
          justifyContent: "center",
          alignItems: "center",
        }}>
          {visibleProducts.map((p) => {
            const isComingSoon = COMING_SOON.includes(p.id);
            return isComingSoon ? (
              <span
                key={p.id}
                style={{
                  fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.2)",
                  padding: "0.5rem 1rem",
                  cursor: "default",
                }}
              >
                {p.name}
              </span>
            ) : (
              <button
                key={p.id}
                onClick={() => navigateWithCurtain(`/${currentLang}/kits/${p.slug}`)}
                style={{
                  fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
                  fontWeight: 700,
                  color: "#fff",
                  background: "none",
                  border: "1px solid rgba(255,255,255,0.15)",
                  padding: "0.6rem 1.4rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "border-color 0.2s, color 0.2s",
                  letterSpacing: "-0.01em",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#E8500A";
                  (e.currentTarget as HTMLButtonElement).style.color = "#E8500A";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)";
                  (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                }}
              >
                {p.name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
