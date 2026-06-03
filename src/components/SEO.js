import { Helmet } from 'react-helmet-async';

function SEO({ seo }) {
  const {
    title, description, keywords,
    ogTitle, ogDesc, ogImage, canonical,
  } = seo;

  return (
    <Helmet>
      {/* Primary */}
      <title>{title}</title>
      <meta name="description"        content={description} />
      <meta name="keywords"           content={keywords} />
      <meta name="robots"             content="index, follow" />
      <meta name="author"             content="RedAntz Media" />
      <link rel="canonical"           href={canonical} />

      {/* Open Graph (Facebook / LinkedIn / WhatsApp) */}
      <meta property="og:type"        content="website" />
      <meta property="og:url"         content={canonical} />
      <meta property="og:title"       content={ogTitle} />
      <meta property="og:description" content={ogDesc} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:site_name"   content="RedAntz Media" />
      <meta property="og:locale"      content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={ogTitle} />
      <meta name="twitter:description" content={ogDesc} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
    </Helmet>
  );
}

export default SEO;
