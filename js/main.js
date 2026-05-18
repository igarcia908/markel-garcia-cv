/* ============================================================
   NAVBAR — scroll state & mobile toggle
   ============================================================ */
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveLink();
});

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ============================================================
   ACTIVE NAV LINK — highlights current section
   ============================================================ */
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const scrollPos = window.scrollY + 80;
  sections.forEach(section => {
    const id   = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (!link) return;
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;
    link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
  });
}

/* ============================================================
   SCROLL REVEAL — fade-in on enter viewport
   ============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============================================================
   LANGUAGE BARS — animate width when section is visible
   ============================================================ */
const langObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      bar.style.width = bar.dataset.width + '%';
      langObserver.unobserve(bar);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.lang-fill').forEach(bar => langObserver.observe(bar));

/* ============================================================
   SCROLL-DOWN ARROW — fades out once user scrolls
   ============================================================ */
const scrollDown = document.querySelector('.scroll-down');
if (scrollDown) {
  window.addEventListener('scroll', () => {
    scrollDown.style.opacity = window.scrollY > 120 ? '0' : '1';
  }, { passive: true });
}

/* ============================================================
   SMOOTH SCROLL FALLBACK — for browsers without CSS support
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 64;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
