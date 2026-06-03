const BASE_URL = 'https://www.redantzmedia.com';
const LOGO_URL  = `${BASE_URL}/images/redantz-Logo.png`;

const SEO = {
  home: {
    title:       'RedAntz Media | Studios · Media · Digitals',
    description: 'RedAntz Media is a premium creative agency offering wedding photography, event production, and digital marketing across India. Three specialised divisions — Studios, Media & Digitals.',
    keywords:    'RedAntz Media, RedAntz Studios, RedAntz Digitals, Wedding Photography, Event Production, Digital Marketing, Creative Agency India',
    ogTitle:     'RedAntz Media – Studios · Media · Digitals',
    ogDesc:      'Crafting extraordinary stories through cinema, media & digital experiences.',
    ogImage:     `${BASE_URL}/images/Slide-1.png`,
    canonical:   BASE_URL,
  },

  studios: {
    title:       'RedAntz Studios | Wedding Photography & Cinematic Films',
    description: 'Capture your special moments with RedAntz Studios. Premium wedding photography, cinematic films, destination weddings, pre-wedding shoots, and couple reels crafted with elegance and storytelling.',
    keywords:    'Wedding Photography, Wedding Cinematography, Destination Wedding Photography, Pre Wedding Shoot, Couple Reels, Luxury Weddings, Wedding Films, Wedding Photographer, RedAntz Studios',
    ogTitle:     'RedAntz Studios – Capturing Timeless Memories',
    ogDesc:      'From intimate moments to grand celebrations, we create cinematic wedding stories that last forever.',
    ogImage:     `${BASE_URL}/images/Slide-1.png`,
    canonical:   `${BASE_URL}/studios`,
    tagline:     'Capturing Timeless Memories',
  },

  media: {
    title:       'RedAntz Media | Events, Celebrity Launches & Media Production',
    description: 'RedAntz Media delivers premium event production, celebrity events, movie launches, audio launches, corporate experiences, and creative media solutions that leave lasting impressions.',
    keywords:    'Event Management, Celebrity Events, Movie Launches, Audio Launches, Corporate Events, Event Production, Media Production, Brand Events, Entertainment Events, RedAntz Media',
    ogTitle:     'RedAntz Media – Creating Unforgettable Experiences',
    ogDesc:      'From celebrity appearances to large-scale productions, we bring extraordinary events to life.',
    ogImage:     `${BASE_URL}/images/Slide-2.png`,
    canonical:   `${BASE_URL}/media`,
    tagline:     'Creating Unforgettable Experiences',
  },

  digitals: {
    title:       'RedAntz Digitals | Branding, Social Media & Digital Marketing',
    description: 'Grow your brand with RedAntz Digitals. Creative branding, social media management, digital marketing, content creation, advertising campaigns, and performance-driven strategies.',
    keywords:    'Digital Marketing, Social Media Management, Branding Agency, Content Creation, Performance Marketing, Advertising Agency, Creative Campaigns, Digital Strategy, RedAntz Digitals',
    ogTitle:     'RedAntz Digitals – Building Brands That Grow',
    ogDesc:      'Creative branding and digital marketing solutions designed to increase visibility, engagement, and business growth.',
    ogImage:     `${BASE_URL}/images/Slide-3.png`,
    canonical:   `${BASE_URL}/digitals`,
    tagline:     'Building Brands That Grow',
  },

  about: {
    title:       'About Us | RedAntz Media – Our Story & Vision',
    description: 'Learn about RedAntz Media — a creative powerhouse with three specialised divisions crafting extraordinary experiences in wedding photography, event production, and digital marketing.',
    keywords:    'About RedAntz Media, Creative Agency India, Wedding Photography Agency, Event Production Company, Digital Marketing Agency',
    ogTitle:     'About RedAntz Media',
    ogDesc:      'Three specialised divisions. One creative powerhouse.',
    ogImage:     LOGO_URL,
    canonical:   `${BASE_URL}/about`,
  },

  contact: {
    title:       'Contact RedAntz Media | Get in Touch',
    description: 'Contact RedAntz Media for wedding photography, event production, or digital marketing services. Offices in Bengaluru, Hyderabad, and Visakhapatnam.',
    keywords:    'Contact RedAntz Media, Hire Wedding Photographer, Book Event Production, Digital Marketing Enquiry, RedAntz Contact',
    ogTitle:     'Contact RedAntz Media',
    ogDesc:      'Ready to create something extraordinary? Let\'s talk.',
    ogImage:     LOGO_URL,
    canonical:   `${BASE_URL}/contact`,
  },
};

export default SEO;
