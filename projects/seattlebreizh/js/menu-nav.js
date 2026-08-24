function initMenuNav() {
  const categoryNav = document.querySelector('.menu-categories');
  if (!categoryNav) return;

  const links = categoryNav.querySelectorAll('a');
  const sections = [];

  links.forEach(function (link) {
    const id = link.getAttribute('href').replace('#', '');
    const section = document.getElementById(id);
    if (section) sections.push({ link: link, section: section });
  });

  if (sections.length === 0) return;

  links[0].classList.add('active');

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (l) {
            l.classList.remove('active');
          });
          const match = sections.find(function (s) {
            return s.section === entry.target;
          });
          if (match) match.link.classList.add('active');
        }
      });
    },
    {
      rootMargin: '-40% 0px -50% 0px',
      threshold: 0
    }
  );

  sections.forEach(function (s) {
    observer.observe(s.section);
  });
}

document.addEventListener('layout:ready', initMenuNav);
