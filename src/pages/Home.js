import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

/* =============================================
   SCROLL REVEAL HOOK
   ============================================= */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* =============================================
   ANIMATED COUNTER
   ============================================= */
function Counter({ target, visible }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let frame;
    const start = performance.now();
    const duration = 1600;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, visible]);
  return val;
}

/* =============================================
   PAGE LOADER
   ============================================= */
function PageLoader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="page-loader" role="status" aria-label="Loading RedAntz Media">
      <img
        src="/images/logo.png"
        alt="RedAntz Media"
        className="loader-logo-img"
      />
      <div className="loader-bar">
        <div className="loader-bar-fill" />
      </div>
    </div>
  );
}

/* =============================================
   HERO VISUAL — Real banner image
   ============================================= */
function HeroVisual() {
  return (
    <div className="hero-visual-wrap">
      <img
        src="/images/banner.png"
        alt="RedAntz Media — creative cameraman with brand mark"
        className="hero-banner-img"
      />
    </div>
  );
}

/* =============================================
   HERO SECTION
   ============================================= */
function HeroSection() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="hero-kicker">Designing Brands. Creating Stories.</span>
          <h1 className="hero-headline">
            Capturing<br />
            Moments<br />
            That <span className="red">Matter.</span>
          </h1>
          <p className="hero-desc">
            RedAntz Media is a creative media company delivering innovative branding,
            digital storytelling, corporate solutions and cinematic experiences.
          </p>
          <div className="hero-actions">
            <a href="#work" className="btn-primary">
              Explore Our Work
              <span className="btn-arrow" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </span>
            </a>
            <button className="btn-ghost" type="button">
              <span className="play-ring" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </span>
              Watch Showreel
            </button>
          </div>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}

/* =============================================
   STATS SECTION
   ============================================= */
