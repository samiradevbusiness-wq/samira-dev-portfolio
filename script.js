const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const backToTop = document.querySelector('.back-to-top');
const revealItems = document.querySelectorAll('.reveal');
const counters = document.querySelectorAll('.count');
const bmiForm = document.getElementById('bmi-form');
const bmiResult = document.getElementById('bmi-result');
const membershipForm = document.getElementById('membership-form');
const formMessage = document.getElementById('form-message');

navToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => navLinks?.classList.remove('open'));
});

themeToggle?.addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
  document.body.classList.toggle('light');
  themeToggle.textContent = document.documentElement.classList.contains('light') ? '🌙' : '☀';
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('reveal')) {
          revealObserver.unobserve(entry.target);
        }
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count || 0);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          el.textContent = target.toLocaleString();
          clearInterval(timer);
        } else {
          el.textContent = current.toLocaleString();
        }
      }, 24);
      countObserver.unobserve(el);
    });
  },
  { threshold: 0.6 }
);

counters.forEach((counter) => countObserver.observe(counter));

window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 600 ? 'grid' : 'none';
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

bmiForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const height = Number(document.getElementById('height').value);
  const weight = Number(document.getElementById('weight').value);
  if (!height || !weight) return;
  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
  let category = 'Normal';
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25) category = 'Normal';
  else if (bmi < 30) category = 'Overweight';
  else category = 'Obese';
  bmiResult.textContent = `BMI: ${bmi} — ${category}`;
});

membershipForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  formMessage.textContent = 'Thank you! Our concierge team will contact you shortly.';
  membershipForm.reset();
});

document.body.classList.add('loading');
setTimeout(() => document.body.classList.remove('loading'), 500);
