document.addEventListener('DOMContentLoaded', function() {
    // Load header and footer
    loadHeader();
    loadFooter();
    
    // Initialize Magnific Popup for image gallery
    initMagnificPopup();
    
    // Initialize gallery filtering
    initGalleryFilter();
    
    // Initialize load more functionality
    initLoadMore();
    
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
            const navLinks = document.querySelectorAll('.nav-menu a');
            navLinks.forEach(link => {
                if (link.getAttribute('href') === 'gallery.html') {
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

// Initialize Magnific Popup for image gallery
function initMagnificPopup() {
    $('.image-popup').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: 'mfp-with-zoom',
        image: {
            verticalFit: true,
            titleSrc: function(item) {
                return item.el.closest('.gallery-item').querySelector('.overlay-content h3').innerText;
            }
        },
        zoom: {
            enabled: true,
            duration: 300
        },
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        }
    });
}

// Initialize gallery filtering
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to current button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Reset hidden items
            document.querySelectorAll('.gallery-item.hidden').forEach(item => {
                item.classList.add('hidden');
            });
            
            // Show load more button again
            if (loadMoreBtn) {
                loadMoreBtn.style.display = 'inline-block';
                loadMoreBtn.textContent = 'Load More';
                loadMoreBtn.disabled = false;
                loadMoreBtn.style.backgroundColor = '#0056b3';
            }
            
            // Show/hide gallery items based on filter
            let visibleCount = 0;
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    if (visibleCount < 12) {
                        item.style.display = 'block';
                        item.classList.remove('hidden');
                        visibleCount++;
                    } else {
                        item.style.display = 'none';
                        item.classList.add('hidden');
                    }
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Check if we need to hide the load more button
            const hiddenItems = document.querySelectorAll(`.gallery-item.hidden${filterValue !== 'all' ? '.' + filterValue : ''}`);
            if (hiddenItems.length === 0 && loadMoreBtn) {
                loadMoreBtn.style.display = 'none';
            }
            
            // Trigger scroll animation
            window.dispatchEvent(new Event('scroll'));
        });
    });
    
    // Trigger the "All" filter by default
    document.querySelector('.filter-btn[data-filter="all"]').click();
}

// Initialize load more functionality
function initLoadMore() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Get the current active filter
            const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
            
            // Find hidden items that match the current filter
            const hiddenItems = Array.from(document.querySelectorAll('.gallery-item.hidden')).filter(item => {
                return activeFilter === 'all' || item.classList.contains(activeFilter);
            });
            
            // Show next batch of items (up to 8 more)
            let itemsToShow = Math.min(hiddenItems.length, 8);
            
            if (itemsToShow > 0) {
                this.textContent = 'Loading...';
                
                // Add a slight delay for visual effect
                setTimeout(() => {
                    for (let i = 0; i < itemsToShow; i++) {
                        hiddenItems[i].style.display = 'block';
                        hiddenItems[i].classList.remove('hidden');
                        
                        // Add fade-in animation
                        hiddenItems[i].style.animation = 'fadeIn 0.6s ease forwards';
                    }
                    
                    // Check if there are more items to load
                    const remainingHiddenItems = document.querySelectorAll(`.gallery-item.hidden${activeFilter !== 'all' ? '.' + activeFilter : ''}`);
                    
                    if (remainingHiddenItems.length === 0) {
                        this.textContent = 'No More Items';
                        this.disabled = true;
                        this.style.backgroundColor = '#999';
                    } else {
                        this.textContent = 'Load More';
                    }
                    
                    // Trigger scroll animation for newly visible items
                    window.dispatchEvent(new Event('scroll'));
                    
                }, 500);
            } else {
                this.textContent = 'No More Items';
                this.disabled = true;
                this.style.backgroundColor = '#999';
            }
        });
    }
}

// Add animation on scroll
function initScrollAnimation() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Simple animation on scroll
    window.addEventListener('scroll', function() {
        galleryItems.forEach(item => {
            // Skip hidden items
            if (item.style.display === 'none') return;
            
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (itemPosition < screenPosition) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Set initial state for animation
    galleryItems.forEach((item, index) => {
        if (!item.classList.contains('hidden')) {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `all 0.5s ease ${index * 0.1}s`;
        }
    });
    
    // Trigger initial check
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 100);
} 