import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';

  return (
    <footer
      className="transition-colors duration-300"
      style={{
        backgroundColor: 'var(--brown)',
        color: 'rgba(244, 232, 208, 0.65)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      {isAboutPage ? (
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col gap-6 w-full">
          {/* Bento Header */}
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <span className="h-[1px] w-8 bg-neutral-800 hidden md:block"></span>
            <h4 className="font-heading text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: 'var(--gold)' }}>
              Artists
            </h4>
            <span className="h-[1px] flex-1 bg-neutral-800 hidden md:block"></span>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 w-full">
            {[
              { name: 'Achas, Kieth Lawrence', email: 's.achas.kiethlawrence@cmu.edu.ph' },
              { name: 'Galleros, Kimberly', email: 's.galleros.kimberly@cmu.edu.ph' },
              { name: 'Pañares, Frenche Jyne', email: 's.panares.frenchejyne@cmu.edu.ph' },
              { name: 'Revilla, Cherlyn', email: 's.revillia.cherlyn@cmu.edu.ph' },
              { name: 'Saballia, Clarence', email: 's.saballia.clarence@cmu.edu.ph' },
              { name: 'Tan, Rodge Daniellette', email: 's.tan.rodgedaniellette@cmu.edu.ph' },
            ].map((artist, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-300 border text-center select-none"
                style={{
                  backgroundColor: 'rgba(244, 232, 208, 0.04)',
                  borderColor: 'rgba(244, 232, 208, 0.1)',
                  boxShadow: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--gold)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(244, 232, 208, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Artist Name */}
                <p 
                  className="font-sans font-medium text-xs sm:text-[13px] leading-tight transition-all duration-300 py-1.5"
                  style={{ color: 'var(--cream)' }}
                >
                  {artist.name}
                </p>

                {/* Popover Email Block */}
                <div 
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-3 py-1.5 rounded-lg border opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none shadow-xl z-50 text-[10px] font-sans tracking-wide whitespace-nowrap"
                  style={{
                    backgroundColor: 'var(--brown-soft)',
                    borderColor: 'var(--gold)',
                    color: 'var(--cream-paper)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                  }}
                >
                  {artist.email}
                  {/* Tooltip arrow */}
                  <div 
                    className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-r border-b"
                    style={{
                      backgroundColor: 'var(--brown-soft)',
                      borderColor: 'var(--gold)',
                      marginTop: '-5px'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom minimal footer details */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-neutral-800 text-[11px]" style={{ color: 'rgba(244, 232, 208, 0.4)' }}>
            <p>&copy; {currentYear} Haraya — The Creative Archive. All works remain property of their creators.</p>
            <Link
              to="/admin"
              className="hover:underline transition-colors duration-300 mt-2 sm:mt-0"
              style={{ color: 'rgba(244, 232, 208, 0.4)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(244, 232, 208, 0.4)'; }}
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-3">
            {/* Brand Column */}
            <div>
              <Link to="/" className="group mb-4 inline-flex items-center">
                <span className="text-2xl font-bold tracking-[0.2em] font-kingston uppercase" style={{ color: 'var(--cream)' }}>
                  HARAYA<span style={{ color: 'var(--gold)' }}>.</span>
                </span>
              </Link>
              <p
                className="mt-3 max-w-xs text-sm leading-relaxed font-serif italic"
                style={{ color: 'rgba(244, 232, 208, 0.6)' }}
              >
                Inspired by Tradition, Created for Tomorrow.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3
                className="mb-4 text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--gold)' }}
              >
                Navigation
              </h3>
              <ul className="space-y-3 font-sans text-xs">
                {[
                  { to: '/', label: 'Home' },
                  { to: '/#categories', label: 'Gallery' },
                  { to: '/about', label: 'About' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-[13px] transition-colors duration-300"
                      style={{ color: 'rgba(244, 232, 208, 0.65)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold-soft)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(244, 232, 208, 0.65)'; }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Admin Redirection */}
            <div>
              <h3
                className="mb-4 text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--gold)' }}
              >
                Administration
              </h3>
              <p className="mb-4 text-sm leading-relaxed font-serif" style={{ color: 'rgba(244, 232, 208, 0.65)' }}>
                Are you an authorized creator? Access the dashboard to manage artworks and comments.
              </p>
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-xs font-semibold font-sans uppercase tracking-[0.06em] transition-all duration-300 text-[var(--brown)] hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  backgroundColor: 'var(--gold)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--gold-soft)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--gold)'; }}
              >
                <span>Admin Dashboard</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            className="mt-12 pt-8 text-center"
            style={{ borderTop: '1px solid rgba(244, 232, 208, 0.14)' }}
          >
            <p className="text-xs" style={{ color: 'rgba(244, 232, 208, 0.4)' }}>
              &copy; {currentYear} Haraya — The Creative Archive. All works remain property of their creators.
            </p>
          </div>
        </div>
      )}
    </footer>
  );
}
