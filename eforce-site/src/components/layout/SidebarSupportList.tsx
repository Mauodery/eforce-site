import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface SidebarSupportListProps {
  onNavigate: () => void;
}

const manuaisData = [
  { name: "EF2 V1", img: "/assets/images/kits/ef2v1-manual.webp", slug: "ef2v1" },
  { name: "EF2 V2", img: "/assets/images/kits/ef2v2-manual.webp", slug: "ef2v2" },
  { name: "EF2 V3", img: "/assets/images/kits/ef2v3-manual.webp", slug: "ef2v3" },
  { name: "EF2 V4", img: "/assets/images/kits/ef2v4-manual.webp", slug: "ef2v4" },
  { name: "EF5 V2", img: "/assets/images/kits/ef5v2-manual.webp", slug: "ef5v2" },
];

const firmwaresData = [
  { name: "EF5 V2", img: "/assets/images/kits/ef5v2-manual.webp", file: "EF5_EForce_AddBank_20260903_V1.42.bin", version: "V1.42" },
  { name: "EF7 Eye Hybrid", img: "/assets/images/kits/ef5v2-manual.webp", file: "EF7_Hybrid_EForce_AddBank_20260903_V1.42.bin", version: "V1.42" },
];

/* Tutorial de atualiza\u00e7\u00e3o do m\u00f3dulo, o mesmo v\u00eddeo da p\u00e1gina de suporte. */
const UPDATE_VIDEO_YOUTUBE_ID = "HCiaGpVNfi8";

function getManualHref(slug: string, lang: string | undefined) {
  const suffix = lang === "pt" ? "" : "-en";
  return `/assets/manuais/manual-${slug}${suffix}.pdf`;
}

export function SidebarSupportList({ onNavigate }: SidebarSupportListProps) {
  const { t } = useTranslation();
  const { lang } = useParams();
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    if (!videoOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setVideoOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [videoOpen]);

  return (
    <div className="flex flex-col gap-10">

      {/* Manuais */}
      <div>
        <Link
          to={`/${lang}/support`}
          onClick={onNavigate}
          className="group block"
        >
          <h3 className="text-gray-900 font-bold text-xl mb-4 group-hover:text-brand-orange transition-colors">
            {t('support.manualsLabel')}
          </h3>
        </Link>
        <div className="flex flex-col gap-3">
          {manuaisData.map((item) => (
            <a
              key={item.name}
              href={getManualHref(item.slug, lang)}
              download
              className="flex items-center gap-3 group"
            >
              <img
                src={item.img}
                alt={item.name}
                loading="lazy"
                className="w-12 h-12 object-contain shrink-0 rounded"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 group-hover:text-brand-orange transition-colors">
                  {item.name}
                </p>
                <p className="text-xs text-gray-400">{t('support.userManualLabel')}</p>
              </div>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-brand-orange transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Atualizações */}
      <div>
        <Link
          to={`/${lang}/support`}
          onClick={onNavigate}
          className="group block"
        >
          <h3 className="text-gray-900 font-bold text-xl mb-4 group-hover:text-brand-orange transition-colors">
            {t('support.updatesLabel')}
          </h3>
        </Link>
        <div className="flex flex-col gap-3">
          {firmwaresData.map((item) => (
            <a
              key={item.name}
              href={`/assets/firmware/${item.file}`}
              download
              className="flex items-center gap-3 group"
            >
              <img
                src={item.img}
                alt={item.name}
                loading="lazy"
                className="w-12 h-12 object-contain shrink-0 rounded"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 group-hover:text-brand-orange transition-colors">
                  {item.name}
                </p>
                <p className="text-xs text-gray-400">{t('support.firmwareLabel')} · {item.version}</p>
              </div>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-brand-orange transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
              </svg>
            </a>
          ))}
        </div>

        {/* Tutorial em v\u00eddeo, abre num pop-up */}
        <button
          type="button"
          onClick={() => setVideoOpen(true)}
          className="mt-4 flex items-center gap-2 text-left text-sm font-semibold text-brand-orange hover:underline"
        >
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM10 8.2l6 3.8-6 3.8V8.2z" />
          </svg>
          {t('support.updateVideoLink')}
        </button>
      </div>

      {videoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t('support.updateVideoLink')}
          onClick={() => setVideoOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 120,
            background: "rgba(0,0,0,0.85)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "clamp(1rem, 4vw, 3rem)",
          }}
        >
          <button
            type="button"
            onClick={() => setVideoOpen(false)}
            aria-label="Fechar"
            style={{
              position: "absolute", top: "1rem", right: "1.25rem",
              background: "none", border: "none", cursor: "pointer",
              color: "#fff", fontSize: "2rem", lineHeight: 1,
            }}
          >
            &times;
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: "100%", maxWidth: "960px" }}
          >
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: "8px" }}>
              <iframe
                src={`https://www.youtube.com/embed/${UPDATE_VIDEO_YOUTUBE_ID}?autoplay=1`}
                title={t('support.updateVideoLink')}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Garantia */}
      <div>
        <h3 className="text-gray-900 font-bold text-xl mb-4">{t('support.warrantyLabel')}</h3>
        <a
          href="/assets/manuais/garantia_eforce.pdf"
          download
          className="flex items-center gap-3 group"
        >
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded shrink-0">
            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 group-hover:text-brand-orange transition-colors">{t('support.warrantyTitle')}</p>
            <p className="text-xs text-gray-400">{t('support.warrantyPdfLabel')}</p>
          </div>
          <svg className="w-4 h-4 text-gray-400 group-hover:text-brand-orange transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
          </svg>
        </a>
      </div>

      {/* Contato */}
      <div>
        <h3 className="text-gray-900 font-bold text-xl mb-4">{t('support.contactLabel')}</h3>
        <div className="flex flex-col gap-3">
          <a
            href="mailto:eforce@odery.com.br"
            onClick={onNavigate}
            className="flex items-center px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors min-w-0"
          >
            <span className="text-gray-700 font-medium text-xs">eforce@odery.com.br</span>
          </a>
        </div>
      </div>

    </div>
  );
}
