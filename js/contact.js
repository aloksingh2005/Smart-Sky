// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Accordion functionality for FAQs
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', function() {
            // Toggle active class on the clicked item
            const isActive = item.classList.contains('active');
            
            // Close all accordion items
            accordionItems.forEach(accItem => {
                accItem.classList.remove('active');
            });
            
            // If the clicked item wasn't active, make it active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Form validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            const privacy = document.getElementById('privacy').checked;
            
            // Simple validation
            let isValid = true;
            let errorMessage = '';
            
            if (name === '') {
                isValid = false;
                errorMessage += 'Please enter your name.\n';
                highlightField('name');
            }
            
            if (email === '') {
                isValid = false;
                errorMessage += 'Please enter your email address.\n';
                highlightField('email');
            } else if (!isValidEmail(email)) {
                isValid = false;
                errorMessage += 'Please enter a valid email address.\n';
                highlightField('email');
            }
            
            if (phone === '') {
                isValid = false;
                errorMessage += 'Please enter your phone number.\n';
                highlightField('phone');
            }
            
            if (message === '') {
                isValid = false;
                errorMessage += 'Please enter your message.\n';
                highlightField('message');
            }
            
            if (!privacy) {
                isValid = false;
                errorMessage += 'Please agree to the privacy policy.\n';
            }
            
            // If form is valid, submit it (or show success message for demo)
            if (isValid) {
                // In a real application, you would send the form data to a server here
                // For this demo, we'll just show a success message
                showFormSuccess();
            } else {
                alert('Please correct the following errors:\n\n' + errorMessage);
            }
        });
    }
    
    // Smooth scroll to form when clicking "Send Inquiry" button
    const inquiryButton = document.querySelector('a[href="#contactForm"]');
    
    if (inquiryButton) {
        inquiryButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                window.scrollTo({
                    top: contactForm.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Helper functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function highlightField(fieldId) {
        const field = document.getElementById(fieldId);
        field.classList.add('error');
        
        field.addEventListener('input', function() {
            field.classList.remove('error');
        }, { once: true });
    }
    
    function showFormSuccess() {
        // Hide the form
        contactForm.style.opacity = '0';
        contactForm.style.height = '0';
        contactForm.style.overflow = 'hidden';
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Thank You!</h3>
            <p>Your message has been sent successfully. Our team will get back to you shortly.</p>
            <button class="btn btn-primary" id="newMessage">Send Another Message</button>
        `;
        
        // Insert success message after the form
        contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
        
        // Add event listener to "Send Another Message" button
        document.getElementById('newMessage').addEventListener('click', function() {
            // Remove success message
            successMessage.remove();
            
            // Reset and show the form
            contactForm.reset();
            contactForm.style.opacity = '1';
            contactForm.style.height = 'auto';
            contactForm.style.overflow = 'visible';
        });
    }
}); 