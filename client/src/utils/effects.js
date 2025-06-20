import { useEffect } from 'react';

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
    if (!isMobile.any()) {
      window.addEventListener('scroll', handleParallax);
      return () => window.removeEventListener('scroll', handleParallax);
    }
    return () => {};
  };

  return initParallax;
};

// ==================== 3. ENHANCED WAYPOINT ANIMATIONS ====================
export const useWaypointAnimations = () => {
  const observeAnimations = () => {
    const animateBoxes = document.querySelectorAll('.animate-box');
    let animationIndex = 0;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated-fast')) {
          const element = entry.target;
          const effect = element.dataset.animateEffect || 'fadeInUp';
          
          // Add staggered animation delay like original
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
                case 'fadeInUp':
                default:
                  element.classList.add('fadeInUp', 'animated-fast');
              }
              element.classList.remove('item-animate');
            }, 50);
          }, animationIndex * 100);
          
          animationIndex++;
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
    
    // Smooth scroll to top with easing (matching original)
    const scrollToTop = (e) => {
      e.preventDefault();
      
      const startPosition = window.pageYOffset;
      const startTime = performance.now();
      const duration = 500;
      
      // Easing function to match jQuery's easeInOutExpo
      const easeInOutExpo = (t) => {
        if (t === 0) return 0;
        if (t === 1) return 1;
        if (t < 0.5) {
          return Math.pow(2, 20 * t - 10) / 2;
        }
        return (2 - Math.pow(2, -20 * t + 10)) / 2;
      };
      
      const animateScroll = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = easeInOutExpo(progress);
        
        window.scrollTo(0, startPosition * (1 - easeProgress));
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };
      
      requestAnimationFrame(animateScroll);
    };

    // Show/hide button based on scroll (matching original)
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

// ==================== 5. ENHANCED LOADING ANIMATION ====================
export const useLoader = (duration = 500) => {
  const hideLoader = () => {
    const loader = document.querySelector('.fh5co-loader');
    if (loader) {
      // Fadeout effect matching jQuery's fadeOut("slow")
      loader.style.opacity = '1';
      loader.style.transition = 'opacity 0.6s ease-out';
      
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.style.display = 'none';
        }, 600);
      }, 100);
    }
  };

  const initLoader = () => {
    const timer = setTimeout(hideLoader, duration);
    return () => clearTimeout(timer);
  };

  return initLoader;
};

// ==================== 6. ENHANCED TIMELINE ANIMATIONS ====================
export const useTimelineAnimations = () => {
  const initTimeline = () => {
    const timelineItems = document.querySelectorAll('.timeline li.animate-box');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated-fast')) {
          // Staggered animation matching original
          setTimeout(() => {
            entry.target.classList.add('fadeInUp', 'animated-fast');
          }, index * 200);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-10% 0px'
    });

    timelineItems.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  };

  return initTimeline;
};

// ==================== 7. ENHANCED WORK/PROJECT HOVER EFFECTS ====================
export const useWorkHoverEffects = () => {
  const initWorkHover = () => {
    const workItems = document.querySelectorAll('.work');
    
    workItems.forEach(item => {
      const desc = item.querySelector('.desc');
      
      if (desc) {
        // Set initial state
        desc.style.opacity = '0';
        desc.style.transform = 'translateY(15px)';
        desc.style.transition = 'all 0.3s ease';
      }
      
      const handleMouseEnter = () => {
        if (desc) {
          desc.style.transform = 'translateY(0)';
          desc.style.opacity = '1';
        }
      };

      const handleMouseLeave = () => {
        if (desc) {
          desc.style.transform = 'translateY(15px)';
          desc.style.opacity = '0';
        }
      };

      item.addEventListener('mouseenter', handleMouseEnter);
      item.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      workItems.forEach(item => {
        item.removeEventListener('mouseenter', () => {});
        item.removeEventListener('mouseleave', () => {});
      });
    };
  };

  return initWorkHover;
};

// ==================== 8. ENHANCED FORM ANIMATIONS ====================
export const useFormAnimations = () => {
  const initFormAnimations = () => {
    const formInputs = document.querySelectorAll('#fh5co-consult input, #fh5co-consult textarea');
    
    formInputs.forEach(input => {
      const handleFocus = () => {
        input.style.transform = 'scale(1.02)';
        input.style.transition = 'transform 0.2s ease';
        input.style.borderColor = 'rgba(0,0,0,.8)';
      };

      const handleBlur = () => {
        input.style.transform = 'scale(1)';
        input.style.borderColor = 'rgba(0,0,0,.1)';
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

// ==================== 9. BLOG HOVER EFFECTS ====================
export const useBlogHoverEffects = () => {
  const initBlogHover = () => {
    const blogItems = document.querySelectorAll('.fh5co-blog');
    
    blogItems.forEach(item => {
      const handleMouseEnter = () => {
        item.style.transform = 'translateY(-5px)';
        item.style.transition = 'transform 0.3s ease';
        item.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
      };

      const handleMouseLeave = () => {
        item.style.transform = 'translateY(0)';
        item.style.boxShadow = 'none';
      };

      item.addEventListener('mouseenter', handleMouseEnter);
      item.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      blogItems.forEach(item => {
        item.removeEventListener('mouseenter', () => {});
        item.removeEventListener('mouseleave', () => {});
      });
    };
  };

  return initBlogHover;
};

// ==================== 10. MASTER ANIMATION CONTROLLER ====================
export const useAllEffects = () => {
  const initAllEffects = () => {
    const cleanupFunctions = [];

    // Initialize all effects in the correct order
    cleanupFunctions.push(useFullHeight()());
    cleanupFunctions.push(useParallax()());
    cleanupFunctions.push(useWaypointAnimations()());
    cleanupFunctions.push(useGoToTop()());
    cleanupFunctions.push(useLoader()());
    cleanupFunctions.push(useTimelineAnimations()());
    cleanupFunctions.push(useWorkHoverEffects()());
    cleanupFunctions.push(useFormAnimations()());
    cleanupFunctions.push(useBlogHoverEffects()());

    // Return cleanup function
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup && cleanup());
    };
  };

  return initAllEffects;
};

// ==================== 11. REACT HOOKS FOR INDIVIDUAL EFFECTS ====================
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
export const useBlogHoverEffect = () => useEffectHook(useBlogHoverEffects());
export const useAllEffectsHook = () => useEffectHook(useAllEffects());