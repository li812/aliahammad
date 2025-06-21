import React from 'react';

const Header = () => {
  return (
    <header className="modern-hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <div className="floating-elements">
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
        </div>
      </div>
      
      <div className="modern-container">
        <div className="hero-content">
          <div className="profile-section">
            <div className="profile-image">
              <img src="images/user-3.jpg" alt="Ali Ahammad" />
              <div className="profile-ring"></div>
            </div>
            
            <div className="hero-text">
              <h1 className="hero-title">
                Hi, I'm <span className="gradient-text">Ali Ahammad</span><span className="cursor">|</span>
              </h1>
              
              <div className="hero-subtitle">
                <span className="typing-text">Software Developer / Data Science Enthusiast / AI Researcher / Student <span className="cursor">|</span></span>
                
              </div>
              
              {/* <p className="hero-description">
                Full Stack Developer passionate about leveraging cutting-edge AI and machine learning 
                to solve complex problems and drive innovation in data science.<span className="cursor">|</span>
              </p> */}
              
              <div className="hero-actions">
                <a href="#fh5co-about" className="modern-btn primary">
                  Explore My Work
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 12h14m-7-7l7 7-7 7"/>
                  </svg>
                </a>
                <a href="#fh5co-consult" className="modern-btn secondary">
                  Get In Touch
                </a>
              </div>
              
              <div className="social-links">
                <a href="https://www.linkedin.com/in/ali-ahammad-li0812" className="social-link" title="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://github.com/li812" className="social-link" title="GitHub">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/the_raptor_rider_/" className="social-link" title="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
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
          background: linear-gradient(135deg, rgb(0, 217, 255) 0%, rgb(0, 180, 216) 100%);
          overflow: hidden;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('images/cover_bg_3.jpg') center/cover;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0, 217, 255, 0.85) 0%, rgba(0, 180, 216, 0.85) 100%);
        }

        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .floating-element {
          position: absolute;
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }

        .floating-element:nth-child(1) {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .floating-element:nth-child(2) {
          top: 60%;
          right: 15%;
          animation-delay: 2s;
        }

        .floating-element:nth-child(3) {
          bottom: 20%;
          left: 20%;
          animation-delay: 4s;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          color: white;
        }

        .profile-section {
          display: flex;
          align-items: center;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .profile-image {
          position: relative;
          flex-shrink: 0;
        }

        .profile-image img {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid rgba(255, 255, 255, 0.3);
        }

        .profile-ring {
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          animation: rotate 10s linear infinite;
        }

        .hero-text {
          flex: 1;
          min-width: 300px;
        }

        .hero-title {
          font-size: clamp(var(--font-size-4xl), 5vw, var(--font-size-6xl));
          font-weight: 700;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .gradient-text {
          background: linear-gradient(45deg, #fff, #f0f0f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: clamp(var(--font-size-xl), 2vw, var(--font-size-3xl));
          margin-bottom: 1.5rem;
          color: rgba(255, 255, 255, 0.95);
          font-weight: 500;
        }

        .typing-text {
          display: inline-block;
        }

        .cursor {
          animation: blink 1s infinite;
        }

        .hero-description {
          font-size: var(--font-size-xl);
          line-height: 1.6;
          margin-bottom: 2rem;
          color: rgba(255, 255, 255, 0.9);
          max-width: 600px;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .modern-btn.primary {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .modern-btn.primary:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .modern-btn.secondary {
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .modern-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          color: white;
          text-decoration: none;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .social-link:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @media (max-width: 768px) {
          .profile-section {
            flex-direction: column;
            text-align: center;
            gap: 2rem;
          }

          .hero-actions {
            justify-content: center;
          }

          .social-links {
            justify-content: center;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;