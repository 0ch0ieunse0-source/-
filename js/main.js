// =========================================================
// EUN SEO — Product Designer Portfolio
// Shared interactions: header state, mobile nav, reveal-on-scroll,
// project row hover preview
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  /* ---- Header scroll state ---- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Mobile nav toggle ---- */
  const menuBtn = document.querySelector('.menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      const open = menuBtn.classList.toggle('open');
      mobileNav.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Reveal on scroll (single subtle pass) ---- */
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

  /* ---- Project row cursor-follow preview (desktop only) ---- */
  const preview = document.querySelector('.hover-preview');
  const rows = document.querySelectorAll('.project-row[data-preview]');
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (preview && isFinePointer && rows.length) {
    const previewImg = preview.querySelector('img');
    let activeRow = null;

    rows.forEach((row) => {
      row.addEventListener('mouseenter', () => {
        activeRow = row;
        const src = row.getAttribute('data-preview');
        if (src && previewImg) previewImg.src = src;
        preview.classList.add('show');
      });
      row.addEventListener('mouseleave', () => {
        activeRow = null;
        preview.classList.remove('show');
      });
    });

    window.addEventListener('mousemove', (e) => {
      if (!activeRow) return;
      const w = preview.offsetWidth;
      const h = preview.offsetHeight;
      preview.style.transform = `translate(${e.clientX - w / 2}px, ${e.clientY - h - 24}px)`;
    });
  }
});
