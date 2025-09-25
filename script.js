
document.addEventListener('DOMContentLoaded', () => {

    // 1. Hero Image Slider Functionality
    const slides = document.querySelectorAll('.slider-item');
    let currentSlide = 0;

    const showSlide = (n) => {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    };

    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 7000); // Change image every 3 seconds

    // 2. Sticky Navbar on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });

    // 3. Modern Scroll Animations using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Stop observing once revealed for performance
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% of the element is visible
            rootMargin: '0px 0px -50px 0px' // Start animation a bit sooner
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }

    // 4. Image Pop-up (Lightbox) for Gallery
    // Ensure jQuery and Magnific Popup libraries are linked in HTML
    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        },
        removalDelay: 300,
        mainClass: 'mfp-fade'
    });

    // 5. Mobile Navigation Toggle (The Hamburger Menu)
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    // Check if elements exist before adding listeners
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Optional: You can also toggle a class on the hamburger itself for animation
            hamburger.classList.toggle('is-active');
        });

        // Close menu when a navigation link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('is-active');
            });
        });
    } else {
        console.error("Error: Hamburger menu or navigation links not found. Please check your HTML class names.");
    }

    // 6. Service Card Stacking Animation (Mobile Only)
    if (window.innerWidth <= 768) {
        const serviceCards = document.querySelectorAll('.service-card');
        if (serviceCards.length > 0) {
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    // The rootMargin is set to the negative top position of the card.
                    // isIntersecting will be false when the card is "stuck" at the top.
                    if (!entry.isIntersecting) {
                        entry.target.classList.add('is-stacked');
                    } else {
                        entry.target.classList.remove('is-stacked');
                    }
                });
            }, {
                // Trigger when the top of the card hits the top of the viewport.
                threshold: 1.0,
                // A negative top margin equal to the card's sticky 'top' value.
                rootMargin: '-100px 0px 0px 0px' 
            });

            serviceCards.forEach(card => cardObserver.observe(card));
        }
    }

    // 7. Flying Plane on Scroll
    const flyingPlane = document.getElementById('flying-plane');
    if (flyingPlane) {
        window.addEventListener('scroll', () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollTop = window.scrollY;

            // Define when the animation should start and end (e.g., between 10% and 80% of page scroll)
            const startAnimationScroll = scrollHeight * 0.10;
            const endAnimationScroll = scrollHeight * 0.80;

            if (scrollTop > startAnimationScroll && scrollTop < endAnimationScroll) {
                // Calculate the progress of the animation (a value from 0 to 1)
                const animationProgress = (scrollTop - startAnimationScroll) / (endAnimationScroll - startAnimationScroll);
                
                // Map progress to the plane's horizontal position (from -10vw to 110vw)
                const positionX = -10 + (animationProgress * 120);
                
                flyingPlane.style.transform = `translateX(${positionX}vw) rotate(15deg)`;
                flyingPlane.style.opacity = '1';
            } else {
                flyingPlane.style.opacity = '0';
            }
        });
    }
});
