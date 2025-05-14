// La Patate Dorée - Scripts

document.addEventListener('DOMContentLoaded', function () {
    // Variables
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuTabs = document.querySelectorAll('.menu-tabs a');
    const menuSections = document.querySelectorAll('.menu-section');
    const dots = document.querySelectorAll('.dot');
    const testimonials = document.querySelectorAll('.temoignage');
    const contactForm = document.getElementById('contactForm');

    // Mobile Menu Toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('show');

            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
        if (navMenu && navMenu.classList.contains('show') && !event.target.closest('.header-container')) {
            navMenu.classList.remove('show');

            // Reset hamburger icon
            if (mobileMenuToggle) {
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans.forEach(span => span.classList.remove('active'));
            }
        }
    });

    // Menu Tabs
    if (menuTabs.length > 0) {
        menuTabs.forEach(tab => {
            tab.addEventListener('click', function (e) {
                e.preventDefault();

                const target = this.getAttribute('data-target');

                // Update active tab
                menuTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                // Show corresponding section
                menuSections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === target) {
                        section.classList.add('active');
                    }
                });

                // Smooth scroll to section
                document.querySelector(`#${target}`).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
    }

    // Testimonial Slider
    let autoRotate; // Define it in a scope accessible to both the timer and hover
    if (dots.length > 0 && testimonials.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function () {
                // Update active dot
                dots.forEach(d => d.classList.remove('active'));
                this.classList.add('active');

                // Show corresponding testimonial
                testimonials.forEach(testimonial => testimonial.classList.remove('active'));
                testimonials[index].classList.add('active');

                currentTestimonial = index; // Update current index
            });
        });

        // Auto-rotate testimonials
        let currentTestimonial = 0;
        autoRotate = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;

            // Update active dot
            dots.forEach(d => d.classList.remove('active'));
            dots[currentTestimonial].classList.add('active');

            // Show corresponding testimonial
            testimonials.forEach(testimonial => testimonial.classList.remove('active'));
            testimonials[currentTestimonial].classList.add('active');
        }, 5000);

        // Pause auto-rotation when hovering
        testimonials.forEach(testimonial => {
            testimonial.addEventListener('mouseenter', () => clearInterval(autoRotate));
        });
    }

    // Form Validation
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nom = document.getElementById('nom').value.trim();
            const email = document.getElementById('email').value.trim();
            const sujet = document.getElementById('sujet').value.trim();
            const message = document.getElementById('message').value.trim();

            if (nom && email && sujet && message) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('Veuillez entrer une adresse email valide.');
                    return;
                }

                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.innerText;

                submitButton.disabled = true;
                submitButton.innerText = 'Envoi en cours...';

                setTimeout(() => {
                    alert('Merci pour votre message ! Nous vous répondrons dans les meilleurs délais.');
                    this.reset();
                    submitButton.disabled = false;
                    submitButton.innerText = originalText;
                }, 1500);
            } else {
                alert('Veuillez remplir tous les champs du formulaire.');
            }
        });
    }

    // Scroll Animation
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.specialite-card, .offre-card, .pourquoi-card, .burger-card, .drink-card, .engagement-card');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Scroll-to-top button
    const createScrollToTopButton = () => {
        const scrollTopButton = document.createElement('button');
        scrollTopButton.classList.add('scroll-to-top');
        scrollTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollTopButton.setAttribute('aria-label', 'Retour en haut de page');

        document.body.appendChild(scrollTopButton);

        window.addEventListener('scroll', () => {
            scrollTopButton.classList.toggle('show', window.pageYOffset > 300);
        });

        scrollTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };

    createScrollToTopButton();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                document.querySelector(href)?.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation classes
    const addAnimationClasses = () => {
        const cards = document.querySelectorAll('.specialite-card, .offre-card, .pourquoi-card, .burger-card, .drink-card, .engagement-card');

        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.5s ease, transform 0.5s ease ${index * 0.1}s`;
        });
    };
    addAnimationClasses();

    // Lazy Loading Images
    const lazyLoadImages = () => {
        if ('loading' in HTMLImageElement.prototype) {
            document.querySelectorAll('img').forEach(img => {
                img.setAttribute('loading', 'lazy');
            });
        } else {
            const lazyImages = document.querySelectorAll('img[data-src]');
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        observer.unobserve(img);
                    }
                });
            });
            lazyImages.forEach(img => observer.observe(img));
        }
    };
    lazyLoadImages();

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('.toggle-icon i');

            answer.classList.toggle('active');

            if (icon) {
                icon.classList.toggle('fa-plus');
                icon.classList.toggle('fa-minus');
            }
        });
    });
});
