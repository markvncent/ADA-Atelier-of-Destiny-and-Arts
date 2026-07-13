import { useRef } from 'react';
import ScrollRevealSection from '../components/ui/ScrollRevealSection';
import FairyDust from '../components/ui/FairyDust.jsx';

export default function AboutPage() {
  const scrollContainerRef = useRef(null);

  const introductionParagraphs = [
    "Atelier of Destiny and Arts (ADA) is more than a virtual gallery—it is a place where creativity blooms and every artwork tells a story waiting to be discovered. Inspired by the elegance of Art Nouveau, the quiet magic of nature, and the belief that every person journeys through different seasons of life, ADA invites visitors into a world where imagination and emotion intertwine.",
    "Each piece in this collection reflects a unique perspective, shaped by personal experiences, dreams, challenges, and moments of growth. Though our styles and mediums differ, we are united by a shared belief that art is a language that reaches beyond words. Through painting, music, writing, installation, and digital media, we transform ordinary moments into meaningful expressions that encourage reflection, connection, and wonder.",
    "Like stained glass illuminated by sunlight, every work reveals its beauty through a different angle. We hope this gallery inspires you to pause, explore, and discover pieces of yourself within the stories we share—because every destiny unfolds through creativity, and every season has its own kind of beauty."
  ];

  const curators = [
    {
      surname: "ABRIOL",
      bio: "While some people relate their experiences using color, others do it using pen and paper. As for her, she has been relating all her stories using music. All her musical creations hold bits and pieces of her experience, doubts and emotions that are hard to communicate in conversations. She does not think that art depends on the medium chosen, but on the honesty in creating it. When people listen to her music or see any of her drawings, she wants them to understand one thing – her sincere attempt at communicating through art."
    },
    {
      surname: "BASTASA",
      bio: "She never called herself a great artist, nor did she believe that talent alone defined creativity. To her, art was never about perfection—it was about honesty. When words failed and the voices in her mind became too loud to silence yet too difficult to explain, she found comfort in a blank canvas. Every brushstroke, every shade, and every imperfect line became a language of its own, expressing the emotions she could never put into words. She believes that art is the canvas for unspoken thoughts and hidden emotions—a place where pain, hope, fear, and healing can exist without judgment. Through her creations, she learned that sometimes the most meaningful masterpieces are not born from skill, but from the courage to let the heart speak when the mouth no longer can."
    },
    {
      surname: "BELTRAN",
      bio: "She is a creator born from beautiful friction—fiercely strong-headed yet deeply sensitive, channeling a chaotic inner world into art that feels entirely weightless. While she carries the immense, turbulent weight of existence, she processes this chaos by lifting it off the ground. Her work exists in that striking space where stubborn intensity meets absolute empathy, creating raw, powerful pieces that somehow manage to be free."
    },
    {
      surname: "CABANELEZ",
      bio: "Early in his life, art was already an integral part of his identity. He enjoyed sketches, drawings, coloring, painting, and other art forms. This led him to become passionate about art and pursue an education focused on it. Although it was only for a short time, it helped him appreciate and learn the basic skills and lessons of visual art. As he continued to grow, his passion and appreciation for art never diminished. He explored several art forms, such as calligraphy, creating paper mache, coffee painting, etc. But, the thrill and enjoyment remained. Art made him realize how beautiful the world is and became an important source of comfort during tough and uncertain times. Today, he still engages in various art forms, mainly crocheting and painting. He enjoys creating because it allows his imagination to run free and wild. It brings him joy and helps him cope with the stresses of college and adult life."
    },
    {
      surname: "NOBLEZA",
      bio: "She was never the ‘artsy’ kid in general, but whenever she creates she realizes how deeply she loves making art. For her, art is where she turns when words are no longer enough, when she cannot express what she feels, or when she’s trying to understand those feelings. Through art, she learned that no two people see the world the same way. Everyone brings their own perspective, experiences, and meaning to what they create and what they see. It also taught her patience and the humility of accepting that she does not have to understand or learn everything all at once. Art became a space where she could simply exist, laugh, explore, and feel safe. More than anything, it taught her to trust her own voice. That art is not about pleasing everyone, it is about creating something that is honest and meaningful to you. As long as your work reflects who you are and brings you joy, then it is, and will always be, art."
    },
    {
      surname: "PAWAY",
      bio: "Growing up, art has always been a part of my life. I was known for my creativity, attention to detail, and perfectionism, always challenging myself to create works that truly reflect my vision. My artistic journey has led me to specialize in editorial cartoons and digital illustration, where I enjoy combining creativity with storytelling and meaningful messages. Although I believe there is still so much for me to learn, especially in art forms beyond my strengths, I see every new piece as an opportunity to grow, experiment, and discover new ways of expressing myself. To me, art is more than creating something visually beautiful, it is about capturing emotions, preserving memories, inspiring reflection, and connecting with people in ways that words alone cannot. Every artwork I create is made with patience, passion, and sincerity, carrying a small part of who I am and what I hope others will feel when they experience it."
    },
    {
      surname: "SABROSO",
      bio: "She is an artist who creates works, mainly doodles and cartoons, inspired by everyday emotions, personal experiences, and the quiet moments that often go unnoticed. She enjoys using symbolism and storytelling to turn thoughts and feelings into visual narratives that others can relate to. Through her art, she hopes to encourage reflection, spark meaningful conversations, and remind people that they are not alone in what they feel. For her, art is more than a creative outlet—it is a way of connecting with others, preserving memories, and finding beauty in both life's simple and complicated moments."
    }
  ];

  return (
    <div className="about-page-body" style={{ position: 'relative', minHeight: '100vh' }}>
      <FairyDust count={28} />
      {/* Decorative gradient background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '400px',
        background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(203,212,169,0.35), transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <header className="page-hero">
        <span className="eyebrow">All About</span>
        <h1 style={{ marginTop: '14px' }}>ADA</h1>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic',
          fontSize: '1.1rem',
          color: 'var(--ink-soft)',
          marginTop: '8px',
        }}>
          An Atelier of Destiny and Arts
        </p>
      </header>

      {/* Content */}
      <div
        ref={scrollContainerRef}
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: '0 24px 120px',
        }}
      >
        {/* Story Section */}
        <div style={{ marginBottom: '60px' }}>
          {introductionParagraphs.map((para, idx) => (
            <ScrollRevealSection key={idx}>
              <p style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: idx === 0 ? '1.02rem' : '0.95rem',
                lineHeight: 1.9,
                color: 'var(--ink-soft)',
                fontWeight: 400,
                textAlign: 'justify',
                marginBottom: '24px',
              }}>
                {para}
              </p>
            </ScrollRevealSection>
          ))}
        </div>

        {/* Decorative Divider */}
        <ScrollRevealSection>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            marginBottom: '60px',
          }}>
            <span style={{ height: '1px', flex: 1, background: 'linear-gradient(to right, transparent, var(--line))' }} />
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              fontSize: '1rem',
              color: 'var(--ink-soft)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              The Curators
            </span>
            <span style={{ height: '1px', flex: 1, background: 'linear-gradient(to left, transparent, var(--line))' }} />
          </div>
        </ScrollRevealSection>

        {/* Curators Section */}
        <div>
          {curators.map((curator, idx) => (
            <ScrollRevealSection key={idx}>
              <div style={{
                marginBottom: '40px',
                paddingBottom: idx === curators.length - 1 ? '0' : '40px',
                borderBottom: idx === curators.length - 1 ? 'none' : '1px solid rgba(0, 0, 0, 0.05)',
              }}>
                <p style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.94rem',
                  lineHeight: 1.85,
                  color: 'var(--ink-soft)',
                  textAlign: 'justify',
                }}>
                  <strong style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    color: 'var(--ink-soft)',
                    marginRight: '8px',
                    letterSpacing: '0.02em',
                  }}>
                    {curator.surname}:
                  </strong>
                  {curator.bio}
                </p>
              </div>
            </ScrollRevealSection>
          ))}
        </div>
      </div>
    </div>
  );
}
