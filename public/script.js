document.addEventListener('DOMContentLoaded', function() {
    // Menu hamburguer para mobile
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('header').appendChild(menuToggle);
    
    // Controla o menu mobile
    menuToggle.addEventListener('click', function() {
        const nav = document.querySelector('nav');
        nav.classList.toggle('active');
        
        // Alterna entre ícone de menu e X
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
        
        // Impede a rolagem quando o menu está aberto
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Fecha o menu ao clicar em um link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('nav').classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
            document.body.style.overflow = '';
        });
    });

    // Configura rolagem suave com remoção do # da URL
    function setupSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                if (!target) return;
                
                // Fecha o menu se estiver aberto
                document.querySelector('nav').classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
                document.body.style.overflow = '';
                
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Adiciona o hash na URL temporariamente para rolagem
                history.pushState(null, null, targetId);
                
                // Remove o hash após a rolagem
                setTimeout(() => {
                    history.replaceState(null, null, ' ');
                }, 1000);
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
                    }, index * 200);
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

        // Animação para a imagem do café (apenas em desktop)
        if (window.innerWidth > 992) {
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
                cafeImg.style.transition = 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.8s ease-out';
                cafeImg.style.transform = 'rotate(-10deg) translateX(50px)';
                cafeImg.style.opacity = '0.5';
                
                cafeObserver.observe(document.querySelector('#inicio'));
            }
        }
    }

    // Ajusta o padding do conteúdo principal para não ficar atrás do header
    function adjustContentPadding() {
        const headerHeight = document.querySelector('header').offsetHeight;
        document.querySelector('#inicio').style.paddingTop = headerHeight + 'px';
    }
    
    // Inicializa tudo
    setupSmoothScroll();
    initAnimations();
    adjustContentPadding();
    
    // Recalcula quando a janela é redimensionada
    window.addEventListener('resize', adjustContentPadding);
    
    // Remove o # da URL se a página for carregada com hash
    if (window.location.hash) {
        setTimeout(() => {
            history.replaceState(null, null, ' ');
        }, 500);
    }
});