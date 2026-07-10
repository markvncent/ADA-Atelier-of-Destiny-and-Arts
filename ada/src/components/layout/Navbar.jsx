import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const navBg = 'var(--bg-primary)';
  const navTextColor = 'var(--text-primary)';
  const navBorderColor = 'var(--border-subtle)';
  const logoColor = 'var(--text-primary)';
  const goldDotColor = 'var(--text-primary)';

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 border-b select-none"
      style={{
        backgroundColor: navBg,
        borderColor: navBorderColor,
      }}
    >
      {/* Logo */}
      <Link to="/" className="text-xl md:text-2xl font-bold tracking-[0.05em] font-kingston">
        <span style={{ color: logoColor }}>ADA</span>
        <span style={{ color: goldDotColor }}>.</span>
      </Link>

      {/* Navigation Links */}
      <nav>
        <ul className="flex items-center gap-6 md:gap-10 list-none m-0 p-0 font-sans text-[11px] md:text-xs font-semibold uppercase tracking-wider">
          <li>
            <Link
              to="/"
              className="transition-colors duration-200 hover:text-[var(--text-secondary)]"
              style={{ color: navTextColor }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/#categories"
              className="transition-colors duration-200 hover:text-[var(--text-secondary)]"
              style={{ color: navTextColor }}
            >
              Gallery
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="transition-colors duration-200 hover:text-[var(--text-secondary)]"
              style={{ color: navTextColor }}
            >
              About
            </Link>
          </li>
        </ul>
      </nav>

      {/* Explore Button */}
      <Link
        to="/#categories"
        className="hidden sm:inline-block font-sans font-semibold text-[11px] md:text-xs uppercase tracking-[0.06em] border py-2 px-5"
        style={{
          color: navTextColor,
          borderColor: navBorderColor,
          backgroundColor: 'transparent',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--text-primary)';
          e.currentTarget.style.color = 'var(--bg-primary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = navTextColor;
        }}
      >
        Explore
      </Link>
    </header>
  );
}
