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

// Export functions for use in other scripts
window.EnergyField = {
    showNotification,
    smoothScrollToSection,
    createRippleEffect
};