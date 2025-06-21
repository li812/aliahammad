// ==================== MODERN ANIMATION UTILITIES ====================

// Easing functions for smooth animations
export const easingFunctions = {
  easeInOut: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeOut: t => t * (2 - t),
  easeIn: t => t * t,
  easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
  easeInOutExpo: t => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if (t < 0.5) return Math.pow(2, 20 * t - 10) / 2;
    return (2 - Math.pow(2, -20 * t + 10)) / 2;
  },
  elasticOut: t => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
  bounceOut: t => {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (t < 1 / d1) return n1 * t * t;
    else if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
    else if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
    else return n1 * (t -= 2.625 / d1) * t + 0.984375;
  }
};

// ==================== INTERSECTION OBSERVER UTILITIES ====================

// Advanced intersection observer with multiple thresholds
export const createAdvancedObserver = (callback, options = {}) => {
  const defaultOptions = {
    threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    rootMargin: '-10% 0px -10% 0px',
    triggerOnce: true,
    staggerDelay: 150,
    animationDuration: 800
  };

  const config = { ...defaultOptions, ...options };

  const observedElements = new Map();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const element = entry.target;
      const elementData = observedElements.get(element) || {};
      
      if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
        if (!elementData.hasTriggered || !config.triggerOnce) {
          const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
          const delay = index * config.staggerDelay;
          
          setTimeout(() => {
            callback(element, entry, elementData);
            if (config.triggerOnce) {
              elementData.hasTriggered = true;
              observedElements.set(element, elementData);
            }
          }, delay);
        }
      }
    });
  }, config);

  return {
    observe: (element, customData = {}) => {
      observedElements.set(element, customData);
      observer.observe(element);
    },
    unobserve: (element) => {
      observer.unobserve(element);
      observedElements.delete(element);
    },
    disconnect: () => observer.disconnect()
  };
};

// ==================== SCROLL-TRIGGERED ANIMATIONS ====================

// Parallax scrolling with multiple layers
export const createParallaxEffect = (elements, options = {}) => {
  const defaultOptions = {
    speed: 0.5,
    direction: 'vertical',
    boundaries: { top: 0, bottom: window.innerHeight }
  };
  
  const config = { ...defaultOptions, ...options };
  
  const handleScroll = () => {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    elements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrolled;
      const elementHeight = rect.height;
      
      // Only animate if element is in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        const speed = element.dataset.parallaxSpeed || config.speed;
        const direction = element.dataset.parallaxDirection || config.direction;
        
        let transform = '';
        
        if (direction === 'vertical') {
          const yPos = -(scrolled - elementTop) * speed;
          transform = `translate3d(0, ${yPos}px, 0)`;
        } else if (direction === 'horizontal') {
          const xPos = -(scrolled - elementTop) * speed;
          transform = `translate3d(${xPos}px, 0, 0)`;
        }
        
        element.style.transform = transform;
      }
    });
  };
  
  // Throttled scroll handler for performance
  let ticking = false;
  const throttledScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', throttledScroll, { passive: true });
  
  return () => window.removeEventListener('scroll', throttledScroll);
};

// ==================== ADVANCED CARD ANIMATIONS ====================

