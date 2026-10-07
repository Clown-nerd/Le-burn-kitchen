const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.dish-card');
filters.forEach((button) => button.addEventListener('click', () => {
  filters.forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  const category = button.dataset.filter;
  cards.forEach((card) => {
    card.hidden = category !== 'all' && card.dataset.category !== category;
  });
}));

const toast = document.querySelector('.toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2800);
}

document.querySelectorAll('.add-dish').forEach((button) => button.addEventListener('click', () => {
  const dish = button.closest('.dish-card').querySelector('h3').textContent;
  const message = `Hi Le Burn Kitchen! I'm interested in ${dish}. Could you share the current price and availability?`;
  window.open(`https://wa.me/254714889880?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
}));

const dialog = document.querySelector('.quote-dialog');
document.querySelector('.quote-open').addEventListener('click', () => dialog.showModal());
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
document.querySelector('#quote-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const lines = [
    `Hi Le Burn Kitchen! My name is ${data.get('name')}.`,
    `I'd like to plan: ${data.get('occasion')}.`,
    `Number of orders: ${data.get('orders')} (up to 180).`,
    data.get('date') ? `Date: ${data.get('date')}.` : '',
    data.get('notes') ? `A few more details: ${data.get('notes')}` : '',
  ].filter(Boolean);
  window.open(`https://wa.me/254714889880?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
  dialog.close();
  event.currentTarget.reset();
});

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open', !expanded);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

document.querySelector('#year').textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('[data-animate]');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        instance.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('in-view'));
}

const heroArt = document.querySelector('.hero-art');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (heroArt && !reduceMotion && window.matchMedia('(pointer:fine)').matches) {
  window.addEventListener('pointermove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 10;
    const y = (event.clientY / window.innerHeight - 0.5) * 8;
    heroArt.style.transform = `translate(${x}px, ${y}px)`;
  }, { passive: true });
}

window.addEventListener('scroll', () => {
  document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
}, { passive: true });
