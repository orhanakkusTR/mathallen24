import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://mathallen24.nu';
const siteTitle = 'Mathallen 24 Lugnet';

const SEO = ({
  title,
  description = 'Mathallen 24 Lugnet - Mat för alla! Din lokala matbutik i Malmö med brett sortiment och bra priser. Öppet alla dagar 08-22.',
  keywords = 'matbutik, malmö, lugnet, mathallen, mat för alla, erbjudanden, livsmedel',
  image = '/logo.png',
  url,
  type = 'website',
}) => {
  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const pageUrl = url ? `${BASE_URL}${url}` : BASE_URL;
  const imageUrl = image.startsWith('http') ? image : `${BASE_URL}${image}`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />
    </Helmet>
  );
};

export default SEO;
