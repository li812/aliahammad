import React, { useEffect, useRef, useState } from 'react';
import {
  FaHeart,
  FaCode,
  FaRocket,
  FaBrain,
  FaDatabase,
  FaCloud,
  FaMapMarkerAlt
} from 'react-icons/fa';
import {
  SiReact,
  SiAppwrite
} from 'react-icons/si';
import {
  createAdvancedObserver,
  createParticleSystem
} from '../../utils/animations';

const Footer = () => {
  const footerRef = useRef(null);
  const particleContainerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Initialize particle system
    if (particleContainerRef.current) {
      const particleSystem = createParticleSystem(particleContainerRef.current, {
        particleCount: 40,
        particleSize: { min: 1, max: 2 },
        speed: { min: 0.2, max: 0.5 },
        color: ['#00d9ff', '#9333ea', '#64ffda'],
        opacity: { min: 0.2, max: 0.5 },
        connectionDistance: 60,
        showConnections: true
      });

      return () => particleSystem.destroy();
    }
  }, []);

  useEffect(() => {
    // Intersection observer for animations
    const observer = createAdvancedObserver((element) => {
      element.classList.add('animate-in');
    }, {
      threshold: 0.1,
      rootMargin: '-50px 0px'
    });

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="modern-footer" ref={footerRef}>
      {/* Particle Background */}
      <div className="particle-container" ref={particleContainerRef}></div>

      <div className="modern-container">
        {/* Footer Content */}
        <div className="footer-content" ref={contentRef}>
          {/* Left Side - Copyright & Attribution */}
          <div className="footer-left">
            <p className="copyright-text">
              © 2025 Ali Ahammad. All rights reserved.
            </p>
            <div className="attribution">
              <span>Designed & Developed by </span>
              <a href="https://www.aliahammad.com" target="_blank" rel="noopener noreferrer">
                Ali Ahammad
              </a>
              <span> in </span>
              <span className="location">
                <FaMapMarkerAlt className="location-icon" />
                Kerala, India
              </span>
              
            </div>
          </div>

          {/* Right Side - Tech Stack */}
          <div className="footer-right">
            <div className="tech-stack">
              <span>Built with </span>
              <div className="tech-icons">
                <div className="tech-item">
                  <SiReact className="tech-icon react-icon" />
                  <span>React</span>
                </div>
                <span className="divider">&</span>
                <div className="tech-item">
                  <SiAppwrite className="tech-icon appwrite-icon" />
                  <span>Appwrite</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Tech Elements */}
        <div className="floating-elements">
          <div className="tech-float tech-1"><FaCode /></div>
          <div className="tech-float tech-2"><FaBrain /></div>
          <div className="tech-float tech-3"><FaRocket /></div>
          <div className="tech-float tech-4"><FaDatabase /></div>
          <div className="tech-float tech-5"><FaCloud /></div>
        </div>
      </div>

      <style jsx>{`
        .modern-footer {
          position: relative;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          overflow: hidden;
          padding: 40px 0;
          color: white;
        }

        .modern-footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 30%, rgba(0, 217, 255, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(245, 158, 11, 0.03) 0%, transparent 50%);
          pointer-events: none;
        }

        .particle-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .modern-container {
          width: 100%;
          padding: 0 20px;
          position: relative;
          z-index: 2;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          max-width: 1900px;
          width: 100%;
        }

        .footer-content.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .footer-left {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-right: auto;
        }

        .footer-right {
          display: flex;
          align-items: center;
          margin-left: auto;
        }

        .copyright-text {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          margin: 0;
          letter-spacing: 0.3px;
        }

        .attribution {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.4;
        }

        .attribution a {
          color: #00d9ff;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          position: relative;
        }

        .attribution a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #00d9ff, #9333ea);
          transition: width 0.3s ease;
        }

        .attribution a:hover {
          color: #64ffda;
          transform: translateY(-1px);
        }

        .attribution a:hover::after {
          width: 100%;
        }

        .location {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          color: #64ffda;
          font-weight: 500;
        }

        .location-icon {
          font-size: 0.8rem;
          color: #64ffda;
        }

        .heart-icon {
          color: #ef4444;
          font-size: 0.9rem;
          animation: heartbeat 2s ease-in-out infinite;
          margin-left: 0.3rem;
        }

        .tech-stack {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.8);
          padding: 12px 20px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 30px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .tech-stack:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(0, 217, 255, 0.3);
          transform: translateY(-2px);
        }

        .tech-icons {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .tech-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .tech-item:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px) scale(1.05);
        }

        .tech-icon {
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }

        .react-icon {
          color: #61dafb;
        }

        .appwrite-icon {
          color: #fd366e;
        }

        .tech-item:hover .tech-icon {
          transform: scale(1.2);
        }

        .tech-item span {
          font-weight: 600;
          font-size: 0.85rem;
          color: white;
        }

        .divider {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 300;
        }

        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1;
        }

        .tech-float {
          position: absolute;
          font-size: 1.5rem;
          color: rgba(0, 217, 255, 0.15);
          animation: techFloat 8s ease-in-out infinite;
        }

        .tech-1 {
          top: 20%;
          right: 10%;
          animation-delay: 0s;
        }

        .tech-2 {
          top: 60%;
          left: 8%;
          animation-delay: 2s;
        }

        .tech-3 {
          bottom: 40%;
          right: 15%;
          animation-delay: 4s;
        }

        .tech-4 {
          top: 70%;
          left: 20%;
          animation-delay: 6s;
        }

        .tech-5 {
          bottom: 20%;
          left: 50%;
          animation-delay: 8s;
        }

        /* Animations */
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.1); }
          50% { transform: scale(1); }
          75% { transform: scale(1.05); }
        }

        @keyframes techFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
            opacity: 0.15;
          }
          25% { 
            transform: translateY(-8px) rotate(90deg);
            opacity: 0.25;
          }
          50% { 
            transform: translateY(-4px) rotate(180deg);
            opacity: 0.2;
          }
          75% { 
            transform: translateY(-12px) rotate(270deg);
            opacity: 0.3;
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .modern-footer {
            padding: 30px 0;
          }

          .footer-content {
            flex-direction: column;
            gap: 1.5rem;
            text-align: center;
          }

          .footer-left {
            order: 2;
            margin-right: 0;
          }

          .footer-right {
            order: 1;
            margin-left: 0;
          }

          .attribution {
            justify-content: center;
            flex-wrap: wrap;
          }

          .tech-stack {
            padding: 10px 16px;
            font-size: 0.9rem;
          }

          .tech-icons {
            gap: 0.6rem;
          }

          .tech-item {
            padding: 5px 10px;
          }

          .floating-elements {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .copyright-text {
            font-size: 0.9rem;
          }

          .attribution {
            font-size: 0.8rem;
            flex-direction: column;
            gap: 0.3rem;
          }

          .tech-stack {
            flex-direction: column;
            gap: 0.6rem;
            padding: 12px 16px;
          }

          .tech-icons {
            gap: 0.5rem;
          }

          .tech-item {
            padding: 4px 8px;
          }

          .tech-icon {
            font-size: 1rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;