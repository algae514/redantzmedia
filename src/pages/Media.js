import { Helmet } from 'react-helmet-async';
import SEO_DATA from '../data/seo';
import SEO from '../components/SEO';

const seo = SEO_DATA.media;

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'RedAntz Media',
  description: seo.description,
  url: seo.canonical,
  logo: 'https://www.redantzmedia.com/images/redantz-Logo.png',
  image: seo.ogImage,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Vaishnavi Cymbol, 3rd Floor, C Block, Financial District, Nanakramguda',
    addressLocality: 'Hyderabad',
    postalCode: '500032',
    addressCountry: 'IN',
  },
  telephone: '+91-88787878787',
  email: 'info@redantzstudios.com',
  serviceType: [
    'Event Management',
    'Celebrity Events',
    'Movie Launches',
    'Audio Launches',
    'Corporate Events',
    'Media Production',
  ],
};

function Media() {
  return (
    <>
      <SEO seo={seo} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(SERVICE_SCHEMA)}
        </script>
      </Helmet>

      <section style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <h1>RedAntz Media</h1>
        <p>{seo.tagline}</p>
      </section>
    </>
  );
}

export default Media;
