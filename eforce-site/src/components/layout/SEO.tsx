import { Helmet } from 'react-helmet-async';
import { supportedLanguages } from '@/i18n';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  lang: string;
  path: string;
  schema?: Record<string, unknown>;
}

const BASE_URL = 'https://eforcedrums.com';

export default function SEO({ title, description, image, lang, path, schema }: SEOProps) {
  const ogImage = image ?? '/assets/images/brand/eforce-og-image.webp';
  const canonicalUrl = `${BASE_URL}/${lang}${path}`;

  const localeMap: Record<string, string> = {
    en: 'en_US',
    pt: 'pt_BR',
    es: 'es_ES',
    it: 'it_IT',
    zh: 'zh_CN',
  };

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${BASE_URL}${ogImage}`} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content={localeMap[lang] ?? 'en_US'} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${BASE_URL}${ogImage}`} />

      <link rel="canonical" href={canonicalUrl} />

      {supportedLanguages.map((sl) => (
        <link
          key={sl.code}
          rel="alternate"
          hrefLang={sl.code}
          href={`${BASE_URL}/${sl.code}${path}`}
        />
      ))}

      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
}
