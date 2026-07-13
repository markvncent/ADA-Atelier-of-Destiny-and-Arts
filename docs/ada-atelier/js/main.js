// ADA — shared behaviors
document.addEventListener('DOMContentLoaded', () => {

  // --- scatter fairy-dust particles into any .dust container ---
  document.querySelectorAll('.dust').forEach((container) => {
    const count = Number(container.dataset.count || 10);
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      s.style.left = Math.random() * 100 + '%';
      s.style.top = 40 + Math.random() * 55 + '%';
      s.style.animationDelay = (Math.random() * 9).toFixed(2) + 's';
      s.style.animationDuration = (7 + Math.random() * 5).toFixed(2) + 's';
      container.appendChild(s);
    }
  });

  // --- scroll reveal ---
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // --- mobile nav toggle ---
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.style.display === 'flex';
      links.style.display = open ? 'none' : 'flex';
      links.style.flexDirection = 'column';
      links.style.position = 'absolute';
      links.style.top = '64px';
      links.style.left = '0';
      links.style.right = '0';
      links.style.background = 'var(--cream)';
      links.style.padding = '20px 24px';
      links.style.borderBottom = '1px solid var(--line)';
      links.style.gap = '18px';
    });
  }
});
