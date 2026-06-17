import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../../components/SEO';
import { PORTFOLIOS, PORTFOLIO_FILTER_CATEGORIES } from './portfolioListData';
import './PortfolioList.css';

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.48, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
  exit: { opacity: 0, y: 16, transition: { duration: 0.2 } },
};

export default function PortfolioList() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = useMemo(
    () => activeFilter === 'all'
      ? PORTFOLIOS
      : PORTFOLIOS.filter((p) => p.category === activeFilter),
    [activeFilter]
  );

  return (
    <div className="pl-root">
      <SEO seo={{
        title:       'Portfolio | RedAntz Studios',
        description: 'Browse our photography portfolio — weddings, pre-weddings, engagements, events and portraits by RedAntz Studios.',
        keywords:    'photography portfolio, wedding photography, RedAntz Studios, Visakhapatnam',
        canonical:   'https://www.redantzmedia.com/portfolio',
        ogTitle:     'Portfolio | RedAntz Studios',
        ogDesc:      'Browse our photography portfolio by RedAntz Studios.',
        ogImage:     'https://www.redantzmedia.com/images/Slide-1.png',
      }} />

      {/* Page banner */}
      <section className="pl-banner">
        <p className="pl-eyebrow">Our Work</p>
        <h1 className="pl-title">Portfolio</h1>
        <p className="pl-sub">
          Every frame tells a story. Browse through our collection of weddings,
          portraits and moments captured across India.
        </p>
        <p className="pl-count">{PORTFOLIOS.length} projects</p>
      </section>

      {/* Filter tabs */}
      <div className="pl-filter-bar">
        <div className="pl-filter-inner">
          {PORTFOLIO_FILTER_CATEGORIES.map((cat) => {
            const count = cat.id === 'all'
              ? PORTFOLIOS.length
              : PORTFOLIOS.filter((p) => p.category === cat.id).length;
            return (
              <button
                key={cat.id}
                className={`pl-filter-tab${activeFilter === cat.id ? ' pl-filter-tab--active' : ''}`}
                onClick={() => setActiveFilter(cat.id)}
              >
                {cat.label}
                {count > 0 && (
                  <span className={`pl-filter-count${activeFilter === cat.id ? ' pl-filter-count--active' : ''}`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <section className="pl-grid-section">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="pl-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {filtered.map((portfolio, i) => (
              <motion.div
                key={portfolio.slug}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Link to={`/portfolio/${portfolio.slug}`} className="pl-card">
                  <div className="pl-card-img-wrap">
                    <img
                      src={portfolio.cover}
                      alt={portfolio.names}
                      className="pl-card-img"
                      loading="lazy"
                    />
                  </div>
                  <span className="pl-card-badge">{portfolio.type}</span>
                  <div className="pl-card-overlay">
                    <p className="pl-card-names">{portfolio.names}</p>
                    <p className="pl-card-meta">
                      {portfolio.date} · {portfolio.location}
                    </p>
                    <p className="pl-card-photo-count">{portfolio.photoCount} photos</p>
                  </div>
                  <span className="pl-card-view-btn">View Gallery</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="pl-empty">
            <p className="pl-empty-title">No portfolios yet</p>
            <p className="pl-empty-sub">Check back soon for more work.</p>
          </div>
        )}
      </section>
    </div>
  );
}
