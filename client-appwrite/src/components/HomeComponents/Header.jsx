import React, { useEffect, useRef } from 'react';
import { FaLinkedin, FaGithub, FaInstagram, FaArrowRight, FaCode, FaRocket, FaBrain } from 'react-icons/fa';
import { createParticleSystem, createTypewriterEffect, createEntranceAnimation } from '../../utils/animations';

const Header = () => {
  const heroRef = useRef(null);
  const particleContainerRef = useRef(null);
  const typewriterRef = useRef(null);

  useEffect(() => {
    // Initialize particle system
    if (particleContainerRef.current) {
      const particleSystem = createParticleSystem(particleContainerRef.current, {
        particleCount: 80,
        particleSize: { min: 1, max: 4 },
        speed: { min: 0.3, max: 1.5 },
        color: ['#00d9ff', '#9333ea', '#ffffff', '#64ffda'],
        opacity: { min: 0.2, max: 0.6 },
        connectionDistance: 120,
        showConnections: true
      });

      return () => particleSystem.destroy();
    }
  }, []);

  useEffect(() => {
    // Initialize typewriter effect
    if (typewriterRef.current) {
      const roles = [
        'Software Developer',
        'Data Science Enthusiast', 
        'AI Researcher',
        'Student',
        'Mentor',
      ];
      
      // Clear the element content first
      typewriterRef.current.textContent = '';
      
      createTypewriterEffect(typewriterRef.current, {
        words: roles, // Pass the array directly
        speed: 80,
        deleteSpeed: 80,
        pauseTime: 2000,
        loop: true,
        cursor: '|',
        showCursor: true,
        cursorBlink: false // Set to false for consistent cursor display
      });
    }
  }, []);

  useEffect(() => {
    // Entrance animations
    const elements = document.querySelectorAll('.hero-animate');
    createEntranceAnimation(elements, {
      type: 'slideUp',
      duration: 1000,
      stagger: 200,
      distance: 60
    });
  }, []);

  return (
    <header className="modern-hero" ref={heroRef}>
      {/* Particle Background */}
      <div className="particle-container" ref={particleContainerRef}></div>
      
      {/* Dynamic Background */}
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <div className="geometric-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="floating-icons">
            <div className="floating-icon icon-1"><FaCode /></div>
            <div className="floating-icon icon-2"><FaRocket /></div>
            <div className="floating-icon icon-3"><FaBrain /></div>
          </div>
        </div>
      </div>
      
      <div className="modern-container">
        <div className="hero-content">
          <div className="profile-section">
            <div className="profile-image-large hero-animate">
              <div className="image-container-hd">
                <img src="images/user-3.jpg" alt="Ali Ahammad" />
                <div className="profile-rings">
                  <div className="ring ring-1"></div>
                  <div className="ring ring-2"></div>
                  <div className="ring ring-3"></div>
                </div>
                <div className="glow-effect"></div>
                
                {/* Hover overlay effect */}
                <div className="image-overlay">
                    <img src="images/user-3.jpg" alt="Ali Ahammad" />
                </div>
              </div>
            </div>
            
            <div className="hero-text">
              <div className="hero-greeting hero-animate">
                <span className="greeting-text">Hello, I'm</span>
              </div>
              
              <h1 className="hero-title hero-animate">
                <span className="name-text">Ali Ahammad</span>
                <div className="title-decoration"></div>
              </h1>
              
              <div className="hero-subtitle hero-animate">
                <span className="role-prefix">I'm a </span>
                <span className="typing-text" ref={typewriterRef}></span>
              </div>
              
              <div className="hero-actions hero-animate">
                <a href="#fh5co-about" className="cta-button primary">
                  <span>More</span>
                  <FaArrowRight className="button-icon" />
                </a>
                <a href="#fh5co-consult" className="cta-button secondary">
                  <span>Get In Touch</span>
                </a>
              </div>
              
              <div className="social-links hero-animate">
                <a href="https://www.linkedin.com/in/ali-ahammad-li0812" className="social-link linkedin" title="LinkedIn">
                  <FaLinkedin />
                  <span className="social-tooltip">LinkedIn</span>
                </a>
                <a href="https://github.com/li812" className="social-link github" title="GitHub">
                  <FaGithub />
                  <span className="social-tooltip">GitHub</span>
                </a>
                <a href="https://www.instagram.com/the_raptor_rider_/" className="social-link instagram" title="Instagram">
                  <FaInstagram />
                  <span className="social-tooltip">Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .modern-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          background: linear-gradient(135deg, #0a0e27 0%, #1e1e2e 50%, #2d1b69 100%);
          overflow: hidden;
          color: white;
        }

        .particle-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('images/cover_bg_3.jpg') center/cover;
          z-index: 0;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(10, 14, 39, 0.9) 0%, rgba(30, 30, 46, 0.8) 50%, rgba(45, 27, 105, 0.9) 100%);
        }

        .geometric-shapes {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
        }

        .shape {
          position: absolute;
          background: linear-gradient(135deg, rgba(0, 217, 255, 0.1), rgba(147, 51, 234, 0.1));
          border-radius: 50%;
          animation: float 8s ease-in-out infinite;
        }

        .shape-1 {
          width: 300px;
          height: 300px;
          top: 10%;
          left: -10%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 200px;
          height: 200px;
          top: 60%;
          right: -5%;
          animation-delay: 2s;
        }

        .shape-3 {
          width: 150px;
          height: 150px;
          bottom: 20%;
          left: 20%;
          animation-delay: 4s;
        }

        .floating-icons {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .floating-icon {
          position: absolute;
          font-size: 2rem;
          color: rgba(0, 217, 255, 0.3);
          animation: iconFloat 6s ease-in-out infinite;
        }

        .icon-1 {
          top: 20%;
          right: 15%;
          animation-delay: 0s;
        }

        .icon-2 {
          top: 70%;
          left: 10%;
          animation-delay: 2s;
        }

        .icon-3 {
          bottom: 30%;
          right: 25%;
          animation-delay: 4s;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          width: 100%;
        }

        .profile-section {
          display: flex;
          align-items: center;
          gap: 27px; /* Exact 27px gap between image and content */
          flex-wrap: wrap;
        }

        .profile-image {
          position: relative;
          flex-shrink: 0;
          transform: translateY(-26px); /* Raise the image by 26px */
        }

        .image-container-hd {
          position: relative;
          width: 320px;
          height: 320px;
          cursor: pointer;
          transition: all 0.4s ease;
          top: -3rem;
left: -3rem;
        }

        .image-container-hd:hover {
          transform: scale(1.05);
        }

        .image-container-hd img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid rgba(0, 217, 255, 0.3);
          position: relative;
          z-index: 3;
          transition: all 0.4s ease;
        }

        .image-container-hd:hover img {
          border-color: rgba(0, 217, 255, 0.6);
          box-shadow: 0 0 40px rgba(0, 217, 255, 0.4);
        }

        .profile-rings {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .ring {
          position: absolute;
          border-radius: 50%;
          border: 2px solid;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.4s ease;
        }

        .image-container-hd:hover .ring {
          animation-play-state: paused;
        }

        .ring-1 {
          width: 360px;
          height: 360px;
          border-color: rgba(0, 217, 255, 0.4);
          animation: rotate 15s linear infinite;
        }

        .ring-2 {
          width: 400px;
          height: 400px;
          border-color: rgba(147, 51, 234, 0.3);
          animation: rotate 20s linear infinite reverse;
        }

        .ring-3 {
          width: 440px;
          height: 440px;
          border-color: rgba(100, 255, 218, 0.2);
          animation: rotate 25s linear infinite;
        }

        .glow-effect {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 340px;
          height: 340px;
          background: radial-gradient(circle, rgba(0, 217, 255, 0.2) 0%, transparent 70%);
          border-radius: 50%;
          animation: pulse 3s ease-in-out infinite;
          transition: all 0.4s ease;
        }

        .image-container-hd:hover .glow-effect {
          background: radial-gradient(circle, rgba(0, 217, 255, 0.4) 0%, transparent 70%);
          transform: translate(-50%, -50%) scale(1.1);
        }

        /* Image hover overlay effect */
        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0, 217, 255, 0.9), rgba(147, 51, 234, 0.9));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 4;
          backdrop-filter: blur(10px);
        }

        .image-container-hd:hover .image-overlay {
          opacity: 1;
        }

        .overlay-content {
          text-align: center;
          transform: translateY(20px);
          transition: all 0.4s ease;
        }

        .image-container-hd:hover .overlay-content {
          transform: translateY(0);
        }

        .overlay-text {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .overlay-subtitle {
          display: block;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
        }

        .hero-text {
          flex: 1;
          min-width: 300px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .hero-greeting {
          margin-bottom: 1rem;
        }

        .greeting-text {
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 400;
          letter-spacing: 0.1em;
          transition: all 0.3s ease;
        }

        .greeting-text:hover {
          color: rgba(0, 217, 255, 0.9);
          transform: translateX(5px);
        }

        .hero-title {
          font-size: clamp(3rem, 6vw, 5rem);
          font-weight: 800;
          margin-bottom: 1.5rem;
          line-height: 1.1;
          position: relative;
        }

        .name-text {
          background: linear-gradient(135deg, #00d9ff 0%, #9333ea 50%, #64ffda 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .name-text:hover {
          background: linear-gradient(135deg, #64ffda 0%, #00d9ff 50%, #9333ea 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          transform: translateY(-2px);
          text-shadow: 0 4px 8px rgba(0, 217, 255, 0.4);
        }

        .title-decoration {
          width: 100px;
          height: 4px;
          background: linear-gradient(90deg, #00d9ff, #9333ea);
          margin-top: 1rem;
          border-radius: 2px;
          position: relative;
        }

        .title-decoration::after {
          content: '';
          position: absolute;
          top: -2px;
          left: 0;
          width: 30px;
          height: 8px;
          background: #00d9ff;
          border-radius: 4px;
          box-shadow: 0 0 20px rgba(0, 217, 255, 0.6);
        }

        .hero-subtitle {
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          margin-bottom: 2rem;
          font-weight: 500;
          line-height: 1.3;
        }

        .role-prefix {
          color: rgba(255, 255, 255, 0.9);
        }

        .typing-text {
          background: linear-gradient(135deg, #00d9ff, #9333ea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 600;
        }

        .hero-description {
          font-size: 1.2rem;
          line-height: 1.7;
          margin-bottom: 3rem;
          color: rgba(255, 255, 255, 0.8);
          max-width: 600px;
        }

        .hero-actions {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          padding: 16px 32px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1.1rem;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
          letter-spacing: 0.5px;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: all 0.6s ease;
        }

        .cta-button:hover::before {
          left: 100%;
        }

        .cta-button.primary {
          background: linear-gradient(135deg, #00d9ff, #9333ea);
          color: white;
          border: none;
          box-shadow: 0 8px 25px rgba(0, 217, 255, 0.3);
        }

        .cta-button.primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(0, 217, 255, 0.4);
        }

        .cta-button.secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }

        .cta-button.secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(0, 217, 255, 0.5);
          transform: translateY(-3px);
        }

        .button-icon {
          transition: transform 0.3s ease;
        }

        .cta-button:hover .button-icon {
          transform: translateX(5px);
        }

        .social-links {
          display: flex;
          gap: 1.5rem;
        }

        .social-link {
          position: relative;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          border-radius: 20px;
          color: white;
          left: -10rem;
          text-decoration: none;
          font-size: 1.5rem;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .social-link.linkedin {
          background: linear-gradient(135deg, rgba(0, 119, 181, 0.8), rgba(0, 88, 133, 0.8));
        }

        .social-link.github {
          background: linear-gradient(135deg, rgba(51, 51, 51, 0.8), rgba(0, 0, 0, 0.8));
        }

        .social-link.instagram {
          background: linear-gradient(135deg, rgba(228, 64, 95, 0.8), rgba(131, 58, 180, 0.8));
        }

        .social-link:hover {
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }

        .social-tooltip {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 0.9rem;
          opacity: 0;
          transition: all 0.3s ease;
          pointer-events: none;
        }

        .social-link:hover .social-tooltip {
          opacity: 1;
          bottom: -45px;
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) scale(1);
          }
          50% { 
            transform: translateY(-30px) scale(1.05);
          }
        }

        @keyframes iconFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.6;
          }
        }

        @keyframes rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.2;
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.4;
          }
        }

        @media (max-width: 968px) {
          .profile-section {
            flex-direction: column;
            text-align: center;
            gap: 3rem;
          }

          .image-container-hd {
            width: 300px;
            height: 300px;
          }

          .ring-1 { width: 340px; height: 340px; }
          .ring-2 { width: 380px; height: 380px; }
          .ring-3 { width: 420px; height: 420px; }

          .hero-actions {
            justify-content: center;
          }

          .social-links {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .hero-actions {
            flex-direction: column;
            align-items: center;
          }

          .cta-button {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;