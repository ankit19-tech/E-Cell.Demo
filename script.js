document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // --- Sticky Navbar ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // Adjust the offset to trigger active state slightly earlier
            if (scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // --- Dynamic Staggering & Section Animations ---
    // Stagger delays for grids
    const gridsToStagger = ['.events-grid', '.team-grid', '.speakers-grid', '.stats-grid', '.gallery-grid'];
    gridsToStagger.forEach(gridSelector => {
        const grid = document.querySelector(gridSelector);
        if (grid) {
            const items = grid.querySelectorAll('.animate-on-scroll');
            items.forEach((item, index) => {
                item.style.transitionDelay = `${index * 0.12}s`;
            });
        }
    });

    // Stagger contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.classList.add('animate-on-scroll', 'slide-up');
        item.style.transitionDelay = `${index * 0.15}s`;
    });

    // Alternate section animations
    const mainSections = document.querySelectorAll('section');
    mainSections.forEach((section, index) => {
        const header = section.querySelector('.section-header');
        if (header) {
            header.classList.remove('slide-up');
            if (index % 2 === 0) {
                header.classList.add('slide-right');
            } else {
                header.classList.add('slide-left');
            }
        }
    });

    // Footer animation
    const footer = document.querySelector('.footer');
    if (footer) {
        footer.classList.add('animate-on-scroll', 'fade-in');
    }

    // --- Button Ripple Effect ---
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            let x = e.clientX - e.target.getBoundingClientRect().left;
            let y = e.clientY - e.target.getBoundingClientRect().top;
            
            let ripples = document.createElement('span');
            ripples.className = 'ripple';
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            
            const size = Math.max(btn.offsetWidth, btn.offsetHeight);
            ripples.style.width = size + 'px';
            ripples.style.height = size + 'px';
            
            this.appendChild(ripples);
            setTimeout(() => {
                ripples.remove();
            }, 600);
        });
    });

    // --- Scroll Animations (Intersection Observer) ---
    const animationElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                if (entry.target.classList.contains('stat-card')) {
                    const counterElement = entry.target.querySelector('.stat-number');
                    if (counterElement && !counterElement.classList.contains('counted')) {
                        animateCounter(counterElement);
                    }
                }

                // Trigger animations only once
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    animationElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // --- Counter Animation (60 FPS RAF) ---
    function animateCounter(counterElement) {
        counterElement.classList.add('counted');
        
        let targetValue = counterElement.getAttribute('data-target');
        if (!targetValue) {
            targetValue = counterElement.innerText.replace(/[^0-9]/g, '');
            counterElement.setAttribute('data-target', targetValue);
        }
        
        const target = +targetValue || 0;
        const duration = 2000;
        let startTimestamp = null;
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeOutProgress = progress * (2 - progress);
            
            const current = Math.floor(easeOutProgress * target);
            counterElement.innerText = current;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                counterElement.innerText = target;
            }
        };
        
        counterElement.innerText = '0';
        window.requestAnimationFrame(step);
    }

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for fixed navbar height
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
