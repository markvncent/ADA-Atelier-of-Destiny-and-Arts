import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';

  return (
    <footer className="fairy-footer">
      <div className="container">
        {isAboutPage ? (
          /* ─── About Page: Artist Bento Grid Footer ─── */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Curators Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ height: '1px', width: '32px', background: 'var(--gold-soft)' }} />
              <h4 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '0.85rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--gold-soft)',
              }}>
                Curatorial Guild
              </h4>
              <span style={{ height: '1px', flex: 1, background: 'rgba(251,247,239,0.14)' }} />
            </div>

            {/* Curators Centered Grid */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '12px',
            }}>
              {[
                { name: 'Abriol, Earlimar Miechan', email: 's.abriol.earlimarmiechan@cmu.edu.ph' },
                { name: 'Bastasa, Bam Angel', email: 's.bastasa.bamangel@cmu.edu.ph' },
                { name: 'Beltran, Henzdyl', email: 's.beltran.henzdyl@cmu.edu.ph' },
                { name: 'Cabañelez, Xandrex II', email: 's.cabanelez.xandrexii@cmu.edu.ph' },
                { name: 'Nobleza, Finnea Zoe', email: 's.nobleza.finneazoe@cmu.edu.ph' },
                { name: 'Paway, Kareen Claire', email: 's.paway.kareenclaire@cmu.edu.ph' },
                { name: 'Sabroso, Irish Jeanne', email: 's.sabroso.irishjeanne@cmu.edu.ph' },
              ].map((curator, idx) => (
                <a
                  href={`mailto:${curator.email}`}
                  key={idx}
                  className="group curatorial-card"
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: '1 1 180px',
                    maxWidth: '240px',
                    padding: '16px 12px',
                    border: '1px solid rgba(251,247,239,0.14)',
                    borderRadius: '12px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(199,160,92,0.12)';
                    e.currentTarget.style.borderColor = 'var(--gold-soft)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'rgba(251,247,239,0.14)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <p style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    fontSize: '0.78rem',
                    color: 'rgba(251,247,239,0.85)',
                    lineHeight: 1.4,
                  }}>
                    {curator.name}
                  </p>
                  <span className="email-tooltip">
                    {curator.email}
                  </span>
                </a>
              ))}
            </div>

            {/* Bottom bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '20px',
              borderTop: '1px solid rgba(251,247,239,0.14)',
              fontSize: '0.72rem',
              color: 'rgba(251,247,239,0.55)',
              flexWrap: 'wrap',
              gap: '10px',
            }}>
              <span>&copy; {currentYear} ADA — Atelier of Destiny and Arts. All works remain property of their creators.</span>
              <Link
                to="/admin"
                style={{ color: 'rgba(251,247,239,0.45)', transition: 'color 0.25s' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold-soft)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(251,247,239,0.45)'; }}
              >
                Admin Dashboard
              </Link>
            </div>
          </div>
        ) : (
          /* ─── Standard Footer ─── */
          <>
            <div className="footer-grid">
              {/* Brand */}
              <div className="footer-brand">
                <span className="brand-word">ADA</span>
                <p>An Atelier of Destiny and Arts — a fairy-touched gallery for student work in every medium, built one stained-glass door at a time.</p>
              </div>

              <div>
                <h4>Explore</h4>
                <Link to="/">Home</Link>
                <Link to="/#categories">Gallery</Link>
                <Link to="/about">About</Link>
              </div>

              <div>
                <h4>About</h4>
                <Link to="/about">Our Story</Link>
                <Link to="/#categories">Browse Mediums</Link>
              </div>

              {/* Administration */}
              <div>
                <h4>Administration</h4>
                <p style={{ marginBottom: '12px' }}>Authorized creators can access the dashboard to manage artworks and reviews.</p>
                <Link
                  to="/admin"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 18px',
                    borderRadius: '999px',
                    border: '1px solid rgba(251,247,239,0.25)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(251,247,239,0.75)',
                    transition: 'border-color 0.25s, color 0.25s, background 0.25s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--gold)';
                    e.currentTarget.style.color = 'var(--gold)';
                    e.currentTarget.style.background = 'rgba(199,160,92,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(251,247,239,0.25)';
                    e.currentTarget.style.color = 'rgba(251,247,239,0.75)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <span>Admin Dashboard</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
              <span>&copy; {currentYear} ADA — Atelier of Destiny and Arts. All rights reserved.</span>
            </div>
          </>
        )}
      </div>
    </footer>
  );
}
