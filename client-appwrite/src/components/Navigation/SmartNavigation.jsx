import React, { useState, useEffect } from 'react';

const SmartNavigation = () => {
  const [activeSection, setActiveSection] = useState('fh5co-header');
  const [isScrolling, setIsScrolling] = useState(false);

  const sections = [
    { id: 'fh5co-header', label: 'Home', icon: '🏠' },
    { id: 'fh5co-about', label: 'About', icon: '👤' },
    { id: 'fh5co-resume', label: 'Experience', icon: '💼' },
    { id: 'fh5co-work', label: 'Projects', icon: '🚀' },
    { id: 'fh5co-blog', label: 'Blog', icon: '📝' },
    { id: 'fh5co-consult', label: 'Contact', icon: '📧' }
  ];

  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element && !isScrolling) {
      setIsScrolling(true);
      
      const targetPosition = element.offsetTop;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = Math.min(1000, Math.abs(distance) * 0.5); // Dynamic duration
      let start = null;

      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);
        
        // Easing function for smooth animation
        const easeInOutCubic = percentage < 0.5
          ? 4 * percentage * percentage * percentage
          : (percentage - 1) * (2 * percentage - 2) * (2 * percentage - 2) + 1;
        
        window.scrollTo(0, startPosition + distance * easeInOutCubic);
        
        if (progress < duration) {
          requestAnimationFrame(step);
        } else {
          setIsScrolling(false);
        }
      };
      
      requestAnimationFrame(step);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;
      
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolling]);

  return (
    <>
      {/* Side Navigation */}
      <nav style={{
        position: 'fixed',
        top: '50%',
        right: '20px',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        background: 'rgba(0,0,0,0.8)',
        borderRadius: '25px',
        padding: '15px 8px',
        backdropFilter: 'blur(10px)'
      }}>
        {sections.map((section) => (
          <div
            key={section.id}
            onClick={() => smoothScrollTo(section.id)}
            style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              margin: '12px 0',
              cursor: 'pointer',
              background: activeSection === section.id 
                ? 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)' 
                : 'rgba(255,255,255,0.3)',
              transition: 'all 0.3s ease',
              position: 'relative',
              transform: activeSection === section.id ? 'scale(1.3)' : 'scale(1)'
            }}
            title={section.label}
          />
        ))}
      </nav>

      {/* Bottom Quick Actions */}
      <div style={{
        position: 'fixed',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        display: 'flex',
        gap: '15px',
        background: 'rgba(0,0,0,0.8)',
        borderRadius: '50px',
        padding: '12px 20px',
        backdropFilter: 'blur(10px)'
      }}>
        {sections.slice(1, 5).map((section) => (
          <button
            key={section.id}
            onClick={() => smoothScrollTo(section.id)}
            style={{
              background: activeSection === section.id 
                ? 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)' 
                : 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '25px',
              padding: '10px 15px',
              color: 'white',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: activeSection === section.id ? 'bold' : 'normal'
            }}
          >
            <span style={{ marginRight: '8px' }}>{section.icon}</span>
            {section.label}
          </button>
        ))}
      </div>

      {/* Progress Indicator */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`,
        height: '3px',
        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
        zIndex: 1001,
        transition: 'width 0.1s ease'
      }} />
    </>
  );
};

export default SmartNavigation;