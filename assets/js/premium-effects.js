// =====================================================
// RODA DE MENTES - PREMIUM VISUAL EFFECTS
// Particle System, Cursor Effects & Advanced Animations
// =====================================================

class PremiumEffects {
    constructor() {
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.createParticles();
        this.setupCursorEffects();
        this.setupScrollReveal();
        this.setupEasterEggs();
        this.animate();
    }

    // ===== PARTICLE SYSTEM =====
    createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);

        // Create 30 particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Random initial position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';

            particlesContainer.appendChild(particle);
            this.particles.push(particle);
        }
    }

    // ===== CURSOR EFFECTS =====
    setupCursorEffects() {
        // Create cursor trail element
        const cursorTrail = document.createElement('div');
        cursorTrail.className = 'cursor-trail';
        cursorTrail.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--accent-primary);
            pointer-events: none;
            z-index: 10000;
            opacity: 0.6;
            transition: transform 0.1s ease, opacity 0.3s ease;
            box-shadow: 0 0 20px var(--accent-glow);
        `;
        document.body.appendChild(cursorTrail);

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;

            cursorTrail.style.left = (e.clientX - 4) + 'px';
            cursorTrail.style.top = (e.clientY - 4) + 'px';
        });

        // Hide on mouse leave
        document.addEventListener('mouseleave', () => {
            cursorTrail.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            cursorTrail.style.opacity = '0.6';
        });

        // Scale up on click
        document.addEventListener('mousedown', () => {
            cursorTrail.style.transform = 'scale(2)';
        });

        document.addEventListener('mouseup', () => {
            cursorTrail.style.transform = 'scale(1)';
        });
    }

    // ===== SCROLL REVEAL =====
    setupScrollReveal() {
        const revealElements = document.querySelectorAll('.scroll-reveal');

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ===== EASTER EGGS =====
    setupEasterEggs() {
        // Konami Code Easter Egg: ↑ ↑ ↓ ↓ ← → ← → B A
        const konamiCode = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'b', 'a'
        ];
        let konamiIndex = 0;

        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === konamiCode[konamiIndex].toLowerCase()) {
                konamiIndex++;

                if (konamiIndex === konamiCode.length) {
                    this.activateRainbowMode();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });

        // Triple click on logo
        let clickCount = 0;
        let clickTimer = null;

        document.querySelectorAll('.auth-logo i, .welcome-icon i').forEach(logo => {
            logo.addEventListener('click', () => {
                clickCount++;

                if (clickCount === 1) {
                    clickTimer = setTimeout(() => {
                        clickCount = 0;
                    }, 500);
                }

                if (clickCount === 3) {
                    clearTimeout(clickTimer);
                    clickCount = 0;
                    this.triggerConfetti();
                }
            });
        });
    }

    // ===== EASTER EGG EFFECTS =====
    activateRainbowMode() {
        // Apply rainbow gradient to accent elements
        document.body.style.setProperty('--accent-gradient',
            'linear-gradient(135deg, #FF0080, #FF8C00, #40E0D0, #FF0080)');
        document.body.style.setProperty('--accent-primary', '#FF0080');

        // Show notification
        this.showNotification('🌈 Rainbow Mode Activated!', 'success');

        // Revert after 10 seconds
        setTimeout(() => {
            document.body.style.removeProperty('--accent-gradient');
            document.body.style.removeProperty('--accent-primary');
            this.showNotification('Rainbow Mode Deactivated', 'info');
        }, 10000);
    }

    triggerConfetti() {
        // Simple confetti effect using particles
        const confettiContainer = document.createElement('div');
        confettiContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(confettiContainer);

        const colors = ['#FF0080', '#FF8C00', '#40E0D0', '#00D9FF', '#0091FF'];

        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -10px;
                left: ${Math.random() * 100}%  ;
                opacity: 1;
                transform: rotate(${Math.random() * 360}deg);
                animation: confettiFall ${2 + Math.random() * 2}s ease-out forwards;
            `;
            confettiContainer.appendChild(confetti);
        }

        // Add confetti animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes confettiFall {
                to {
                    transform: translateY(100vh) rotate(${720 + Math.random() * 360}deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Clean up
        setTimeout(() => {
            confettiContainer.remove();
            style.remove();
        }, 5000);

        this.showNotification('🎉 Confetti!', 'success');
    }

    // ===== NOTIFICATIONS =====
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            background: var(--glass-bg);
            backdrop-filter: blur(12px);
            border: 1px solid var(--accent-primary);
            border-radius: 12px;
            color: var(--text-primary);
            font-weight: 600;
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            box-shadow: var(--shadow-glow);
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // ===== ANIMATION LOOP =====
    animate() {
        // Subtle particle parallax effect
        this.particles.forEach((particle, index) => {
            const speed = (index % 3 + 1) * 0.5;
            const currentLeft = parseFloat(particle.style.left);
            const movement = (this.mouse.x / window.innerWidth - 0.5) * speed;

            particle.style.transform = `translateX(${movement}px)`;
        });

        requestAnimationFrame(() => this.animate());
    }

    // ===== PUBLIC METHODS =====
    static addGlowEffect(element) {
        element.style.animation = 'glowPulse 2s ease-in-out infinite';

        const style = document.createElement('style');
        style.textContent = `
            @keyframes glowPulse {
                0%, 100% { box-shadow: 0 0 20px var(--accent-glow); }
                50% { box-shadow: 0 0 40px var(--accent-glow), 0 0 60px var(--accent-glow); }
            }
        `;
        document.head.appendChild(style);
    }

    static addShakeEffect(element) {
        element.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }

    static addBounceEffect(element) {
        element.style.animation = 'bounce 0.6s ease-in-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 600);

        const style = document.createElement('style');
        style.textContent = `
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                25% { transform: translateY(-20px); }
                50% { transform: translateY(0); }
                75% { transform: translateY(-10px); }
            }
        `;
        if (!document.querySelector('#bounce-animation')) {
            style.id = 'bounce-animation';
            document.head.appendChild(style);
        }
    }
}

