/* =============================================
   DARSHANKUMAR TALAWAR — PORTFOLIO SCRIPTS
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Init Lucide Icons ──────────────────────
  if (typeof lucide !== 'undefined') lucide.createIcons();


  // ── 2. Navbar scroll effect ───────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });


  // ── 3. Hamburger / Mobile menu ────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });


  // ── 4. Smooth scroll for all anchor links ─────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 100; // account for fixed navbar
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  // ── 5. Scroll reveal (IntersectionObserver) ───
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


  // ── 6. Active nav link highlight on scroll ────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach(s => sectionObserver.observe(s));


  // ── 7. Contact form handler ───────────────────
  const form = document.getElementById('contactForm');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    // Get inputs WITHOUT changing HTML
    const inputs = form.querySelectorAll('input');
    const name = inputs[0]?.value || "";
    const email = inputs[1]?.value || "";

    const textarea = form.querySelector('textarea');
    const messageText = textarea ? textarea.value : "";

    // WhatsApp message
    const message = `Hello, I got a message from my portfolio:%0A%0AName: ${name}%0AEmail: ${email}%0AMessage: ${messageText}`;

    const phone = "917411609199"; // your number
    const url = `https://wa.me/${phone}?text=${message}`;

    // Button UI (your original code)
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;

    btn.innerHTML = '✓ Redirecting...';
    btn.style.background = 'linear-gradient(135deg, #22d3ee, #22c55e)';
    btn.disabled = true;

    // Open WhatsApp
    setTimeout(() => {
      window.open(url, "_blank");
    }, 1000);

    // Reset UI
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();

      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }, 3000);
  });
}


  // ── 8. Subtle mouse-parallax on hero orbs ─────
  const orbs = document.querySelectorAll('.orb');
  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx; // -1 to 1
    const dy = (e.clientY - cy) / cy;

    orbs.forEach((orb, i) => {
      const strength = (i + 1) * 12;
      orb.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    });
  }, { passive: true });


  // ── 9. Floating badges subtle pulse on hover ──
  document.querySelectorAll('.float-badge').forEach(badge => {
    badge.addEventListener('mouseenter', () => {
      badge.style.borderColor = 'rgba(34,211,238,0.6)';
      badge.style.boxShadow = '0 0 16px rgba(34,211,238,0.2)';
    });
    badge.addEventListener('mouseleave', () => {
      badge.style.borderColor = '';
      badge.style.boxShadow = '';
    });
  });


  // ── 10. Skill card tilt on hover (subtle) ─────
  document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -4;
      const rotY = ((x - cx) / cx) * 4;
      card.style.transform = `translateY(-6px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

});
