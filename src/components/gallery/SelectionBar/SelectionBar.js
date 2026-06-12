import { AnimatePresence, motion } from 'framer-motion';
import './SelectionBar.css';

export default function SelectionBar({ count, onDownload, onFavorite, onClear }) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          className="selbar-wrap"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 340, damping: 34 }}
        >
          <div className="selbar-inner">
            <div className="selbar-count">
              <span className="selbar-num">{count}</span>
              <span className="selbar-label">{count === 1 ? 'photo' : 'photos'} selected</span>
            </div>

            <div className="selbar-actions">
              <button className="selbar-btn selbar-btn--primary" onClick={onDownload}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download
              </button>

              <button className="selbar-btn selbar-btn--fav" onClick={onFavorite}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                Favorite
              </button>

              <button className="selbar-btn selbar-btn--clear" onClick={onClear}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                Clear
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
