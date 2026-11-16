// Os PDFs de suporte (manuais e termo de garantia) em cada língua do site.
// Português é o arquivo sem sufixo; as outras línguas têm o próprio arquivo
// (manual-ef2v1-es.pdf, garantia_eforce-zh.pdf…). Antes, toda língua que não era
// português baixava o "-en", que era uma cópia do português (16/11/2026).
const LINGUAS_COM_PDF = ["en", "es", "it", "de", "zh"];

function sufixo(lang: string | undefined) {
  if (lang === "pt") return "";
  return `-${lang && LINGUAS_COM_PDF.includes(lang) ? lang : "en"}`;
}

export const manualHref = (slug: string, lang: string | undefined) =>
  `/assets/manuais/manual-${slug}${sufixo(lang)}.pdf`;

export const garantiaHref = (lang: string | undefined) =>
  `/assets/manuais/garantia_eforce${sufixo(lang)}.pdf`;
