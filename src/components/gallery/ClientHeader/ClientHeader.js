import './ClientHeader.css';

export default function ClientHeader({ meta, onDownloadAll, onLogout }) {
  return (
    <header className="clhdr-root">
      <div className="clhdr-topbar">
        <a href="/" className="clhdr-logo-link" aria-label="RedAntz Studios">
          <img src="/images/logo.png" alt="RedAntz Studios" className="clhdr-logo" />
        </a>
        <div className="clhdr-topbar-right">
          <button className="clhdr-dl-all" onClick={onDownloadAll}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span className="clhdr-dl-label">Download All</span>
          </button>
          {onLogout && (
            <button className="clhdr-logout" onClick={onLogout} title="Sign out">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              <span className="clhdr-logout-label">Sign Out</span>
            </button>
          )}
        </div>
      </div>

      <div className="clhdr-info">
        <p className="clhdr-welcome">Welcome,</p>
        <h1 className="clhdr-couple">{meta.coupleNames}</h1>
        <div className="clhdr-meta-row">
          <span className="clhdr-event-type">{meta.eventType}</span>
          <span className="clhdr-sep">·</span>
          <span>{meta.date}</span>
          <span className="clhdr-sep">·</span>
          <span>
            <strong className="clhdr-count">{meta.totalPhotos.toLocaleString()}</strong> Photos
          </span>
          {meta.location && (
            <>
              <span className="clhdr-sep">·</span>
              <span>{meta.location}</span>
            </>
          )}
        </div>
        {meta.expiresAt && (
          <p className="clhdr-expiry">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            Gallery access expires {meta.expiresAt}
          </p>
        )}
      </div>
    </header>
  );
}
