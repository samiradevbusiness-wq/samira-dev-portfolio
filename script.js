// Page loader
window.addEventListener('load', () => {
  const loader = document.querySelector('.page-loader');
  if (loader) {
    loader.classList.add('hidden');
  }
});

// Mobile navigation toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Reveal on scroll
const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => revealObserver.observe(item));

// Active nav link on scroll
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const setActiveLink = () => {
  let current = '';
  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navAnchors.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};

window.addEventListener('scroll', setActiveLink);
setActiveLink();

// Counter animation
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const counter = entry.target;
      const target = Number(counter.getAttribute('data-target'));
      const duration = 1400;
      const startTime = performance.now();

      const step = (time) => {
        const progress = Math.min((time - startTime) / duration, 1);
        const value = Math.floor(progress * target);
        counter.textContent = `${value}`;
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
      observer.unobserve(counter);
    });
  },
  { threshold: 0.6 }
);

counters.forEach((counter) => counterObserver.observe(counter));

// FAQ accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');
  button?.addEventListener('click', () => {
    const isOpen = item.classList.contains('active');

    faqItems.forEach((entry) => {
      entry.classList.remove('active');
      entry.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      item.classList.add('active');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

// Contact form interaction
const contactForm = document.getElementById('contact-form');
const formMessage = document.querySelector('.form-message');

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (formMessage) {
    formMessage.textContent = 'Thanks! We will be in touch within one business day.';
  }
  contactForm.reset();
});

// Floating button scroll
const floatingBtn = document.querySelector('.floating-btn');
floatingBtn?.addEventListener('click', () => {
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
});
