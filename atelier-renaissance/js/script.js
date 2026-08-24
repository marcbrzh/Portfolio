// ========================================================= 
// === ANIMATIONS & INTERACTIONS ===========================
// =========================================================

// Respect user's motion preferences
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ========================================================= 
// === SCROLL REVEAL ANIMATIONS ===========================
// =========================================================

const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (!prefersReducedMotion) {
        entry.target.classList.add('animate-in');
      } else {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
      }
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Elements to observe for scroll reveal
const elementsToObserve = document.querySelectorAll(
  'section > h2, ' +
  '.section-intro, ' +
  '.atelier-text, ' +
  '.intro-text, ' +
  '.service-card, ' +
  '.realisations-item, ' +
  '.avis-item, ' +
  '.avant-apres-item, ' +
  '.etude-card, ' +
  '.temoignage-card, ' +
  '.complementaire-card, ' +
  '.equipement-card, ' +
  '.service-atelier-item, ' +
  '.localisation-info, ' +
  '.service-detail-content, ' +
  '.process-step, ' +
  '.stat-item, ' +
  '.split-intro__content'
);

elementsToObserve.forEach(el => {
  observer.observe(el);
});

// ========================================================= 
// === HAMBURGER MENU & NAVIGATION ========================
// =========================================================

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a');
const body = document.body;

if (hamburger) {
  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    body.classList.toggle('no-scroll', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    hamburger.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  });

  // Close menu when link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
      body.classList.remove('no-scroll');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains('open')) {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
      body.classList.remove('no-scroll');
    }
  });
}

// ========================================================= 
// === SMOOTH SCROLL BEHAVIOR ==========================
// =========================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ========================================================= 
// === HEADER SCROLL EFFECT ==============================
// =========================================================

let lastScrollY = 0;
const header = document.querySelector('header');

if (header) {
  window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    header.classList.toggle('is-scrolled', lastScrollY > 24);
  }, { passive: true });
  header.classList.toggle('is-scrolled', window.scrollY > 24);
}

// ========================================================= 
// === BUTTON RIPPLE EFFECT ==============================
// =========================================================

document.querySelectorAll('.btn:not(.cta-nav)').forEach(button => {
  button.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// ========================================================= 
// === FORM INTERACTIONS =================================
// =========================================================

const formInputs = document.querySelectorAll('input, textarea');

formInputs.forEach(input => {
  // Focus animation
  input.addEventListener('focus', function () {
    this.parentElement.classList.add('focused');
  });

  // Blur animation
  input.addEventListener('blur', function () {
    if (!this.value) {
      this.parentElement.classList.remove('focused');
    }
  });

  // Initialize focused state if input has value
  if (input.value) {
    input.parentElement.classList.add('focused');
  }
});

// ========================================================= 
// === STAGGER ANIMATION FOR GRID ITEMS =================
// =========================================================

const gridContainers = document.querySelectorAll(
  '.services-grid, ' +
  '.realisations-grid, ' +
  '.avis-grid, ' +
  '.avant-apres-grid, ' +
  '.etudes-grid, ' +
  '.temoignages-grid, ' +
  '.complementaires-grid, ' +
  '.equipements-grid, ' +
  '.services-atelier-grid, ' +
  '.localisation-grid'
);

gridContainers.forEach(container => {
  const items = container.querySelectorAll(':scope > *');
  
  items.forEach((item, index) => {
    // Set animation delay based on item index
    if (!prefersReducedMotion) {
      item.style.setProperty('--stagger-delay', `${index * 0.08}s`);
    }
    
    observer.observe(item);
  });
});

// ========================================================= 
// === ACTIVE LINK INDICATOR =============================
// =========================================================

const updateActiveLink = () => {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('nav a');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${current}`) {
      item.classList.add('active');
    }
  });
};

window.addEventListener('scroll', updateActiveLink, { passive: true });

// ========================================================= 
// === IMAGE LAZY LOADING WITH ANIMATION ================
// =========================================================

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
      
      if (!prefersReducedMotion) {
        img.classList.add('image-loaded');
      }
      
      imageObserver.unobserve(img);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '50px'
});

document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});

// ========================================================= 
// === FORM SUBMISSION ANIMATION =======================
// =========================================================

const contactForm = document.querySelector('.contact form');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Add loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Envoi en cours...';
    submitButton.style.opacity = '0.7';
    
    // Simulate form submission
    setTimeout(() => {
      submitButton.textContent = 'Envoyé! ✓';
      submitButton.style.background = '#7cb342';
      
      // Reset form
      setTimeout(() => {
        this.reset();
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        submitButton.style.opacity = '1';
        submitButton.style.background = '';
      }, 2000);
    }, 1000);
  });
}

// ========================================================= 
// === NUMBER COUNTER ANIMATION ==========================
// =========================================================

const animateCounter = (element, target, duration = 2000) => {
  if (!element.textContent.match(/\d+/)) return;
  
  const startValue = 0;
  const increment = target / (duration / 16);
  let currentValue = startValue;
  
  const counter = setInterval(() => {
    currentValue += increment;
    
    if (currentValue >= target) {
      element.textContent = target;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(currentValue);
    }
  }, 16);
};

// Observe elements with number animations
const numberElements = document.querySelectorAll('.service-number');
const numberObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      const number = parseInt(entry.target.textContent);
      if (!isNaN(number)) {
        animateCounter(entry.target, number, 1500);
        entry.target.dataset.animated = 'true';
      }
      numberObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

numberElements.forEach(el => numberObserver.observe(el));

// ========================================================= 
// === TOOLTIP/HOVER ANIMATIONS ==========================
// =========================================================

document.querySelectorAll('.projet-tags em').forEach(tag => {
  tag.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-2px)';
  });

  tag.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0)';
  });
});

// ========================================================= 
// === SERVICE DETAIL CONTENT REVEAL ====================
// =========================================================

const serviceDetailContents = document.querySelectorAll('.service-detail-content');

serviceDetailContents.forEach(content => {
  const textSection = content.querySelector('.service-detail-text');
  const imageSection = content.querySelector('img');
  
  if (textSection) observer.observe(textSection);
  if (imageSection) observer.observe(imageSection);
});

// ========================================================= 
// === PAGE TRANSITION ANIMATIONS ========================
// =========================================================

window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  document.body.style.animation = 'fadeIn 0.6s ease-out';
});

// ========================================================= 
// === RESIZE HANDLER FOR RESPONSIVE =====================
// =========================================================

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Reset any dimension-dependent calculations
    updateActiveLink();
  }, 250);
});

// ========================================================= 
// === ACCESSIBILITY: FOCUS VISIBLE STYLES ==============
// =========================================================

document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

// Current page nav highlight
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (href && !href.startsWith('http') && href === currentPath) {
    link.setAttribute('aria-current', 'page');
    link.classList.add('active');
  }
});