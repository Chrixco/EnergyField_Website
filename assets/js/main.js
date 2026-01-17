// Energy Field - Main JavaScript

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeApp();
});

// Initialize Application
function initializeApp() {
    // Show loading screen initially
    showLoadingScreen();

    // Initialize components after a short delay to show loading effect
    setTimeout(() => {
        initializeNavigation();
        initializeScrollEffects();
        initializeAnimations();
        initializeButtons();
        initializeTypingEffect();
        initializeParticles();
        initializeBackToTop();
        initializeLazyLoading();

        // Hide loading screen
        hideLoadingScreen();

        // Initialize AOS (Animate On Scroll)
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 50,
                delay: 100
            });
        }

        console.log('🚀 Energy Field website initialized');
    }, 2000);
}

// Loading Screen Functions
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 600);
    }
}

// Navigation Functions
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile navigation toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
    }

    // Close navigation when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Close mobile menu
            if (navToggle && navMenu) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            }

            // Smooth scroll to section
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                smoothScrollToSection(targetId);
            }
        });
    });

    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Active section highlighting
    updateActiveNavLink();
    window.addEventListener('scroll', debounce(updateActiveNavLink, 100));
}

// Smooth scrolling function
function smoothScrollToSection(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        const headerOffset = 70; // Account for fixed header
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Update active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.clientHeight;

        if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Scroll Effects
function initializeScrollEffects() {
    // Parallax effect for hero background elements
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        });
    }

    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-zoom-in');

    function checkReveal() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', debounce(checkReveal, 50));
    checkReveal(); // Check on page load
}

// Initialize Animations
function initializeAnimations() {
    // Initialize interactive floating cards
    initializeFloatingCards();

    // Floating cards animation
    const floatingCards = document.querySelectorAll('.card-float');
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 2}s`;
    });

    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            const icon = this.querySelector('.icon-glow');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            const icon = this.querySelector('.icon-glow');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });

    // Mode cards flip effect
    const modeCards = document.querySelectorAll('.mode-card');
    modeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'rotateY(5deg) translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'rotateY(0deg) translateY(0)';
        });
    });
}

// Button Interactions
function initializeButtons() {
    // CTA buttons with energy effect
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            createRippleEffect(e, this);

            // Add click animation
            this.classList.add('btn-click');
            setTimeout(() => {
                this.classList.remove('btn-click');
            }, 200);
        });
    });

    // Download buttons
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(e, this);

            // You can add actual download functionality here
            const btnText = this.querySelector('.btn-text').textContent;
            if (btnText.includes('Game Rules')) {
                // Handle game rules download
                downloadGameRules();
            } else if (btnText.includes('Get Started')) {
                // Handle getting started guide
                showGettingStarted();
            }
        });
    });
}

// Create ripple effect
function createRippleEffect(e, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    element.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Typing effect for hero subtitle
function initializeTypingEffect() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        heroSubtitle.style.opacity = '1';

        let i = 0;
        const typingSpeed = 50;

        function typeText() {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeText, typingSpeed);
            }
        }

        // Start typing after hero animation
        setTimeout(typeText, 1500);
    }
}

// Initialize particle effects
function initializeParticles() {
    // Create energy particles
    const particleContainer = document.querySelector('.energy-particles');
    if (particleContainer) {
        createEnergyParticles(particleContainer);
    }

    // Create circuit lines animation
    const circuitContainer = document.querySelector('.circuit-lines');
    if (circuitContainer) {
        createCircuitLines(circuitContainer);
    }
}

function createEnergyParticles(container) {
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'energy-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, var(--neon-blue), var(--neon-purple));
            border-radius: 50%;
            opacity: 0.7;
            animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(particle);
    }
}

function createCircuitLines(container) {
    // Add dynamic circuit line effects
    container.style.background = `
        linear-gradient(90deg, transparent 98%, rgba(0, 212, 255, 0.3) 100%),
        linear-gradient(180deg, transparent 98%, rgba(138, 43, 226, 0.3) 100%)
    `;
    container.style.backgroundSize = '50px 50px, 30px 30px';
}

// Back to top button
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Download functionality
function downloadGameRules() {
    // Create a link to download the game rules PDF
    const link = document.createElement('a');
    link.href = '../Game documentation/Energy rulebook.pdf';
    link.download = 'Energy_Field_Rules.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show feedback
    showNotification('Game rules download started!', 'success');
}

function showGettingStarted() {
    // You can implement a modal or redirect to a getting started page
    showNotification('Getting started guide coming soon!', 'info');
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-secondary);
        border: 1px solid var(--neon-blue);
        color: var(--text-primary);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance monitoring
function logPerformance() {
    if (performance.timing) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`⚡ Energy Field loaded in ${loadTime}ms`);
    }
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Energy Field Error:', e.error);
});

// Page visibility API for performance optimization
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations or reduce activity
        document.body.classList.add('page-hidden');
    } else {
        // Resume normal operation
        document.body.classList.remove('page-hidden');
    }
});

// Add CSS for performance optimization when page is hidden
const style = document.createElement('style');
style.textContent = `
    .page-hidden * {
        animation-play-state: paused !important;
        transition: none !important;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        background: rgba(255, 255, 255, 0.3);
        pointer-events: none;
    }

    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .energy-particle {
        pointer-events: none;
        box-shadow: 0 0 6px currentColor;
    }
