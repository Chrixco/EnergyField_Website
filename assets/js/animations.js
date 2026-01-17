// Energy Field - Advanced Animations JavaScript

// Animation system
class EnergyFieldAnimations {
    constructor() {
        this.isInitialized = false;
        this.animationFrameId = null;
        this.observers = [];
        this.particles = [];
        this.circuitNodes = [];
    }

    init() {
        if (this.isInitialized) return;

        this.setupIntersectionObservers();
        this.initializeEnergyParticles();
        this.initializeCircuitConnections();
        this.initializeHoverEffects();
        this.initializeScrollAnimations();
        this.startAnimationLoop();

        this.isInitialized = true;
        console.log('⚡ Advanced animations initialized');
    }

    // Setup intersection observers for scroll-triggered animations
    setupIntersectionObservers() {
        // Observer for fade-in animations
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    this.triggerElementAnimation(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observer for complex animations
        const complexObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerComplexAnimation(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });

        // Observe elements
        document.querySelectorAll('[data-animate]').forEach(el => {
            const animationType = el.dataset.animate;
            if (animationType === 'complex') {
                complexObserver.observe(el);
            } else {
                fadeObserver.observe(el);
            }
        });

        this.observers.push(fadeObserver, complexObserver);
    }

    // Initialize energy particles system
    initializeEnergyParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        // Create particle container
        const particleContainer = document.createElement('div');
        particleContainer.className = 'energy-particles-advanced';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            z-index: 1;
        `;
        hero.appendChild(particleContainer);

        // Create particles
        for (let i = 0; i < 30; i++) {
            this.createEnergyParticle(particleContainer);
        }
    }

    createEnergyParticle(container) {
        const particle = {
            element: document.createElement('div'),
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: Math.random() * 100,
            maxLife: 100,
            size: Math.random() * 4 + 1,
            color: this.getRandomEnergyColor()
        };

        particle.element.style.cssText = `
            position: absolute;
            width: ${particle.size}px;
            height: ${particle.size}px;
            background: ${particle.color};
            border-radius: 50%;
            box-shadow: 0 0 ${particle.size * 2}px ${particle.color};
            pointer-events: none;
            left: ${particle.x}px;
            top: ${particle.y}px;
            opacity: 0;
        `;

        container.appendChild(particle.element);
        this.particles.push(particle);
    }

    getRandomEnergyColor() {
        const colors = [
            '#00D4FF',  // neon blue
            '#8A2BE2',  // neon purple
            '#FF1493',  // neon pink
            '#FFD700',  // neon yellow
            '#00FF7F'   // neon green
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Initialize circuit connections
    initializeCircuitConnections() {
        const sections = document.querySelectorAll('.feature-card, .mode-card');
        sections.forEach(section => {
            this.createCircuitNode(section);
        });
    }

    createCircuitNode(element) {
        const node = {
            element,
            connections: [],
            energy: 0,
            maxEnergy: 100
        };

        // Add circuit visual
        const circuit = document.createElement('div');
        circuit.className = 'circuit-overlay';
        circuit.style.cssText = `
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            border: 2px solid transparent;
            border-radius: inherit;
            background: linear-gradient(45deg, transparent, rgba(0, 212, 255, 0.3), transparent);
            background-size: 200% 200%;
            opacity: 0;
            transition: opacity 0.5s ease;
            pointer-events: none;
            animation: circuitPulse 3s ease-in-out infinite;
        `;

        element.style.position = 'relative';
        element.appendChild(circuit);
        this.circuitNodes.push(node);

        // Activate on hover
        element.addEventListener('mouseenter', () => {
            circuit.style.opacity = '1';
            this.chargeCircuitNode(node);
        });

        element.addEventListener('mouseleave', () => {
            circuit.style.opacity = '0';
        });
    }

    chargeCircuitNode(node) {
        node.energy = node.maxEnergy;
        // Create energy burst effect
        this.createEnergyBurst(node.element);
    }

    createEnergyBurst(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 8; i++) {
            const burst = document.createElement('div');
            const angle = (i * 45) * Math.PI / 180;
            const distance = 100;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;

            burst.style.cssText = `
                position: fixed;
                width: 3px;
                height: 20px;
                background: linear-gradient(to bottom, var(--neon-blue), transparent);
                left: ${centerX}px;
                top: ${centerY}px;
                transform-origin: center bottom;
                transform: rotate(${angle}rad);
                z-index: 1000;
                pointer-events: none;
                animation: energyBurst 0.6s ease-out forwards;
            `;

            document.body.appendChild(burst);

            setTimeout(() => {
                if (burst.parentNode) {
                    burst.parentNode.removeChild(burst);
                }
            }, 600);
        }
    }

    // Initialize hover effects
    initializeHoverEffects() {
        this.setupMagneticEffect();
        this.setupGlowTrail();
        this.setupTiltEffect();
    }

    setupMagneticEffect() {
        document.querySelectorAll('.cta-button, .download-btn').forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;

                const tiltX = deltaY * 10;
                const tiltY = deltaX * -10;

                button.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }

    setupGlowTrail() {
        let mouseTrail = [];

        document.addEventListener('mousemove', (e) => {
            // Add point to trail
            mouseTrail.push({
                x: e.clientX,
                y: e.clientY,
                time: Date.now()
            });

            // Limit trail length
            if (mouseTrail.length > 10) {
                mouseTrail.shift();
            }

            // Only show trail on interactive elements
            const element = document.elementFromPoint(e.clientX, e.clientY);
            if (element && (element.classList.contains('cta-button') ||
                          element.classList.contains('nav-link') ||
                          element.closest('.feature-card'))) {
                this.createTrailPoint(e.clientX, e.clientY);
            }
        });
    }

    createTrailPoint(x, y) {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 8px;
            height: 8px;
            background: radial-gradient(circle, var(--neon-blue), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            opacity: 0.7;
            transform: translate(-50%, -50%);
            animation: trailFade 0.8s ease-out forwards;
        `;

