import React from 'react';
import { useParallaxEffect } from '../../utils/effects';

const SectionWrapper = ({ 
  id, 
  className = '', 
  children, 
  fullHeight = false, 
  backgroundImage = null,
  overlay = false 
}) => {
  useParallaxEffect();

  const sectionClass = fullHeight ? 'section-full' : 'section-padding';
  
  return (
    <section 
      id={id} 
      className={`${sectionClass} ${className}`}
      style={backgroundImage ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        position: 'relative'
      } : {}}
    >
      {overlay && <div className="overlay" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 1
      }} />}
      <div style={overlay ? { position: 'relative', zIndex: 2 } : {}}>
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;