`;
document.head.appendChild(style);

// Initialize performance logging
window.addEventListener('load', logPerformance);

// Interactive Floating Cards with Mouse Tracking
function initializeFloatingCards() {
    const heroSection = document.querySelector('.hero');
    const floatingCardsContainer = document.querySelector('.floating-cards');
    const floatingCards = document.querySelectorAll('.card-float');

    if (!heroSection || !floatingCardsContainer || floatingCards.length === 0) {
        return;
    }

    let isMouseInside = false;
    let animationFrameId = null;

    // Mouse tracking variables
    let mouseX = 0;
    let mouseY = 0;
    let targetRotations = [];

    // Initialize target rotations for each card
    floatingCards.forEach(() => {
        targetRotations.push({ x: 0, y: 0, z: 0 });
    });

    // Mouse move handler
    function handleMouseMove(e) {
        if (!isMouseInside) return;

        const rect = heroSection.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Normalize mouse position (-1 to 1)
        mouseX = (e.clientX - centerX) / (rect.width / 2);
        mouseY = (e.clientY - centerY) / (rect.height / 2);

        // Calculate rotations for each card based on mouse position
        floatingCards.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;

            // Distance from mouse to card center
            const deltaX = (e.clientX - cardCenterX) / 100;
            const deltaY = (e.clientY - cardCenterY) / 100;

            // Calculate rotation based on mouse position and card position
            const maxRotation = 25; // Maximum rotation in degrees
            const rotationY = Math.max(-maxRotation, Math.min(maxRotation, deltaX * -1));
            const rotationX = Math.max(-maxRotation, Math.min(maxRotation, deltaY));

            // Add some Z rotation for extra dynamism
            const rotationZ = Math.sin(mouseX * Math.PI) * 5;

            targetRotations[index] = {
                x: rotationX,
                y: rotationY,
                z: rotationZ
            };
        });
    }

    // Smooth animation loop
    function animateCards() {
        floatingCards.forEach((card, index) => {
            const current = {
                x: parseFloat(card.dataset.currentX) || 0,
                y: parseFloat(card.dataset.currentY) || 0,
                z: parseFloat(card.dataset.currentZ) || 0
            };

            const target = targetRotations[index];
            const ease = 0.1; // Easing factor for smooth animation

            // Lerp to target rotation
            current.x += (target.x - current.x) * ease;
            current.y += (target.y - current.y) * ease;
            current.z += (target.z - current.z) * ease;

            // Store current values
            card.dataset.currentX = current.x;
            card.dataset.currentY = current.y;
            card.dataset.currentZ = current.z;

            // Apply transform
            const baseTransform = getComputedStyle(card).transform;
            let newTransform = `rotateX(${current.x}deg) rotateY(${current.y}deg) rotateZ(${current.z}deg)`;

            // Preserve any existing transforms like translate
            if (baseTransform && baseTransform !== 'none') {
                // Extract translate values and combine with rotation
                const translateMatch = baseTransform.match(/translate[3d]*\([^)]+\)/g);
                const scaleMatch = baseTransform.match(/scale[3d]*\([^)]+\)/g);

                if (translateMatch) {
                    newTransform += ` ${translateMatch.join(' ')}`;
                }
                if (scaleMatch) {
                    newTransform += ` ${scaleMatch.join(' ')}`;
                }
            }

            card.style.transform = newTransform;
        });

        if (isMouseInside) {
            animationFrameId = requestAnimationFrame(animateCards);
        }
    }

    // Reset cards to original position
    function resetCards() {
        targetRotations.forEach((target) => {
            target.x = 0;
            target.y = 0;
            target.z = 0;
        });

        // Continue animation to smoothly return to original position
        if (!animationFrameId) {
            animateCards();
        }
    }

    // Mouse enter/leave handlers
    heroSection.addEventListener('mouseenter', () => {
        isMouseInside = true;
        floatingCardsContainer.style.cursor = 'none'; // Hide cursor for immersive effect

        if (!animationFrameId) {
            animateCards();
        }
    });

    heroSection.addEventListener('mouseleave', () => {
        isMouseInside = false;
        floatingCardsContainer.style.cursor = 'default';
        resetCards();

        // Stop animation after cards return to position
        setTimeout(() => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        }, 1000);
    });

    // Mouse move handler
    heroSection.addEventListener('mousemove', throttle(handleMouseMove, 16)); // ~60fps

    // Click handlers for individual cards
    floatingCards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

        card.addEventListener('click', () => {
            // Add click effect
            card.style.transform += ' scale(1.1)';
            card.style.boxShadow = '0 12px 25px rgba(0, 212, 255, 0.3)';

            // Create energy burst effect
            createEnergyBurst(card);

            // Show card info
            const cardType = card.querySelector('.card-content h4')?.textContent || 'Card';
            showNotification(`${cardType} card selected! ⚡`, 'success');

            // Reset after animation
            setTimeout(() => {
                card.style.transform = card.style.transform.replace(' scale(1.1)', '');
                card.style.boxShadow = '';
            }, 300);
        });

        // Add hover glow effect
        card.addEventListener('mouseenter', () => {
            const colors = ['rgba(0, 212, 255, 0.2)', 'rgba(138, 43, 226, 0.2)', 'rgba(255, 215, 0, 0.2)'];
            card.style.boxShadow = `0 8px 20px ${colors[index % colors.length]}`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '';
        });
    });
}

// Create energy burst effect
function createEnergyBurst(element) {
    const burst = document.createElement('div');
    burst.className = 'energy-burst';
    burst.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100px;
        height: 100px;
        margin: -50px 0 0 -50px;
        background: radial-gradient(circle, rgba(0, 212, 255, 0.4) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        animation: energyBurst 0.6s ease-out forwards;
        z-index: 10;
    `;

    element.style.position = 'relative';
    element.appendChild(burst);

    setTimeout(() => {
        if (burst.parentNode) {
            burst.parentNode.removeChild(burst);
        }
    }, 600);
}

// Export functions for use in other scripts
window.EnergyField = {
    showNotification,
    smoothScrollToSection,
    createRippleEffect,
    initializeFloatingCards
};