// Footer JavaScript for Smart-Sky Tech Solutions

document.addEventListener('DOMContentLoaded', function() {
    // Check if footer container exists
    const footerContainer = document.getElementById('footer-container');
    
    if (footerContainer) {
        // Fetch footer content from footer.html
        fetch('pages/footer.html')
            .then(response => response.text())
            .then(data => {
                footerContainer.innerHTML = data;
                
                // Update copyright year
                const yearSpan = document.querySelector('.footer-bottom .year');
                if (yearSpan) {
                    yearSpan.textContent = new Date().getFullYear();
                }
                
                // Initialize footer functionality
                initializeFooterFunctionality();
            })
            .catch(error => {
                console.error('Error loading footer:', error);
            });
    }
});

// Initialize footer functionality
function initializeFooterFunctionality() {
    // Add smooth hover effects for social links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(function(link) {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add smooth hover effects for footer links
    const footerLinks = document.querySelectorAll('.footer-section ul li a');
    footerLinks.forEach(function(link) {
        link.addEventListener('mouseenter', function() {
            this.style.paddingLeft = '20px';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.paddingLeft = '15px';
        });
    });
    
    // Add click effects for mobile
    if ('ontouchstart' in window) {
        socialLinks.forEach(function(link) {
            link.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-2px) scale(0.95)';
            });
            
            link.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = 'translateY(0) scale(1)';
                }, 150);
            });
        });
        
        footerLinks.forEach(function(link) {
            link.addEventListener('touchstart', function() {
                this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            });
            
            link.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.backgroundColor = '';
                }, 150);
            });
        });
    }
    
    // Add back to top button functionality
    const backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(backToTopBtn);
    
    // Show/hide back to top button based on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Smooth scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add loading animation for contact links
    const contactLinks = document.querySelectorAll('.contact-info .contact-item');
    contactLinks.forEach(function(item) {
        const link = item.querySelector('a');
        if (link) {
            link.addEventListener('click', function(e) {
                // Add ripple effect
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(255, 255, 255, 0.3)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                ripple.style.left = e.clientX - this.offsetLeft + 'px';
                ripple.style.top = e.clientY - this.offsetTop + 'px';
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        }
    });
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .footer-section ul li a {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
    
    // Add intersection observer for footer animations
    const footerSections = document.querySelectorAll('.footer-section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    footerSections.forEach(function(section) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Add lazy loading for footer images
    const footerImages = document.querySelectorAll('.footer-section img');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
            }
        });
    }, { threshold: 0.1 });
    
    footerImages.forEach(function(img) {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
        img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        imageObserver.observe(img);
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Home') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
    
    // Add accessibility improvements
    const footerLinks = document.querySelectorAll('.footer-section a');
    footerLinks.forEach(function(link) {
        if (!link.getAttribute('aria-label')) {
            const text = link.textContent.trim();
            link.setAttribute('aria-label', text);
        }
    });
    
    // Add focus styles for better accessibility
    const focusableElements = document.querySelectorAll('.footer-section a, .social-links a, .back-to-top');
    focusableElements.forEach(function(element) {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--accent-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}
