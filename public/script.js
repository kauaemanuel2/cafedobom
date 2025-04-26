document.addEventListener('DOMContentLoaded', function() {
    // Configura a rolagem suave para todos os links âncora
    function setupSmoothScrolling() {
        // Seleciona todos os links que começam com #
        const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
        
        allAnchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                smoothScrollTo(targetId);
            });
        });
    }

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const section = targetId.substring(1); // Remove o #
      
      // Rolagem suave
      document.querySelector(targetId)?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Atualiza a URL sem #
      window.history.pushState({}, '', `/${section}`);
    });
  });
  
  // Restaura a rolagem ao navegar no histórico
  window.addEventListener('popstate', () => {
    const section = window.location.pathname.substring(1);
    if (section) {
      document.querySelector(`#${section}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });


    function animateCards() {
        const cards = document.querySelectorAll('.card');
        const options = { threshold: 0.1 };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, options);

        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
        });
    }


    function animateNewsletter() {
        const newsletterForm = document.querySelector('.formulario');
        if (newsletterForm) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        newsletterForm.style.opacity = '1';
                        newsletterForm.style.transform = 'translateX(0)';
                    }
                });
            }, { threshold: 0.1 });

            newsletterForm.style.opacity = '0';
            newsletterForm.style.transform = 'translateX(50px)';
            newsletterForm.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(newsletterForm);
        }
    }

    setupSmoothScrolling();
    animateCards();
    animateNewsletter();
});