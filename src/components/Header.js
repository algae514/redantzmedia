import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

function Header() {
  const { pathname } = useLocation();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [menuOpen, setMenuOpen]         = useState(false);
  const servicesRef = useRef(null);
  const servicesActive = pathname.startsWith('/wedding-quotation');

  /* Close everything on route change */
  useEffect(() => {
    setServicesOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* Close services dropdown on outside click */
  useEffect(() => {
    function handle(e) {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const navClass = ({ isActive }) =>
    `site-nav-link${isActive ? ' site-nav-link--active' : ''}`;

  const NAV_LINKS = (
    <>
      <NavLink to="/" className={navClass} end onClick={() => setMenuOpen(false)}>Home</NavLink>
      <NavLink to="/about" className={navClass} onClick={() => setMenuOpen(false)}>About Us</NavLink>

      <div className="site-nav-dropdown" ref={servicesRef} onMouseLeave={() => setServicesOpen(false)}>
        <button
          type="button"
          className={`site-nav-dropdown-trigger${servicesOpen || servicesActive ? ' is-open' : ''}${servicesActive ? ' site-nav-dropdown-trigger--active' : ''}`}
          aria-expanded={servicesOpen}
          aria-haspopup="true"
          onClick={() => setServicesOpen(o => !o)}
          onMouseEnter={() => setServicesOpen(true)}
        >
          Services
          <span className="site-nav-chevron" aria-hidden="true" />
        </button>
        {servicesOpen && (
          <div className="site-nav-dropdown-panel" role="menu">
            <Link to="/wedding-quotation" role="menuitem" className="site-nav-dropdown-item" onClick={() => { setServicesOpen(false); setMenuOpen(false); }}>Wedding Quotation</Link>
            <Link to="/#work"    role="menuitem" className="site-nav-dropdown-item" onClick={() => { setServicesOpen(false); setMenuOpen(false); }}>Creative Production</Link>
            <Link to="/#clients" role="menuitem" className="site-nav-dropdown-item" onClick={() => { setServicesOpen(false); setMenuOpen(false); }}>Brand Strategy</Link>
          </div>
        )}
      </div>

      <Link to="/#work"    className="site-nav-link site-nav-link--static" onClick={() => setMenuOpen(false)}>Work</Link>
      <Link to="/#clients" className="site-nav-link site-nav-link--static" onClick={() => setMenuOpen(false)}>Clients</Link>
      <Link to="/#blog"    className="site-nav-link site-nav-link--static" onClick={() => setMenuOpen(false)}>Blog</Link>
      <NavLink to="/contact" className={navClass} onClick={() => setMenuOpen(false)}>Contact</NavLink>
    </>
  );

  return (
    <>
      <header className="site-header-bar">
        <div className="site-header-inner">
          {/* Logo */}
          <NavLink to="/" className="site-logo" end aria-label="RedAntz Media home">
            <img src="/images/logo.png" alt="RedAntz Media" className="site-logo-img" />
          </NavLink>

          {/* Desktop nav */}
          <nav className="site-header-nav" aria-label="Primary">
            {NAV_LINKS}
          </nav>

          {/* Desktop CTA */}
          <NavLink to="/contact" className="header-cta header-cta--desktop">
            <span>Let&apos;s Talk</span>
            <span className="header-cta-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </NavLink>

          {/* Hamburger — mobile only */}
          <button
            className={`hamburger${menuOpen ? ' is-open' : ''}`}
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(o => !o)}
          >
            <span className="ham-line" />
            <span className="ham-line" />
            <span className="ham-line" />
          </button>
        </div>
      </header>

      {/* Mobile nav drawer */}
      <div className={`mobile-nav${menuOpen ? ' mobile-nav--open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="mobile-nav-links" aria-label="Mobile navigation">
          {NAV_LINKS}
        </nav>
        <NavLink to="/contact" className="mobile-cta" onClick={() => setMenuOpen(false)}>
          Let&apos;s Talk
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </NavLink>
      </div>

    </>
  );
}

export default Header;
