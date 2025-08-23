// Mobile menu toggle
const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.navmenu');
if(toggle){
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// Intersection Observer reveal
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if(e.isIntersecting){ e.target.classList.add('visible'); observer.unobserve(e.target); }
  }),
  {rootMargin: '0px 0px -10% 0px'}
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if(id.length > 1){
      e.preventDefault();
      document.querySelector(id).scrollIntoView({behavior:'smooth'});
      menu?.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

// Contact form handler (using fetch)
const contactForm = document.getElementById('contact-form');
const formMessage = document.querySelector('.form-message');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const action = 'https://formspree.io/f/xovlgjjy';
    try {
      const response = await fetch(action, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        formMessage.textContent = "Thanks! Your message has been sent. We'll be in touch soon. 👍";
        formMessage.style.color = 'green';
        form.reset();
      } else {
        formMessage.textContent = 'Oops! There was a problem submitting your form. Please try again or email us directly. 😔';
        formMessage.style.color = 'red';
      }
    } catch (error) {
      formMessage.textContent = 'An unexpected error occurred. Please check your network and try again. 😵';
      formMessage.style.color = 'red';
    }
  });
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();