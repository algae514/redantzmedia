import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/plugins/counter.css';

import SEO from '../../components/SEO';
import GalleryHero from '../../components/gallery/GalleryHero/GalleryHero';
import CategoryNav from '../../components/gallery/CategoryNav/CategoryNav';
import MasonryGrid from '../../components/gallery/MasonryGrid/MasonryGrid';
import SkeletonGrid from '../../components/gallery/SkeletonGrid/SkeletonGrid';
import EmptyState from '../../components/gallery/EmptyState/EmptyState';
import GalleryCTA from '../../components/gallery/GalleryCTA/GalleryCTA';
import BackToTop from '../../components/gallery/BackToTop/BackToTop';

import { GALLERY_META, CATEGORIES, PHOTOS } from './portfolioData';
import './PortfolioGallery.css';

export default function PortfolioGallery() {
  const { slug } = useParams();

  const meta       = GALLERY_META;
  const categories = CATEGORIES;
  const allPhotos  = PHOTOS;

  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex]   = useState(-1);
  const [isLoading, setIsLoading]           = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(t);
  }, [slug]);

  /* ── Per-category counts ── */
  const categoryCounts = useMemo(() => {
    const counts = { all: allPhotos.length };
    allPhotos.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [allPhotos]);

  const filteredPhotos = useMemo(
    () => activeCategory === 'all'
      ? allPhotos
      : allPhotos.filter((p) => p.category === activeCategory),
    [allPhotos, activeCategory]
  );

  const lightboxSlides = useMemo(
    () => filteredPhotos.map((p) => ({ src: p.src, width: p.width, height: p.height, alt: p.alt })),
    [filteredPhotos]
  );

  const handleCategoryChange = (id) => {
    setActiveCategory(id);
    setLightboxIndex(-1);
  };

  const activeLabel = categories.find((c) => c.id === activeCategory)?.label || 'All';

  return (
    <div className="pg-root">
      <SEO seo={{
        title:       `${meta.coupleNames} | Wedding Gallery | RedAntz Studios`,
        description: `${meta.coupleNames} wedding photography by RedAntz Studios — ${meta.date}, ${meta.location}`,
        keywords:    'wedding photography, RedAntz Studios, Visakhapatnam, wedding gallery',
        canonical:   `https://www.redantzmedia.com/portfolio/${slug || meta.slug}`,
        ogTitle:     `${meta.coupleNames} | RedAntz Studios`,
        ogDesc:      `Wedding photography by RedAntz Studios — ${meta.date}, ${meta.location}`,
        ogImage:     `https://www.redantzmedia.com${meta.heroImage}`,
      }} />

      {/* Hero */}
      <GalleryHero meta={meta} />

      {/* Stats bar */}
      <div className="pg-stats-bar">
        <div className="pg-stats-inner">
          <div className="pg-stat">
            <span className="pg-stat-num">{allPhotos.length}</span>
            <span className="pg-stat-label">Photos</span>
          </div>
          <span className="pg-stats-sep" />
          <div className="pg-stat">
            <span className="pg-stat-num">{categories.length - 1}</span>
            <span className="pg-stat-label">Categories</span>
          </div>
          <span className="pg-stats-sep" />
          <div className="pg-stat pg-stat--text">
            <span className="pg-stat-label">{meta.date}</span>
          </div>
          <span className="pg-stats-sep pg-stats-sep--hide-mobile" />
          <div className="pg-stat pg-stat--text pg-stat--hide-mobile">
            <span className="pg-stat-label">Photographed by {meta.photographer}</span>
          </div>
        </div>
      </div>

      {/* Sticky category nav */}
      <CategoryNav
        categories={categories}
        active={activeCategory}
        onChange={handleCategoryChange}
        counts={categoryCounts}
      />

      {/* Gallery body */}
      <section className="pg-gallery-section" id="gallery">
        <div className="pg-gallery-header">
          <span className="pg-photo-count">
            {filteredPhotos.length} {filteredPhotos.length === 1 ? 'photo' : 'photos'}
            {activeCategory !== 'all' && ` · ${activeLabel}`}
          </span>
        </div>

        {isLoading ? (
          <SkeletonGrid count={12} />
        ) : (
          <AnimatePresence mode="wait">
            {filteredPhotos.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <EmptyState
                  type="no-results"
                  action={{ label: 'View all photos', onClick: () => setActiveCategory('all') }}
                />
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
              >
                <MasonryGrid
                  photos={filteredPhotos}
                  onPhotoClick={setLightboxIndex}
                  variant="public"
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </section>

      {/* Lightbox */}
      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={lightboxSlides}
        plugins={[Zoom, Thumbnails, Fullscreen, Counter]}
        carousel={{ finite: false, preload: 3 }}
        controller={{ closeOnBackdropClick: true }}
        zoom={{ maxZoomPixelRatio: 3, doubleTapDelay: 300 }}
        styles={{
          container: { backgroundColor: 'rgba(0,0,0,0.97)' },
          button: { color: 'rgba(255,255,255,0.65)' },
        }}
      />

      {/* CTA */}
      <GalleryCTA />

      {/* Back to top */}
      <BackToTop />
    </div>
  );
}
