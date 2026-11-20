// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.nav ul');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
}

// Fade-in on scroll
const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add('in'));
}

// Wavy line that draws itself as you scroll
const path = document.querySelector('.scroll-line path');
if (path && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const len = path.getTotalLength();
  path.style.strokeDasharray = len;
  path.style.strokeDashoffset = len;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? window.scrollY / max : 0;
    path.style.strokeDashoffset = len * (1 - Math.min(1, pct * 1.1));
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}
