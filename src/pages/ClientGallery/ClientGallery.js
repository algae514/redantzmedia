import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ClientLogin from '../ClientLogin/ClientLogin';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Download from 'yet-another-react-lightbox/plugins/download';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/plugins/counter.css';

import ClientHeader from '../../components/gallery/ClientHeader/ClientHeader';
import CategoryNav from '../../components/gallery/CategoryNav/CategoryNav';
import MasonryGrid from '../../components/gallery/MasonryGrid/MasonryGrid';
import SkeletonGrid from '../../components/gallery/SkeletonGrid/SkeletonGrid';
import EmptyState from '../../components/gallery/EmptyState/EmptyState';
import SelectionBar from '../../components/gallery/SelectionBar/SelectionBar';
import BackToTop from '../../components/gallery/BackToTop/BackToTop';

import { CLIENT_META, CLIENT_CATEGORIES, CLIENT_PHOTOS, PAGE_SIZE } from './clientGalleryData';
import './ClientGallery.css';

const LS_KEY_FAV = 'rz_fav_';

export default function ClientGallery() {
  const { galleryId } = useParams();
  const resolvedId = galleryId || CLIENT_META.galleryId;

  const meta       = CLIENT_META;
  const categories = CLIENT_CATEGORIES;
  const allPhotos  = CLIENT_PHOTOS;

  /* ── Auth gate ── */
  const AUTH_KEY = `cg_auth_${resolvedId}`;
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  });

  const handleLoginSuccess = () => {
    localStorage.setItem(AUTH_KEY, 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery]       = useState('');
  const [showFavOnly, setShowFavOnly]       = useState(false);
  const [selectionMode, setSelectionMode]   = useState(false);
  const [selected, setSelected]             = useState(new Set());
  const [lightboxIndex, setLightboxIndex]   = useState(-1);
  const [isLoading, setIsLoading]           = useState(true);
  const [visibleCount, setVisibleCount]     = useState(PAGE_SIZE);

  /* ── Favorites persisted in localStorage ── */
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY_FAV + resolvedId);
      return new Set(raw ? JSON.parse(raw) : []);
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY_FAV + resolvedId, JSON.stringify([...favorites]));
  }, [favorites, resolvedId]);

  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(t);
  }, [resolvedId]);

  /* ── Per-category counts (on base allPhotos, not filtered) ── */
  const categoryCounts = useMemo(() => {
    const counts = { all: allPhotos.length };
    allPhotos.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [allPhotos]);

  /* ── Filtering ── */
  const filteredPhotos = useMemo(() => {
    let list = allPhotos;
    if (activeCategory !== 'all') list = list.filter((p) => p.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) =>
        p.alt?.toLowerCase().includes(q) || p.filename?.toLowerCase().includes(q)
      );
    }
    if (showFavOnly) list = list.filter((p) => favorites.has(p.id));
    return list;
  }, [allPhotos, activeCategory, searchQuery, showFavOnly, favorites]);

  const visiblePhotos = filteredPhotos.slice(0, visibleCount);

  const lightboxSlides = useMemo(
    () => filteredPhotos.map((p) => ({
      src: p.src, width: p.width, height: p.height, alt: p.alt, download: p.src,
    })),
    [filteredPhotos]
  );

  /* ── Handlers ── */
  const toggleFav = useCallback((id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const toggleSelect = useCallback((id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const handleCategoryChange = (id) => {
    setActiveCategory(id);
    setSearchQuery('');
    setVisibleCount(PAGE_SIZE);
    setSelected(new Set());
  };

  const handleSelectionDownload = () => {
    alert(`Downloading ${selected.size} photos. Connect to download API.`);
  };

  const handleSelectionFavorite = () => {
    setFavorites((prev) => {
      const next = new Set(prev);
      selected.forEach((id) => next.add(id));
      return next;
    });
    setSelected(new Set());
  };

  const emptyType = showFavOnly ? 'no-favorites' : searchQuery ? 'no-results' : 'no-photos';

  // Grid animation key: changes when category / search / favOnly changes
  const gridKey = `${activeCategory}|${searchQuery}|${showFavOnly}`;

  /* ── Show login if not authenticated ── */
  if (!isAuthenticated) {
    return <ClientLogin meta={meta} onSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="cg-root" data-theme="light">
      <ClientHeader meta={meta} onDownloadAll={() => alert('Download all: connect to backend API.')} onLogout={handleLogout} />

      {/* Toolbar */}
      <div className="cg-toolbar">
        <div className="cg-toolbar-inner">
          <CategoryNav
            categories={categories}
            active={activeCategory}
            onChange={handleCategoryChange}
            counts={categoryCounts}
          />

          <div className="cg-toolbar-actions">
            {/* Search */}
            <div className="cg-search-wrap">
              <svg className="cg-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                className="cg-search"
                type="text"
                placeholder="Search photos…"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(PAGE_SIZE); }}
              />
              {searchQuery && (
                <button className="cg-search-clear" onClick={() => setSearchQuery('')}>×</button>
              )}
            </div>

            {/* Favorites toggle */}
            <button
              className={`cg-tool-btn${showFavOnly ? ' cg-tool-btn--active' : ''}`}
              onClick={() => setShowFavOnly((v) => !v)}
              title="Favorites"
            >
              <svg width="15" height="15" viewBox="0 0 24 24"
                fill={showFavOnly ? '#C81010' : 'none'}
                stroke={showFavOnly ? '#C81010' : 'currentColor'}
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span className="cg-tool-label">
                Favorites{favorites.size > 0 && ` (${favorites.size})`}
              </span>
            </button>

            {/* Select mode */}
            <button
              className={`cg-tool-btn${selectionMode ? ' cg-tool-btn--active' : ''}`}
              onClick={() => { setSelectionMode((v) => !v); setSelected(new Set()); }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 11 12 14 22 4"/>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
              </svg>
              <span className="cg-tool-label">
                {selectionMode ? 'Cancel Select' : 'Select'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Gallery body */}
      <section className="cg-gallery-section">
        <div className="cg-gallery-header">
          <span className="cg-photo-count">
            {filteredPhotos.length} photos
            {showFavOnly && ' · Favorites'}
            {searchQuery && ` · "${searchQuery}"`}
          </span>
          {selectionMode && selected.size > 0 && (
            <span className="cg-select-count">{selected.size} selected</span>
          )}
        </div>

        {isLoading ? (
          <SkeletonGrid count={12} />
        ) : (
          <AnimatePresence mode="wait">
            {filteredPhotos.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <EmptyState
                  type={emptyType}
                  action={showFavOnly ? { label: 'View all photos', onClick: () => setShowFavOnly(false) } : undefined}
                />
              </motion.div>
            ) : (
              <motion.div
                key={gridKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MasonryGrid
                  photos={visiblePhotos}
                  onPhotoClick={setLightboxIndex}
                  variant="client"
                  favorites={favorites}
                  selected={selected}
                  selectionMode={selectionMode}
                  onToggleFav={toggleFav}
                  onToggleSelect={toggleSelect}
                />

                {visibleCount < filteredPhotos.length && (
                  <div className="cg-load-more-wrap">
                    <button
                      className="cg-load-more"
                      onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
                    >
                      Load more · {filteredPhotos.length - visibleCount} remaining
                    </button>
                  </div>
                )}
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
        plugins={[Zoom, Thumbnails, Fullscreen, Counter, Download]}
        carousel={{ finite: false, preload: 3 }}
        controller={{ closeOnBackdropClick: true }}
        zoom={{ maxZoomPixelRatio: 3 }}
        styles={{
          container: { backgroundColor: 'rgba(0,0,0,0.97)' },
          button: { color: 'rgba(255,255,255,0.65)' },
        }}
      />

      {/* Floating selection bar */}
      <SelectionBar
        count={selected.size}
        onDownload={handleSelectionDownload}
        onFavorite={handleSelectionFavorite}
        onClear={() => setSelected(new Set())}
      />

      {/* Back to top */}
      <BackToTop />
    </div>
  );
}
