document.addEventListener('DOMContentLoaded', function () {
    const backToTopButton = document.getElementById('backToTop');
    const mainHeader = document.getElementById('mainHeader');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-menu a');
    const desktopNavLinks = document.querySelectorAll('nav a');
    const mobileNavLinksArray = Array.from(mobileNavLinks);

    // Mobile navigation toggle
    function toggleMobileNav() {
        mobileNavMenu.classList.toggle('active');
        mobileNavOverlay.classList.toggle('active');
        document.body.classList.toggle('overflow-hidden');

        // Toggle icon between bars and times
        const icon = mobileNavToggle.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }

    mobileNavToggle.addEventListener('click', toggleMobileNav);
    mobileNavOverlay.addEventListener('click', toggleMobileNav);

    // Close mobile nav when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMobileNav();
        });
    });

    // Function to update active navigation link based on current section
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 150;
        let activeSection = null;

        // Find the current active section based on scroll position
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                activeSection = sectionId;
            }
        });

        // Update all navigation links (desktop and mobile)
        if (activeSection) {
            // Get all navigation links
            const allNavLinks = document.querySelectorAll('nav a, .mobile-nav-link');

            // Reset all links to inactive state
            allNavLinks.forEach(link => {
                link.classList.remove('text-blue-600');
                link.classList.add('text-gray-700');

                const linkHref = link.getAttribute('href').substring(1); // Remove the # character
                if (linkHref === activeSection) {
                    link.classList.remove('text-gray-700');
                    link.classList.add('text-blue-600');
                }
            });
        }
    }

    // Initialize AOS animations with responsive settings
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        disable: window.innerWidth < 768 ? true : false // Disable animations on mobile for better performance
    });

    // Check the current section when the page loads
    updateActiveNavLink();

    // Also update header appearance on page load
    if (window.scrollY > 10) {
        mainHeader.classList.add('header-scrolled');
        mainHeader.style.backgroundColor = 'white';
        mainHeader.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    // Smooth scrolling for navigation links with responsive offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            const isMobile = window.innerWidth < 768;

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - (isMobile ? 80 : 100), // Smaller offset on mobile
                    behavior: 'smooth'
                });

                // Update active navigation link
                desktopNavLinks.forEach(navLink => {
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
        updateActiveNavLink();
    });

    // Handle window resize events for responsive adjustments
    window.addEventListener('resize', function () {
        // Reset mobile menu if window is resized to desktop size
        if (window.innerWidth >= 768) {
            if (mobileNavMenu.classList.contains('active')) {
                mobileNavMenu.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
                document.body.classList.remove('overflow-hidden');
                const icon = mobileNavToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }

        // Update AOS for current screen size
        AOS.refresh();

        // Re-check current section after resize
        updateActiveNavLink();
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add touch events for service cards (better for mobile)
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        // Mouse events for desktop
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.transition = 'transform 0.3s ease-in-out';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });

        // Touch events for mobile
        card.addEventListener('touchstart', () => {
            card.style.transform = 'translateY(-5px)';
        }, { passive: true });

        card.addEventListener('touchend', () => {
            card.style.transform = 'translateY(0)';
        }, { passive: true });
    });

    // Add touch events for team member cards
    const teamCards = document.querySelectorAll('.team-member-card');
    teamCards.forEach(card => {
        // Mouse events for desktop
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
            card.style.transition = 'transform 0.3s ease-in-out';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });

        // Touch events for mobile
        card.addEventListener('touchstart', () => {
            card.style.transform = 'scale(1.02)';
        }, { passive: true });

        card.addEventListener('touchend', () => {
            card.style.transform = 'scale(1)';
        }, { passive: true });
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