        document.body.appendChild(trail);

        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 800);
    }

    setupTiltEffect() {
        document.querySelectorAll('.feature-card, .mode-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / centerY * -10;
                const rotateY = (x - centerX) / centerX * 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        });
    }

    // Initialize scroll animations
    initializeScrollAnimations() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollAnimations();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    updateScrollAnimations() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;

        // Parallax effect for floating cards
        const floatingCards = document.querySelectorAll('.card-float');
        floatingCards.forEach((card, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrollTop * speed);
            card.style.transform = `translateY(${yPos}px) rotate(${scrollTop * 0.1}deg)`;
        });

        // Energy field distortion
        const hero = document.querySelector('.hero-background');
        if (hero) {
            const distortion = Math.sin(scrollTop * 0.01) * 5;
            hero.style.filter = `hue-rotate(${distortion}deg)`;
        }
    }

    // Trigger element animation
    triggerElementAnimation(element) {
        const animationType = element.dataset.animate || 'fade-in';

        switch (animationType) {
            case 'slide-up':
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
                break;
            case 'scale-in':
                element.style.transform = 'scale(1)';
                element.style.opacity = '1';
                break;
            case 'rotate-in':
                element.style.transform = 'rotate(0deg)';
                element.style.opacity = '1';
                break;
            default:
                element.style.opacity = '1';
        }
    }

    // Trigger complex animation
    triggerComplexAnimation(element) {
        if (element.classList.contains('stats-counter')) {
            this.animateCounter(element);
        } else if (element.classList.contains('progress-bar')) {
            this.animateProgressBar(element);
        }
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.target || element.textContent);
        const duration = 2000;
        const start = Date.now();

        const animate = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(target * easeOut);

            element.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }

    animateProgressBar(element) {
        const width = element.dataset.width || '100%';
        element.style.width = '0%';
        element.style.transition = 'width 2s ease-out';

        setTimeout(() => {
            element.style.width = width;
        }, 100);
    }

    // Animation loop for particles
    startAnimationLoop() {
        const animate = () => {
            this.updateParticles();
            this.updateCircuitNodes();
            this.animationFrameId = requestAnimationFrame(animate);
        };
        animate();
    }

    updateParticles() {
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Update life
            particle.life--;

            // Boundaries
            if (particle.x < 0 || particle.x > window.innerWidth) {
                particle.vx *= -1;
            }
            if (particle.y < 0 || particle.y > window.innerHeight) {
                particle.vy *= -1;
            }

            // Opacity based on life
            const opacity = particle.life / particle.maxLife;

            // Update element
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
            particle.element.style.opacity = opacity;

            // Reset particle if life is over
            if (particle.life <= 0) {
                particle.life = particle.maxLife;
                particle.x = Math.random() * window.innerWidth;
                particle.y = Math.random() * window.innerHeight;
            }
        });
    }

    updateCircuitNodes() {
        this.circuitNodes.forEach(node => {
            if (node.energy > 0) {
                node.energy -= 0.5;
                const intensity = node.energy / node.maxEnergy;
                const circuit = node.element.querySelector('.circuit-overlay');
                if (circuit) {
                    circuit.style.opacity = intensity * 0.8;
                }
            }
        });
    }

    // Public methods
    createExplosion(x, y) {
        for (let i = 0; i < 20; i++) {
            this.createExplosionParticle(x, y);
        }
    }

    createExplosionParticle(x, y) {
        const particle = document.createElement('div');
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 50 + Math.random() * 50;
        const size = 3 + Math.random() * 5;

        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: var(--neon-blue);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            box-shadow: 0 0 ${size * 2}px var(--neon-blue);
        `;

        document.body.appendChild(particle);

        // Animate particle
        let posX = x;
        let posY = y;
        let velX = Math.cos(angle) * velocity;
        let velY = Math.sin(angle) * velocity;
        let life = 60;

        const animateParticle = () => {
            posX += velX * 0.1;
            posY += velY * 0.1;
            velY += 0.5; // gravity
            life--;

            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = life / 60;

            if (life > 0) {
                requestAnimationFrame(animateParticle);
            } else {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }
        };

        animateParticle();
    }

    // Cleanup
    destroy() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }

        this.observers.forEach(observer => observer.disconnect());
        this.particles.forEach(particle => {
            if (particle.element.parentNode) {
                particle.element.parentNode.removeChild(particle.element);
            }
        });

        this.particles = [];
        this.circuitNodes = [];
        this.isInitialized = false;
    }
}

// CSS for additional animations
const additionalAnimationStyles = `
    @keyframes circuitPulse {
        0%, 100% {
            background-position: 0% 0%;
        }
        50% {
            background-position: 100% 100%;
        }
    }

    @keyframes energyBurst {
        0% {
            transform: translateY(0) scale(1) rotate(var(--rotation));
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(0) rotate(var(--rotation));
            opacity: 0;
        }
    }

    @keyframes trailFade {
        0% {
            opacity: 0.7;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.3);
        }
    }

    .animate-fade-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }

    .circuit-overlay {
        animation: circuitPulse 3s ease-in-out infinite;
    }

    /* Performance optimizations */
    .energy-particles-advanced * {
        will-change: transform, opacity;
    }

    .feature-card,
    .mode-card {
        will-change: transform;
        transform-style: preserve-3d;
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        .energy-particles-advanced,
        .circuit-overlay {
            display: none !important;
        }

        .feature-card,
        .mode-card {
            transform: none !important;
        }
    }

    /* Mobile optimizations */
    @media (max-width: 768px) {
        .energy-particles-advanced {
            display: none;
        }

        .circuit-overlay {
            animation-duration: 5s;
        }
    }
`;

// Add styles to document
const animationStyleSheet = document.createElement('style');
animationStyleSheet.textContent = additionalAnimationStyles;
document.head.appendChild(animationStyleSheet);

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const animations = new EnergyFieldAnimations();

    // Initialize after a short delay to allow other scripts to load
    setTimeout(() => {
        animations.init();
    }, 500);

    // Expose to global scope
    window.EnergyFieldAnimations = animations;
});

// Handle page visibility for performance
document.addEventListener('visibilitychange', () => {
    if (window.EnergyFieldAnimations) {
        if (document.hidden) {
            // Pause animations when page is hidden
            if (window.EnergyFieldAnimations.animationFrameId) {
                cancelAnimationFrame(window.EnergyFieldAnimations.animationFrameId);
                window.EnergyFieldAnimations.animationFrameId = null;
            }
        } else {
            // Resume animations when page becomes visible
            if (!window.EnergyFieldAnimations.animationFrameId) {
                window.EnergyFieldAnimations.startAnimationLoop();
            }
        }
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnergyFieldAnimations;
}