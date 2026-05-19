import { Link } from 'react-router-dom';
import './Footer.css';

function FooterLogo() {
  return (
    <Link to="/" className="footer-logo-link" aria-label="RedAntz Media Home">
      <svg width="42" height="46" viewBox="0 0 200 220" fill="none" aria-hidden="true">
        <path
          d="M100 15 C60 15 25 48 25 100 C25 152 60 185 100 185
             C128 185 150 172 164 152 L164 110 L116 110 L116 132
             L142 132 C132 152 118 162 100 162 C70 162 48 134 48 100
             C48 66 70 38 100 38 C120 38 135 48 144 64 L164 64
             C152 36 130 15 100 15 Z"
          fill="#C81010"
        />
        <path d="M78 33 C64 15 50 4 36 9" stroke="#C81010" strokeWidth="9" strokeLinecap="round" fill="none"/>
        <circle cx="33" cy="7" r="9" fill="#C81010"/>
        <path d="M106 20 C124 1 142 -6 157 4" stroke="#C81010" strokeWidth="9" strokeLinecap="round" fill="none"/>
        <circle cx="160" cy="2" r="9" fill="#C81010"/>
      </svg>
      <div className="footer-logo-text">
        <span className="footer-logo-name">
          <span className="footer-logo-red">RED</span>
          <span className="footer-logo-white">ANTZ</span>
        </span>
        <span className="footer-logo-sub">MEDIA</span>
      </div>
    </Link>
  );
}

function SocialIcon({ type }) {
  const icons = {
    facebook: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
    twitter: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
      </svg>
    ),
    instagram: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    youtube: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.6.47a2.78 2.78 0 00-1.94 1.97A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 1.97C5.12 20 12 20 12 20s6.88 0 8.6-.47a2.78 2.78 0 001.94-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
      </svg>
    ),
  };
  return icons[type] ?? null;
}

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/#services' },
  { label: 'Work', to: '/#work' },
  { label: 'Clients', to: '/#clients' },
  { label: 'Blog', to: '/#blog' },
  { label: 'Contact', to: '/contact' },
];

const SERVICES = [
  'Media Solutions',
  'Corporate Solutions',
  'Wedding Experiences',
  'Branding',
  'Social Media',
  'Video Production',
  'Event Coverage',
];

const INSTA_SEEDS = ['ra-ig1', 'ra-ig2', 'ra-ig3', 'ra-ig4', 'ra-ig5', 'ra-ig6', 'ra-ig7', 'ra-ig8', 'ra-ig9'];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* Column 1 — Brand */}
        <div className="footer-brand">
          <FooterLogo />
          <p className="footer-desc">
            We are a creative media company specialising in branding, digital storytelling,
            corporate solutions and cinematic experiences.
          </p>
          <div className="footer-socials">
            {['facebook', 'twitter', 'instagram', 'linkedin', 'youtube'].map((s) => (
              <a key={s} href="#!" className="footer-social" aria-label={s}>
                <SocialIcon type={s} />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2 — Quick Links */}
        <div className="footer-col">
          <h4 className="footer-col-title">Quick Links</h4>
          <ul className="footer-list">
            {QUICK_LINKS.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="footer-list-link">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Services */}
        <div className="footer-col">
          <h4 className="footer-col-title">Services</h4>
          <ul className="footer-list">
            {SERVICES.map((s) => (
              <li key={s}>
                <a href="#!" className="footer-list-link">{s}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Contact + Instagram Grid */}
        <div className="footer-col footer-col--contact">
          <h4 className="footer-col-title">Contact Us</h4>
          <ul className="footer-contact-list">
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="#C81010" strokeWidth="2" strokeLinecap="round" width="15" height="15">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.68 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.32 1.85.56 2.81.68A2 2 0 0122 16.92z"/>
              </svg>
              +91 98195 42190
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="#C81010" strokeWidth="2" strokeLinecap="round" width="15" height="15">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              hello@redantzmedia.com
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="#C81010" strokeWidth="2" strokeLinecap="round" width="15" height="15">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Mumbai, India
            </li>
          </ul>
          <div className="footer-insta-grid">
            {INSTA_SEEDS.map((seed) => (
              <a key={seed} href="#!" className="footer-insta-thumb" aria-label="Instagram post">
                <img
                  src={`https://picsum.photos/seed/${seed}/80/80`}
                  alt=""
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 RedAntz Media. All Rights Reserved.</p>
        <div className="footer-bottom-links">
          <a href="#!">Privacy Policy</a>
          <span>|</span>
          <a href="#!">Terms &amp; Conditions</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
