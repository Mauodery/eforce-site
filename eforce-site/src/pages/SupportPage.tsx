import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '@/components/layout/SEO';

const FIRMWARES = [
  {
    name: "EF5 V2",
    img: "/assets/images/kits/ef5v2-manual.webp",
    version: "V1.42",
    date: "2026-09-03",
    file: "EF5_EForce_AddBank_20260903_V1.42.bin",
  },
  {
    name: "EF7 Eye Hybrid",
    img: "/assets/images/kits/ef5v2-manual.webp",
    version: "V1.42",
    date: "2026-09-03",
    file: "EF7_Hybrid_EForce_AddBank_20260903_V1.42.bin",
  },
];

// Vídeo "como atualizar o módulo F50". Aceita um arquivo local
// (/assets/video/...) ou um ID do YouTube. Com os dois vazios a
// seção do vídeo simplesmente não é renderizada.
const F50_UPDATE_VIDEO_SRC = "";
const F50_UPDATE_VIDEO_YOUTUBE_ID = "";

export default function SupportPage() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang ?? 'en';
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <>
      <SEO
        title={`${t('nav.support')} | E-Force`}
        description={t('support.seoDescription')}
        lang={currentLang}
        path="support"
      />

      {/* Divider top spacing */}
      <div style={{ height: "clamp(4rem, 8vh, 6rem)", background: "#0a0a0a" }} />

      {/* Manuais */}
      <section style={{ background: "#0a0a0a", padding: "0 clamp(1.5rem, 6vw, 5rem) clamp(4rem, 8vh, 7rem)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#E8500A", marginBottom: "0.5rem" }}>
            {t('support.manualsLabel')}
          </p>
          <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", marginBottom: "clamp(2rem, 4vh, 3rem)" }}>
            {t('support.manualsHeadline')}
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {[
              { name: "EF2 V1", img: "/assets/images/kits/ef2v1-manual.webp", slug: "ef2v1" },
              { name: "EF2 V2", img: "/assets/images/kits/ef2v2-manual.webp", slug: "ef2v2" },
              { name: "EF2 V3", img: "/assets/images/kits/ef2v3-manual.webp", slug: "ef2v3" },
              { name: "EF2 V4", img: "/assets/images/kits/ef2v4-manual.webp", slug: "ef2v4" },
              { name: "EF5 V2", img: "/assets/images/kits/ef5v2-manual.webp", slug: "ef5v2" },
            ].map((item) => {
              const suffix = currentLang === "pt" ? "" : "-en";
              const href = `/assets/manuais/manual-${item.slug}${suffix}.pdf`;
              return (
              <div
                key={item.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(1.5rem, 4vw, 3rem)",
                  padding: "clamp(1.2rem, 3vh, 2rem) 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ flexShrink: 0, width: "clamp(80px, 12vw, 140px)", height: "clamp(80px, 12vw, 140px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img
                    src={item.img}
                    alt={item.name}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: "clamp(1rem, 1.5vw, 1.25rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
                    {item.name}
                  </p>
                  <p style={{ margin: "0.25rem 0 0", fontSize: "12px", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    {t('support.userManualLabel')}
                  </p>
                </div>
                <DownloadButton href={href} label={t('support.download')} />
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />

      {/* Atualizações */}
      <section style={{ background: "#0a0a0a", padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 6vw, 5rem)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#E8500A", marginBottom: "0.5rem" }}>
            {t('support.updatesLabel')}
          </p>
          <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", marginBottom: "clamp(2rem, 4vh, 3rem)" }}>
            {t('support.updatesHeadline')}
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {FIRMWARES.map((item) => (
              <div
                key={item.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(1.5rem, 4vw, 3rem)",
                  padding: "clamp(1.2rem, 3vh, 2rem) 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ flexShrink: 0, width: "clamp(80px, 12vw, 140px)", height: "clamp(80px, 12vw, 140px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img
                    src={item.img}
                    alt={item.name}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: "clamp(1rem, 1.5vw, 1.25rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
                    {item.name}
                  </p>
                  <p style={{ margin: "0.25rem 0 0", fontSize: "12px", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    {t('support.firmwareLabel')} · {item.version} · {new Date(`${item.date}T00:00:00`).toLocaleDateString(currentLang)}
                  </p>
                </div>
                <DownloadButton href={`/assets/firmware/${item.file}`} label={t('support.download')} />
              </div>
            ))}
          </div>

          {(F50_UPDATE_VIDEO_SRC || F50_UPDATE_VIDEO_YOUTUBE_ID) && (
            <div style={{ marginTop: "clamp(2.5rem, 5vh, 4rem)" }}>
              <h3 style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", margin: "0 0 clamp(1rem, 2vh, 1.5rem)" }}>
                {t('support.updateVideoTitle')}
              </h3>

              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "860px",
                  aspectRatio: "16 / 9",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "#000",
                }}
              >
                {!videoPlaying ? (
                  <button
                    type="button"
                    onClick={() => setVideoPlaying(true)}
                    aria-label={t('support.updateVideoTitle')}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.75rem",
                      border: "none",
                      cursor: "pointer",
                      background: "linear-gradient(135deg, rgba(232,80,10,0.12), rgba(0,0,0,0.9))",
                      color: "#fff",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "64px",
                        height: "64px",
                        borderRadius: "999px",
                        background: "#E8500A",
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                    <span style={{ fontSize: "0.95rem", fontWeight: 600, letterSpacing: "0.02em" }}>
                      {t('support.updateVideoCta')}
                    </span>
                  </button>
                ) : F50_UPDATE_VIDEO_SRC ? (
                  <video
                    src={F50_UPDATE_VIDEO_SRC}
                    controls
                    autoPlay
                    playsInline
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", background: "#000" }}
                  />
                ) : (
                  <iframe
                    src={`https://www.youtube.com/embed/${F50_UPDATE_VIDEO_YOUTUBE_ID}?autoplay=1`}
                    title={t('support.updateVideoTitle')}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />

      {/* Garantia */}
      <section style={{ background: "#0a0a0a", padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 6vw, 5rem)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#E8500A", marginBottom: "0.5rem" }}>
            {t('support.warrantyLabel')}
          </p>
          <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", marginBottom: "clamp(2rem, 4vh, 3rem)" }}>
            {t('support.warrantyHeadline')}
          </h2>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(1.5rem, 4vw, 3rem)",
                padding: "clamp(1.2rem, 3vh, 2rem) 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ flexShrink: 0, width: "clamp(80px, 12vw, 140px)", height: "clamp(80px, 12vw, 140px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.2)" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: "clamp(1rem, 1.5vw, 1.25rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
                  {t('support.warrantyTitle')}
                </p>
                <p style={{ margin: "0.25rem 0 0", fontSize: "12px", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {t('support.warrantyPdfLabel')}
                </p>
              </div>
              <DownloadButton href="/assets/manuais/garantia_eforce.pdf" label={t('support.download')} />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />

      {/* Contato */}
      <section style={{ background: "#0a0a0a", padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 6vw, 5rem)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#E8500A", marginBottom: "0.5rem" }}>
            {t('support.contactLabel')}
          </p>
          <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", marginBottom: "clamp(2rem, 4vh, 3rem)" }}>
            {t('support.contactHeadline')}
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "480px" }}>
            <a
              href="mailto:eforce@odery.com.br"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1.1rem 1.5rem",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                textDecoration: "none",
                transition: "border-color 0.2s, background 0.2s",
                background: "rgba(255,255,255,0.02)",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#E8500A"; (e.currentTarget as HTMLAnchorElement).style.background = "rgba(232,80,10,0.06)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.02)"; }}
            >
              <svg width="22" height="22" fill="none" stroke="rgba(255,255,255,0.6)" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "#fff" }}>eforce@odery.com.br</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function DownloadButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      download
      style={{
        flexShrink: 0,
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        fontSize: "clamp(0.8rem, 1vw, 0.9rem)",
        fontWeight: 600,
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: "4px",
        padding: "0.55rem 1.2rem",
        textDecoration: "none",
        transition: "border-color 0.2s, color 0.2s",
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "#E8500A";
        (e.currentTarget as HTMLAnchorElement).style.color = "#E8500A";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.15)";
        (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
      }}
    >
      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
      </svg>
      {label}
    </a>
  );
}
