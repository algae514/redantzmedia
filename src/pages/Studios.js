import { Helmet } from 'react-helmet-async';
import SEO_DATA from '../data/seo';
import SEO from '../components/SEO';

const seo = SEO_DATA.studios;

const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'RedAntz Studios',
  description: seo.description,
  url: seo.canonical,
  logo: 'https://www.redantzmedia.com/images/redantz-Logo.png',
  image: seo.ogImage,
  priceRange: '₹₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'No 15, Varanasi Main Road, Tcpalya',
    addressLocality: 'Bengaluru',
    postalCode: '560036',
    addressCountry: 'IN',
  },
  telephone: '+91-88787878787',
  email: 'info@redantzstudios.com',
  sameAs: ['https://www.instagram.com/redantzstudios'],
  serviceType: [
    'Wedding Photography',
    'Wedding Cinematography',
    'Pre-Wedding Shoots',
    'Destination Weddings',
    'Couple Reels',
  ],
};

function Studios() {
  return (
    <>
      <SEO seo={seo} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(LOCAL_BUSINESS_SCHEMA)}
        </script>
      </Helmet>

      <section style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <h1>RedAntz Studios</h1>
        <p>{seo.tagline}</p>
      </section>
    </>
  );
}

export default Studios;
