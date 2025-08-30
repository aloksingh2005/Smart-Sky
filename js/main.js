// Main JavaScript for Smart-Sky CCTV Camera Company

// Load header and footer
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('pages/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
            loadHeaderScript();
        });
    
    // Load footer
    fetch('pages/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
            loadFooterScript();
        });
    
    // Initialize all components after a delay to ensure DOM is fully loaded
    setTimeout(() => {
        // Initialize testimonials carousel if it exists
        initTestimonialsCarousel();
        // Initialize FAQ accordion if it exists
        initFaqAccordion();
        // Initialize smooth scrolling for service links
        initSmoothScroll();
        // Initialize other components
        initHeroSlider();
        initTestimonialSlider();
        initClientLogoSlider();
        initCounterAnimation();
        // Initialize service page specific features
        initServiceFeatures();
        // Initialize about section animations
        initAboutSectionAnimations();
    }, 1000);
});

// Load header script
function loadHeaderScript() {
    const script = document.createElement('script');
    script.src = 'js/header.js';
    document.body.appendChild(script);
}

// Load footer script
function loadFooterScript() {
    const script = document.createElement('script');
    script.src = 'js/footer.js';
    document.body.appendChild(script);
}

// Initialize About Section Animations
function initAboutSectionAnimations() {
    const aboutSection = document.querySelector('.about-us-section');
    if (!aboutSection) return;
    
    // Create an intersection observer for the about section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate the about section elements when they come into view
                const image = aboutSection.querySelector('.about-us-image');
                const badge = aboutSection.querySelector('.experience-badge');
                const subtitle = aboutSection.querySelector('.section-subtitle');
                const title = aboutSection.querySelector('.section-title-left');
                const description = aboutSection.querySelector('.about-description');
                const features = aboutSection.querySelectorAll('.about-feature');
                const button = aboutSection.querySelector('.btn');
                
                // Add animation classes with staggered delays
                if (image) {
                    image.style.opacity = '0';
                    image.style.transform = 'translateX(-30px)';
                    setTimeout(() => {
                        image.style.transition = 'all 0.8s ease';
                        image.style.opacity = '1';
                        image.style.transform = 'translateX(0)';
                    }, 200);
                }
                
                if (subtitle) {
                    subtitle.style.opacity = '0';
                    subtitle.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        subtitle.style.transition = 'all 0.8s ease';
                        subtitle.style.opacity = '1';
                        subtitle.style.transform = 'translateY(0)';
                    }, 300);
                }
                
                if (title) {
                    title.style.opacity = '0';
                    title.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        title.style.transition = 'all 0.8s ease';
                        title.style.opacity = '1';
                        title.style.transform = 'translateY(0)';
                    }, 400);
                }
                
                if (description) {
                    description.style.opacity = '0';
                    description.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        description.style.transition = 'all 0.8s ease';
                        description.style.opacity = '1';
                        description.style.transform = 'translateY(0)';
                    }, 500);
                }
                
                if (features) {
                    features.forEach((feature, index) => {
                        feature.style.opacity = '0';
                        feature.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            feature.style.transition = 'all 0.8s ease';
                            feature.style.opacity = '1';
                            feature.style.transform = 'translateY(0)';
                        }, 600 + (index * 100));
                    });
                }
                
                if (button) {
                    button.style.opacity = '0';
                    button.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        button.style.transition = 'all 0.8s ease';
                        button.style.opacity = '1';
                        button.style.transform = 'translateY(0)';
                    }, 900);
                }
                
                // Stop observing once animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Start observing the about section
    observer.observe(aboutSection);
}

// Initialize service features for laptop and printer pages
function initServiceFeatures() {
    // Check if we're on a service page
    const serviceFeatures = document.querySelector('.service-features');
    if (!serviceFeatures) return;
    
    // Add animation effects to service features on scroll
    const features = document.querySelectorAll('.service-feature');
    
    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Observe each feature
    features.forEach(feature => {
        observer.observe(feature);
    });
}

