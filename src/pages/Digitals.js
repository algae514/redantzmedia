import { Helmet } from 'react-helmet-async';
import SEO_DATA from '../data/seo';
import SEO from '../components/SEO';

const seo = SEO_DATA.digitals;

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'RedAntz Digitals',
  description: seo.description,
  url: seo.canonical,
  logo: 'https://www.redantzmedia.com/images/redantz-Logo.png',
  image: seo.ogImage,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '9-37-16, MIG 47, Pithapuram Colony, Maddilapalem',
    addressLocality: 'Visakhapatnam',
    postalCode: '530003',
    addressCountry: 'IN',
  },
  telephone: '+91-88787878787',
  email: 'info@redantzstudios.com',
  serviceType: [
    'Digital Marketing',
    'Social Media Management',
    'Corporate Branding',
    'Content Creation',
    'Performance Marketing',
    'Creative Design',
  ],
};

function Digitals() {
  return (
    <>
      <SEO seo={seo} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(SERVICE_SCHEMA)}
        </script>
      </Helmet>

      <section style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <h1>RedAntz Digitals</h1>
        <p>{seo.tagline}</p>
      </section>
    </>
  );
}

export default Digitals;
