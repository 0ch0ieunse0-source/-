// =========================================================
// EUN SEO — Product Designer Portfolio
// Shared interactions: reveal-on-scroll, header state, scroll progress,
// hero parallax, section scrollspy
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Reveal on scroll ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* ---- Header scrolled state + scroll progress + hero parallax ---- */
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.scroll-progress');
  const heroMark = document.querySelector('.hero-mark');
  let ticking = false;

  function onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (header) {
      header.classList.toggle('scrolled', scrollTop > 8);
    }

    if (progress) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progress.style.width = pct + '%';
    }

    if (heroMark && !reduceMotion) {
      const offset = Math.min(scrollTop * 0.15, 60);
      heroMark.style.transform = `translateY(${offset}px)`;
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  /* ---- Section scrollspy (active nav highlight) ---- */
  const navLinks = Array.from(document.querySelectorAll('.nav-col[href^="#"]'));
  if ('IntersectionObserver' in window && navLinks.length) {
    const sections = navLinks
      .map((link) => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    if (sections.length) {
      const spy = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const link = navLinks.find((a) => a.getAttribute('href') === `#${entry.target.id}`);
            if (!link) return;
            if (entry.isIntersecting) {
              navLinks.forEach((a) => a.classList.remove('active'));
              link.classList.add('active');
            }
          });
        },
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
      );
      sections.forEach((s) => spy.observe(s));
    }
  }
});
