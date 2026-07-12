import ScrollRevealSection from '../components/ui/ScrollRevealSection';

export default function ContactPage() {
  return (
    <div>
      {/* Header */}
      <section className="page-hero">
        <span className="eyebrow">Reach Out</span>
        <h1>Get in Touch</h1>
        <p>Have a question or want to collaborate? We would love to hear from you.</p>
      </section>

      {/* Contact Form */}
      <section className="section">
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 24px' }}>
          <ScrollRevealSection>
            <div className="contact-card">
              <form onSubmit={(e) => e.preventDefault()}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name">Name</label>
                    <input
                      type="text"
                      id="contact-name"
                      placeholder="Your name"
                      disabled
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email">Email</label>
                    <input
                      type="email"
                      id="contact-email"
                      placeholder="you@example.com"
                      disabled
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message">Message</label>
                    <textarea
                      id="contact-message"
                      rows="5"
                      placeholder="Tell us what is on your mind..."
                      disabled
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      opacity: 0.5,
                      cursor: 'not-allowed',
                    }}
                    disabled
                  >
                    Send Message
                  </button>
                </div>
              </form>

              <p style={{
                marginTop: '20px',
                textAlign: 'center',
                fontSize: '0.78rem',
                fontStyle: 'italic',
                color: 'var(--ink-soft)',
              }}>
                Contact form will be functional once the backend is connected.
              </p>
            </div>
          </ScrollRevealSection>

          {/* Alternative contact cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginTop: '40px',
          }}>
            <ScrollRevealSection>
              <div style={{
                background: 'var(--cream)',
                border: '1px solid var(--line)',
                borderRadius: '20px',
                padding: '28px',
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: '1.5rem',
                  marginBottom: '12px',
                  color: 'var(--gold)',
                }}>✉</div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1rem',
                  marginBottom: '6px',
                }}>Email</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)' }}>hello@virtualgallery.com</p>
              </div>
            </ScrollRevealSection>

            <ScrollRevealSection>
              <div style={{
                background: 'var(--cream)',
                border: '1px solid var(--line)',
                borderRadius: '20px',
                padding: '28px',
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: '1.5rem',
                  marginBottom: '12px',
                  color: 'var(--gold)',
                }}>♦</div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1rem',
                  marginBottom: '6px',
                }}>Location</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)' }}>Manila, Philippines</p>
              </div>
            </ScrollRevealSection>
          </div>
        </div>
      </section>
    </div>
  );
}
