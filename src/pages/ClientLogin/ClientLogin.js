import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ClientLogin.css';

/* ── Test credentials — replace with real API auth in production ── */
export const TEST_EMAIL    = 'client@redantz.com';
export const TEST_PASSWORD = 'gallery@2025';

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}

export default function ClientLogin({ meta, onSuccess }) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd]   = useState(false);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [copied, setCopied]     = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate network delay — replace with real API call
    setTimeout(() => {
      if (
        email.trim().toLowerCase() === TEST_EMAIL &&
        password === TEST_PASSWORD
      ) {
        onSuccess();
      } else {
        setError('Incorrect email or password. Please try again.');
        setLoading(false);
      }
    }, 700);
  };

  const fillDemo = () => {
    setEmail(TEST_EMAIL);
    setPassword(TEST_PASSWORD);
    setError('');
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(field);
      setTimeout(() => setCopied(''), 1500);
    });
  };

  return (
    <div className="cl-root">
      {/* Blurred background from gallery cover */}
      <div className="cl-bg">
        <img src={meta.coverImage || '/images/Slide-2.png'} alt="" className="cl-bg-img" />
        <div className="cl-bg-overlay" />
      </div>

      {/* Top logo */}
      <div className="cl-topbar">
        <a href="/" className="cl-logo-link" aria-label="RedAntz Studios home">
          <img src="/images/logo.png" alt="RedAntz Studios" className="cl-logo" />
        </a>
      </div>

      {/* Login card */}
      <motion.div
        className="cl-card"
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Lock icon */}
        <div className="cl-lock-wrap">
          <div className="cl-lock-icon"><LockIcon /></div>
        </div>

        {/* Gallery info */}
        <div className="cl-header">
          <h1 className="cl-title">Client Gallery</h1>
          <p className="cl-couple">{meta.coupleNames}</p>
          <p className="cl-event">{meta.eventType} · {meta.date}</p>
        </div>

        {/* Form */}
        <form className="cl-form" onSubmit={handleSubmit} noValidate>
          <div className="cl-field">
            <label className="cl-label" htmlFor="cl-email">Email</label>
            <input
              id="cl-email"
              className="cl-input"
              type="email"
              autoComplete="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              required
            />
          </div>

          <div className="cl-field">
            <label className="cl-label" htmlFor="cl-password">Password</label>
            <div className="cl-pwd-wrap">
              <input
                id="cl-password"
                className="cl-input cl-input--pwd"
                type={showPwd ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                required
              />
              <button
                type="button"
                className="cl-pwd-toggle"
                onClick={() => setShowPwd((v) => !v)}
                aria-label={showPwd ? 'Hide password' : 'Show password'}
              >
                {showPwd ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.p
                className="cl-error"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className={`cl-submit${loading ? ' cl-submit--loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="cl-spinner" />
                Signing in…
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Demo credentials box */}
        <div className="cl-demo-box">
          <div className="cl-demo-header">
            <span className="cl-demo-tag">Demo Access</span>
            <button className="cl-demo-fill" onClick={fillDemo}>
              Auto-fill credentials
            </button>
          </div>
          <div className="cl-demo-row">
            <span className="cl-demo-key">Email</span>
            <code
              className="cl-demo-val"
              onClick={() => copyToClipboard(TEST_EMAIL, 'email')}
              title="Click to copy"
            >
              {TEST_EMAIL}
              {copied === 'email' && <span className="cl-copied">Copied!</span>}
            </code>
          </div>
          <div className="cl-demo-row">
            <span className="cl-demo-key">Password</span>
            <code
              className="cl-demo-val"
              onClick={() => copyToClipboard(TEST_PASSWORD, 'password')}
              title="Click to copy"
            >
              {TEST_PASSWORD}
              {copied === 'password' && <span className="cl-copied">Copied!</span>}
            </code>
          </div>
        </div>

        {/* Footer note */}
        <p className="cl-footer-note">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          This gallery is private and password protected
        </p>
      </motion.div>
    </div>
  );
}
