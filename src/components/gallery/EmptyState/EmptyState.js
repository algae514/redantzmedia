import { motion } from 'framer-motion';
import './EmptyState.css';

const CONFIGS = {
  'no-results': {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        <line x1="8" y1="11" x2="14" y2="11"/>
      </svg>
    ),
    title: 'No photos found',
    desc: 'Try a different search term or select another category.',
  },
  'no-favorites': {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: 'No favorites yet',
    desc: 'Hover over any photo and tap the ♥ icon to save your favorites.',
  },
  'no-photos': {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
    title: 'Gallery is empty',
    desc: 'No photos have been uploaded yet. Check back soon.',
  },
};

export default function EmptyState({ type = 'no-results', action }) {
  const cfg = CONFIGS[type] || CONFIGS['no-results'];

  return (
    <motion.div
      className="es-wrap"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="es-icon">{cfg.icon}</div>
      <h3 className="es-title">{cfg.title}</h3>
      <p className="es-desc">{cfg.desc}</p>
      {action && (
        <button className="es-action" onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </motion.div>
  );
}
