document.addEventListener('DOMContentLoaded', function() {
    // Configura rolagem suave com performance
    function setupSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (!target) return;
                
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Atualiza URL sem recarregar
                history.replaceState(null, null, `#${target.id}`);
            });
        });
    }

    // Animações otimizadas com IntersectionObserver
    function initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        // Observer para cards
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    cardObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.card').forEach(card => {
            cardObserver.observe(card);
        });

        // Observer para formulário
        const formObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    formObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const newsletterForm = document.querySelector('.formulario');
        if (newsletterForm) {
            formObserver.observe(newsletterForm);
        }
    }

    // Inicializa tudo
    setupSmoothScroll();
    initAnimations();
});