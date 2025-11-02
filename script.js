const initNavigation = () => {
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__links');
  const links = menu?.querySelectorAll('a');

  if (!toggle || !menu) return;

  menu.dataset.open = 'false';

  const closeMenu = () => {
    menu.dataset.open = 'false';
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = menu.dataset.open === 'true';
    menu.dataset.open = String(!isOpen);
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });

  links?.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && !toggle.contains(event.target)) {
      closeMenu();
    }
  });
};

const initRevealAnimations = () => {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach((element) => observer.observe(element));
};

const initMagneticBackground = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;
  let targetX = 50;
  let targetY = 50;
  let animationFrameId;

  const update = () => {
    if (prefersReducedMotion.matches) {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = undefined;
      }
      return;
    }

    root.style.setProperty('--pointer-x', `${targetX}%`);
    root.style.setProperty('--pointer-y', `${targetY}%`);
    animationFrameId = requestAnimationFrame(update);
  };

  const handlePointerMove = (event) => {
    const { clientX, clientY } = event;
    const x = (clientX / window.innerWidth) * 100;
    const y = (clientY / window.innerHeight) * 100;
    targetX += (x - targetX) * 0.08;
    targetY += (y - targetY) * 0.08;
  };

  if (!prefersReducedMotion.matches) {
    animationFrameId = requestAnimationFrame(update);
    window.addEventListener('pointermove', handlePointerMove);
  }

  prefersReducedMotion.addEventListener?.('change', (event) => {
    if (event.matches) {
      root.style.removeProperty('--pointer-x');
      root.style.removeProperty('--pointer-y');
      window.removeEventListener('pointermove', handlePointerMove);
    } else {
      animationFrameId = requestAnimationFrame(update);
      window.addEventListener('pointermove', handlePointerMove);
    }
  });
};

const initPressActions = () => {
  const assetsButton = document.querySelector('[data-action="press-assets"]');
  const onesheetButton = document.querySelector('[data-action="onesheet"]');

  assetsButton?.addEventListener('click', (event) => {
    event.preventDefault();
    window.open('mailto:hello.alexbemusic@gmail.com?subject=Press%20Assets%20Request', '_blank');
  });

  onesheetButton?.addEventListener('click', (event) => {
    event.preventDefault();
    window.open('mailto:hello.alexbemusic@gmail.com?subject=One-sheet%20Request', '_blank');
  });
};

const setCurrentYear = () => {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initRevealAnimations();
  initMagneticBackground();
  initPressActions();
  setCurrentYear();
});
