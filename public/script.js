document.addEventListener('DOMContentLoaded', function() {
    // Menu hamburguer para mobile
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('header').appendChild(menuToggle);
    
    menuToggle.addEventListener('click', function() {
        document.querySelector('nav').classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
    });

    // Configura rolagem suave com performance
    function setupSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (!target) return;
                
                // Fecha o menu se estiver aberto
                document.querySelector('nav').classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
                
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
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

        // Observer para cards de avaliação com efeito cascata
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                        cardObserver.unobserve(entry.target);
                    }, index * 200); // Delay progressivo para cada card
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

        // Animação para a imagem do café
        const cafeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target.querySelector('.foto img') || entry.target;
                    img.style.transform = 'rotate(0deg) translateX(0)';
                    img.style.opacity = '1';
                    cafeObserver.unobserve(entry.target);
                }
            });
        }, {threshold: 0.1});

        const cafeImg = document.querySelector('.foto img');
        if (cafeImg) {
            // Configura estado inicial da animação
            cafeImg.style.transition = 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.8s ease-out';
            cafeImg.style.transform = 'rotate(-10deg) translateX(50px)';
            cafeImg.style.opacity = '0.5';
            
            cafeObserver.observe(document.querySelector('#inicio'));
        }
    }

    // Inicializa tudo
    setupSmoothScroll();
    initAnimations();
});