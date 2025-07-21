// Animation utilities
class AnimationManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupScrollAnimations();
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe elements that should animate on scroll
    this.observeElements();
  }

  observeElements() {
    const animatableElements = document.querySelectorAll('.slide-up, .fade-in, .glass-card');
    animatableElements.forEach(el => {
      this.observer.observe(el);
    });
  }

  setupScrollAnimations() {
    // Simplified scroll animations - removed parallax to prevent issues
    window.addEventListener('scroll', () => {
      // Simple scroll tracking without transforms that could cause issues
    });
  }

  // Smooth scroll to element
  scrollToElement(selector, offset = 80) {
    const element = document.querySelector(selector);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  // Animate number counting
  animateCounter(element, target, duration = 2000) {
    const start = parseInt(element.textContent) || 0;
    const increment = (target - start) / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 16);
  }

  // Stagger animation for multiple elements
  staggerAnimation(elements, delay = 100) {
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('animate-in');
      }, index * delay);
    });
  }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
  window.animationManager = new AnimationManager();
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = this.getAttribute('href');
      if (target && target !== '#') {
        window.animationManager.scrollToElement(target);
      }
    });
  });
});

export default AnimationManager;
