// Services Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Load header and footer
    loadHeader();
    loadFooter();
    
    // Smooth scrolling for service category links
    const categoryLinks = document.querySelectorAll('.category-card a');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation classes to elements when they come into view
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('.service-detail-section, .service-process, .industries-section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('animate-in');
            }
        });
    };
    
    // Initial check and add scroll event listener
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});

// Load header component
function loadHeader() {
    fetch('pages/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
            
            // Add active class to current page in navigation
            const navLinks = document.querySelectorAll('.nav-menu a');
            navLinks.forEach(link => {
                if (link.getAttribute('href') === 'services.html') {
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
