/* Energy Field - Electrical Particle System */
/* Mouse-following electrical effects with performance optimization */

class ElectricalParticleSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.electricalTrails = [];
        this.mousePos = { x: 0, y: 0 };
        this.lastMousePos = { x: 0, y: 0 };
        this.isEnabled = true;
        this.animationFrame = null;

        // Performance settings
        this.maxParticles = 150;
        this.maxTrails = 8;
        this.frameSkip = 0;
        this.targetFPS = 60;

        // Color palette - strategic blue introduction for electrical effects only
        this.colors = {
            // Primary electrical colors (introducing blue strategically)
            electricBlue: 'rgba(135, 206, 250, 0.8)',    // Light blue - main electrical
            electricWhite: 'rgba(255, 255, 255, 0.9)',   // Pure white - secondary
            electricYellow: 'rgba(255, 255, 0, 0.8)',    // Neon yellow - accent

            // Glow effects
            blueGlow: 'rgba(135, 206, 250, 0.3)',
            whiteGlow: 'rgba(255, 255, 255, 0.4)',
            yellowGlow: 'rgba(255, 255, 0, 0.3)',

            // Spark effects
            sparkBlue: 'rgba(173, 216, 230, 0.9)',       // Lighter blue for sparks
            sparkWhite: 'rgba(255, 255, 255, 1.0)',      // Bright white sparks
            sparkYellow: 'rgba(255, 255, 102, 0.8)'      // Bright yellow sparks
        };

        this.init();
        this.setupEventListeners();
        this.checkAccessibilityPreferences();
    }

    init() {
        // Create canvas element
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '9999';
        this.canvas.style.mixBlendMode = 'screen';
        this.canvas.id = 'electrical-particles-canvas';

        // Insert canvas into DOM
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();

        // Start animation loop
        this.animate();
    }

    setupEventListeners() {
        // Mouse tracking with throttling for performance
        let mouseThrottle = false;
        document.addEventListener('mousemove', (e) => {
            if (!mouseThrottle && this.isEnabled) {
                this.lastMousePos = { ...this.mousePos };
                this.mousePos = {
                    x: e.clientX,
                    y: e.clientY
                };

                // Generate particles on mouse movement
                this.generateElectricalParticles();

                mouseThrottle = true;
                setTimeout(() => mouseThrottle = false, 16); // ~60fps throttle
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });

        // Handle visibility change for performance
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimation();
            } else {
                this.resumeAnimation();
            }
        });

        // Touch support for mobile
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                this.lastMousePos = { ...this.mousePos };
                this.mousePos = {
                    x: touch.clientX,
                    y: touch.clientY
                };
                this.generateElectricalParticles();
            }
        });
    }

    checkAccessibilityPreferences() {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.isEnabled = false;
            this.canvas.style.display = 'none';
            return;
        }

        // Provide toggle option for accessibility
        this.createAccessibilityToggle();
    }

    createAccessibilityToggle() {
        // Add toggle button for users who want to disable effects
        const toggle = document.createElement('button');
        toggle.innerHTML = '⚡ Effects: ON';
        toggle.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            border: 2px solid #FFFF00;
            padding: 8px 12px;
            font-size: 12px;
            border-radius: 4px;
            cursor: pointer;
            z-index: 10000;
            font-family: monospace;
            transition: all 0.2s ease;
        `;

        toggle.addEventListener('click', () => {
            this.toggleEffects();
            toggle.innerHTML = this.isEnabled ? '⚡ Effects: ON' : '⚡ Effects: OFF';
            toggle.style.borderColor = this.isEnabled ? '#FFFF00' : '#666';
        });

        document.body.appendChild(toggle);
    }

    toggleEffects() {
        this.isEnabled = !this.isEnabled;
        this.canvas.style.display = this.isEnabled ? 'block' : 'none';

        if (!this.isEnabled) {
            this.particles = [];
            this.electricalTrails = [];
        }
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    generateElectricalParticles() {
        const distance = Math.sqrt(
            Math.pow(this.mousePos.x - this.lastMousePos.x, 2) +
            Math.pow(this.mousePos.y - this.lastMousePos.y, 2)
        );

        // Generate more particles for faster movement
        const particleCount = Math.min(Math.floor(distance * 0.3), 8);

        for (let i = 0; i < particleCount; i++) {
            this.createElectricalParticle();
        }

        // Create electrical trail effect
        this.createElectricalTrail();

        // Occasionally create spark bursts
        if (Math.random() < 0.15) {
            this.createSparkBurst();
        }
    }

    createElectricalParticle() {
        if (this.particles.length >= this.maxParticles) {
            this.particles.shift(); // Remove oldest particle
        }

        const particle = {
            x: this.mousePos.x + (Math.random() - 0.5) * 30,
            y: this.mousePos.y + (Math.random() - 0.5) * 30,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            life: 1.0,
            decay: Math.random() * 0.02 + 0.01,
            size: Math.random() * 3 + 1,
            type: Math.random() < 0.5 ? 'spark' : 'glow',
            color: this.getRandomElectricalColor(),
            glowColor: this.getRandomGlowColor(),
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.2
        };

        this.particles.push(particle);
    }

    createElectricalTrail() {
        if (this.electricalTrails.length >= this.maxTrails) {
            this.electricalTrails.shift();
        }

        const trail = {
            startX: this.lastMousePos.x,
            startY: this.lastMousePos.y,
            endX: this.mousePos.x,
            endY: this.mousePos.y,
            life: 1.0,
            decay: 0.05,
            intensity: Math.random() * 0.8 + 0.2,
            segments: this.generateLightningPath(
                this.lastMousePos.x, this.lastMousePos.y,
                this.mousePos.x, this.mousePos.y
            )
        };

        this.electricalTrails.push(trail);
    }

    generateLightningPath(x1, y1, x2, y2) {
        const segments = [];
        const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const segmentCount = Math.max(Math.floor(distance / 15), 2);

        for (let i = 0; i <= segmentCount; i++) {
            const progress = i / segmentCount;
            const x = x1 + (x2 - x1) * progress;
            const y = y1 + (y2 - y1) * progress;

            // Add electrical zigzag effect
            const offset = (Math.random() - 0.5) * 10 * (1 - Math.abs(progress - 0.5) * 2);

            segments.push({
                x: x + offset,
                y: y + offset * 0.5
            });
        }

        return segments;
    }

    createSparkBurst() {
        const burstCount = Math.floor(Math.random() * 6) + 4;

        for (let i = 0; i < burstCount; i++) {
            const angle = (Math.PI * 2 * i) / burstCount + Math.random() * 0.5;
            const speed = Math.random() * 8 + 2;

            const spark = {
                x: this.mousePos.x,
                y: this.mousePos.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 0.8,
                decay: Math.random() * 0.03 + 0.02,
                size: Math.random() * 2 + 0.5,
                type: 'burst',
                color: this.colors.sparkWhite,
                glowColor: this.colors.yellowGlow,
                rotation: angle,
                rotationSpeed: 0
            };

            this.particles.push(spark);
        }
    }

    getRandomElectricalColor() {
        const colors = [
            this.colors.electricBlue,
            this.colors.electricWhite,
            this.colors.electricYellow
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    getRandomGlowColor() {
        const glows = [
            this.colors.blueGlow,
            this.colors.whiteGlow,
            this.colors.yellowGlow
        ];
        return glows[Math.floor(Math.random() * glows.length)];
    }

    updateParticles() {
        this.particles = this.particles.filter(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Apply slight gravity and friction
            particle.vy += 0.1;
            particle.vx *= 0.98;
            particle.vy *= 0.98;

            // Update rotation
            particle.rotation += particle.rotationSpeed;

            // Update life
            particle.life -= particle.decay;

            return particle.life > 0;
        });
    }

    updateElectricalTrails() {
        this.electricalTrails = this.electricalTrails.filter(trail => {
            trail.life -= trail.decay;
            return trail.life > 0;
        });
    }

    render() {
        // Clear canvas with subtle fade effect for trail persistence
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Render electrical trails
        this.renderElectricalTrails();

        // Render particles
        this.renderParticles();

        // Add mouse position glow
        this.renderMouseGlow();
    }

    renderElectricalTrails() {
        this.electricalTrails.forEach(trail => {
            if (trail.segments.length < 2) return;

            this.ctx.save();
            this.ctx.globalAlpha = trail.life * trail.intensity;

            // Main lightning bolt
            this.ctx.strokeStyle = this.colors.electricBlue;
            this.ctx.lineWidth = 2;
            this.ctx.lineCap = 'round';
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = this.colors.blueGlow;

            this.ctx.beginPath();
            this.ctx.moveTo(trail.segments[0].x, trail.segments[0].y);

            for (let i = 1; i < trail.segments.length; i++) {
                this.ctx.lineTo(trail.segments[i].x, trail.segments[i].y);
            }

            this.ctx.stroke();

            // Secondary yellow glow
            this.ctx.strokeStyle = this.colors.electricYellow;
            this.ctx.lineWidth = 1;
            this.ctx.shadowColor = this.colors.yellowGlow;
            this.ctx.shadowBlur = 5;
            this.ctx.stroke();

            this.ctx.restore();
        });
    }

    renderParticles() {
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.life;
            this.ctx.translate(particle.x, particle.y);
            this.ctx.rotate(particle.rotation);

            if (particle.type === 'glow') {
                // Render glow particle
                this.ctx.shadowBlur = particle.size * 4;
                this.ctx.shadowColor = particle.glowColor;
                this.ctx.fillStyle = particle.color;
                this.ctx.beginPath();
                this.ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
                this.ctx.fill();
            } else if (particle.type === 'spark') {
                // Render spark particle
                this.ctx.strokeStyle = particle.color;
                this.ctx.lineWidth = particle.size;
                this.ctx.lineCap = 'round';
                this.ctx.shadowBlur = particle.size * 2;
                this.ctx.shadowColor = particle.glowColor;

                this.ctx.beginPath();
                this.ctx.moveTo(-particle.size, 0);
                this.ctx.lineTo(particle.size, 0);
                this.ctx.stroke();
            } else if (particle.type === 'burst') {
                // Render burst spark
                this.ctx.strokeStyle = particle.color;
                this.ctx.lineWidth = particle.size;
                this.ctx.lineCap = 'round';
                this.ctx.shadowBlur = particle.size * 3;
                this.ctx.shadowColor = particle.glowColor;

                this.ctx.beginPath();
                this.ctx.moveTo(-particle.size * 2, 0);
                this.ctx.lineTo(particle.size * 2, 0);
                this.ctx.moveTo(0, -particle.size);
                this.ctx.lineTo(0, particle.size);
                this.ctx.stroke();
            }

            this.ctx.restore();
        });
    }

    renderMouseGlow() {
        this.ctx.save();
        this.ctx.globalAlpha = 0.3;

        // Create radial gradient for mouse glow
        const gradient = this.ctx.createRadialGradient(
            this.mousePos.x, this.mousePos.y, 0,
            this.mousePos.x, this.mousePos.y, 40
        );

        gradient.addColorStop(0, this.colors.electricYellow);
        gradient.addColorStop(0.3, this.colors.electricBlue);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(this.mousePos.x, this.mousePos.y, 40, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.restore();
    }

    animate() {
        if (!this.isEnabled) {
            this.animationFrame = requestAnimationFrame(() => this.animate());
            return;
        }

        // Frame rate limiting for performance
        this.frameSkip++;
        if (this.frameSkip % 1 === 0) { // Run every frame (adjust for performance)
            this.updateParticles();
            this.updateElectricalTrails();
            this.render();
            this.frameSkip = 0;
        }

        this.animationFrame = requestAnimationFrame(() => this.animate());
    }

    pauseAnimation() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }

    resumeAnimation() {
        this.animate();
    }

    destroy() {
        this.pauseAnimation();
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }

        // Remove event listeners
        document.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    }
}

// Initialize the electrical particle system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure page is fully loaded
    setTimeout(() => {
        window.electricalParticles = new ElectricalParticleSystem();

        // Performance monitoring
        let lastFrameTime = 0;
        const monitorPerformance = (currentTime) => {
            const deltaTime = currentTime - lastFrameTime;

            // If frame rate drops below 30fps, reduce particle count
            if (deltaTime > 33 && window.electricalParticles) {
                window.electricalParticles.maxParticles = Math.max(
                    window.electricalParticles.maxParticles * 0.8,
                    50
                );
            }

            lastFrameTime = currentTime;
            requestAnimationFrame(monitorPerformance);
        };

        requestAnimationFrame(monitorPerformance);
    }, 500);
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ElectricalParticleSystem;
}