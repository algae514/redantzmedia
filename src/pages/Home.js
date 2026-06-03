import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import SEO_DATA from '../data/seo';
import './Home.css';

/* ─────────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */
function Counter({ target, visible }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let frame;
    const start = performance.now();
    const duration = 1800;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(e * target));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, visible]);
  return val;
}

/* ─────────────────────────────────────────────
   PAGE LOADER
───────────────────────────────────────────── */
function PageLoader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="page-loader" role="status">
      <img src="/images/logo.png" alt="RedAntz Media" className="loader-logo-img" />
      <div className="loader-bar"><div className="loader-fill" /></div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO SECTION  —  full-screen premium slider
───────────────────────────────────────────── */
const HERO_SLIDES = [
  {
    img: '/images/Slide-1.png',
    tag: 'REDANTZ STUDIOS',
    lines: ['CAPTURING EMOTIONS.', 'PRESERVING MEMORIES.', 'TELLING YOUR STORY.'],
  },
  {
    img: '/images/Slide-2.png',
    tag: 'REDANTZ MEDIA',
    lines: ['CREATING MOMENTS.', 'PRODUCING EXPERIENCES.', 'COMMANDING ATTENTION.'],
  },
  {
    img: '/images/Slide-3.png',
    tag: 'REDANTZ DIGITALS',
    lines: ['BUILDING BRANDS.', 'DRIVING GROWTH.', 'CREATING IMPACT.'],
  },
];

function HeroSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(s => (s + 1) % HERO_SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);

  const slide = HERO_SLIDES[active];

  return (
    <section className="hero-section" id="home">
      {/* Slide images with Ken Burns zoom */}
      {HERO_SLIDES.map((s, i) => (
        <div key={s.tag} className={`hero-slide${i === active ? ' hero-slide--active' : ''}`}>
          <img src={s.img} alt={s.tag} />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="hero-overlay" />

      {/* Logo top-left */}
      <div className="hero-logo">
        <img src="/images/redantz-Logo.png" alt="RedAntz Media" />
      </div>

      {/* Animated text content — key={active} resets animations on slide change */}
      <div className="hero-content" key={active}>
        <p className="hero-tag">{slide.tag}</p>
        <div className="hero-lines">
          {slide.lines.map((line, i) => (
            <span key={line} className={`hero-line hero-line--${i}`}>{line}</span>
          ))}
        </div>
      </div>

      {/* Bottom bar: counter + dots */}
      <div className="hero-footer">
        <span className="hero-counter">
          <strong>{String(active + 1).padStart(2, '0')}</strong>
          &nbsp;/&nbsp;{String(HERO_SLIDES.length).padStart(2, '0')}
        </span>
        <div className="hero-dots">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              className={`hero-dot${i === active ? ' hero-dot--on' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Auto-advance progress bar */}
      <div className="hero-progress-bar">
        <div className="hero-progress-fill" key={active} />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   DIVISIONS SECTION
───────────────────────────────────────────── */
const DIVISIONS = [
  {
    key: 'studios',
    route: '/studios',
    brand: 'RedAntz', sub: 'Studios',
    tagline: 'Weddings & Personal Celebrations',
    img: 'https://picsum.photos/seed/ra-wed/700/520',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26">
        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
    ),
    col1: ['Wedding Photography', 'Wedding Films', 'Pre-Wedding Shoots', 'Destination Weddings'],
    col2: ['Family Events', 'Albums & Prints', 'Personal Celebrations'],
  },
  {
    key: 'media',
    route: '/media',
    brand: 'RedAntz', sub: 'Media',
    tagline: 'Events, Entertainment & Production',
    img: 'https://picsum.photos/seed/ra-event/700/520',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26">
        <path d="M3 11l19-9-9 19-2-8-8-2z"/>
      </svg>
    ),
    col1: ['Celebrity Events', 'Movie Launches', 'Audio Launches', 'Corporate Events'],
    col2: ['Event Strategy', 'Media Production', 'Live Event Coverage', 'Brand Activations'],
  },
  {
    key: 'digitals',
    route: '/digitals',
    brand: 'RedAntz', sub: 'Digitals',
    tagline: 'Branding & Digital Marketing',
    img: 'https://picsum.photos/seed/ra-digital/700/520',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6"  y1="20" x2="6"  y2="14"/>
      </svg>
    ),
    col1: ['Corporate Branding', 'Social Media Management', 'Digital Marketing', 'Ad Campaigns'],
    col2: ['Content Creation', 'Reel Production', 'Creative Design', 'Performance Marketing'],
  },
];

function DivCard({ d, visible, index }) {
  return (
    <div className={`div-card${visible ? ` div-card--visible div-card--d${index + 1}` : ''}`}>
      <div className="div-card-img">
        <img src={d.img} alt={`${d.brand} ${d.sub}`} loading="lazy" />
      </div>
      {/* Icon outside image so it isn't clipped */}
      <span className="div-icon">{d.icon}</span>
      <div className="div-card-body">
        <p className="div-brand">{d.brand} <span className="c-red">{d.sub}</span></p>
        <p className="div-tagline">{d.tagline}</p>
        <div className="div-bullets">
          <ul>{d.col1.map(b => <li key={b}>{b}</li>)}</ul>
          <ul>{d.col2.map(b => <li key={b}>{b}</li>)}</ul>
        </div>
        <Link to={d.route} className="div-learn-more">
          Learn More
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
            <path d="M5 12h14M13 6l6 6-6 6"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}

function DivisionsSection() {
  const [ref, visible] = useReveal(0.08);
  return (
    <section className="divisions-section" id="services" ref={ref}>
      <div className="divisions-header">
        <div>
          <p className="section-label c-red">OUR DIVISIONS</p>
          <h2 className="divisions-h2">
            Three Specialized Divisions.<br />One Creative Powerhouse.
          </h2>
        </div>
        <a href="https://wa.me/919819542190" className="cta-whatsapp" target="_blank" rel="noreferrer">
          <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" style={{color:'#fff'}}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M11.997 2C6.477 2 2 6.477 2 12c0 1.89.525 3.659 1.438 5.17L2 22l4.978-1.303A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.52 2 11.997 2z"/>
          </svg>
          <span>LET&apos;S TALK</span>
        </a>
      </div>
      <div className="divisions-grid">
        {DIVISIONS.map((d, i) => (
          <DivCard key={d.key} d={d} visible={visible} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   STATS SECTION
───────────────────────────────────────────── */
const STATS = [
  { num: 10,  suffix: '+', label: 'YEARS OF\nEXPERIENCE',    icon: '/images/icons/star.png'   },
  { num: 500, suffix: '+', label: 'PROJECTS\nDELIVERED',      icon: '/images/icons/brief.png'  },
  { num: 200, suffix: '+', label: 'HAPPY\nCLIENTS',           icon: '/images/icons/people.png' },
  { num: 50,  suffix: '+', label: 'EXPERT\nPROFESSIONALS',    icon: '/images/icons/women.png'  },
];

function StatsSection() {
  const [ref, visible] = useReveal(0.1);
  return (
    <section className="stats-section" ref={ref}>
      <div className="stats-inner">
        {STATS.map((s, i) => (
          <div key={s.label} className={`stat-item${visible ? ` stat-item--visible stat-d${i + 1}` : ''}`}>
            <span className="stat-icon">
              <img src={s.icon} alt="" width="28" height="28" />
            </span>
            <div className="stat-body">
              <p className="stat-num">
                <Counter target={s.num} visible={visible} />{s.suffix}
              </p>
              <p className="stat-label">
                {s.label.split('\n').map((ln, j) => (
                  <span key={j}>{ln}{j === 0 ? <br /> : ''}</span>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PORTFOLIO SECTION
───────────────────────────────────────────── */
const TABS = ['ALL', 'BRANDING', 'CORPORATE', 'SOCIAL MEDIA', 'VIDEO', 'WEDDING'];

/* YouTube helper */
const ytThumb = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
const ytUrl   = (id) => `https://www.youtube.com/watch?v=${id}`;

const PORTFOLIO = [
  { id: 1, name: 'ELEVATE',       cat: 'Brand Identity',        tag: 'BRANDING',     img: 'https://picsum.photos/seed/brand-elevate/600/450' },
  { id: 2, name: 'AXIS BANK',     cat: 'Corporate Film',        tag: 'CORPORATE',    img: 'https://picsum.photos/seed/corp-axis/600/450'    },
  { id: 3, name: 'Flavors',       cat: 'Social Media Campaign', tag: 'SOCIAL MEDIA', img: 'https://picsum.photos/seed/food-flavors/600/450' },
  { id: 4, name: 'WEDDING FILM',  cat: 'Cinematic Story',       tag: 'VIDEO',        img: 'https://picsum.photos/seed/wed-film/600/450'     },
  { id: 5, name: 'TechNova',      cat: 'Branding',              tag: 'BRANDING',     img: 'https://picsum.photos/seed/tech-nova/600/450'    },
  { id: 6, name: 'ANNUAL SUMMIT', cat: 'Event Coverage',        tag: 'CORPORATE',    img: 'https://picsum.photos/seed/summit-event/600/450' },
  { id: 7, name: 'RUNWAY',        cat: 'Fashion Film',          tag: 'VIDEO',        img: 'https://picsum.photos/seed/fashion-rwy/600/450'  },
  /* ── Wedding: real YouTube videos ── */
  { id: 10, name: 'Cinematic Highlights', cat: 'Wedding Film', tag: 'WEDDING', img: ytThumb('aInXcy-LXNo'), ytUrl: ytUrl('aInXcy-LXNo') },
  { id: 11, name: 'Wedding Story',        cat: 'Wedding Film', tag: 'WEDDING', img: ytThumb('mh5dMo1I3MM'), ytUrl: ytUrl('mh5dMo1I3MM') },
  { id: 12, name: 'Love & Light',         cat: 'Wedding Film', tag: 'WEDDING', img: ytThumb('cUOHLU_SLQE'), ytUrl: ytUrl('cUOHLU_SLQE') },
  { id: 13, name: 'Timeless Moments',     cat: 'Wedding Film', tag: 'WEDDING', img: ytThumb('JR6iU-hSs68'), ytUrl: ytUrl('JR6iU-hSs68') },
  { id: 14, name: 'Forever Yours',        cat: 'Wedding Film', tag: 'WEDDING', img: ytThumb('fzPoeU4uzBo'), ytUrl: ytUrl('fzPoeU4uzBo') },
  { id: 15, name: 'The Grand Wedding',    cat: 'Wedding Film', tag: 'WEDDING', img: ytThumb('QBFbZFsuXHI'), ytUrl: ytUrl('QBFbZFsuXHI') },
  { id: 16, name: 'A Beautiful Ceremony', cat: 'Wedding Film', tag: 'WEDDING', img: ytThumb('mKYDNP-CCo0'), ytUrl: ytUrl('mKYDNP-CCo0') },
  { id: 17, name: 'Eternal Vows',         cat: 'Wedding Film', tag: 'WEDDING', img: ytThumb('V2DZglLI-BI'), ytUrl: ytUrl('V2DZglLI-BI') },
];

function PortfolioSection() {
  const [active, setActive] = useState('ALL');
  const [ref, visible] = useReveal(0.08);

  const items = active === 'ALL'
    ? PORTFOLIO
    : PORTFOLIO.filter(p => p.tag === active);

  return (
    <section className="portfolio-section" id="work" ref={ref}>
      <div className="portfolio-header">
        <div>
          <p className="section-label c-red">FEATURED WORK</p>
          <h2 className="portfolio-h2">
            OUR CREATIVE <span className="c-red">WORK</span>
          </h2>
        </div>
        <Link to="/#work" className="btn-outline">
          VIEW ALL PROJECTS
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
            <path d="M5 12h14M13 6l6 6-6 6"/>
          </svg>
        </Link>
      </div>

      <div className="port-tabs">
        {TABS.map(t => (
          <button
            key={t}
            className={`port-tab${active === t ? ' port-tab--active' : ''}`}
            onClick={() => setActive(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="port-grid">
        {items.map((p, i) => {
          const Tag = p.ytUrl ? 'a' : 'div';
          const linkProps = p.ytUrl
            ? { href: p.ytUrl, target: '_blank', rel: 'noreferrer' }
            : {};
          return (
            <Tag
              key={p.id}
              {...linkProps}
              className={`port-item${visible ? ` port-item--visible port-d${(i % 4) + 1}` : ''}`}
            >
              <img src={p.img} alt={p.name} loading="lazy" />

              {/* YouTube play button */}
              {p.ytUrl && (
                <div className="port-yt-play" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
                    <polygon points="6 3 20 12 6 21 6 3"/>
                  </svg>
                </div>
              )}

              <div className="port-overlay">
                <div>
                  <p className="port-name">{p.name}</p>
                  <p className="port-cat">{p.cat}</p>
                </div>
                <span className="port-arrow-btn" aria-hidden="true">
                  {p.ytUrl ? (
                    /* YouTube icon for wedding items */
                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                      <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.6.47a2.78 2.78 0 00-1.94 1.97A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 1.97C5.12 20 12 20 12 20s6.88 0 8.6-.47a2.78 2.78 0 001.94-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
                      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="14" height="14">
                      <path d="M5 12h14M13 6l6 6-6 6"/>
                    </svg>
                  )}
                </span>
              </div>
            </Tag>
          );
        })}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SOCIAL BUZZ SECTION
───────────────────────────────────────────── */
const POSTS = [
  { seed: 'ra-reel1',  title: 'Brand Reels',       likes: '89K',  comments: '1,230', url: 'https://www.instagram.com/p/DYXPG0EzgH5/' },
  { seed: 'ra-wed1',   title: 'Wedding Highlights', likes: '125K', comments: '2,490', url: 'https://www.instagram.com/p/DRjz-FwDFRx/' },
  { seed: 'ra-evt1',   title: 'Event Recaps',       likes: '78K',  comments: '890',   url: 'https://www.instagram.com/p/DNDozHrSiOR/' },
  { seed: 'ra-prod1',  title: 'Product Campaigns',  likes: '66K',  comments: '970',   url: 'https://www.instagram.com/p/DYpW1VsE_U9/' },
  { seed: 'ra-celeb1', title: 'Celebrity Moments',  likes: '92K',  comments: '1,650', url: 'https://www.instagram.com/p/DYcLRXFTzpB/' },
  { seed: 'ra-reel2',  title: 'Creative Shoots',    likes: '71K',  comments: '810',   url: 'https://www.instagram.com/p/DYI7687DNxx/' },
];

const SB_VISIBLE = 4; /* cards visible at once on desktop */

function SocialBuzzSection() {
  const [ref, visible] = useReveal(0.08);
  const [current, setCurrent] = useState(0);
  const trackRef = useRef(null);
  const max = POSTS.length - SB_VISIBLE; /* 6 - 4 = 2 */

  /* Read actual rendered card width + gap, then translate the track */
  const moveTo = useCallback((idx) => {
    if (!trackRef.current) return;
    const card = trackRef.current.firstElementChild;
    if (!card) return;
    const gap = parseFloat(getComputedStyle(trackRef.current).gap) || 16;
    trackRef.current.style.transform = `translateX(-${idx * (card.offsetWidth + gap)}px)`;
  }, []);

  useEffect(() => { moveTo(current); }, [current, moveTo]);

  /* Re-calculate on window resize */
  useEffect(() => {
    const onResize = () => moveTo(current);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [current, moveTo]);

  /* Auto-advance */
  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c >= max ? 0 : c + 1)), 3500);
    return () => clearInterval(t);
  }, [max]);

  const prev = () => setCurrent(c => (c <= 0 ? max : c - 1));
  const next = () => setCurrent(c => (c >= max ? 0 : c + 1));

  return (
    <section className="social-buzz-section" ref={ref}>
      <div className="sb-inner">

        {/* ─── Left: text + buttons ─── */}
        <div className={`sb-left${visible ? ' sb-left--visible' : ''}`}>
          <p className="section-label c-red">SOCIAL BUZZ</p>
          <h2 className="sb-headline">
            WE DON&apos;T JUST POST CONTENT.<br />
            WE CREATE <span className="c-red">DIGITAL ATTENTION.</span>
          </h2>
          <p className="sb-desc">
            From viral reels to luxury brand campaigns, we craft social-first
            content designed to engage, perform and convert.
          </p>
          <div className="sb-ctas">
            <a href="https://www.instagram.com/redantzstudios" className="sb-btn-red" target="_blank" rel="noreferrer">
              VIEW INSTAGRAM
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/@RedAntzStudios" className="sb-btn-outline" target="_blank" rel="noreferrer">
              WATCH SHOWREEL
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/>
              </svg>
            </a>
          </div>
        </div>

        {/* ─── Right: slider ─── */}
        <div className="sb-slider-wrap">

          {/* Viewport clips overflowing cards */}
          <div className="sb-slider-vp">
            <div className="sb-track" ref={trackRef}>
              {POSTS.map((p, i) => (
                <a
                  key={p.seed}
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`sb-card-outer${visible ? ' sb-card-outer--visible' : ''}`}
                  style={{ transitionDelay: visible ? `${i * 0.07}s` : '0s' }}
                >
                  <div className="sb-card">
                    <div className="sb-card-img">
                      <img src={`https://picsum.photos/seed/${p.seed}/300/450`} alt={p.title} loading="lazy" />
                      <span className="sb-card-badge">
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" width="12" height="12">
                          <rect x="2" y="2" width="20" height="20" rx="5"/>
                          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                        </svg>
                      </span>
                      <div className="sb-card-play">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                          <polygon points="6 3 20 12 6 21 6 3"/>
                        </svg>
                      </div>
                    </div>
                    <div className="sb-card-meta">
                      <p className="sb-card-title">{p.title}</p>
                      <div className="sb-card-stats">
                        <span>
                          <svg viewBox="0 0 24 24" fill="#C81010" width="11" height="11">
                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                          </svg>
                          {p.likes}
                        </span>
                        <span>
                          <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="11" height="11">
                            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                          </svg>
                          {p.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Prev / Next arrows */}
          <button className="sb-arrow sb-arrow--prev" onClick={prev} aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button className="sb-arrow sb-arrow--next" onClick={next} aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="sb-dots">
            {Array.from({ length: max + 1 }).map((_, i) => (
              <button
                key={i}
                className={`sb-dot${i === current ? ' sb-dot--on' : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CLIENTS SECTION
───────────────────────────────────────────── */
const CLIENTS = [
  { name: 'Havells',              logo: <svg viewBox="0 0 120 40" width="100"><text y="28" fontSize="22" fontWeight="900" fill="#ffffff" fontFamily="Arial">HAVELLS</text></svg> },
  { name: 'TVS',                  logo: <svg viewBox="0 0 80 40" width="70"><text y="28" fontSize="26" fontWeight="900" fill="#ffffff" fontFamily="Arial">TVS</text></svg> },
  { name: 'PVR Cinemas',          logo: <svg viewBox="0 0 130 40" width="110"><text y="28" fontSize="20" fontWeight="900" fill="#ffffff" fontFamily="Arial">PVR</text><text x="48" y="28" fontSize="14" fontWeight="700" fill="rgba(255,255,255,0.75)" fontFamily="Arial">CINEMAS</text></svg> },
  { name: 'Chennai Sapphire Mall',logo: <svg viewBox="0 0 200 44" width="155"><text y="24" fontSize="13" fontWeight="700" fill="#ffffff" fontFamily="Georgia,serif" fontStyle="italic">CHENNAI</text><text y="40" fontSize="10" fontWeight="600" fill="rgba(255,255,255,0.7)" fontFamily="Arial" letterSpacing="2">SAPPHIRE MALL</text></svg> },
  { name: 'Sony Music',           logo: <svg viewBox="0 0 140 40" width="120"><text y="28" fontSize="19" fontWeight="900" fill="#ffffff" fontFamily="Arial">SONY</text><text x="56" y="28" fontSize="16" fontWeight="600" fill="rgba(255,255,255,0.75)" fontFamily="Arial">MUSIC</text></svg> },
  { name: 'Kalyan Jewellers',     logo: <svg viewBox="0 0 170 40" width="135"><text y="27" fontSize="16" fontWeight="700" fill="#ffffff" fontFamily="Georgia,serif" fontStyle="italic">Kalyan</text><text x="68" y="27" fontSize="12" fontWeight="600" fill="rgba(255,255,255,0.7)" fontFamily="Arial">JEWELLERS</text></svg> },
  { name: 'Decathlon',            logo: <svg viewBox="0 0 150 40" width="125"><text y="28" fontSize="18" fontWeight="900" fill="#ffffff" fontFamily="Arial">DECATHLON</text></svg> },
];

function ClientsSection() {
  const [ref, visible] = useReveal(0.1);
  const scrollRef = useRef(null);

  const scroll = useCallback((dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 220, behavior: 'smooth' });
    }
  }, []);

  return (
    <section className="clients-section" id="clients" ref={ref}>
      <p className="section-label clients-label">TRUSTED BY INCREDIBLE BRANDS</p>
      <div className="clients-carousel-wrap">
        <button className="clients-arrow clients-arrow--prev" onClick={() => scroll(-1)} aria-label="Previous">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <div className="clients-track" ref={scrollRef}>
          {CLIENTS.map((c, i) => (
            <div
              key={c.name}
              className={`client-logo${visible ? ` client-logo--visible client-ld${(i % 7) + 1}` : ''}`}
              title={c.name}
            >
              {c.logo}
            </div>
          ))}
          <div className="client-logo client-more">and many more...</div>
        </div>
        <button className="clients-arrow clients-arrow--next" onClick={() => scroll(1)} aria-label="Next">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CTA SECTION
───────────────────────────────────────────── */
function CTASection() {
  const [ref, visible] = useReveal(0.1);
  return (
    <section className="cta-section" ref={ref}>
      <div className="cta-bg-img" aria-hidden="true">
        <img src="/images/banner.png" alt="" />
      </div>
      <div className="cta-bg-overlay" />
      <div className="cta-inner">
        {/* Left — text block */}
        <div className={`cta-text${visible ? ' cta-text--visible' : ''}`}>
          <h2 className="cta-headline">
            Let&apos;s Create Something<br />
            <em>Extraordinary</em> Together!
          </h2>
          <p className="cta-sub">
            Whether it&apos;s a wedding, a brand launch, or a digital campaign —
            we&apos;re ready when you are.
          </p>
        </div>
        {/* Right — circle CTA with rings */}
        <div className={`cta-circle-wrap${visible ? ' cta-circle-wrap--visible' : ''}`}>
          <Link
            to="/contact"
            className="cta-circle-btn"
            aria-label="Let's Talk"
          >
            <span>Let&apos;s Talk</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MAIN HOME EXPORT
───────────────────────────────────────────── */
export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);
  const handleDone = useCallback(() => setLoaderDone(true), []);

  return (
    <>
      <SEO seo={SEO_DATA.home} />
      <div className="home-page">
        {!loaderDone && <PageLoader onDone={handleDone} />}
        <HeroSection />
        <DivisionsSection />
        <StatsSection />
        <PortfolioSection />
        <SocialBuzzSection />
        <ClientsSection />
        <CTASection />
      </div>
    </>
  );
}
