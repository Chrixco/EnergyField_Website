// Energy Field - Tutorial System JavaScript

// Tutorial System State
let currentTutorialStep = 1;
const totalTutorialSteps = 4;
let tutorialInitialized = false;

// Initialize Tutorial System
function initializeTutorialSystem() {
    if (tutorialInitialized) return;

    const tutorialNavButtons = document.querySelectorAll('.tutorial-nav-btn');
    const tutorialSteps = document.querySelectorAll('.tutorial-step-content');

    if (tutorialNavButtons.length === 0 || tutorialSteps.length === 0) {
        console.log('⚠️ Tutorial system elements not found');
        return;
    }

    // Initialize navigation buttons
    tutorialNavButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const stepNumber = parseInt(btn.dataset.tutorialStep);
            if (stepNumber && stepNumber >= 1 && stepNumber <= totalTutorialSteps) {
                showTutorialStep(stepNumber);
            }
        });

        // Add keyboard navigation
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });

    // Initialize keyboard navigation for tutorial steps
    document.addEventListener('keydown', handleTutorialKeyboard);

    // Initialize card hover effects
    initializeTutorialCardEffects();

    // Initialize resources modal
    initializeTutorialResourcesModal();

    // Show first step by default
    showTutorialStep(1);

    tutorialInitialized = true;
    console.log('🎯 Tutorial system initialized');
}

// Show specific tutorial step
function showTutorialStep(stepNumber) {
    if (stepNumber < 1 || stepNumber > totalTutorialSteps) {
        console.warn(`Invalid tutorial step: ${stepNumber}`);
        return;
    }

    currentTutorialStep = stepNumber;

    // Update navigation buttons
    const navButtons = document.querySelectorAll('.tutorial-nav-btn');
    navButtons.forEach((btn, index) => {
        const btnStep = parseInt(btn.dataset.tutorialStep);
        if (btnStep === stepNumber) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update step content
    const stepContents = document.querySelectorAll('.tutorial-step-content');
    stepContents.forEach((content, index) => {
        const contentStep = index + 1;
        if (contentStep === stepNumber) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });

    // Add entry animation for active step
    const activeStep = document.querySelector('.tutorial-step-content.active');
    if (activeStep) {
        activeStep.style.opacity = '0';
        activeStep.style.transform = 'translateY(20px)';
        setTimeout(() => {
            activeStep.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            activeStep.style.opacity = '1';
            activeStep.style.transform = 'translateY(0)';
        }, 50);
    }

    // Trigger step-specific animations
    triggerStepAnimations(stepNumber);

    // Update browser URL without reload
    if (window.history && window.history.pushState) {
        const newUrl = `${window.location.pathname}${window.location.search}#tutorial-step-${stepNumber}`;
        window.history.pushState({ tutorialStep: stepNumber }, '', newUrl);
    }

    console.log(`📖 Tutorial step ${stepNumber} activated`);
}

// Handle keyboard navigation
function handleTutorialKeyboard(e) {
    // Only handle if we're in the demo modal
    const demoModal = document.getElementById('game-demo-modal');
    if (!demoModal || !demoModal.classList.contains('active')) {
        return;
    }

    switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
            e.preventDefault();
            if (currentTutorialStep > 1) {
                showTutorialStep(currentTutorialStep - 1);
            }
            break;

        case 'ArrowRight':
        case 'ArrowDown':
            e.preventDefault();
            if (currentTutorialStep < totalTutorialSteps) {
                showTutorialStep(currentTutorialStep + 1);
            }
            break;

        case 'Home':
            e.preventDefault();
            showTutorialStep(1);
            break;

        case 'End':
            e.preventDefault();
            showTutorialStep(totalTutorialSteps);
            break;

        case '1':
        case '2':
        case '3':
        case '4':
            e.preventDefault();
            const stepNum = parseInt(e.key);
            if (stepNum >= 1 && stepNum <= totalTutorialSteps) {
                showTutorialStep(stepNum);
            }
            break;
    }
}

// Trigger step-specific animations
function triggerStepAnimations(stepNumber) {
    switch (stepNumber) {
        case 1: // Card Types
            animateCardShowcase();
            break;
        case 2: // Game Zones
            animateZoneLayout();
            break;
        case 3: // Turn Structure
            animateTurnPhases();
            break;
        case 4: // Victory Conditions
            animateVictoryPaths();
            break;
    }
}

// Animate card showcase (Step 1)
function animateCardShowcase() {
    const showcaseCards = document.querySelectorAll('.showcase-card');
    showcaseCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8) translateY(30px)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
        }, index * 150);
    });

    // Add pulsing effect to card demos
    setTimeout(() => {
        const cardDemos = document.querySelectorAll('.card-demo');
        cardDemos.forEach(card => {
            card.classList.add('tutorial-pulse');
        });
    }, 1000);
}

