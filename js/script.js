document.addEventListener('DOMContentLoaded', function () {
    const backToTopButton = document.getElementById('backToTop');
    const mainHeader = document.getElementById('mainHeader');

    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });

                // Update active navigation link
                document.querySelectorAll('nav a').forEach(navLink => {
                    navLink.classList.remove('text-blue-600');
                    navLink.classList.add('text-gray-700');
                });

                this.classList.remove('text-gray-700');
                this.classList.add('text-blue-600');
            }
        });
    });

    // Counter animation for statistics
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');

        counters.forEach(counter => {
            const target = parseInt(counter.innerText);
            const duration = 2000; // 2 seconds
            const stepTime = 50; // update every 50ms
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.innerText = Math.ceil(current);
                    setTimeout(updateCounter, stepTime);
                } else {
                    counter.innerText = target;
                }
            };

            updateCounter();
        });
    }

    // Intersection Observer for the counters section
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('#a-propos');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }

    // Back to top button visibility
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }

        if (window.scrollY > 10) {
            mainHeader.classList.add('header-scrolled');
            mainHeader.style.backgroundColor = 'white';
            mainHeader.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            mainHeader.classList.remove('header-scrolled');
            mainHeader.style.backgroundColor = 'transparent';
            mainHeader.style.boxShadow = 'none';
        }

        // Update active navigation link based on scroll position
        const scrollPosition = window.scrollY + 150;

        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('text-blue-600');
                    link.classList.add('text-gray-700');
                });

                document.querySelector(`nav a[href="#${sectionId}"]`)?.classList.add('text-blue-600');
                document.querySelector(`nav a[href="#${sectionId}"]`)?.classList.remove('text-gray-700');
            }
        });
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effects for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.transition = 'transform 0.3s ease-in-out';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Add animation for team member cards
    const teamCards = document.querySelectorAll('.team-member-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
            card.style.transition = 'transform 0.3s ease-in-out';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });

    // Form input animation
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.borderColor = '#3b82f6';
            input.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.2)';
            input.style.transition = 'all 0.3s ease-in-out';
        });

        input.addEventListener('blur', () => {
            input.style.boxShadow = 'none';
        });
    });
}); 