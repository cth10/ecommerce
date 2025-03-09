document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
    
    // Testimonial Carousel
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
        
        let nextSlide = (currentSlide + 1) % (indicators.length || 3);
        showSlide(nextSlide);
    }, 5000);
    
    // Newsletter Form Submission
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
        
        const form = document.querySelector('.newsletter-form');
        form.parentNode.insertBefore(messageElement, form.nextSibling);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 3000);
    }
    
    // Hover effects for product cards
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.08)';
        });
    });
});