/* ============================================================
   SIYA — Portfolio interactions
   Smooth scroll (Lenis) · Scroll reveals (GSAP/ScrollTrigger)
   Floating particles · Cursor glow · Magnetic buttons
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Lenis smooth scroll ---------------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lenis;
  if (window.Lenis && !prefersReducedMotion) {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    lenis.on('scroll', () => { if (window.ScrollTrigger) ScrollTrigger.update(); });
  }

  /* ---------------- GSAP setup ---------------- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    if (lenis) {
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    /* Hero entrance */
    gsap.to('.hero-name .word', {
      y: '0%',
      duration: 1.1,
      ease: 'power4.out',
      delay: 0.2,
    });
    gsap.to('.reveal-hero', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.12,
      delay: 0.6,
    });

    /* Section reveals */
    gsap.utils.toArray('.reveal').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    /* Skill bar fill */
    gsap.utils.toArray('.skill-fill').forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        onEnter: () => { el.style.width = el.dataset.width; },
        onLeaveBack: () => { el.style.width = '0%'; },
      });
    });

    /* Hero image parallax */
    gsap.to('#heroImg', {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    /* Ledger grid subtle parallax */
    gsap.to('.ledger-grid', {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });
  } else {
    // Fallback: ensure content is visible without GSAP
    document.querySelectorAll('.reveal, .reveal-hero, .hero-name .word').forEach(el => {
      el.style.opacity = 1;
      el.style.transform = 'none';
    });
    document.querySelectorAll('.skill-fill').forEach(el => el.style.width = el.dataset.width);
  }

  /* Set initial state for hero reveal items (so they animate in) */
  document.querySelectorAll('.reveal-hero').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
  });

  /* ---------------- Cursor glow ---------------- */
  const glow = document.getElementById('cursorGlow');
  if (glow && !prefersReducedMotion && matchMedia('(pointer: fine)').matches) {
    let gx = window.innerWidth / 2, gy = window.innerHeight / 2;
    let cx = gx, cy = gy;
    window.addEventListener('mousemove', (e) => { gx = e.clientX; gy = e.clientY; });
    function loop() {
      cx += (gx - cx) * 0.12;
      cy += (gy - cy) * 0.12;
      glow.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    }
    loop();
  } else if (glow) {
    glow.style.display = 'none';
  }

  /* ---------------- Magnetic buttons ---------------- */
  if (!prefersReducedMotion && matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.magnetic').forEach((btn) => {
      const inner = btn.querySelector('.magnetic-inner') || btn;
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
        inner.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0,0)';
        inner.style.transform = 'translate(0,0)';
      });
    });
  }

  /* ---------------- Mobile menu ---------------- */
  const menuBtn = document.getElementById('menuBtn');
  const closeMenu = document.getElementById('closeMenu');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    const toggle = (open) => {
      mobileMenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    menuBtn.addEventListener('click', () => toggle(true));
    closeMenu?.addEventListener('click', () => toggle(false));
    document.querySelectorAll('.mobile-link').forEach((link) => {
      link.addEventListener('click', () => toggle(false));
    });
  }

  /* ---------------- Floating particles ---------------- */
  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: -9999, y: -9999 };
    let W, H;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const COUNT = window.innerWidth < 768 ? 38 : 80;
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.6 + 0.4,
        vy: -(Math.random() * 0.35 + 0.08),
        vx: (Math.random() - 0.5) * 0.15,
        a: Math.random() * 0.5 + 0.1,
      });
    }

    window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });

    function tick() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        // gentle drift
        p.x += p.vx;
        p.y += p.vy;

        // mouse repel
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const f = (120 - dist) / 120;
          p.x += (dx / (dist || 1)) * f * 1.2;
          p.y += (dy / (dist || 1)) * f * 1.2;
        }

        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(216,184,115,${p.a})`;
        ctx.fill();
      });
      requestAnimationFrame(tick);
    }
    tick();
  }

  /* ---------------- Active nav link on scroll ---------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const setActive = () => {
    let current = '';
    sections.forEach((sec) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
        current = sec.id;
      }
    });
    navLinks.forEach((link) => {
      link.classList.toggle('text-ink', link.getAttribute('href') === `#${current}`);
    });
  };
  window.addEventListener('scroll', setActive);
  setActive();
});
