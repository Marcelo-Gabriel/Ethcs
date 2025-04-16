document.addEventListener('DOMContentLoaded', function() {
    // Cursor Personalizado
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    
    // Links que alteram o cursor
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
      });
    });
    
    // Animação do Hero Title
    const titleWords = document.querySelectorAll('.title-word');
    
    titleWords.forEach((word, index) => {
      setTimeout(() => {
        word.style.transform = 'translateY(0)';
        word.style.opacity = '1';
      }, index * 300);
    });
    
    // Contador de Estatísticas
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-count');
      const count = +counter.innerText;
      const increment = target / speed;
      
      if (count < target) {
        const updateCount = () => {
          const newCount = Math.ceil(count + increment);
          counter.innerText = newCount;
          
          if (newCount < target) {
            setTimeout(updateCount, 1);
          } else {
            counter.innerText = target;
          }
        };
        updateCount();
      }
    });
    
    // Menu Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    
    // Scroll Suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Animação ao Scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate, .animate-slide');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executa uma vez ao carregar
  });