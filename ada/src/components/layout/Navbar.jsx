import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentPath = location.pathname;
  const currentHash = location.hash;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/#categories', label: 'Gallery' },
    { to: '/about', label: 'About' },
  ];

  // Determine active nav item
  const getIsActive = (item) => {
    if (item.to === '/#categories') {
      // Gallery is active when: hash is #categories on /, or on any /category/* page
      return (currentPath === '/' && currentHash === '#categories') ||
             currentPath.startsWith('/category/');
    }
    if (item.to === '/') {
      // Home is active only when on / without the #categories hash
      return currentPath === '/' && currentHash !== '#categories';
    }
    // Other pages: exact path match
    return currentPath === item.to;
  };

  const isHomePage = currentPath === '/';

  return (
    <nav className={`site-nav ${
      mobileOpen 
        ? 'scrolled' 
        : (isHomePage ? (isScrolled ? 'scrolled' : 'transparent') : 'scrolled')
    }`}>
      <div className="nav-inner">
        {/* Brand Mark — Stained Glass Door Window */}
        <Link to="/" className="brandmark">
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <radialGradient id="navGlow" cx="50%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#E0C48C"/>
                <stop offset="55%" stopColor="#DDA785"/>
                <stop offset="100%" stopColor="#7C6072"/>
              </radialGradient>
            </defs>
            <path d="M8,34 L8,18 C8,9 14,4 20,4 C26,4 32,9 32,18 L32,34 Z" fill="url(#navGlow)" stroke="#C7A05C" strokeWidth="1.4"/>
            <line x1="20" y1="18" x2="20" y2="34" stroke="#C7A05C" strokeWidth="1"/>
            <circle cx="20" cy="18" r="2" fill="#C7A05C"/>
          </svg>
          <span className="word">
            ADA
            <small>Atelier of Destiny &amp; Arts</small>
          </span>
        </Link>

        {/* Navigation Links */}
        <ul className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.to} style={{ listStyle: 'none' }}>
              <Link
                to={item.to}
                className={getIsActive(item) ? 'active' : ''}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: mobile toggle only (search icon removed) */}
        <div className="nav-cta">
          <button
            className="nav-toggle icon-btn"
            aria-label="Menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