// ===== UTILITY FUNCTIONS =====

// Smooth scroll to element
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

// Generate random ID
function generateId() {
    return 'id_' + Math.random().toString(36).substr(2, 9);
}

// Debounce function
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

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format number with animation
function animateNumber(element, start, end, duration = 1000) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Copy to clipboard with feedback
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy:', err);
        return false;
    }
}

// Detect mobile device
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Get contrast color
function getContrastColor(hexcolor) {
    const r = parseInt(hexcolor.substr(1, 2), 16);
    const g = parseInt(hexcolor.substr(3, 2), 16);
    const b = parseInt(hexcolor.substr(5, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#000000' : '#ffffff';
}

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            fps: 0,
            memory: 0
        };
        this.lastTime = performance.now();
        this.frames = 0;
    }

    update() {
        this.frames++;
        const currentTime = performance.now();

        if (currentTime >= this.lastTime + 1000) {
            this.metrics.fps = Math.round((this.frames * 1000) / (currentTime - this.lastTime));
            this.frames = 0;
            this.lastTime = currentTime;

            // Memory usage (if available)
            if (performance.memory) {
                this.metrics.memory = Math.round(performance.memory.usedJSHeapSize / 1048576);
            }
        }

        requestAnimationFrame(() => this.update());
    }

    getMetrics() {
        return this.metrics;
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize premium effects
    window.premiumEffects = new PremiumEffects();

    // Initialize performance monitor (dev mode)
    if (window.location.hostname === 'localhost' || window.location.search.includes('debug=true')) {
        window.perfMonitor = new PerformanceMonitor();
        window.perfMonitor.update();

        // Show FPS counter
        const fpsCounter = document.createElement('div');
        fpsCounter.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            padding: 8px 12px;
            background: rgba(0, 0, 0, 0.8);
            color: #00ff00;
            font-family: monospace;
            font-size: 12px;
            border-radius: 4px;
            z-index: 10001;
        `;
        document.body.appendChild(fpsCounter);

        setInterval(() => {
            const metrics = window.perfMonitor.getMetrics();
            fpsCounter.textContent = `FPS: ${metrics.fps} | Mem: ${metrics.memory}MB`;
        }, 1000);
    }

    // Add slide-in animation styles
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
        }
    `;
    document.head.appendChild(animationStyles);

    // Welcome message
    console.log('%c🧠 Roda de Mentes', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #00d9ff 0%, #0091ff 100%); -webkit-background-clip: text; color: transparent;');
    console.log('%cPremium Design System Loaded', 'font-size: 14px; color: #00d9ff;');
    console.log('%cTry the Konami Code for a surprise! ↑ ↑ ↓ ↓ ← → ← → B A', 'font-size: 12px; color: #8b949e;');
});

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PremiumEffects,
        smoothScrollTo,
        generateId,
        debounce,
        throttle,
        animateNumber,
        copyToClipboard,
        isMobile,
        getContrastColor,
        PerformanceMonitor
    };
}
