const menu = document.querySelector('.menu');
const nav = document.querySelector('#nav-links');
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
}));
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const track = carousel.querySelector('.package-track');
  const slides = [...carousel.querySelectorAll('.package-slide')];
  const dots = [...carousel.parentElement.querySelectorAll('.carousel-dots button')];
  const goTo = index => track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' });
  carousel.querySelector('.previous').addEventListener('click', () => goTo(Math.max(0, Math.round(track.scrollLeft / track.clientWidth) - 1)));
  carousel.querySelector('.next').addEventListener('click', () => goTo(Math.min(slides.length - 1, Math.round(track.scrollLeft / track.clientWidth) + 1)));
  dots.forEach((dot, index) => dot.addEventListener('click', () => goTo(index)));
  track.addEventListener('scroll', () => {
    const active = Math.round(track.scrollLeft / track.clientWidth);
    dots.forEach((dot, index) => dot.classList.toggle('active', index === active));
  }, { passive: true });
});
document.querySelectorAll('[data-photo-carousel]').forEach(gallery => {
  const track = gallery.querySelector('.photo-track');
  const slides = [...gallery.querySelectorAll('figure')];
  const dots = [...gallery.querySelectorAll('.photo-dots button')];
  const previous = gallery.querySelector('.photo-previous');
  const next = gallery.querySelector('.photo-next');
  const goTo = index => track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' });
  if (slides.length < 2) {
    previous.hidden = true;
    next.hidden = true;
    gallery.querySelector('.photo-dots').hidden = true;
  } else {
    previous.addEventListener('click', () => goTo(Math.max(0, Math.round(track.scrollLeft / track.clientWidth) - 1)));
    next.addEventListener('click', () => goTo(Math.min(slides.length - 1, Math.round(track.scrollLeft / track.clientWidth) + 1)));
    dots.forEach((dot, index) => dot.addEventListener('click', () => goTo(index)));
    track.addEventListener('scroll', () => {
      const active = Math.round(track.scrollLeft / track.clientWidth);
      dots.forEach((dot, index) => dot.classList.toggle('active', index === active));
    }, { passive: true });
  }
});
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
