import { motion } from 'framer-motion';
import './GalleryHero.css';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.18, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function GalleryHero({ meta }) {
  return (
    <section className="gh-hero">
      <div className="gh-bg">
        <img src={meta.heroImage} alt={meta.coupleNames} className="gh-bg-img" />
        <div className="gh-overlay" />
      </div>

      <div className="gh-topbar">
        <a href="/" className="gh-logo-link" aria-label="RedAntz Studios Home">
          <img src="/images/redantz-Logo.png" alt="RedAntz Studios" className="gh-logo-img" />
        </a>
        <a href="/contact" className="gh-contact-btn">Book a Shoot</a>
      </div>

      <div className="gh-content">
        <motion.span
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="gh-label"
        >
          {meta.subtitle}
        </motion.span>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="gh-names"
        >
          {meta.coupleNames}
        </motion.h1>

        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="gh-meta-row"
        >
          <span className="gh-date">{meta.date}</span>
          {meta.location && (
            <>
              <span className="gh-dot">·</span>
              <span className="gh-location">{meta.location}</span>
            </>
          )}
        </motion.div>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="gh-photographer"
        >
          Photographed by {meta.photographer}
        </motion.div>
      </div>

      <motion.a
        href="#gallery"
        className="gh-scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        aria-label="Scroll to gallery"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <svg width="22" height="38" viewBox="0 0 22 38" fill="none">
          <rect x="1" y="1" width="20" height="36" rx="10" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
          <motion.rect
            x="9" y="6" width="4" height="9" rx="2" fill="white"
            animate={{ y: [0, 14, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          />
        </svg>
        <span className="gh-scroll-text">Scroll</span>
      </motion.a>
    </section>
  );
}
