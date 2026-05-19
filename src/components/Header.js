import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

function Header() {
  const { pathname } = useLocation();
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef(null);
  const servicesActive = pathname.startsWith('/wedding-quotation');

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(event.target)
      ) {
        setServicesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navClass = ({ isActive }) =>
    `site-nav-link${isActive ? ' site-nav-link--active' : ''}`;

  return (
    <header className="site-header-bar">
      <div className="site-header-inner">
        <NavLink to="/" className="site-logo" end aria-label="Redantz Media home">
          <img
            src="/images/logo.png"
            alt="RedAntz Media"
            style={{ height: '48px', width: 'auto', display: 'block' }}
          />
        </NavLink>

        <nav className="site-header-nav" aria-label="Primary">
          <NavLink to="/" className={navClass} end>
            Home
          </NavLink>
          <NavLink to="/about" className={navClass}>
            About Us
          </NavLink>

          <div
            className="site-nav-dropdown"
            ref={servicesRef}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className={`site-nav-dropdown-trigger${servicesOpen || servicesActive ? ' is-open' : ''}${servicesActive ? ' site-nav-dropdown-trigger--active' : ''}`}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onClick={() => setServicesOpen((open) => !open)}
              onMouseEnter={() => setServicesOpen(true)}
            >
              Services
              <span className="site-nav-chevron" aria-hidden="true" />
            </button>
            {servicesOpen ? (
              <div className="site-nav-dropdown-panel" role="menu">
                <Link
                  to="/wedding-quotation"
                  role="menuitem"
                  className="site-nav-dropdown-item"
                  onClick={() => setServicesOpen(false)}
                >
                  Wedding Quotation
                </Link>
                <Link
                  to="/#work"
                  role="menuitem"
                  className="site-nav-dropdown-item"
                  onClick={() => setServicesOpen(false)}
                >
                  Creative Production
                </Link>
                <Link
                  to="/#clients"
                  role="menuitem"
                  className="site-nav-dropdown-item"
                  onClick={() => setServicesOpen(false)}
                >
                  Brand Strategy
                </Link>
              </div>
            ) : null}
          </div>

          <Link to="/#work" className="site-nav-link site-nav-link--static">
            Work
          </Link>
          <Link to="/#clients" className="site-nav-link site-nav-link--static">
            Clients
          </Link>
          <Link to="/#blog" className="site-nav-link site-nav-link--static">
            Blog
          </Link>
          <NavLink to="/contact" className={navClass}>
            Contact
          </NavLink>
        </nav>

        <NavLink to="/contact" className="header-cta">
          <span>Let&apos;s Talk</span>
          <span className="header-cta-icon" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
