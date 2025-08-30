document.addEventListener('DOMContentLoaded', function() {
    // Load header and footer
    loadHeader();
    loadFooter();
    
    // Initialize counters for statistics
    initCounters();
    
    // Initialize accordion for FAQ section
    initAccordion();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Add animation on scroll
    initScrollAnimation();
});

// Load header component
function loadHeader() {
    fetch('pages/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
            
            // Add active class to current page in navigation
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                if (link.getAttribute('href') === 'about-us.html') {
                    link.classList.add('active');
                }
            });
        })
        .catch(error => console.error('Error loading header:', error));
}

// Load footer component
function loadFooter() {
    fetch('pages/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}

// Initialize counters for statistics
function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = parseInt(target.textContent);
                    animateCounter(target, 0, finalValue, 2000);
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        statNumbers.forEach(stat => {
            const finalValue = parseInt(stat.textContent);
            animateCounter(stat, 0, finalValue, 2000);
        });
    }
}

// Animate counter from start to end value
function animateCounter(element, start, end, duration) {
    let current = start;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        
        if (current >= end) {
            element.textContent = end + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        }
    }, 16);
}

// Initialize accordion for FAQ section
function initAccordion() {
    const accordionItems = document.querySelectorAll('.faq-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.faq-question');
        
        header.addEventListener('click', () => {
            // Close all other items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0px';
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0px';
            }
        });
    });
}

// Initialize testimonial slider
function initTestimonialSlider() {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (testimonialSlider) {
        const testimonials = testimonialSlider.querySelectorAll('.testimonial-item');
        const prevBtn = document.querySelector('.testimonial-prev');
        const nextBtn = document.querySelector('.testimonial-next');
        let currentIndex = 0;
        
        // Hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // Next button click handler
        nextBtn.addEventListener('click', () => {
            testimonials[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % testimonials.length;
            testimonials[currentIndex].style.display = 'block';
        });
        
        // Previous button click handler
        prevBtn.addEventListener('click', () => {
            testimonials[currentIndex].style.display = 'none';
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            testimonials[currentIndex].style.display = 'block';
        });
    }
}

// Add animation on scroll
function initScrollAnimation() {
    const animatedElements = document.querySelectorAll('.section, .feature-card, .team-card, .timeline-item');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        animatedElements.forEach(element => {
            element.classList.add('animated');
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        animatedElements.forEach(element => {
            element.classList.add('animate');
        });
    }
}
