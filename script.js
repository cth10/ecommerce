document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    setupMobileMenu();
    
    // Initialize star ratings
    initializeStarRatings();
    
    // Testimonial Carousel
    initializeTestimonialCarousel();
    
    // Newsletter Form
    setupNewsletterForm();
    
    // Product Card Hover Effects
    setupProductCardHover();
    
    // Apply consistent product styling
    applyConsistentProductStyling();
    
    // Initialize styled section titles
    initializeStyledSectionTitles();
});

// Mobile Menu Toggle
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
}

// Star Ratings
function initializeStarRatings() {
    const ratingElements = document.querySelectorAll('.rating');
    
    ratingElements.forEach(element => {
        const rating = parseInt(element.getAttribute('data-rating')) || 0;
        let starsHTML = '';
        
        // Generate filled stars
        for (let i = 0; i < rating; i++) {
            starsHTML += '<span class="star">★</span>';
        }
        
        // Generate empty stars
        for (let i = rating; i < 5; i++) {
            starsHTML += '<span class="star star-empty">☆</span>';
        }
        
        element.innerHTML = starsHTML;
    });
}

// Testimonial Carousel
function initializeTestimonialCarousel() {
    const testimonialContainer = document.querySelector('.testimonials-container');
    const indicators = document.querySelectorAll('.indicators .indicator');
    let currentSlide = 0;
    
    function showSlide(index) {
        if (!testimonialContainer) return;
        
        // Update the container position
        testimonialContainer.style.transform = `translateX(-${index * 100}%)`;
        
        // Update indicators
        if (indicators.length > 0) {
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
        }
        
        currentSlide = index;
    }
    
    // Set up indicator click events
    if (indicators.length > 0) {
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
            });
        });
    }
    
    // Auto slide change
    setInterval(() => {
        if (!testimonialContainer) return;
        
        let nextSlide = (currentSlide + 1) % (indicators.length || 4);
        showSlide(nextSlide);
    }, 5000);
}

// Newsletter Form
function setupNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Show success message
                showMessage('Grazie per la tua iscrizione!', 'success');
                emailInput.value = '';
            } else {
                // Show error message
                showMessage('Per favore, inserisci un indirizzo email valido.', 'error');
            }
        });
    }
}

// Product Card Hover Effects
function setupProductCardHover() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
            card.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.03)';
        });
    });
}

// Apply consistent product styling
function applyConsistentProductStyling() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Remove any inline styles that might be affecting the background
        card.style.backgroundColor = '';
        
        // Make sure the card has the proper transition
        card.style.transition = 'transform 0.3s, box-shadow 0.3s';
        
        // Make sure image has proper sizing
        const productImage = card.querySelector('.product-image');
        if (productImage) {
            productImage.style.backgroundColor = 'transparent';
        }
    });
}

// Initialize styled section titles
function initializeStyledSectionTitles() {
    // Find all section titles that need the decorative elements
    const popularTitle = document.querySelector('.popular-title');
    const reviewsTitle = document.querySelector('.reviews-title h2');
    
    // Apply the styling if the elements exist
    if (popularTitle) {
        ensureIconExistsForTitle(popularTitle, 'teddy-icon.png');
    }
    
    if (reviewsTitle) {
        ensureIconExistsForTitle(reviewsTitle, 'heart-icon.png');
    }
}

// Helper function to ensure icons exist for titles
function ensureIconExistsForTitle(titleElement, iconSrc) {
    // Check if the icon already exists
    const existingIcon = titleElement.querySelector('img');
    
    if (!existingIcon) {
        // Create and add the icon if it doesn't exist
        const iconImg = document.createElement('img');
        iconImg.src = iconSrc;
        iconImg.alt = iconSrc.includes('heart') ? 'Heart icon' : 'Teddy icon';
        iconImg.style.width = '28px';
        iconImg.style.height = '28px';
        iconImg.style.marginRight = '10px';
        
        // Insert the icon at the beginning of the title
        titleElement.insertBefore(iconImg, titleElement.firstChild);
    }
}

// Helper function to validate email
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Helper function to show messages
function showMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    messageElement.style.padding = '10px';
    messageElement.style.margin = '10px 0';
    messageElement.style.borderRadius = '5px';
    messageElement.style.textAlign = 'center';
    
    if (type === 'success') {
        messageElement.style.backgroundColor = '#d7e9e9';
        messageElement.style.color = '#362417';
    } else {
        messageElement.style.backgroundColor = '#f9e7dd';
        messageElement.style.color = '#362417';
    }
    
    const form = document.querySelector('.newsletter-form');
    form.parentNode.insertBefore(messageElement, form.nextSibling);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 3000);
}