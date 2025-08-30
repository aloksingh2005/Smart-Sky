// Header JavaScript for Smart-Sky Tech Solutions

document.addEventListener('DOMContentLoaded', function() {
    // Load header content
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        fetch('pages/header.html')
            .then(response => response.text())
            .then(data => {
                headerContainer.innerHTML = data;
                initializeHeaderFunctionality();
            })
            .catch(error => {
                console.error('Error loading header:', error);
            });
    }
});

// Initialize header functionality after content is loaded
function initializeHeaderFunctionality() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle body scroll
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    
    // Mobile dropdown toggle with improved touch handling
    const dropdownToggle = document.querySelectorAll('.has-dropdown > a');
    
    dropdownToggle.forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const dropdown = this.nextElementSibling;
                
                // Close all other dropdowns
                dropdownToggle.forEach(function(otherToggle) {
                    if (otherToggle !== toggle) {
                        otherToggle.classList.remove('active');
                        const otherDropdown = otherToggle.nextElementSibling;
                        if (otherDropdown) {
                            otherDropdown.classList.remove('show');
                        }
                    }
                });
                
                // Toggle current dropdown
                this.classList.toggle('active');
                dropdown.classList.toggle('show');
                
                // Smooth scroll to dropdown if it's opening
                if (dropdown.classList.contains('show')) {
                    setTimeout(() => {
                        dropdown.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'nearest' 
                        });
                    }, 100);
                }
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992) {
            if (!e.target.closest('.nav-menu') && !e.target.closest('.mobile-menu-toggle') && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
                
                // Close all dropdowns
                dropdownToggle.forEach(function(toggle) {
                    toggle.classList.remove('active');
                    const dropdown = toggle.nextElementSibling;
                    if (dropdown) {
                        dropdown.classList.remove('show');
                    }
                });
            }
        }
    });
    
    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
            
            // Close all dropdowns
            dropdownToggle.forEach(function(toggle) {
                toggle.classList.remove('active');
                const dropdown = toggle.nextElementSibling;
                if (dropdown) {
                    dropdown.classList.remove('show');
                }
            });
        }
    });
    
    // Add shadow to header on scroll with improved performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                const header = document.querySelector('.site-header');
                if (header) {
                    if (window.scrollY > 10) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
                }
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Enhanced touch interactions for mobile
    if ('ontouchstart' in window) {
        // Add touch feedback for mobile menu items
        const menuItems = document.querySelectorAll('.nav-menu > li > a');
        menuItems.forEach(function(item) {
            item.addEventListener('touchstart', function() {
                this.style.backgroundColor = 'rgba(0, 86, 179, 0.1)';
            });
            
            item.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.backgroundColor = '';
                }, 150);
            });
        });
        
        // Add touch feedback for dropdown items
        const dropdownItems = document.querySelectorAll('.dropdown li a');
        dropdownItems.forEach(function(item) {
            item.addEventListener('touchstart', function() {
                this.style.backgroundColor = 'rgba(0, 86, 179, 0.05)';
            });
            
            item.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.backgroundColor = '';
                }, 150);
            });
        });
    }
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
            
            // Close all dropdowns
            dropdownToggle.forEach(function(toggle) {
                toggle.classList.remove('active');
                const dropdown = toggle.nextElementSibling;
                if (dropdown) {
                    dropdown.classList.remove('show');
                }
            });
        }
    });
    
    // Prevent body scroll when mobile menu is open
    navMenu.addEventListener('touchmove', function(e) {
        if (window.innerWidth <= 992) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Add loading state for better UX
    const enquiryBtn = document.querySelector('.enquiry-btn');
    if (enquiryBtn) {
        enquiryBtn.addEventListener('click', function(e) {
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.style.pointerEvents = 'none';
            
            // Reset after a short delay (simulating loading)
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.pointerEvents = '';
            }, 1000);
        });
    }
    
    // Add smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    // Close mobile menu if open
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        mobileMenuToggle.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                    
                    // Smooth scroll to target
                    const headerHeight = document.querySelector('.site-header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}
