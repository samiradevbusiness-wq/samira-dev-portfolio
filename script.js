const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const loadingScreen = document.getElementById('loadingScreen');
const cursorGlow = document.getElementById('cursorGlow');
const particles = document.getElementById('particles');
const revealItems = document.querySelectorAll('.reveal');
const counters = document.querySelectorAll('[data-count]');
const backTop = document.querySelector('.back-top');
const header = document.querySelector('.topbar');
const sectionLinks = document.querySelectorAll('.nav-link');
const scrollSections = document.querySelectorAll('main > section[id], main[id]');

menuBtn?.addEventListener('click', () => navLinks?.classList.toggle('open'));
document.querySelectorAll('.nav-link').forEach((link) => link.addEventListener('click', () => navLinks?.classList.remove('open')));

window.addEventListener('load', () => {
  setTimeout(() => loadingScreen?.classList.add('hidden'), 900);
});

window.addEventListener('mousemove', (event) => {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

for (let i = 0; i < 30; i += 1) {
  const dot = document.createElement('span');
  dot.className = 'particle';
  dot.style.left = `${Math.random() * 100}%`;
  dot.style.top = `${Math.random() * 100}%`;
  dot.style.width = `${4 + Math.random() * 6}px`;
  dot.style.height = dot.style.width;
  dot.style.opacity = `${0.3 + Math.random() * 0.6}`;
  dot.style.animationDuration = `${8 + Math.random() * 7}s`;
  dot.style.animationDelay = `${Math.random() * 5}s`;
  particles?.appendChild(dot);
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
revealItems.forEach((item) => revealObserver.observe(item));

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count || 0);
    let current = 0;
    const step = Math.ceil(target / 70);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target.toString();
        clearInterval(timer);
      } else {
        el.textContent = current.toString();
      }
    }, 20);
    countObserver.unobserve(el);
  });
}, { threshold: 0.7 });
counters.forEach((counter) => countObserver.observe(counter));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id || 'home';
    sectionLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', isActive);
    });
  });
}, { threshold: 0.35, rootMargin: '-20% 0px -45% 0px' });
scrollSections.forEach((section) => sectionObserver.observe(section));

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 24);
  if (backTop) {
    backTop.style.display = window.scrollY > 650 ? 'grid' : 'none';
  }
});
backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      faqItems.forEach((other) => { if (other !== item) other.open = false; });
    }
  });
});

document.addEventListener('click', (event) => {
  const trigger = event.target instanceof Element ? event.target.closest('.btn, .social-link, .nav-link, .floating-btn') : null;
  if (!trigger) return;
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  const rect = trigger.getBoundingClientRect();
  ripple.style.left = `${event.clientX - rect.left}px`;
  ripple.style.top = `${event.clientY - rect.top}px`;
  trigger.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
});

document.querySelector('.contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Thanks! Your inquiry has been received.');
});
