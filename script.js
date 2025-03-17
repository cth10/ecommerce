document.addEventListener('DOMContentLoaded', function () {
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
    
    // Make special sections and reviews responsive
    makeSpecialSectionsResponsive();
    
    // Handle touch events for mobile
    setupTouchInteractions();
    
    // Improve performance with passive event listeners
    improvePerformance();
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

// Mobile Menu Toggle with improved behavior
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuBtn && mainNav) {
        // Toggle menu on button click
        mobileMenuBtn.addEventListener('click', function () {
            mainNav.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!mainNav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                mainNav.classList.remove('active');
            }
        });

        // Close menu when window is resized
        window.addEventListener('resize', function () {
            if (window.innerWidth > 768) {
                mainNav.classList.remove('active');
            }
        });

        // Close menu when clicking a menu item
        const menuItems = mainNav.querySelectorAll('a');
        menuItems.forEach(item => {
            item.addEventListener('click', function () {
                mainNav.classList.remove('active');
            });
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
    const testimonialSlide = document.querySelector('.testimonial-slide');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialGrid = document.querySelector('.testimonials-grid');

    // Check if elements exist
    if (!testimonialContainer || indicators.length === 0) return;

    // Initialize variables
    let currentSlide = 0;
    let isMobile = false;
    let isTablet = false;

    // Function to update the layout based on screen size
    function updateLayout() {
        const windowWidth = window.innerWidth;
        
        // Update layout variables based on screen width
        if (windowWidth <= 640) {
            isMobile = true;
            isTablet = false;
            // Make sure all cards are initially visible on mobile
            testimonialCards.forEach(card => {
                card.style.display = 'flex';
            });
            if (testimonialGrid) {
                testimonialGrid.style.gridTemplateColumns = '1fr';
            }
        } else if (windowWidth <= 992) {
            isMobile = false;
            isTablet = true;
            // Reset display style
            testimonialCards.forEach(card => {
                card.style.display = 'flex';
            });
            if (testimonialGrid) {
                testimonialGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            }
        } else {
            isMobile = false;
            isTablet = false;
            // Reset display style
            testimonialCards.forEach(card => {
                card.style.display = 'flex';
            });
            if (testimonialGrid) {
                testimonialGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
            }
        }
        
        // Force re-render of current slide
        showSlide(0);
    }

    // Function to show a specific slide
    function showSlide(index) {
        // Reset transform to keep all testimonials visible
        testimonialContainer.style.transform = 'translateX(0)';
        
        // Update indicators
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

    // Initialize layout and watch for window resize
    updateLayout();
    window.addEventListener('resize', updateLayout);

    // Initialize with first slide
    showSlide(0);
}

// Newsletter Form 
function setupNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
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
        exploreButton.addEventListener('click', function () {
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
            star.addEventListener('error', function () {
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

// Function to make special sections and reviews responsive
function makeSpecialSectionsResponsive() {
    // Handle special sections grid
    const specialSectionsGrid = document.querySelector('.special-sections-grid');
    const specialSections = document.querySelectorAll('.special-sections-grid > div');
    
    // Handle "Aggiungi Un Tocco Speciale" title and heart icon
    const specialTitleSection = document.querySelector('.special-title-section');
    const heartIconTitleContainer = document.querySelector('.heart-icon-title-container');
    const heartIconTitle = heartIconTitleContainer?.querySelector('h2');
    const heartIcon = heartIconTitleContainer?.querySelector('img');
    
    // Function to update responsive layout
    function updateResponsiveLayout() {
        const windowWidth = window.innerWidth;
        
        // Ensure the special title is responsive
        if (heartIconTitleContainer) {
            if (windowWidth <= 480) {
                heartIconTitleContainer.style.flexDirection = 'column';
                if (heartIcon) {
                    heartIcon.style.marginRight = '0';
                    heartIcon.style.marginBottom = '5px';
                    heartIcon.style.width = '28px';
                    heartIcon.style.height = '28px';
                }
                if (heartIconTitle) {
                    heartIconTitle.style.fontSize = '20px';
                    heartIconTitle.style.textAlign = 'center';
                    heartIconTitle.style.width = '100%';
                    heartIconTitle.style.padding = '0 5px';
                    heartIconTitle.style.lineHeight = '1.3';
                }
            } else if (windowWidth <= 640) {
                heartIconTitleContainer.style.flexDirection = 'column';
                if (heartIcon) {
                    heartIcon.style.marginRight = '0';
                    heartIcon.style.marginBottom = '10px';
                    heartIcon.style.width = '32px';
                    heartIcon.style.height = '32px';
                }
                if (heartIconTitle) {
                    heartIconTitle.style.fontSize = 'var(--font-lg)';
                    heartIconTitle.style.textAlign = 'center';
                    heartIconTitle.style.width = '100%';
                    heartIconTitle.style.padding = '0 15px';
                    heartIconTitle.style.lineHeight = '1.4';
                }
            } else if (windowWidth <= 768) {
                heartIconTitleContainer.style.flexDirection = 'column';
                if (heartIcon) {
                    heartIcon.style.marginRight = '0';
                    heartIcon.style.marginBottom = '10px';
                }
                if (heartIconTitle) {
                    heartIconTitle.style.fontSize = 'var(--font-xl)';
                    heartIconTitle.style.textAlign = 'center';
                    heartIconTitle.style.width = '100%';
                }
            } else {
                // Reset for desktop
                heartIconTitleContainer.style.flexDirection = '';
                if (heartIcon) {
                    heartIcon.style.marginRight = '18px';
                    heartIcon.style.marginBottom = '';
                    heartIcon.style.width = '48px';
                    heartIcon.style.height = '48px';
                }
                if (heartIconTitle) {
                    heartIconTitle.style.fontSize = '50px';
                    heartIconTitle.style.textAlign = 'center';
                    heartIconTitle.style.width = '';
                    heartIconTitle.style.padding = '';
                    heartIconTitle.style.lineHeight = '';
                }
            }
        }
        
        // Apply responsive styles for special sections
        if (windowWidth <= 768) {
            // Force proper display for special content to ensure visibility
            const specialContents = document.querySelectorAll('.special-content');
            specialContents.forEach(content => {
                content.style.display = 'flex';
                content.style.flexDirection = 'column';
                
                // Ensure child elements are also displayed correctly
                const title = content.querySelector('.special-title');
                const text = content.querySelector('.special-text');
                const link = content.querySelector('.discover-more');
                
                if (title) {
                    title.style.display = 'block';
                    title.style.visibility = 'visible';
                    title.style.opacity = '1';
                }
                
                if (text) {
                    text.style.display = 'block';
                    text.style.visibility = 'visible';
                    text.style.opacity = '1';
                }
                
                if (link) {
                    link.style.display = 'inline-block';
                }
            });
            
            // Weekly offers and custom teddy sections need special handling
            const weeklyOffers = document.querySelector('.weekly-offers-section');
            const customTeddy = document.querySelector('.custom-teddy-section');
            
            // Handle weekly offers section specifically
            if (weeklyOffers) {
                weeklyOffers.style.flexDirection = 'column';
                weeklyOffers.style.width = '100%';
                
                const weeklyTitle = weeklyOffers.querySelector('.special-title');
                const weeklyText = weeklyOffers.querySelector('.special-text');
                const weeklyImage = weeklyOffers.querySelector('.special-image');
                const weeklyContent = weeklyOffers.querySelector('.special-content');
                
                if (weeklyImage) {
                    weeklyImage.style.width = '100%';
                    weeklyImage.style.height = '200px';
                }
                
                if (weeklyContent) {
                    weeklyContent.style.display = 'flex';
                    weeklyContent.style.flexDirection = 'column';
                    weeklyContent.style.width = '100%';
                    weeklyContent.style.padding = '20px';
                    weeklyContent.style.boxSizing = 'border-box';
                }
                
                if (weeklyTitle) {
                    weeklyTitle.style.display = 'block';
                    weeklyTitle.style.visibility = 'visible';
                    weeklyTitle.style.margin = '0 0 10px 0';
                }
                
                if (weeklyText) {
                    weeklyText.style.display = 'block';
                    weeklyText.style.visibility = 'visible';
                    weeklyText.style.margin = '0 0 15px 0';
                }
            }
            
            // Handle custom teddy section specifically
            if (customTeddy) {
                customTeddy.style.flexDirection = 'column';
                customTeddy.style.width = '100%';
                
                const teddyTitle = customTeddy.querySelector('.special-title');
                const teddyText = customTeddy.querySelector('.special-text');
                const teddyImage = customTeddy.querySelector('.special-image');
                const teddyContent = customTeddy.querySelector('.special-content');
                
                if (teddyImage) {
                    teddyImage.style.width = '100%';
                    teddyImage.style.height = '200px';
                }
                
                if (teddyContent) {
                    teddyContent.style.display = 'flex';
                    teddyContent.style.flexDirection = 'column';
                    teddyContent.style.width = '100%';
                    teddyContent.style.padding = '20px';
                    teddyContent.style.boxSizing = 'border-box';
                }
                
                if (teddyTitle) {
                    teddyTitle.style.display = 'block';
                    teddyTitle.style.visibility = 'visible';
                    teddyTitle.style.margin = '0 0 10px 0';
                }
                
                if (teddyText) {
                    teddyText.style.display = 'block';
                    teddyText.style.visibility = 'visible';
                    teddyText.style.margin = '0 0 15px 0';
                }
            }
            
            // Ensure gift card section displays properly
            const giftCardSection = document.querySelector('.gift-card-section');
            if (giftCardSection) {
                const giftCardImage = giftCardSection.querySelector('.special-image');
                const giftCardContent = giftCardSection.querySelector('.special-content');
                
                if (giftCardImage) giftCardImage.style.height = '200px';
                if (giftCardContent) giftCardContent.style.display = 'flex';
            }
        } else {
            // Reset styles for desktop
            specialSections.forEach(section => {
                section.style.flexDirection = '';
                section.style.width = '';
                
                const image = section.querySelector('.special-image');
                if (image) {
                    image.style.width = '';
                    image.style.height = '';
                }
                
                const content = section.querySelector('.special-content');
                if (content) {
                    content.style.display = '';
                    content.style.width = '';
                    content.style.padding = '';
                }
                
                const title = section.querySelector('.special-title');
                const text = section.querySelector('.special-text');
                const link = section.querySelector('.discover-more');
                
                if (title) {
                    title.style.display = '';
                    title.style.visibility = '';
                    title.style.margin = '';
                }
                
                if (text) {
                    text.style.display = '';
                    text.style.visibility = '';
                    text.style.margin = '';
                }
                
                if (link) {
                    link.style.display = '';
                }
            });
        }
    }
    
    // Initial layout update
    updateResponsiveLayout();
    
    // Update on window resize
    window.addEventListener('resize', updateResponsiveLayout);
    
    // Also force a layout update after a slight delay to ensure everything is properly displayed
    setTimeout(updateResponsiveLayout, 100);
}

// Setup touch interactions for better mobile experience
function setupTouchInteractions() {
    // Touch interaction for testimonial carousel
    const testimonialContainer = document.querySelector('.testimonials-container');
    const indicators = document.querySelectorAll('.indicator');
    
    if (testimonialContainer && indicators.length > 0) {
        let startX = 0;
        let endX = 0;
        let currentIndex = 0;
        
        testimonialContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        testimonialContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const threshold = 50; // Minimum swipe distance
            const diff = startX - endX;
            
            if (Math.abs(diff) < threshold) return;
            
            if (diff > 0) {
                // Swipe left (next)
                currentIndex = (currentIndex + 1) % indicators.length;
            } else {
                // Swipe right (previous)
                currentIndex = (currentIndex - 1 + indicators.length) % indicators.length;
            }
            
            // Update indicators and show the new slide
            indicators.forEach((ind, i) => {
                ind.classList.toggle('active', i === currentIndex);
            });
        }
    }
    
    // Touch interaction for product cards
    const productCards = document.querySelectorAll('.product-image-wrapper');
    
    productCards.forEach(card => {
        card.addEventListener('touchstart', () => {
            card.style.transform = 'translateY(-3px)';
            card.style.boxShadow = '0px 6px 8px rgba(0, 0, 0, 0.2)';
        }, { passive: true });
        
        card.addEventListener('touchend', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        }, { passive: true });
    });
}

// Improve performance for mobile devices
function improvePerformance() {
    // Use passive event listeners for scroll events
    const passiveSupported = false;
    
    try {
        const options = {
            get passive() {
                return passiveSupported = true;
            }
        };
        
        window.addEventListener("test", null, options);
        window.removeEventListener("test", null, options);
    } catch(err) {
        passiveSupported = false;
    }
    
    // Apply passive listeners to scroll events
    const scrollEvents = ['scroll', 'touchmove', 'wheel'];
    
    scrollEvents.forEach(event => {
        window.addEventListener(event, function() {}, 
            passiveSupported ? { passive: true } : false);
    });
    
    // Debounce window resize events
    let resizeTimer;
    
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Trigger any layout adjustments needed
            document.querySelectorAll('.special-content').forEach(content => {
                content.style.display = 'flex';
                content.style.visibility = 'visible';
            });
        }, 250);
    });
}