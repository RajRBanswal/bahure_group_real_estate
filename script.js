const nav = document.querySelector('.bahure-nav');
const topBtn = document.getElementById('topBtn');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
  topBtn.style.display = window.scrollY > 500 ? 'flex' : 'none';
  topBtn.style.alignItems = 'center';
  topBtn.style.justifyContent = 'center';
});

topBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const menu = document.querySelector('.navbar-collapse');
    if (menu.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

const counters = document.querySelectorAll('.stat-item strong');
const animateCounter = (el) => {
  const target = parseInt(el.textContent.replace(/\D/g,''), 10);
  const suffix = el.textContent.includes('+') ? '+' : '';
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 45));
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current + suffix;
  }, 25);
};

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      obs.unobserve(entry.target);
    }
  });
}, {threshold: .7});

counters.forEach(counter => observer.observe(counter));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({behavior:'smooth', block:'start'});
  });
});
