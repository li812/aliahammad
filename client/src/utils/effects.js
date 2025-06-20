// ==================== CORE ANIMATION UTILITIES ====================

// Mobile Detection Utility
export const isMobile = {
  Android: () => navigator.userAgent.match(/Android/i),
  BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
  iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
  Opera: () => navigator.userAgent.match(/Opera Mini/i),
  Windows: () => navigator.userAgent.match(/IEMobile/i),
  any: function() {
    return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
  }
};

// ==================== 1. FULL HEIGHT EFFECT ====================
export const useFullHeight = () => {
  const setFullHeight = () => {
    if (!isMobile.any()) {
      const elements = document.querySelectorAll('.js-fullheight');
      elements.forEach(element => {
        element.style.height = `${window.innerHeight}px`;
      });
    }
  };

  const initFullHeight = () => {
    setFullHeight();
    window.addEventListener('resize', setFullHeight);
    return () => window.removeEventListener('resize', setFullHeight);
  };

  return initFullHeight;
};

// ==================== 2. PARALLAX SCROLLING ====================
export const useParallax = () => {
  const handleParallax = () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-stellar-background-ratio]');
    
    parallaxElements.forEach(element => {
      const rate = parseFloat(element.dataset.stellarBackgroundRatio) || 0.5;
      const yPos = -(scrolled * rate);
      element.style.backgroundPosition = `50% ${yPos}px`;
    });
  };

  const initParallax = () => {
    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  };

  return initParallax;
};

// ==================== 3. WAYPOINT ANIMATIONS ====================
export const useWaypointAnimations = () => {
  const observeAnimations = () => {
    const animateBoxes = document.querySelectorAll('.animate-box');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated-fast')) {
          const element = entry.target;
          const effect = element.dataset.animateEffect || 'fadeInUp';
          
          // Add staggered animation delay
          const delay = Array.from(animateBoxes).indexOf(element) * 100;
          
          setTimeout(() => {
            element.classList.add('item-animate');
            
            setTimeout(() => {
              switch(effect) {
                case 'fadeIn':
                  element.classList.add('fadeIn', 'animated-fast');
                  break;
                case 'fadeInLeft':
                  element.classList.add('fadeInLeft', 'animated-fast');
                  break;
                case 'fadeInRight':
                  element.classList.add('fadeInRight', 'animated-fast');
                  break;
                default:
                  element.classList.add('fadeInUp', 'animated-fast');
              }
              element.classList.remove('item-animate');
            }, 50);
          }, delay);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '-15% 0px'
    });

    animateBoxes.forEach(box => observer.observe(box));
    return () => observer.disconnect();
  };

  return observeAnimations;
};

// ==================== 4. GO TO TOP FUNCTIONALITY ====================
export const useGoToTop = () => {
  const initGoToTop = () => {
    const goToTopBtn = document.querySelector('.js-gotop');
    const topIndicator = document.querySelector('.js-top');
    
    // Smooth scroll to top
    const scrollToTop = (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    // Show/hide button based on scroll
    const handleScroll = () => {
      if (window.scrollY > 200) {
        topIndicator?.classList.add('active');
      } else {
        topIndicator?.classList.remove('active');
      }
    };

    goToTopBtn?.addEventListener('click', scrollToTop);
    window.addEventListener('scroll', handleScroll);

    return () => {
      goToTopBtn?.removeEventListener('click', scrollToTop);
      window.removeEventListener('scroll', handleScroll);
    };
  };

  return initGoToTop;
};

// ==================== 5. LOADING ANIMATION ====================
export const useLoader = (duration = 1000) => {
  const hideLoader = () => {
    const loader = document.querySelector('.fh5co-loader');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.5s ease-out';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }
  };

  const initLoader = () => {
    const timer = setTimeout(hideLoader, duration);
    return () => clearTimeout(timer);
  };

  return initLoader;
};

// ==================== 6. TIMELINE ANIMATIONS ====================
export const useTimelineAnimations = () => {
  const initTimeline = () => {
    const timelineItems = document.querySelectorAll('.timeline li');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('fadeInUp', 'animated-fast');
          }, index * 200);
        }
      });
    }, {
      threshold: 0.3
    });

    timelineItems.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  };

  return initTimeline;
};

// ==================== 7. WORK/PROJECT HOVER EFFECTS ====================
export const useWorkHoverEffects = () => {
  const initWorkHover = () => {
    const workItems = document.querySelectorAll('.work');
    
    workItems.forEach(item => {
      const desc = item.querySelector('.desc');
      
      const handleMouseEnter = () => {
        if (desc) {
          desc.style.transform = 'translateY(0)';
          desc.style.opacity = '1';
          desc.style.transition = 'all 0.3s ease';
        }
      };

      const handleMouseLeave = () => {
        if (desc) {
          desc.style.transform = 'translateY(20px)';
          desc.style.opacity = '0.8';
        }
      };

      item.addEventListener('mouseenter', handleMouseEnter);
      item.addEventListener('mouseleave', handleMouseLeave);
    });

    // Cleanup function
    return () => {
      workItems.forEach(item => {
        item.removeEventListener('mouseenter', () => {});
        item.removeEventListener('mouseleave', () => {});
      });
    };
  };

  return initWorkHover;
};

// ==================== 8. FORM ANIMATIONS ====================
export const useFormAnimations = () => {
  const initFormAnimations = () => {
    const formInputs = document.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
      const handleFocus = () => {
        input.style.transform = 'scale(1.02)';
        input.style.transition = 'transform 0.2s ease';
      };

      const handleBlur = () => {
        input.style.transform = 'scale(1)';
      };

      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
    });

    return () => {
      formInputs.forEach(input => {
        input.removeEventListener('focus', () => {});
        input.removeEventListener('blur', () => {});
      });
    };
  };

  return initFormAnimations;
};

// ==================== 9. MASTER ANIMATION CONTROLLER ====================
export const useAllEffects = () => {
  const initAllEffects = () => {
    const cleanupFunctions = [];

    // Initialize all effects
    cleanupFunctions.push(useFullHeight()());
    cleanupFunctions.push(useParallax()());
    cleanupFunctions.push(useWaypointAnimations()());
    cleanupFunctions.push(useGoToTop()());
    cleanupFunctions.push(useLoader()());
    cleanupFunctions.push(useTimelineAnimations()());
    cleanupFunctions.push(useWorkHoverEffects()());
    cleanupFunctions.push(useFormAnimations()());

    // Return cleanup function
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup && cleanup());
    };
  };

  return initAllEffects;
};

// ==================== 10. REACT HOOKS FOR INDIVIDUAL EFFECTS ====================
import { useEffect } from 'react';

export const useEffectHook = (effectFunction) => {
  useEffect(() => {
    const cleanup = effectFunction();
    return cleanup;
  }, []);
};

// Individual React hooks
export const useFullHeightEffect = () => useEffectHook(useFullHeight());
export const useParallaxEffect = () => useEffectHook(useParallax());
export const useWaypointEffect = () => useEffectHook(useWaypointAnimations());
export const useGoToTopEffect = () => useEffectHook(useGoToTop());
export const useLoaderEffect = (duration) => useEffectHook(() => useLoader(duration)());
export const useTimelineEffect = () => useEffectHook(useTimelineAnimations());
export const useWorkHoverEffect = () => useEffectHook(useWorkHoverEffects());
export const useFormEffect = () => useEffectHook(useFormAnimations());
export const useAllEffectsHook = () => useEffectHook(useAllEffects());