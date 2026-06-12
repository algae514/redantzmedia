import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './CategoryNav.css';

export default function CategoryNav({ categories, active, onChange, counts }) {
  const navRef = useRef(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const activeEl = nav.querySelector('[data-active="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [active]);

  return (
    <nav className="cn-nav" ref={navRef}>
      <div className="cn-inner">
        {categories.map((cat) => {
          const count = counts?.[cat.id];
          return (
            <button
              key={cat.id}
              data-active={active === cat.id ? 'true' : 'false'}
              className={`cn-tab${active === cat.id ? ' cn-tab--active' : ''}`}
              onClick={() => onChange(cat.id)}
            >
              {cat.label}
              {count !== undefined && (
                <span className={`cn-count${active === cat.id ? ' cn-count--active' : ''}`}>
                  {count}
                </span>
              )}
              {active === cat.id && (
                <motion.span
                  layoutId="cn-underline"
                  className="cn-underline"
                  transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
