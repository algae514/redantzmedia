import { Link } from 'react-router-dom';
import './Footer.css';

/* Social icons with brand colours */
const SOCIALS = [
  {
    name: 'facebook', href: 'https://www.facebook.com/redantzzstudios', bg: '#1877F2',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
    </svg>,
  },
  {
    name: 'instagram', href: 'https://www.instagram.com/redantzstudios', bg: 'linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>,
  },
  {
    name: 'x (twitter)', href: 'https://www.twitter.com/redantzstudios', bg: '#000000',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>,
  },
  {
    name: 'youtube', href: 'https://www.youtube.com/@RedAntzStudios', bg: '#FF0000',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.6.47a2.78 2.78 0 00-1.94 1.97A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 1.97C5.12 20 12 20 12 20s6.88 0 8.6-.47a2.78 2.78 0 001.94-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
    </svg>,
  },
];

const OFFICES = [
  {
    city: 'BENGALURU',
    addr: 'No 15, Varanasi Main Road, Tcpalya, Bengaluru – 560036',
  },
  {
    city: 'HYDERABAD',
    addr: 'Vaishnavi Cymbol, 3rd Floor, C Block, Financial District, Nanakramguda, Hyderabad 500032',
  },
  {
    city: 'VISAKHAPATNAM',
    addr: '9-37-16, MIG 47, Pithapuram Colony, Maddilapalem, Visakhapatnam 530003',
  },
];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">

        {/* ── Brand Column ── */}
        <div className="footer-brand">
          <Link to="/" aria-label="RedAntz Media Home">
            <img src="/images/redantz-Logo.png" alt="RedAntz Media" className="footer-logo-img" />
          </Link>
          <p className="footer-brand-desc">
            Crafting extraordinary stories through cinema, media&nbsp;&amp; digital experiences.
          </p>
          <div className="footer-socials">
            {SOCIALS.map(s => (
              <a
                key={s.name}
                href={s.href}
                className="footer-social"
                aria-label={s.name}
                target="_blank"
                rel="noreferrer"
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
          <div className="footer-contact-list">
            <a href="tel:+918878787878" className="footer-contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.03 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
              </svg>
              +91 88787878787
            </a>
            <a href="mailto:info@redantzstudios.com" className="footer-contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              info@redantzstudios.com
            </a>
          </div>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom-bar">
        <span>© {new Date().getFullYear()} RedAntz Media. All rights reserved.</span>
        <div className="footer-bottom-links">
          <a href="#!">Privacy Policy</a>
          <span className="footer-dot">·</span>
          <a href="#!">Terms of Use</a>
        </div>
      </div>

      {/* Red strip */}
      <div className="footer-red-strip" />
    </footer>
  );
}

export default Footer;
