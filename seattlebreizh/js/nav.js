function initNav() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  if (!hamburger || !nav) return;

  function toggleMenu() {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    nav.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  hamburger.addEventListener('click', toggleMenu);
  hamburger.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('layout:ready', initNav);
} else {
  document.addEventListener('layout:ready', initNav);
}
