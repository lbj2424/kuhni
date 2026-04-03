/* ============================================================
   KUHNI LANDSCAPING — Main JavaScript
   ============================================================ */

/* ---------- Navbar: add .scrolled class on scroll ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ---------- Mobile nav toggle ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // Swap hamburger ↔ close icon
  navToggle.setAttribute(
    'aria-expanded',
    navLinks.classList.contains('open').toString()
  );
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ---------- Contact form submission ---------- */
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // -------------------------------------------------------
  // TO MAKE THE FORM ACTUALLY SEND EMAILS:
  // Option 1 (easiest): Sign up at https://formspree.io,
  //   create a form, and change the fetch URL below to
  //   'https://formspree.io/f/YOUR_FORM_ID'
  //
  // Option 2: Use Netlify Forms — add data-netlify="true"
  //   to the <form> tag and deploy on Netlify (free).
  //
  // Option 3: Connect your own backend/email service.
  // -------------------------------------------------------

  const btn = contactForm.querySelector('.form-submit');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  // Simulated success — replace with real fetch() call
  setTimeout(() => {
    btn.textContent = 'Message Sent!';
    contactForm.reset();
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
    }, 3000);
  }, 1000);
});

/* ---------- Smooth-scroll offset for fixed navbar ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 12;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});

/* ---------- Scroll-reveal animation ---------- */
const revealEls = document.querySelectorAll('[data-reveal]');
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach(el => revealObs.observe(el));
