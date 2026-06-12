import { useState, useCallback } from 'react';
import { ColumnsPhotoAlbum } from 'react-photo-album';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import 'react-photo-album/columns.css';
import './MasonryGrid.css';

/* ── Icons ── */
const EyeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24"
    fill={filled ? '#C81010' : 'none'}
    stroke={filled ? '#C81010' : 'white'}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

/* ── Single photo card with blur-up progressive loading ── */
function PhotoCard({
  photo, imageProps, wrapperStyle,
  variant, favorites, selected, selectionMode,
  onToggleFav, onToggleSelect,
}) {
  const [fullLoaded, setFullLoaded] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.04, rootMargin: '140px' });

  const isFav      = favorites?.has(photo.id);
  const isSelected = selected?.has(photo.id);

  return (
    <motion.div
      ref={ref}
      className={`mg-cell${isSelected ? ' mg-cell--selected' : ''}`}
      style={{
        ...wrapperStyle,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '3px',
        cursor: 'pointer',
        background: '#1a1a1a',
      }}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* ── Blur-up: tiny placeholder ── */}
      <img
        src={photo.thumb || photo.src}
        className={`mg-blur-thumb${fullLoaded ? ' mg-blur-thumb--hidden' : ''}`}
        alt=""
        aria-hidden="true"
      />

      {/* ── Full resolution image ── */}
      <img
        src={photo.src}
        alt={imageProps.alt}
        style={{ display: 'block', width: '100%' }}
        sizes={imageProps.sizes}
        loading="lazy"
        className={`mg-img${fullLoaded ? ' mg-img--loaded' : ''}`}
        onLoad={() => setFullLoaded(true)}
        onClick={imageProps.onClick}
      />

      {/* ── Hover overlay ── */}
      <div className="mg-overlay" onClick={imageProps.onClick}>
        <div className="mg-view-icon">
          <EyeIcon />
        </div>
      </div>

      {/* ── Client mode: favorite + download ── */}
      {variant === 'client' && (
        <div className="mg-actions">
          <button
            className={`mg-action-btn mg-fav-btn${isFav ? ' mg-fav-btn--active' : ''}`}
            onClick={(e) => { e.stopPropagation(); onToggleFav?.(photo.id); }}
            aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          >
            <HeartIcon filled={isFav} />
          </button>
          <button
            className="mg-action-btn mg-dl-btn"
            onClick={(e) => { e.stopPropagation(); alert(`Downloading ${photo.filename || photo.id}`); }}
            aria-label="Download photo"
          >
            <DownloadIcon />
          </button>
        </div>
      )}

      {/* ── Selection checkbox ── */}
      {variant === 'client' && selectionMode && (
        <label
          className={`mg-checkbox${isSelected ? ' mg-checkbox--checked' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            checked={!!isSelected}
            onChange={() => onToggleSelect?.(photo.id)}
          />
          <span className="mg-checkbox-box">
            {isSelected && (
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </span>
        </label>
      )}

      {/* ── Selected overlay ── */}
      {isSelected && <div className="mg-selected-overlay" />}
    </motion.div>
  );
}

/* ── Grid ── */
export default function MasonryGrid({
  photos,
  onPhotoClick,
  variant = 'public',
  favorites,
  selected,
  selectionMode = false,
  onToggleFav,
  onToggleSelect,
}) {
  const renderPhoto = useCallback(
    ({ photo, imageProps, wrapperStyle }) => (
      <PhotoCard
        key={photo.id}
        photo={photo}
        imageProps={imageProps}
        wrapperStyle={wrapperStyle}
        variant={variant}
        favorites={favorites}
        selected={selected}
        selectionMode={selectionMode}
        onToggleFav={onToggleFav}
        onToggleSelect={onToggleSelect}
      />
    ),
    [variant, favorites, selected, selectionMode, onToggleFav, onToggleSelect]
  );

  const columnCount = useCallback((cw) => {
    if (cw < 540) return 1;
    if (cw < 900) return 2;
    if (cw < 1280) return 3;
    return 4;
  }, []);

  if (!photos?.length) return null;

  return (
    <div className="mg-root">
      <ColumnsPhotoAlbum
        photos={photos}
        columns={columnCount}
        spacing={6}
        onClick={({ index }) => onPhotoClick?.(index)}
        renderPhoto={renderPhoto}
      />
    </div>
  );
}
