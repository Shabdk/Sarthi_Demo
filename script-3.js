/* =============================================
   ByteWave Solutions — Main JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- NAVBAR: add shadow on scroll ---- */
  const nav = document.getElementById('navbar');
  const backTopBtn = document.getElementById('back-top');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
    backTopBtn.classList.toggle('visible', window.scrollY > 400);
  });

  /* ---- BACK TO TOP ---- */
  backTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- HAMBURGER (mobile nav) ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('mobile-open');
    if (isOpen) {
      navLinks.classList.remove('mobile-open');
      navLinks.removeAttribute('style');
    } else {
      navLinks.classList.add('mobile-open');
      navLinks.style.cssText = [
        'display:flex',
        'flex-direction:column',
        'position:absolute',
        'top:70px',
        'left:0',
        'right:0',
        'background:white',
        'padding:16px 24px',
        'gap:4px',
        'border-bottom:1px solid var(--border)',
        'box-shadow:var(--shadow)',
        'z-index:99',
      ].join(';');
    }
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
      navLinks.removeAttribute('style');
    });
  });

  /* ---- FAQ ACCORDION ---- */
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item   = q.parentElement;
      const answer = item.querySelector('.faq-a');
      const isOpen = item.classList.contains('open');

      // Close all items
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-a').style.maxHeight = '0';
      });

      // Open the clicked item if it was closed
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Initialise any .open items on page load
  document.querySelectorAll('.faq-item.open').forEach(item => {
    const answer = item.querySelector('.faq-a');
    answer.style.maxHeight = answer.scrollHeight + 300 + 'px';
  });

  /* ---- CONTACT FORM ---- */
  const contactForm    = document.getElementById('contact-form');
  const formSuccessMsg = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      contactForm.style.display = 'none';
      formSuccessMsg.style.display = 'block';
    });
  }

  /* ---- SCROLL-ENTRANCE ANIMATIONS ---- */
  const animatedSelectors = [
    '.service-card',
    '.why-card',
    '.portfolio-card',
    '.blog-card',
    '.process-step',
    '.how-step',
  ].join(', ');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target); // animate once only
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(animatedSelectors).forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

});