// Animate zone layout (Step 2)
function animateZoneLayout() {
    const zoneDemos = document.querySelectorAll('.zone-demo');
    zoneDemos.forEach((zone, index) => {
        zone.style.opacity = '0';
        zone.style.transform = 'translateX(-30px)';

        setTimeout(() => {
            zone.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            zone.style.opacity = '1';
            zone.style.transform = 'translateX(0)';
        }, index * 200);
    });

    // Animate demo slots
    setTimeout(() => {
        const demoSlots = document.querySelectorAll('.demo-slot');
        demoSlots.forEach((slot, index) => {
            setTimeout(() => {
                slot.style.transform = 'scale(1.1)';
                slot.style.background = 'var(--accent-primary)';
                slot.style.color = 'var(--text-inverse)';

                setTimeout(() => {
                    slot.style.transform = 'scale(1)';
                    slot.style.background = '';
                    slot.style.color = '';
                }, 300);
            }, index * 50);
        });
    }, 800);
}

// Animate turn phases (Step 3)
function animateTurnPhases() {
    const phaseCards = document.querySelectorAll('.phase-card');
    phaseCards.forEach((phase, index) => {
        phase.style.opacity = '0';
        phase.style.transform = 'rotateX(45deg) translateY(50px)';

        setTimeout(() => {
            phase.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            phase.style.opacity = '1';
            phase.style.transform = 'rotateX(0) translateY(0)';
        }, index * 300);
    });

    // Animate phase numbers
    setTimeout(() => {
        const phaseNumbers = document.querySelectorAll('.phase-number');
        phaseNumbers.forEach((number, index) => {
            setTimeout(() => {
                number.style.transform = 'scale(1.3)';
                number.style.background = 'var(--accent-primary)';

                setTimeout(() => {
                    number.style.transform = 'scale(1)';
                }, 400);
            }, index * 500);
        });
    }, 1200);
}

// Animate victory paths (Step 4)
function animateVictoryPaths() {
    const victoryCards = document.querySelectorAll('.victory-card');
    victoryCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.7) rotate(-10deg)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1) rotate(0deg)';
        }, index * 250);
    });

    // Animate victory icons
    setTimeout(() => {
        const victoryIcons = document.querySelectorAll('.victory-icon');
        victoryIcons.forEach(icon => {
            icon.style.animation = 'victoryPulse 2s ease-in-out infinite';
        });
    }, 1000);
}

// Initialize tutorial card effects
function initializeTutorialCardEffects() {
    // Card demo hover effects
    const cardDemos = document.querySelectorAll('.card-demo');
    cardDemos.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05) translateY(-5px)';
            card.style.boxShadow = '0 10px 30px rgba(255, 255, 0, 0.3)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1) translateY(0)';
            card.style.boxShadow = '';
        });
    });

    // Zone demo hover effects
    const zoneDemos = document.querySelectorAll('.zone-demo');
    zoneDemos.forEach(zone => {
        zone.addEventListener('mouseenter', () => {
            const slots = zone.querySelectorAll('.demo-slot');
            slots.forEach((slot, index) => {
                setTimeout(() => {
                    slot.style.transform = 'scale(1.1)';
                    slot.style.borderColor = 'var(--accent-primary)';
                }, index * 50);
            });
        });

        zone.addEventListener('mouseleave', () => {
            const slots = zone.querySelectorAll('.demo-slot');
            slots.forEach(slot => {
                slot.style.transform = 'scale(1)';
                slot.style.borderColor = '';
            });
        });
    });

    // Phase card interactions
    const phaseCards = document.querySelectorAll('.phase-card');
    phaseCards.forEach(phase => {
        phase.addEventListener('click', () => {
            // Expand phase details
            const actions = phase.querySelectorAll('.action-item');
            actions.forEach((action, index) => {
                setTimeout(() => {
                    action.style.background = 'var(--accent-primary)';
                    action.style.color = 'var(--text-inverse)';

                    setTimeout(() => {
                        action.style.background = '';
                        action.style.color = '';
                    }, 500);
                }, index * 100);
            });
        });
    });
}

