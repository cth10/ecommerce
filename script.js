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
    
    // Collection Card Hover Effects
    setupCollectionCards();
    
    // Inicializa o novo Product Showcase
    setupProductShowcase();
    
    // Inicializa a navegação da seção Features
    initializeFeaturesNavigation();
});

// Função para inicializar a navegação dos dots da Features Section
function initializeFeaturesNavigation() {
    const dots = document.querySelectorAll('.features-section .slider-navigation button');
    
    if (dots.length === 0) return;
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Remove a classe ativa de todos os dots
            dots.forEach(d => {
                d.classList.remove('dot');
                d.classList.add('dot-inactive');
                d.setAttribute('aria-selected', 'false');
            });
            
            // Adiciona a classe ativa ao dot clicado
            dot.classList.remove('dot-inactive');
            dot.classList.add('dot');
            dot.setAttribute('aria-selected', 'true');
            
            // Aqui você poderia adicionar código para mostrar diferentes conjuntos de features
            // caso queira implementar um slider real no futuro
        });
    });
}

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
    const indicators = document.querySelectorAll('.reviews-section .indicators .indicator');
    
    // Check if elements exist
    if (!testimonialContainer || indicators.length === 0) return;
    
    // Initialize variables
    let currentSlide = 0;
    
    // Function to show a specific slide (but actually keep content visible)
    function showSlide(index) {
        // Always keep the container at the original position to show testimonials
        testimonialContainer.style.transform = 'translateX(0)';
        
        // Update indicators to show interactivity
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        // Update current slide index
        currentSlide = index;
    }
    
    // Set up indicator click events
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Initialize with first slide
    showSlide(0);
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

// Collection Card Hover Effects
function setupCollectionCards() {
    const collectionCards = document.querySelectorAll('.card-content');
    
    collectionCards.forEach(card => {
        // Adicionando transição suave
        card.style.transition = 'transform 0.3s, box-shadow 0.3s';
        
        // Evento de hover
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.08)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0px 4px 4px rgba(0, 0, 0, 0.25)';
        });
    });
}

// Product Card Hover Effects
function setupProductCardHover() {
    const productCards = document.querySelectorAll('.products-grid .product-card');
    
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
    const productCards = document.querySelectorAll('.products-grid .product-card');
    
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

// Nova função para configurar o Product Showcase
function setupProductShowcase() {
    // Configurar o botão de explorar
    const exploreButton = document.querySelector('.explore-button');
    if (exploreButton) {
        exploreButton.addEventListener('click', function() {
            // Poderia redirecionar para uma página de produtos ou catálogo
            // window.location.href = 'products.html';
            
            // Por enquanto, apenas adiciona um efeito ao clicar
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 200);
        });
    }
    
    // Configurar efeitos de hover para os cards do product showcase
    const productCards = document.querySelectorAll('.product-showcase .product-card');
    productCards.forEach(card => {
        const imageWrapper = card.querySelector('.product-image-wrapper');
        if (imageWrapper) {
            imageWrapper.addEventListener('mouseenter', () => {
                imageWrapper.style.transform = 'translateY(-5px)';
                imageWrapper.style.boxShadow = '0px 8px 8px rgba(0, 0, 0, 0.25)';
            });
            
            imageWrapper.addEventListener('mouseleave', () => {
                imageWrapper.style.transform = '';
                imageWrapper.style.boxShadow = '0px 4px 4px rgba(0, 0, 0, 0.25)';
            });
        }
    });
    
    // Verificar e criar as imagens de estrelas se necessário
    const starIcons = document.querySelectorAll('.star-icon');
    if (starIcons.length > 0) {
        // Se as imagens das estrelas não carregarem corretamente, substitua com HTML
        starIcons.forEach(star => {
            star.addEventListener('error', function() {
                const type = this.alt.includes('Filled') ? 'filled' : 
                             this.alt.includes('Half') ? 'half' : 'empty';
                
                const starSymbol = type === 'filled' ? '★' : 
                                  type === 'half' ? '★' : '☆';
                
                const span = document.createElement('span');
                span.className = 'star ' + (type !== 'filled' ? 'star-' + type : '');
                span.textContent = starSymbol;
                
                this.parentNode.replaceChild(span, this);
            });
        });
    }
}