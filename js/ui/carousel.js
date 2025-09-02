// src/js/ui/carousel.js
   const header = document.getElementById('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    // Carousel functionality
    class Carousel {
      constructor(element) {
        this.carousel = element;
        this.viewport = element.querySelector('.carousel__viewport');
        this.slides = [...element.querySelectorAll('.carousel__slide')];
        this.prevBtn = element.querySelector('.carousel__prev');
        this.nextBtn = element.querySelector('.carousel__next');
        this.dotsContainer = element.querySelector('.carousel__dots');
        this.toggleBtn = element.querySelector('.carousel__toggle');
        
        this.currentIndex = 0;
        this.isPlaying = false;
        this.autoplayInterval = null;
        
        this.init();
      }

      init() {
        this.createDots();
        this.bindEvents();
        this.updateUI();
      }

      createDots() {
        this.slides.forEach((_, index) => {
          const dot = document.createElement('button');
          dot.setAttribute('role', 'tab');
          dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
          dot.setAttribute('aria-label', `Ir para slide ${index + 1}`);
          dot.addEventListener('click', () => this.goToSlide(index));
          this.dotsContainer.appendChild(dot);
        });
        this.dots = [...this.dotsContainer.querySelectorAll('button')];
      }

      bindEvents() {
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.toggleBtn.addEventListener('click', () => this.toggleAutoplay());
        
        // Pause on hover
        this.carousel.addEventListener('mouseenter', () => this.pause());
        this.carousel.addEventListener('mouseleave', () => {
          if (this.isPlaying) this.play();
        });

        // Touch/swipe support
        let startX = 0;
        let endX = 0;
        
        this.viewport.addEventListener('touchstart', (e) => {
          startX = e.touches[0].clientX;
        });
        
        this.viewport.addEventListener('touchend', (e) => {
          endX = e.changedTouches[0].clientX;
          const diff = startX - endX;
          
          if (Math.abs(diff) > 50) {
            if (diff > 0) {
              this.nextSlide();
            } else {
              this.previousSlide();
            }
          }
        });
      }

      goToSlide(index) {
        this.currentIndex = index;
        this.updateUI();
      }

      nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateUI();
      }

      previousSlide() {
        this.currentIndex = this.currentIndex === 0 ? this.slides.length - 1 : this.currentIndex - 1;
        this.updateUI();
      }

      updateUI() {
        // Update viewport
        const translateX = -this.currentIndex * 100;
        this.viewport.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        this.dots.forEach((dot, index) => {
          dot.setAttribute('aria-selected', index === this.currentIndex ? 'true' : 'false');
        });
        
        // Update aria-live region
        this.viewport.setAttribute('aria-live', 'polite');
      }

      toggleAutoplay() {
        if (this.isPlaying) {
          this.pause();
        } else {
          this.play();
        }
      }

      play() {
        this.isPlaying = true;
        this.toggleBtn.setAttribute('aria-pressed', 'true');
        this.toggleBtn.setAttribute('aria-label', 'Pausar rotação automática');
        this.toggleBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        `;
        
        this.autoplayInterval = setInterval(() => {
          this.nextSlide();
        }, 5000);
      }

      pause() {
        this.isPlaying = false;
        this.toggleBtn.setAttribute('aria-pressed', 'false');
        this.toggleBtn.setAttribute('aria-label', 'Iniciar rotação automática');
        this.toggleBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        `;
        
        if (this.autoplayInterval) {
          clearInterval(this.autoplayInterval);
          this.autoplayInterval = null;
        }
      }
    }

    // Initialize carousel
    document.addEventListener('DOMContentLoaded', () => {
      const carouselElement = document.querySelector('.carousel');
      if (carouselElement) {
        new Carousel(carouselElement);
      }
    });

    // Fade-in animation on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all fade-in elements
    document.addEventListener('DOMContentLoaded', () => {
      const fadeElements = document.querySelectorAll('.fade-in');
      fadeElements.forEach(el => observer.observe(el));
    });

    // Newsletter form handler
    function handleNewsletterSubmit(event) {
      event.preventDefault();
      
      const form = event.target;
      const email = form.querySelector('input[type="email"]').value;
      const button = form.querySelector('button');
      const originalText = button.innerHTML;
      
      // Simple validation
      if (!email || !email.includes('@')) {
        alert('Por favor, insira um e-mail válido.');
        return;
      }
      
      // Loading state
      button.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" opacity="0.25"/>
          <path d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
        <span>Enviando...</span>
      `;
      button.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        button.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
          <span>Inscrito!</span>
        `;
        
        setTimeout(() => {
          button.innerHTML = originalText;
          button.disabled = false;
          form.reset();
        }, 2000);
      }, 1000);
    }

    // Smooth scrolling for anchor links
    document.addEventListener('DOMContentLoaded', () => {
      const links = document.querySelectorAll('a[href^="#"]');
      links.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        });
      });
    });

    // Enhanced accessibility: Skip to main content
    document.addEventListener('DOMContentLoaded', () => {
      const skipLink = document.createElement('a');
      skipLink.href = '#main';
      skipLink.textContent = 'Pular para o conteúdo principal';
      skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--brand-primary);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.2s;
      `;
      
      skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
      });
      
      skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
      });
      
      document.body.insertBefore(skipLink, document.body.firstChild);
      
      // Add id to main if it doesn't exist
      const main = document.querySelector('main');
      if (main && !main.id) {
        main.id = 'main';
      }
    });
