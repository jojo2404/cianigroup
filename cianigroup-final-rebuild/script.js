const CONFIG = {
  calendly: '#',
  instagram: '#',
  linkedin: '#'
};

document.querySelectorAll('[data-calendly]').forEach(a => a.href = CONFIG.calendly);
document.querySelectorAll('[data-instagram]').forEach(a => a.href = CONFIG.instagram);
document.querySelectorAll('[data-linkedin]').forEach(a => a.href = CONFIG.linkedin);

const toggle = document.querySelector('.menu-toggle');
const panel = document.querySelector('.menu-panel');
const setMenu = open => {
  toggle.classList.toggle('open', open);
  panel.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  panel.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
};
toggle.addEventListener('click', () => setMenu(!panel.classList.contains('open')));
panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Fallback for reduced motion and first paint.
if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}