// Testimonials carousel functionality
function initTestimonialsCarousel() {
    const testimonialsContainer = document.querySelector('.testimonial-cards-wrapper');
    
    if (!testimonialsContainer) return; // Exit if not on a page with testimonials
    
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    const cards = document.querySelectorAll('.testimonial-card');
    
    let currentIndex = 0;
    const cardWidth = cards[0]?.offsetWidth + 30; // Card width + gap
    
    // Function to update carousel position
    function updateCarousel() {
        // Update scroll position
        testimonialsContainer.scrollTo({
            left: currentIndex * cardWidth,
            behavior: 'smooth'
        });
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Event listeners for controls
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = Math.max(0, currentIndex - 1);
            updateCarousel();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = Math.min(cards.length - 1, currentIndex + 1);
            updateCarousel();
        });
    }
    
    // Add event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Handle scroll events to update dots
    testimonialsContainer.addEventListener('scroll', () => {
        const scrollPosition = testimonialsContainer.scrollLeft;
        currentIndex = Math.round(scrollPosition / cardWidth);
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    });
}

// FAQ Accordion functionality
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) return; // Exit if no FAQ items exist
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        question.addEventListener('click', () => {
            // Check if current item is already active
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                const faqAnswer = faqItem.querySelector('.faq-answer');
                faqAnswer.style.maxHeight = null;
                const faqToggle = faqItem.querySelector('.faq-toggle i');
                if (faqToggle) {
                    faqToggle.className = 'fas fa-plus';
                }
            });
            
            // If clicked item wasn't active, make it active
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                if (toggle) {
                    toggle.querySelector('i').className = 'fas fa-minus';
                }
            }
        });
    });
    
    // Open first FAQ item by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
        const firstAnswer = faqItems[0].querySelector('.faq-answer');
        if (firstAnswer) {
            firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
        }
        const firstToggle = faqItems[0].querySelector('.faq-toggle i');
        if (firstToggle) {
            firstToggle.className = 'fas fa-minus';
        }
    }
}

// Initialize Hero Slider
function initHeroSlider() {
    if (document.querySelector('.hero-slider .swiper')) {
        const heroSwiper = new Swiper('.hero-slider .swiper', {
            // Optional parameters
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            // Removed fade effect for simpler transitions
            
            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            
            // Pagination
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }
}

// Initialize Testimonial Slider
function initTestimonialSlider() {
    if (document.querySelector('.testimonial-slider')) {
        const testimonialSwiper = new Swiper('.testimonial-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 4000,
            },
            pagination: {
                el: '.testimonial-slider .swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            }
        });
    }
}

// Initialize Client Logo Slider
function initClientLogoSlider() {
    if (document.querySelector('.client-logo-slider')) {
        const clientLogoSwiper = new Swiper('.client-logo-slider', {
            slidesPerView: 2,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            breakpoints: {
                576: {
                    slidesPerView: 3,
                },
                768: {
                    slidesPerView: 4,
                },
                992: {
                    slidesPerView: 5,
                },
            }
        });
    }
}

// Initialize Counter Animation
function initCounterAnimation() {
    const counterSection = document.querySelector('.counter-section');
    if (!counterSection) return;
    
    const counters = document.querySelectorAll('.counter-number');
    let started = false;
    
    function startCounter() {
        if (isElementInViewport(counterSection) && !started) {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-count');
                const current = +counter.innerText;
                
                // If the current value is already the target or higher, don't animate
                if (current >= target) {
                    counter.innerText = target;
                    return;
                }
                
                const increment = target / 100;
                
                if (current < target) {
                    counter.innerText = Math.ceil(current + increment);
                    setTimeout(startCounter, 30);
                } else {
                    counter.innerText = target;
                }
            });
            started = true;
        }
    }
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Check if counter section is in viewport on scroll
    window.addEventListener('scroll', startCounter);
    // Initial check
    startCounter();
}

// Smooth scrolling for service section links
function initSmoothScroll() {
    const serviceLinks = document.querySelectorAll('a[href^="#"]');
    
    if (!serviceLinks.length) return; // Exit if no links exist
    
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // Calculate offset to account for fixed header
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
}