// Magnetic card effect
export const createMagneticEffect = (elements, options = {}) => {
  const defaultOptions = {
    strength: 50,
    smoothing: 0.15,
    triggerArea: 1.2
  };
  
  const config = { ...defaultOptions, ...options };
  
  elements.forEach(element => {
    let isHovering = false;
    let animationId = null;
    
    const bounds = element.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    
    const handleMouseMove = (e) => {
      if (!isHovering) return;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const deltaX = (mouseX - centerX) * config.strength / 1000;
      const deltaY = (mouseY - centerY) * config.strength / 1000;
      
      const animate = () => {
        element.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(1.02)`;
        element.style.transition = 'transform 0.1s ease-out';
      };
      
      if (animationId) cancelAnimationFrame(animationId);
      animationId = requestAnimationFrame(animate);
    };
    
    const handleMouseEnter = () => {
      isHovering = true;
      element.style.transition = 'transform 0.3s ease-out';
    };
    
    const handleMouseLeave = () => {
      isHovering = false;
      element.style.transform = 'translate3d(0, 0, 0) scale(1)';
      element.style.transition = 'transform 0.4s ease-out';
      if (animationId) cancelAnimationFrame(animationId);
    };
    
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
  });
};

// ==================== TEXT ANIMATIONS ====================

// Advanced typewriter effect with multiple options
export const createTypewriterEffect = (element, options = {}) => {
  const defaultOptions = {
    speed: 50,
    deleteSpeed: 30,
    pauseTime: 1000,
    loop: true,
    cursor: '|',
    cursorBlink: true,
    showCursor: true,
    words: null // Add this option
  };
  
  const config = { ...defaultOptions, ...options };
  
  // Use words from options if provided, otherwise use element content
  let words;
  if (config.words && Array.isArray(config.words)) {
    words = config.words;
  } else if (config.words) {
    words = [config.words];
  } else {
    const originalText = element.textContent;
    words = Array.isArray(originalText) ? originalText : [originalText];
  }
  
  // Clear the element content
  element.textContent = '';
  
  let currentWordIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let isPaused = false;
  
  const type = () => {
    const currentWord = words[currentWordIndex];
    
    if (!isDeleting && currentCharIndex < currentWord.length) {
      // Typing
      element.textContent = currentWord.slice(0, currentCharIndex + 1);
      currentCharIndex++;
      setTimeout(type, config.speed + Math.random() * 50); // Add randomness
    } else if (isDeleting && currentCharIndex > 0) {
      // Deleting
      element.textContent = currentWord.slice(0, currentCharIndex - 1);
      currentCharIndex--;
      setTimeout(type, config.deleteSpeed);
    } else if (!isDeleting && currentCharIndex === currentWord.length) {
      // Pause before deleting
      isPaused = true;
      setTimeout(() => {
        isPaused = false;
        isDeleting = true;
        type();
      }, config.pauseTime);
    } else if (isDeleting && currentCharIndex === 0) {
      // Move to next word
      isDeleting = false;
      currentWordIndex = (currentWordIndex + 1) % words.length;
      if (!config.loop && currentWordIndex === 0) return;
      setTimeout(type, 500);
    }
    
    // Add cursor effect
    if (config.showCursor && !isPaused) {
      const currentText = element.textContent;
      if (config.cursorBlink) {
        // Blinking cursor
        const showCursor = Math.floor(Date.now() / 500) % 2;
        element.textContent = currentText + (showCursor ? config.cursor : '');
      } else {
        // Static cursor
        if (!currentText.endsWith(config.cursor)) {
          element.textContent = currentText + config.cursor;
        }
      }
    }
  };
  
  type();
};

// ==================== PARTICLE SYSTEM ====================

// Advanced particle animation system
export const createParticleSystem = (container, options = {}) => {
  const defaultOptions = {
    particleCount: 50,
    particleSize: { min: 2, max: 6 },
    speed: { min: 0.5, max: 2 },
    color: ['#00d9ff', '#9333ea', '#ffffff'],
    opacity: { min: 0.3, max: 0.8 },
    direction: 'random', // 'up', 'down', 'left', 'right', 'random'
    interactive: true,
    connectionDistance: 150,
    showConnections: true
  };
  
  const config = { ...defaultOptions, ...options };
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const particles = [];
  
  // Setup canvas
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '1';
  container.appendChild(canvas);
  
  const resizeCanvas = () => {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  };
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Particle class
  class Particle {
    constructor() {
      this.reset();
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
    }
    
    reset() {
      this.size = Math.random() * (config.particleSize.max - config.particleSize.min) + config.particleSize.min;
      this.speedX = (Math.random() - 0.5) * config.speed.max;
      this.speedY = (Math.random() - 0.5) * config.speed.max;
      this.color = config.color[Math.floor(Math.random() * config.color.length)];
      this.opacity = Math.random() * (config.opacity.max - config.opacity.min) + config.opacity.min;
      this.life = 1;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Boundary check
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      
      // Keep in bounds
      this.x = Math.max(0, Math.min(canvas.width, this.x));
      this.y = Math.max(0, Math.min(canvas.height, this.y));
    }
    
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
  
  // Create particles
  for (let i = 0; i < config.particleCount; i++) {
    particles.push(new Particle());
  }
  
  // Animation loop
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((particle, index) => {
      particle.update();
      particle.draw();
      
      // Draw connections
      if (config.showConnections) {
        particles.slice(index + 1).forEach(otherParticle => {
          const distance = Math.sqrt(
            Math.pow(particle.x - otherParticle.x, 2) + 
            Math.pow(particle.y - otherParticle.y, 2)
          );
          
          if (distance < config.connectionDistance) {
            ctx.save();
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = 0.2 * (1 - distance / config.connectionDistance);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      }
    });
    
    requestAnimationFrame(animate);
  };
  
  animate();
  
  return {
    destroy: () => {
      container.removeChild(canvas);
      window.removeEventListener('resize', resizeCanvas);
    }
  };
};

// ==================== MORPHING ANIMATIONS ====================

// SVG path morphing animation
export const createMorphAnimation = (element, paths, options = {}) => {
  const defaultOptions = {
    duration: 1000,
    easing: easingFunctions.easeInOutCubic,
    loop: true,
    pauseTime: 2000
  };
  
  const config = { ...defaultOptions, ...options };
  let currentPathIndex = 0;
  
  const interpolatePath = (path1, path2, progress) => {
    // Simplified path interpolation - in production, use a library like Flubber
    return progress < 0.5 ? path1 : path2;
  };
  
  const animate = () => {
    const nextIndex = (currentPathIndex + 1) % paths.length;
    const startTime = performance.now();
    
    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / config.duration, 1);
      const easedProgress = config.easing(progress);
      
      const interpolatedPath = interpolatePath(
        paths[currentPathIndex], 
        paths[nextIndex], 
        easedProgress
      );
      
      element.setAttribute('d', interpolatedPath);
      
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        currentPathIndex = nextIndex;
        if (config.loop) {
          setTimeout(animate, config.pauseTime);
        }
      }
    };
    
    requestAnimationFrame(step);
  };
  
  animate();
};

// ==================== ENTRANCE ANIMATIONS ====================

// Advanced entrance animations with spring physics
export const createEntranceAnimation = (elements, options = {}) => {
  const defaultOptions = {
    type: 'slideUp', // 'slideUp', 'slideDown', 'slideLeft', 'slideRight', 'fade', 'scale', 'rotate', 'flip'
    duration: 800,
    stagger: 100,
    easing: easingFunctions.easeInOutCubic,
    distance: 50,
    scale: { from: 0.8, to: 1 },
    rotation: { from: 180, to: 0 },
    springConfig: { tension: 300, friction: 30 }
  };
  
  const config = { ...defaultOptions, ...options };
  
  const getInitialTransform = (type) => {
    switch (type) {
      case 'slideUp':
        return `translateY(${config.distance}px) scale(${config.scale.from})`;
      case 'slideDown':
        return `translateY(-${config.distance}px) scale(${config.scale.from})`;
      case 'slideLeft':
        return `translateX(${config.distance}px) scale(${config.scale.from})`;
      case 'slideRight':
        return `translateX(-${config.distance}px) scale(${config.scale.from})`;
      case 'fade':
        return `scale(${config.scale.from})`;
      case 'scale':
        return `scale(${config.scale.from})`;
      case 'rotate':
        return `rotate(${config.rotation.from}deg) scale(${config.scale.from})`;
      case 'flip':
        return `rotateY(${config.rotation.from}deg) scale(${config.scale.from})`;
      default:
        return `translateY(${config.distance}px)`;
    }
  };
  
  elements.forEach((element, index) => {
    // Set initial state
    element.style.opacity = '0';
    element.style.transform = getInitialTransform(config.type);
    element.style.transition = 'none';
    
    // Animate in with delay
    setTimeout(() => {
      element.style.transition = `all ${config.duration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
      element.style.opacity = '1';
      element.style.transform = 'translateY(0) translateX(0) scale(1) rotate(0) rotateY(0)';
    }, index * config.stagger);
  });
};

// ==================== LOADING ANIMATIONS ====================

// Advanced loading spinner with customizable shapes
export const createLoadingAnimation = (container, options = {}) => {
  const defaultOptions = {
    type: 'dots', // 'dots', 'bars', 'circle', 'pulse', 'wave'
    size: 40,
    color: '#00d9ff',
    speed: 1,
    count: 3
  };
  
  const config = { ...defaultOptions, ...options };
  
  const spinner = document.createElement('div');
  spinner.className = 'custom-loader';
  
  let html = '';
  
  switch (config.type) {
    case 'dots':
      for (let i = 0; i < config.count; i++) {
        html += `<div class="dot" style="animation-delay: ${i * 0.2}s"></div>`;
      }
      break;
    case 'bars':
      for (let i = 0; i < config.count; i++) {
        html += `<div class="bar" style="animation-delay: ${i * 0.1}s"></div>`;
      }
      break;
    case 'circle':
      html = '<div class="circle"></div>';
      break;
  }
  
  spinner.innerHTML = html;
  container.appendChild(spinner);
  
  // Add CSS styles dynamically
  const style = document.createElement('style');
  style.textContent = `
    .custom-loader {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    
    .custom-loader .dot {
      width: ${config.size / 4}px;
      height: ${config.size / 4}px;
      background: ${config.color};
      border-radius: 50%;
      animation: dotPulse ${1 / config.speed}s ease-in-out infinite;
    }
    
    .custom-loader .bar {
      width: ${config.size / 6}px;
      height: ${config.size}px;
      background: ${config.color};
      animation: barStretch ${1 / config.speed}s ease-in-out infinite;
    }
    
    .custom-loader .circle {
      width: ${config.size}px;
      height: ${config.size}px;
      border: 3px solid rgba(0, 217, 255, 0.3);
      border-top: 3px solid ${config.color};
      border-radius: 50%;
      animation: circleRotate ${1 / config.speed}s linear infinite;
    }
    
    @keyframes dotPulse {
      0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
      40% { transform: scale(1.2); opacity: 1; }
    }
    
    @keyframes barStretch {
      0%, 40%, 100% { transform: scaleY(0.4); }
      20% { transform: scaleY(1); }
    }
    
    @keyframes circleRotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  
  document.head.appendChild(style);
  
  return {
    remove: () => {
      container.removeChild(spinner);
      document.head.removeChild(style);
    }
  };
};

// ==================== EXPORT UTILITIES ====================

export const animations = {
  // Core utilities
  easingFunctions,
  createAdvancedObserver,
  
  // Scroll effects
  createParallaxEffect,
  
  // Interactive effects
  createMagneticEffect,
  
  // Text effects
  createTypewriterEffect,
  
  // Visual effects
  createParticleSystem,
  createMorphAnimation,
  
  // Entrance/exit
  createEntranceAnimation,
  
  // Loading
  createLoadingAnimation
};

export default animations;