document.addEventListener('DOMContentLoaded', function() {
  // Menu Mobile
  const menuToggle = document.querySelector('.menu-toggle');
  const navUl = document.querySelector('nav ul');
  
  menuToggle.addEventListener('click', function() {
      navUl.classList.toggle('active');
      menuToggle.textContent = navUl.classList.contains('active') ? '✕' : '☰';
  });
  
  // Fecha o menu ao clicar em um link (mobile)
  document.querySelectorAll('nav ul li a').forEach(link => {
      link.addEventListener('click', () => {
          if (window.innerWidth < 768) {
              navUl.classList.remove('active');
              menuToggle.textContent = '☰';
          }
      });
  });
  
  // Ajusta a altura do banner em mobile
  function adjustBannerHeight() {
      const banner = document.querySelector('.banner');
      if (window.innerWidth < 768) {
          banner.style.minHeight = window.innerHeight + 'px';
      } else {
          banner.style.minHeight = '';
      }
  }
  
  // FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', () => {
          const answer = question.nextElementSibling;
          const icon = question.querySelector('i');
          
          answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
          icon.style.transform = answer.style.display === 'block' ? 'rotate(180deg)' : 'rotate(0)';
      });
  });
  
  // Ajustes iniciais
  adjustBannerHeight();
  
  // Redimensionamento da janela
  window.addEventListener('resize', function() {
      adjustBannerHeight();
      
      // Esconde o menu se a tela for maior que mobile
      if (window.innerWidth >= 768) {
          navUl.classList.remove('active');
          menuToggle.textContent = '☰';
      }
  });
  
  // Suaviza o scroll para links internos
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

// Firebase para Comentários (trailer.html)
if (document.getElementById('commentForm')) {
  // Configuração do Firebase
  const firebaseConfig = {
      apiKey: "AIzaSyAKVi0MtKFXCB-TJ9iXnFL7tF7Exq5hzQo",
      authDomain: "ethcs-c6fdb.firebaseapp.com",
      projectId: "ethcs-c6fdb",
      storageBucket: "ethcs-c6fdb.firebasestorage.app",
      messagingSenderId: "765305067918",
      appId: "1:765305067918:web:3a4fb279fa6ceda53b2cdf",
      measurementId: "G-8FKW5CVC1B"
  };

  // Inicializa o Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  const commentsRef = database.ref('comments');

  // Formulário de comentário
  document.getElementById('commentForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const comment = document.getElementById('comment').value.trim();
      
      if (!name || !comment) {
          alert('Por favor, preencha todos os campos.');
          return;
      }
      
      const timestamp = new Date().toISOString();
      
      // Salva o comentário no Firebase
      commentsRef.push({
          name: name,
          comment: comment,
          timestamp: timestamp
      }).then(() => {
          document.getElementById('commentForm').reset();
      }).catch((error) => {
          console.error("Erro ao enviar comentário:", error);
          alert("Ocorreu um erro ao enviar seu comentário. Por favor, tente novamente.");
      });
  });

  // Carrega os comentários existentes
  commentsRef.on('value', (snapshot) => {
      const commentsList = document.getElementById('commentsList');
      commentsList.innerHTML = '';
      
      const comments = snapshot.val();
      
      if (!comments) {
          commentsList.innerHTML = `
              <div class="no-comments">
                  <i class="far fa-comment-dots"></i>
                  <p>Nenhum comentário ainda. Seja o primeiro a comentar!</p>
              </div>
          `;
          return;
      }
      
      // Ordena comentários por timestamp (mais recentes primeiro)
      const sortedComments = Object.entries(comments)
          .map(([key, value]) => ({ id: key, ...value }))
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      
      sortedComments.forEach(comment => {
          const commentElement = document.createElement('div');
          commentElement.className = 'comment';
          
          // Gera um avatar aleatório baseado no nome
          const avatarColors = ['#4a6491', '#2c3e50', '#6a8fbb', '#3a5a78'];
          const avatarColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];
          const initials = comment.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
          
          commentElement.innerHTML = `
              <div class="comment-header">
                  <div style="display: flex; align-items: center;">
                      <div class="comment-avatar" style="background-color: ${avatarColor};">
                          ${initials}
                      </div>
                      <strong>${comment.name}</strong>
                  </div>
                  <span class="comment-date">${new Date(comment.timestamp).toLocaleString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                  })}</span>
              </div>
              <div class="comment-body">${comment.comment}</div>
          `;
          commentsList.appendChild(commentElement);
      });
  });
}