const STATS = [
  {
    id: 'clients', label: 'Happy Clients', value: 250, suffix: '+',
    icon: (
      <svg viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="21" stroke="#C81010" strokeWidth="1.5"/>
        <circle cx="16" cy="18" r="5" fill="#C81010"/>
        <circle cx="28" cy="18" r="5" fill="#C81010"/>
        <path d="M8 35c0-6 4-10 8-10h12c4 0 8 4 8 10" stroke="#C81010" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'projects', label: 'Projects Completed', value: 600, suffix: '+',
    icon: (
      <svg viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="21" stroke="#C81010" strokeWidth="1.5"/>
        <rect x="11" y="14" width="22" height="17" rx="3" stroke="#C81010" strokeWidth="1.5"/>
        <path d="M15 14v-3a2 2 0 012-2h10a2 2 0 012 2v3" stroke="#C81010" strokeWidth="1.5"/>
        <path d="M14 22h16M14 27h10" stroke="#C81010" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'experience', label: 'Years of Experience', value: 5, suffix: '+',
    icon: (
      <svg viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="21" stroke="#C81010" strokeWidth="1.5"/>
        <circle cx="22" cy="22" r="9" stroke="#C81010" strokeWidth="1.5"/>
        <path d="M22 16v6l4 4" stroke="#C81010" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'team', label: 'Expert Team Members', value: 15, suffix: '+',
    icon: (
      <svg viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="21" stroke="#C81010" strokeWidth="1.5"/>
        <circle cx="22" cy="16" r="5" fill="#C81010"/>
        <path d="M12 34c0-5.5 4.5-9 10-9s10 3.5 10 9" stroke="#C81010" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

function StatsSection() {
  const [ref, visible] = useReveal(0.15);
  return (
    <section className="stats-section" ref={ref}>
      <div className="stats-grid">
        {STATS.map((s, i) => {
          const count = Counter({ target: s.value, visible });
          return (
            <div
              key={s.id}
              className={`stat-item reveal reveal-d${i + 1}${visible ? ' visible' : ''}`}
            >
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-info">
                <span className="stat-value">{count}{s.suffix}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* =============================================
   SERVICES SECTION
   ============================================= */
const SERVICES = [
  {
    id: 'media',
    title: 'Media Solutions',
    description: 'Branding, social media designs, video production and digital content that connects and converts.',
    image: 'https://picsum.photos/seed/redantz-brand-1/640/480',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="26" height="18" rx="3"/>
        <path d="M14 22v4M8 26h8"/>
        <circle cx="14" cy="13" r="4"/>
        <path d="M12.5 12l3.5 2-3.5 2v-4z" fill="white" stroke="none"/>
      </svg>
    ),
  },
  {
    id: 'corporate',
    title: 'Corporate Solutions',
    description: 'Corporate branding, photography, videography, event coverage and business storytelling.',
    image: 'https://picsum.photos/seed/redantz-corp-2/640/480',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="9" width="22" height="17" rx="2"/>
        <path d="M9 9V7a2 2 0 012-2h6a2 2 0 012 2v2"/>
        <path d="M3 17h22M10 13h8"/>
      </svg>
    ),
  },
  {
    id: 'wedding',
    title: 'Wedding Experiences',
    description: 'Cinematic wedding films, photography and timeless stories crafted beautifully.',
    image: 'https://picsum.photos/seed/redantz-wed-3/640/480',
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="10" r="5"/>
        <circle cx="19" cy="10" r="5"/>
        <path d="M3 25c0-4.4 2.7-7 6-7h10c3.3 0 6 2.6 6 7"/>
        <path d="M14 7.5l1.5 2.5-1.5 2.5-1.5-2.5L14 7.5z" fill="white" stroke="none"/>
      </svg>
    ),
  },
];

function ServicesSection() {
  const [ref, visible] = useReveal(0.1);
  return (
    <section className="services-section" id="services">
      <div className="section-inner">
        <div className="services-head">
          <span className="section-kicker">What We Do</span>
          <h2 className="section-title">
            Creative Solutions<br />
            For <span className="accent">Every Story</span>
          </h2>
          <span className="services-divider" aria-hidden="true"/>
        </div>

        <div className="services-grid" ref={ref}>
          {SERVICES.map((svc, i) => (
            <div
              key={svc.id}
              className={`service-card reveal reveal-d${i + 1}${visible ? ' visible' : ''}`}
            >
              <img
                className="service-card-img"
                src={svc.image}
                alt={svc.title}
                loading="lazy"
              />
              <div className="service-card-overlay"/>
              <div className="service-card-body">
                <div className="service-card-icon" aria-hidden="true">
                  {svc.icon}
                </div>
                <div className="service-card-title">{svc.title}</div>
                <p className="service-card-desc">{svc.description}</p>
                <span className="service-card-arrow" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6"/>
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================================
   WHY CHOOSE US
   ============================================= */
const FEATURES = [
  {
    id: 'creative',
    title: 'Creative & Strategic Approach',
    desc: 'We blend creativity with strategy to deliver impactful results.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#C81010" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/>
        <path d="M8 14s1.5-2 4-2 4 2 4 2"/>
        <line x1="9" y1="9" x2="9.01" y2="9"/>
        <line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
  },
  {
    id: 'e2e',
    title: 'End-to-End Solutions',
    desc: 'From concept to creation, we handle everything.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#C81010" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9"/>
        <path d="M3 11V9a4 4 0 014-4h14"/>
        <polyline points="7 23 3 19 7 15"/>
        <path d="M21 13v2a4 4 0 01-4 4H3"/>
      </svg>
    ),
  },
  {
    id: 'trend',
    title: 'Trend-Driven Content',
    desc: 'We stay ahead with the latest trends and technologies.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#C81010" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
        <polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
  },
  {
    id: 'team',
    title: 'Professional Team',
    desc: 'A passionate team of creatives, storytellers and strategists.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#C81010" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    id: 'custom',
    title: 'Customized for Every Client',
    desc: 'Every brand and story is unique, and we treat it that way.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#C81010" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
];

function WhySection() {
  const [leftRef, leftVisible] = useReveal(0.1);
  const [rightRef, rightVisible] = useReveal(0.1);
  return (
    <section className="why-section">
      <div className="why-inner">
        <div className={`why-image-col reveal-left${leftVisible ? ' visible' : ''}`} ref={leftRef}>
          <img
            className="why-image"
            src="https://picsum.photos/seed/redantz-cam-dark/900/700"
            alt="Professional camera setup"
            loading="lazy"
          />
          <div className="why-image-overlay" aria-hidden="true"/>
        </div>

        <div
          className={`why-copy-col reveal-right${rightVisible ? ' visible' : ''}`}
          ref={rightRef}
        >
          <span className="section-kicker">Why Choose Us</span>
          <h2 className="why-headline">
            Creativity.<br />
            Passion. <span className="accent">Results.</span>
          </h2>
          <div className="why-features">
            {FEATURES.map((f, i) => (
              <div
                key={f.id}
                className={`why-feature reveal reveal-d${Math.min(i + 1, 5)}${rightVisible ? ' visible' : ''}`}
              >
                <div className="why-feature-icon" aria-hidden="true">{f.icon}</div>
                <div className="why-feature-text">
                  <div className="why-feature-title">{f.title}</div>
                  <div className="why-feature-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <Link to="/about" className="btn-outline-red">
            More About Us
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* =============================================
   PORTFOLIO SECTION
   ============================================= */
const TABS = ['ALL', 'BRANDING', 'CORPORATE', 'SOCIAL MEDIA', 'VIDEO', 'WEDDING'];

const PORTFOLIO = [
  { id: 1, title: 'ELEVATE', cat: 'BRANDING', label: 'Brand Identity', image: 'https://picsum.photos/seed/folio-elev/400/300' },
  { id: 2, title: 'AXIS BANK', cat: 'CORPORATE', label: 'Corporate Film', image: 'https://picsum.photos/seed/folio-axis/400/300' },
  { id: 3, title: 'FRANGO', cat: 'SOCIAL MEDIA', label: 'Social Media Campaign', image: 'https://picsum.photos/seed/folio-fran/400/300' },
  { id: 4, title: 'WEDDING FILM', cat: 'WEDDING', label: 'Cinematic Story', image: 'https://picsum.photos/seed/folio-wed1/400/300' },
  { id: 5, title: 'ANNUAL SUMMIT', cat: 'CORPORATE', label: 'Event Coverage', image: 'https://picsum.photos/seed/folio-summ/400/300' },
  { id: 6, title: 'TECHNOVA', cat: 'BRANDING', label: 'Product Shoot', image: 'https://picsum.photos/seed/folio-tech/400/300' },
];

function PortfolioSection() {
  const [active, setActive] = useState('ALL');
  const [ref, visible] = useReveal(0.08);

  return (
    <section className="portfolio-section" id="work">
      <div className="section-inner">
        <div className="portfolio-head">
          <div className="portfolio-head-left">
            <span className="section-kicker">Featured Work</span>
            <h2 className="portfolio-title">
              Our Creative <span className="accent">Work</span>
            </h2>
          </div>
          <a href="#!" className="btn-outline-white">
            View All Projects
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </a>
        </div>

        <div className="portfolio-filters" role="tablist" aria-label="Portfolio categories">
          {TABS.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={active === tab}
              className={`filter-tab${active === tab ? ' active' : ''}`}
              onClick={() => setActive(tab)}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="portfolio-grid" ref={ref}>
          {PORTFOLIO.map((item, i) => {
            const show = active === 'ALL' || item.cat === active;
            return (
              <a
                key={item.id}
                href="#!"
                className={`portfolio-item reveal reveal-d${Math.min(i + 1, 5)}${visible ? ' visible' : ''}${!show ? ' hidden' : ''}`}
                aria-label={`${item.title} — ${item.label}`}
                aria-hidden={!show}
              >
                <img
                  className="portfolio-item-img"
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                />
                <div className="portfolio-item-overlay" aria-hidden="true"/>
                <div className="portfolio-item-info">
                  <span className="portfolio-item-name">{item.title}</span>
                  <span className="portfolio-item-cat">{item.label}</span>
                </div>
                <span className="portfolio-item-arrow" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6"/>
                  </svg>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =============================================
   CLIENTS SECTION — SVG Logos
   ============================================= */
function TataLogo() {
  return (
    <svg viewBox="0 0 80 30" fill="none" aria-label="TATA">
      <text x="0" y="24" fontFamily="'Poppins',sans-serif" fontSize="22" fontWeight="800" fill="#1a1a1a" letterSpacing="4">TATA</text>
    </svg>
  );
}
function AdaniLogo() {
  return (
    <svg viewBox="0 0 80 30" fill="none" aria-label="adani">
      <text x="0" y="24" fontFamily="'Poppins',sans-serif" fontSize="20" fontWeight="700" fill="#1a1a1a" letterSpacing="2">adani</text>
    </svg>
  );
}
function DecathlonLogo() {
  return (
    <svg viewBox="0 0 120 30" fill="none" aria-label="DECATHLON">
      <text x="0" y="22" fontFamily="'Poppins',sans-serif" fontSize="14" fontWeight="800" fill="#1a1a1a" letterSpacing="1">DECATHLON</text>
    </svg>
  );
}
function AxisBankLogo() {
  return (
    <svg viewBox="0 0 100 36" fill="none" aria-label="AXIS BANK">
      <path d="M6 0 L16 0 L22 14 L28 0 L38 0 L24 36 L20 36 Z" fill="#C81010"/>
      <text x="42" y="14" fontFamily="'Poppins',sans-serif" fontSize="10" fontWeight="800" fill="#1a1a1a" letterSpacing="0.5">AXIS</text>
      <text x="42" y="28" fontFamily="'Poppins',sans-serif" fontSize="10" fontWeight="800" fill="#1a1a1a" letterSpacing="0.5">BANK</text>
    </svg>
  );
}
function GodrejLogo() {
  return (
    <svg viewBox="0 0 80 30" fill="none" aria-label="Godrej">
      <text x="0" y="23" fontFamily="Georgia,serif" fontSize="20" fontWeight="700" fill="#1a1a1a" fontStyle="italic">Godrej</text>
    </svg>
  );
}
function TitanLogo() {
  return (
    <svg viewBox="0 0 80 30" fill="none" aria-label="TITAN">
      <text x="0" y="24" fontFamily="'Poppins',sans-serif" fontSize="20" fontWeight="800" fill="#1a1a1a" letterSpacing="3">TITAN</text>
    </svg>
  );
}
function PumaLogo() {
  return (
    <svg viewBox="0 0 80 30" fill="none" aria-label="PUMA">
      <text x="0" y="24" fontFamily="'Poppins',sans-serif" fontSize="22" fontWeight="900" fill="#1a1a1a" letterSpacing="3">PUMA</text>
    </svg>
  );
}
function CocaColaLogo() {
  return (
    <svg viewBox="0 0 110 30" fill="none" aria-label="Coca-Cola">
      <text x="0" y="23" fontFamily="Georgia,serif" fontSize="18" fontWeight="700" fill="#C81010" fontStyle="italic">Coca-Cola</text>
    </svg>
  );
}

const CLIENTS = [
  { id: 'tata', Logo: TataLogo },
  { id: 'adani', Logo: AdaniLogo },
  { id: 'decathlon', Logo: DecathlonLogo },
  { id: 'axisbank', Logo: AxisBankLogo },
  { id: 'godrej', Logo: GodrejLogo },
  { id: 'titan', Logo: TitanLogo },
  { id: 'puma', Logo: PumaLogo },
  { id: 'cocacola', Logo: CocaColaLogo },
];

function ClientsSection() {
  const [ref, visible] = useReveal(0.15);
  return (
    <section className="clients-section" id="clients">
      <div className="section-inner">
        <div className="clients-kicker">
          <span className="section-kicker" style={{ textAlign: 'center' }}>Brands That Trust Us</span>
        </div>
        <div className="clients-row" ref={ref}>
          {CLIENTS.map(({ id, Logo }, i) => (
            <a
              key={id}
              href="#!"
              className={`client-logo reveal reveal-d${Math.min(i + 1, 5)}${visible ? ' visible' : ''}`}
              aria-label={id}
            >
              <Logo />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================================
   CTA SECTION
   ============================================= */
function CTASection() {
  const [ref, visible] = useReveal(0.15);
  return (
    <section className="cta-section" id="blog" ref={ref}>
      {/* Decorative antenna SVG */}
      <svg className="cta-deco" viewBox="0 0 160 200" fill="none" aria-hidden="true">
        <path d="M80 120 C60 80 40 40 20 50" stroke="white" strokeWidth="12" strokeLinecap="round"/>
        <circle cx="18" cy="47" r="12" fill="white"/>
        <path d="M80 110 C100 65 125 30 148 42" stroke="white" strokeWidth="12" strokeLinecap="round"/>
        <circle cx="151" cy="40" r="12" fill="white"/>
      </svg>

      <div className={`cta-inner reveal${visible ? ' visible' : ''}`}>
        <div className="cta-text">
          <span className="cta-small">Let&apos;s Create Something</span>
          <h2 className="cta-headline">Amazing Together!</h2>
        </div>
        <div className="cta-right">
          <p className="cta-desc">
            Let&apos;s bring your ideas to life with creativity and precision.
            We&apos;re excited to hear about your next project.
          </p>
          <Link to="/contact" className="btn-cta">
            Get In Touch
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* =============================================
   HOME PAGE
   ============================================= */
function Home() {
  const [loading, setLoading] = useState(true);
  const handleDone = useCallback(() => setLoading(false), []);

  return (
    <>
      {loading && <PageLoader onDone={handleDone} />}
      <div className={`home-page${loading ? '' : ' ready'}`}>
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <WhySection />
        <PortfolioSection />
        <ClientsSection />
        <CTASection />
      </div>
    </>
  );
}

export default Home;
