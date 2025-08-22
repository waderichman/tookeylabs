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

// Contact form handler (demo only)
function handleSubmit(e){
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  // Replace this with your form backend or email service
  alert(`Thanks, ${data.name}! We'll reach out at ${data.email}.`);
  e.target.reset();
  return false;
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