// Initialize tutorial resources modal
function initializeTutorialResourcesModal() {
    const resourcesModal = document.getElementById('tutorial-resources');
    const resourcesClose = document.getElementById('resources-close');

    if (!resourcesModal || !resourcesClose) {
        return;
    }

    // Create resources button if it doesn't exist
    let resourcesButton = document.getElementById('tutorial-resources-btn');
    if (!resourcesButton) {
        resourcesButton = document.createElement('button');
        resourcesButton.id = 'tutorial-resources-btn';
        resourcesButton.className = 'tutorial-nav-btn';
        resourcesButton.innerHTML = `
            <span class="nav-number">?</span>
            <span class="nav-text">Resources</span>
        `;

        const navigation = document.querySelector('.tutorial-navigation');
        if (navigation) {
            navigation.appendChild(resourcesButton);
        }
    }

    // Show resources modal
    resourcesButton.addEventListener('click', () => {
        resourcesModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });

    // Close resources modal
    resourcesClose.addEventListener('click', () => {
        closeResourcesModal();
    });

    // Close on backdrop click
    resourcesModal.addEventListener('click', (e) => {
        if (e.target === resourcesModal || e.target.classList.contains('resources-backdrop')) {
            closeResourcesModal();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !resourcesModal.classList.contains('hidden')) {
            closeResourcesModal();
        }
    });

    function closeResourcesModal() {
        resourcesModal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Tutorial progress tracking
function trackTutorialProgress() {
    const progress = {
        currentStep: currentTutorialStep,
        completedSteps: Array.from({length: currentTutorialStep}, (_, i) => i + 1),
        timestamp: new Date().toISOString()
    };

    // Store in localStorage for persistence
    try {
        localStorage.setItem('energyFieldTutorialProgress', JSON.stringify(progress));
    } catch (e) {
        console.warn('Could not save tutorial progress to localStorage:', e);
    }

    // Track with analytics if available
    if (typeof gtag !== 'undefined') {
        gtag('event', 'tutorial_progress', {
            'event_category': 'engagement',
            'event_label': `step_${currentTutorialStep}`,
            'value': currentTutorialStep
        });
    }
}

// Load tutorial progress
function loadTutorialProgress() {
    try {
        const saved = localStorage.getItem('energyFieldTutorialProgress');
        if (saved) {
            const progress = JSON.parse(saved);
            const stepToShow = Math.min(progress.currentStep || 1, totalTutorialSteps);
            showTutorialStep(stepToShow);
            return true;
        }
    } catch (e) {
        console.warn('Could not load tutorial progress:', e);
    }
    return false;
}

// Reset tutorial progress
function resetTutorialProgress() {
    try {
        localStorage.removeItem('energyFieldTutorialProgress');
        showTutorialStep(1);
        console.log('📖 Tutorial progress reset');
    } catch (e) {
        console.warn('Could not reset tutorial progress:', e);
    }
}

// Handle URL hash navigation
function handleTutorialHashNavigation() {
    const hash = window.location.hash;
    const match = hash.match(/^#tutorial-step-(\d+)$/);

    if (match) {
        const stepNumber = parseInt(match[1]);
        if (stepNumber >= 1 && stepNumber <= totalTutorialSteps) {
            showTutorialStep(stepNumber);
            return true;
        }
    }
    return false;
}

// Initialize tutorial system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize tutorial system
    initializeTutorialSystem();

    // Handle initial URL hash
    if (!handleTutorialHashNavigation()) {
        // Load saved progress or show step 1
        if (!loadTutorialProgress()) {
            showTutorialStep(1);
        }
    }

    // Handle browser back/forward navigation
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.tutorialStep) {
            showTutorialStep(e.state.tutorialStep);
        } else {
            handleTutorialHashNavigation();
        }
    });
});

// Add tutorial-specific CSS animations
const tutorialAnimationCSS = `
@keyframes tutorialPulse {
    0%, 100% {
        transform: scale(1);
        box-shadow: 0 0 5px var(--accent-primary);
    }
    50% {
        transform: scale(1.02);
        box-shadow: 0 0 15px var(--accent-primary);
    }
}

@keyframes victoryPulse {
    0%, 100% {
        transform: scale(1);
        color: var(--accent-primary);
    }
    50% {
        transform: scale(1.1);
        color: var(--text-primary);
    }
}

.tutorial-pulse {
    animation: tutorialPulse 2s ease-in-out infinite;
}

.tutorial-step-content {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.showcase-card:nth-child(1) { animation-delay: 0s; }
.showcase-card:nth-child(2) { animation-delay: 0.15s; }
.showcase-card:nth-child(3) { animation-delay: 0.3s; }
.showcase-card:nth-child(4) { animation-delay: 0.45s; }
.showcase-card:nth-child(5) { animation-delay: 0.6s; }

.zone-demo:nth-child(1) { animation-delay: 0s; }
.zone-demo:nth-child(2) { animation-delay: 0.2s; }
.zone-demo:nth-child(3) { animation-delay: 0.4s; }

.phase-card:nth-child(1) { animation-delay: 0s; }
.phase-card:nth-child(2) { animation-delay: 0.3s; }
.phase-card:nth-child(3) { animation-delay: 0.6s; }

.victory-card:nth-child(1) { animation-delay: 0s; }
.victory-card:nth-child(2) { animation-delay: 0.25s; }
.victory-card:nth-child(3) { animation-delay: 0.5s; }
`;

// Inject tutorial animation CSS
const tutorialStyleElement = document.createElement('style');
tutorialStyleElement.textContent = tutorialAnimationCSS;
document.head.appendChild(tutorialStyleElement);

// Export functions for global access
window.EnergyFieldTutorial = {
    showStep: showTutorialStep,
    getCurrentStep: () => currentTutorialStep,
    getTotalSteps: () => totalTutorialSteps,
    resetProgress: resetTutorialProgress,
    trackProgress: trackTutorialProgress
};

console.log('🎯 Tutorial system script loaded');