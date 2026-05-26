import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Home2.css';

/* ─────────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────────── */
function useReveal(threshold = 0.1) {
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

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */
function Counter({ target, visible }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let frame;
    const start = performance.now();
    const duration = 2000;
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
function PageLoader2({ onDone }) {
  const [hidden, setHidden] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => onDone(), 2500);
    const t2 = setTimeout(() => setHidden(true), 3000);

    let frame;
    const start = performance.now();
    const duration = 2500;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 2);
      setPct(Math.round(ease * 100));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => { clearTimeout(t1); clearTimeout(t2); cancelAnimationFrame(frame); };
  }, [onDone]);

  return (
    <div className={`h2-loader${hidden ? ' h2-loader--hidden' : ''}`} role="status" aria-label="Loading">
      {/* Corner brackets */}
      <span className="h2-ld-corner h2-ld-corner--tl" aria-hidden="true" />
      <span className="h2-ld-corner h2-ld-corner--tr" aria-hidden="true" />
      <span className="h2-ld-corner h2-ld-corner--bl" aria-hidden="true" />
      <span className="h2-ld-corner h2-ld-corner--br" aria-hidden="true" />

      {/* Spinning rings + brand */}
      <div className="h2-ld-center">
        <div className="h2-ld-ring h2-ld-ring--outer" />
        <div className="h2-ld-ring h2-ld-ring--inner" />
        <div className="h2-ld-brand">
          <span className="h2-ld-brand-r">R</span>
          <span className="h2-ld-brand-rest">EDANTZ</span>
        </div>
        <p className="h2-ld-sub">STUDIOS&nbsp;·&nbsp;MEDIA&nbsp;·&nbsp;DIGITALS</p>
      </div>

      {/* Percentage */}
      <div className="h2-ld-pct" aria-hidden="true">
        {String(pct).padStart(2, '0')}<span>%</span>
      </div>

      {/* Bottom progress bar */}
      <div className="h2-ld-progress" aria-hidden="true">
        <div className="h2-ld-progress-fill" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────── */
function HeroSection2() {
  return (
    <section className="h2-hero" id="home">
      <img
        src="/images/whole_banner.png"
        alt="RedAntz Media"
        className="h2-hero-img"
        loading="eager"
        decoding="async"
      />
    </section>
  );
}

/* ─────────────────────────────────────────────
   STATS SECTION
───────────────────────────────────────────── */
const STATS = [
  { num: 10,  suffix: '+', label: 'YEARS OF\nEXPERIENCE',  icon: '/images/icons/star.png'   },
  { num: 500, suffix: '+', label: 'PROJECTS\nDELIVERED',    icon: '/images/icons/brief.png'  },
  { num: 200, suffix: '+', label: 'HAPPY\nCLIENTS',         icon: '/images/icons/people.png' },
  { num: 50,  suffix: '+', label: 'EXPERT\nPROFESSIONALS',  icon: '/images/icons/women.png'  },
];

function StatsSection2() {
  const [ref, visible] = useReveal(0.1);
  return (
    <section className="h2-stats" ref={ref}>
      <div className="h2-stats-inner">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`h2-stat${visible ? ` h2-stat--visible h2-stat-d${i + 1}` : ''}`}
          >
            <span className="h2-stat-icon">
              <img src={s.icon} alt="" width="28" height="28" loading="lazy" />
            </span>
            <div className="h2-stat-body">
              <p className="h2-stat-num">
                <Counter target={s.num} visible={visible} />{s.suffix}
              </p>
              <p className="h2-stat-label">
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
   DIVISIONS SECTION
───────────────────────────────────────────── */
const DIVISIONS = [
  {
    num: '01', id: 'studios', name: 'REDANTZ STUDIOS', tagline: 'Cinema-Grade Production',
    chip: '01 · STUDIOS',
    desc: 'From concept to final cut — weddings, brand films, corporate narratives, and ad productions crafted with cinematic precision.',
    bullets: ['Wedding Films', 'Corporate Films', 'Brand Videos', 'Ad Films', 'Event Coverage', 'Documentary'],
    img: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&h=640',
  },
  {
    num: '02', id: 'media', name: 'REDANTZ MEDIA', tagline: 'Digital-First Campaigns',
    chip: '02 · MEDIA',
    desc: 'Performance-driven social strategies and digital campaigns that build audiences, ignite conversations and drive measurable ROI.',
    bullets: ['Social Media', 'Content Strategy', 'Paid Campaigns', 'Influencer Marketing', 'Analytics', 'SEO/SEM'],
    img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=900&h=640',
  },
  {
    num: '03', id: 'digitals', name: 'REDANTZ DIGITALS', tagline: 'Branding & Visual Identity',
    chip: '03 · DIGITALS',
    desc: 'Crafting visual identities, brand systems, and digital experiences that define who you are and make you unforgettable.',
    bullets: ['Brand Identity', 'Logo Design', 'Web Design', 'UI/UX', 'Print', 'Motion Graphics'],
    img: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&h=640',
  },
];

function DivisionsSection2() {
  const [headerRef, headerVisible] = useReveal(0.08);
  return (
    <section className="h2-divisions" id="services">
      {/* Section header */}
      <div className="h2-divisions-header" ref={headerRef}>
        <p className={`h2-eyebrow${headerVisible ? ' h2-eyebrow--visible' : ''}`}>What We Do</p>
        <h2 className={`h2-divisions-title${headerVisible ? ' h2-divisions-title--visible' : ''}`}>
          THREE PILLARS OF CREATIVE{' '}
          <span className="h2-red">EXCELLENCE</span>
        </h2>
      </div>

      {/* Alternating rows */}
      {DIVISIONS.map((d, i) => (
        <DivisionRow key={d.id} division={d} index={i} />
      ))}
    </section>
  );
}

function DivisionRow({ division: d, index: i }) {
  const [ref, visible] = useReveal(0.08);
  const isEven = i % 2 === 0; /* even = image left, odd = image right */

  return (
    <div
      ref={ref}
      className={`h2-div-row${isEven ? ' h2-div-row--img-left' : ' h2-div-row--img-right'}${visible ? ' h2-div-row--visible' : ''}`}
    >
      {/* ── Image side ── */}
      <div className="h2-div-img-wrap">
        <img src={d.img} alt={d.name} loading="lazy" className="h2-div-img" />
        {/* Edge-fade gradient toward content */}
        <div className="h2-div-img-fade" />
        {/* Floating chip badge */}
        <div className="h2-div-chip">
          <span className="h2-div-chip-num">{d.num}</span>
          <span className="h2-div-chip-label">{d.name.split(' ').pop()}</span>
        </div>
      </div>

      {/* ── Content side ── */}
      <div className="h2-div-content">
        {/* Watermark number — positioned absolutely */}
        <span className="h2-div-num-bg" aria-hidden="true">{d.num}</span>

        <p className="h2-div-tagline">
          <span className="h2-div-tagline-dot" />
          {d.tagline}
        </p>
        <h3 className="h2-div-name">{d.name}</h3>
        <p className="h2-div-desc">{d.desc}</p>

        <ul className="h2-div-bullets">
          {d.bullets.map(b => (
            <li key={b} className="h2-div-bullet">{b}</li>
          ))}
        </ul>

        <Link to="/contact" className="h2-div-link">
          <span>Explore</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="14" height="14">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PORTFOLIO SECTION
───────────────────────────────────────────── */
const TABS = ['ALL', 'BRANDING', 'CORPORATE', 'SOCIAL MEDIA', 'VIDEO', 'WEDDING'];

const PORTFOLIO = [
  { id: 1, name: 'ELEVATE',       cat: 'Brand Identity',   tag: 'BRANDING',     img: 'https://picsum.photos/seed/brand-elevate/800/600' },
  { id: 2, name: 'AXIS BANK',     cat: 'Corporate Film',   tag: 'CORPORATE',    img: 'https://picsum.photos/seed/corp-axis/600/600'     },
  { id: 3, name: 'Flavors',       cat: 'Social Media',     tag: 'SOCIAL MEDIA', img: 'https://picsum.photos/seed/food-flavors/600/600'  },
  { id: 4, name: 'WEDDING FILM',  cat: 'Cinematic Story',  tag: 'VIDEO',        img: 'https://picsum.photos/seed/wed-film/600/600'      },
  { id: 5, name: 'TechNova',      cat: 'Branding',         tag: 'BRANDING',     img: 'https://picsum.photos/seed/tech-nova/800/600'     },
  { id: 6, name: 'ANNUAL SUMMIT', cat: 'Event Coverage',   tag: 'CORPORATE',    img: 'https://picsum.photos/seed/summit-event/600/600'  },
  { id: 7, name: 'RUNWAY',        cat: 'Fashion Film',     tag: 'VIDEO',        img: 'https://picsum.photos/seed/fashion-rwy/600/600'   },
  { id: 8, name: 'SAVE THE DATE', cat: 'Invitation Film',  tag: 'WEDDING',      img: 'https://picsum.photos/seed/savedate-inv/600/600'  },
];

/* Bento span config keyed by id */
const BENTO_SPANS = {
  1: 'h2-bento-feat',   /* col:2, row:2 */
  6: 'h2-bento-wide',   /* col:2 */
};

function PortfolioSection2() {
  const [active, setActive] = useState('ALL');
  const [ref, visible] = useReveal(0.08);

  const items = active === 'ALL'
    ? PORTFOLIO
    : PORTFOLIO.filter(p => p.tag === active);

  const isBento = active === 'ALL';

  return (
    <section className="h2-portfolio" id="work" ref={ref}>
      <div className="h2-portfolio-head">
        <div>
          <p className="h2-eyebrow h2-eyebrow--inline">Featured Work</p>
          <h2 className="h2-portfolio-title">
            OUR CREATIVE <span className="h2-red">WORK</span>
          </h2>
        </div>
        <Link to="/#work" className="h2-pill-btn">
          VIEW ALL PROJECTS →
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="h2-tabs">
        {TABS.map(t => (
          <button
            key={t}
            className={`h2-tab${active === t ? ' h2-tab--active' : ''}`}
            onClick={() => setActive(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className={`h2-port-grid${isBento ? ' h2-port-grid--bento' : ''}`}>
        {items.map((p, i) => {
          const bentoClass = isBento && BENTO_SPANS[p.id] ? ` ${BENTO_SPANS[p.id]}` : '';
          const delayClass = visible ? ` h2-port-item--visible h2-pd${(i % 4) + 1}` : '';
          return (
            <div
              key={p.id}
              className={`h2-port-item${bentoClass}${delayClass}`}
            >
              <img src={p.img} alt={p.name} loading="lazy" />
              <div className="h2-port-overlay">
                <div>
                  <span className="h2-port-cat-tag">{p.tag}</span>
                  <p className="h2-port-name">{p.name}</p>
                  <p className="h2-port-cat">{p.cat}</p>
                </div>
                <span className="h2-port-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </div>
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
  { seed: 'ra-reel1',  title: 'Brand Reels',       likes: '89K',  comments: '1,230', emoji: '👍' },
  { seed: 'ra-wed1',   title: 'Wedding Highlights', likes: '125K', comments: '2,490', emoji: '❤️' },
  { seed: 'ra-evt1',   title: 'Event Recaps',       likes: '78K',  comments: '890',   emoji: '🎬' },
  { seed: 'ra-prod1',  title: 'Product Campaigns',  likes: '66K',  comments: '970',   emoji: '😊' },
  { seed: 'ra-celeb1', title: 'Celebrity Moments',  likes: '92K',  comments: '1,650', emoji: '🔥' },
];

function SocialBuzzSection2() {
  const [ref, visible] = useReveal(0.08);
  return (
    <section className="h2-social" ref={ref}>
      <div className="h2-social-inner">

        {/* Left text */}
        <div className={`h2-social-left${visible ? ' h2-social-left--visible' : ''}`}>
          <p className="h2-eyebrow h2-eyebrow--inline h2-eyebrow--red">Social Buzz</p>
          <h2 className="h2-social-headline">
            WE DON&apos;T JUST POST CONTENT.
            <br />
            WE CREATE{' '}
            <span className="h2-red">DIGITAL ATTENTION.</span>
          </h2>
          <p className="h2-social-desc">
            From viral reels to luxury brand campaigns, we craft social-first
            content designed to engage, perform and convert.
          </p>
          <div className="h2-social-ctas">
            <a href="#!" className="h2-btn-red">
              VIEW INSTAGRAM
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#!" className="h2-btn-ghost">
              WATCH SHOWREEL
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right phone cards */}
        <div className="h2-social-cards">
          {POSTS.map((p, i) => (
            <div
              key={p.seed}
              className={`h2-card-wrap${visible ? ` h2-card-wrap--visible h2-cpd${i + 1}` : ''}`}
            >
              {/* Floating emoji */}
              {p.emoji && (
                <span className={`h2-float-emoji h2-float-emoji--${i}`}>{p.emoji}</span>
              )}

              <div className="h2-card">
                <div className="h2-card-img">
                  <img
                    src={`https://picsum.photos/seed/${p.seed}/300/450`}
                    alt={p.title}
                    loading="lazy"
                  />
                  <span className="h2-card-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" width="12" height="12">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </span>
                  <div className="h2-card-play">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                      <polygon points="6 3 20 12 6 21 6 3" />
                    </svg>
                  </div>
                </div>
                <div className="h2-card-meta">
                  <p className="h2-card-title">{p.title}</p>
                  <div className="h2-card-stats">
                    <span>
                      <svg viewBox="0 0 24 24" fill="#C81010" width="10" height="10">
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                      </svg>
                      {p.likes}
                    </span>
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" width="10" height="10">
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                      </svg>
                      {p.comments}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CLIENTS MARQUEE SECTION
───────────────────────────────────────────── */
const CLIENT_NAMES = [
  'HAVELLS', 'TVS', 'PVR CINEMAS', 'SONY MUSIC',
  'KALYAN JEWELLERS', 'DECATHLON', 'CHENNAI SAPPHIRE', 'AND MANY MORE',
];

/* Duplicate for seamless loop */
const MARQUEE_ITEMS = [...CLIENT_NAMES, ...CLIENT_NAMES];

function ClientsSection2() {
  return (
    <section className="h2-clients">
      <p className="h2-eyebrow h2-eyebrow--center h2-eyebrow--red">Trusted by Incredible Brands</p>
      <div className="h2-marquee-wrap">
        <div className="h2-marquee-track">
          {MARQUEE_ITEMS.map((name, i) => (
            <span key={`${name}-${i}`} className="h2-marquee-item">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CTA SECTION
───────────────────────────────────────────── */
function CTASection2() {
  const [ref, visible] = useReveal(0.1);
  return (
    <section className="h2-cta" ref={ref}>
      {/* bg image */}
      <div className="h2-cta-bg" aria-hidden="true">
        <img src="/images/whole_banner.png" alt="" />
      </div>
      <div className="h2-cta-overlay" aria-hidden="true" />

      <div className="h2-cta-inner">
        {/* Left text */}
        <div className={`h2-cta-text${visible ? ' h2-cta-text--visible' : ''}`}>
          <p className="h2-eyebrow h2-eyebrow--inline h2-eyebrow--red">Start A Project</p>
          <h2 className="h2-cta-headline">
            LET&apos;S CREATE SOMETHING{' '}
            <span className="h2-red">EXTRAORDINARY</span>{' '}
            TOGETHER.
          </h2>
          <p className="h2-cta-sub">
            Whether it&apos;s a wedding, a brand launch, or a digital campaign —
            we&apos;re ready when you are.
          </p>
        </div>

        {/* Right concentric rings */}
        <div className={`h2-cta-rings${visible ? ' h2-cta-rings--visible' : ''}`}>
          <Link to="/contact" className="h2-cta-btn" aria-label="Let's Talk">
            <span>Let&apos;s Talk</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MAIN HOME2 EXPORT
───────────────────────────────────────────── */
export default function Home2() {
  const [loaderDone, setLoaderDone] = useState(false);
  const handleDone = useCallback(() => setLoaderDone(true), []);

  return (
    <>
      <PageLoader2 onDone={handleDone} />
      <div className={`h2-page${loaderDone ? ' h2-page--visible' : ''}`}>
        <HeroSection2 />
        <StatsSection2 />
        <DivisionsSection2 />
        <PortfolioSection2 />
        <SocialBuzzSection2 />
        <ClientsSection2 />
        <CTASection2 />
      </div>
    </>
  );
}
