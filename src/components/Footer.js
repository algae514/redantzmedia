import { Link } from 'react-router-dom';
import './Footer.css';

/* Social icons with brand colours */
const SOCIALS = [
  {
    name: 'facebook', bg: '#1877F2',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
    </svg>,
  },
  {
    name: 'tiktok', bg: '#010101',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.68a8.17 8.17 0 004.77 1.52V6.75a4.85 4.85 0 01-1-.06z"/>
    </svg>,
  },
  {
    name: 'instagram', bg: 'linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>,
  },
  {
    name: 'x', bg: '#000000',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>,
  },
  {
    name: 'linkedin', bg: '#0A66C2',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>,
  },
  {
    name: 'threads', bg: '#000000',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.474 12.01v-.017c.03-3.579.885-6.43 2.543-8.482C5.856 1.205 8.61.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.822-2.047 1.679-1.622 1.594-3.618 1.033-4.821-.38-.833-.964-1.514-1.734-2.018-.196 1.29-.57 2.322-1.121 3.077-.712.972-1.673 1.499-2.848 1.549-1.013.043-1.945-.28-2.625-.93-.712-.675-1.082-1.618-1.041-2.6.092-2.175 1.838-3.475 4.812-3.528.437-.009.87 0 1.283.025-.053-.563-.172-1.056-.358-1.476-.365-.821-1.024-1.263-1.962-1.323-.728-.048-1.35.15-1.83.588l-1.396-1.547c.818-.741 1.924-1.138 3.211-1.063 2.48.165 4.017 1.668 4.284 4.24.107 1.017.067 2.028-.116 3.01.347.258.673.545.974.86 1.183 1.243 1.832 2.93 1.832 4.754 0 .395-.032.782-.094 1.158C17.647 22.797 15.327 24 12.186 24z"/>
    </svg>,
  },
  {
    name: 'youtube', bg: '#FF0000',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.6.47a2.78 2.78 0 00-1.94 1.97A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 1.97C5.12 20 12 20 12 20s6.88 0 8.6-.47a2.78 2.78 0 001.94-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
    </svg>,
  },
];

const OFFICES = [
  {
    city: 'ANDHRA PRADESH',
    addr: 'Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore - 560016',
  },
  {
    city: 'HYDERABAD',
    addr: 'Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore - 560016',
  },
  {
    city: 'BENGALURU',
    addr: 'Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore - 560016',
  },
  {
    city: 'U.S.A',
    addr: 'Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore - 560016',
  },
];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">

        {/* ── Brand Column ── */}
        <div className="footer-brand">
          <Link to="/" aria-label="RedAntz Media Home">
            <img src="/images/white-logo.png" alt="RedAntz Media" className="footer-logo-img" />
          </Link>
          <p className="footer-tagline">STUDIOS | MEDIA | DIGITALS</p>
          <div className="footer-socials">
            {SOCIALS.map(s => (
              <a
                key={s.name}
                href="#!"
                className="footer-social"
                aria-label={s.name}
                style={{ background: s.bg }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── Office Columns ── */}
        {OFFICES.map(o => (
          <div key={o.city} className="footer-col">
            <h4 className="footer-col-title">{o.city}</h4>
            <p className="footer-addr">{o.addr}</p>
          </div>
        ))}

        {/* ── Contact Column ── */}
        <div className="footer-col">
          <h4 className="footer-col-title">CONTACT</h4>
          <p className="footer-addr">+91 88787878787, 989969879</p>
          <p className="footer-addr" style={{ marginTop: '0.4rem' }}>info@redantzstudios.com</p>
        </div>

      </div>

      {/* Bottom red strip */}
      <div className="footer-red-strip" />
    </footer>
  );
}

export default Footer;
