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

    // --- Scroll Animations (Intersection Observer) ---
    const animationElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                // If it's a stat card, trigger counter animation
                if (entry.target.classList.contains('stat-card')) {
                    const counterElement = entry.target.querySelector('.stat-number');
                    if (counterElement && !counterElement.classList.contains('counted')) {
                        animateCounter(counterElement);
                    }
                }

                // Optional: Stop observing once animated if we only want it to happen once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    animationElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // --- Counter Animation ---
    function animateCounter(counterElement) {
        counterElement.classList.add('counted'); // Prevent re-triggering
        const target = +counterElement.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const stepTime = Math.abs(Math.floor(duration / target));

        // For larger numbers, we might need to adjust the step to prevent browser lag
        let step = 1;
        let time = stepTime;

        if (target > 500) {
            step = Math.ceil(target / 100);
            time = duration / (target / step);
        }

        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counterElement.innerText = current;
        }, time);
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
