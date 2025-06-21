import React, { useEffect, useRef } from 'react';
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaCode,
  FaRocket,
  FaBrain,
  FaLightbulb
} from 'react-icons/fa';

const About = () => {
  const aboutRef = useRef(null);
  const cardRefs = useRef([]);
  const headerRef = useRef(null); // Add this missing ref

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, index * 200);
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px 0px' }
    );

    // Add header to observer
    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    cardRefs.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="fh5co-about" className="about-section" ref={aboutRef}>
      <div className="modern-container">
        <div className="section-header" ref={headerRef}>
          <h2 className="section-title">About Me</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            Tech enthusiast crafting digital solutions with passion and precision
          </p>
        </div>

        <div className="about-grid">
          {/* Personal Info Card */}
          <div
            className="info-card"
            ref={el => cardRefs.current[0] = el}
          >
            <div className="card-header">
              <div className="profile-section">
                <div className="profile-image">
                  <img src="images/user-3.jpg" alt="Ali Ahammad" />
                  <div className="status-dot"></div>
                </div>
                <div className="profile-info">
                  <h3>Ali Ahammad</h3>
                  <p>Full Stack Developer & AI Researcher</p>
                </div>
              </div>
            </div>

            <div className="info-content">
              {[
                { icon: <FaUser />, label: "Full Name", value: "Ali Ahammad" },
                { icon: <FaPhone />, label: "Phone", value: "+91 9895850894" },
                { icon: <FaEnvelope />, label: "Email", value: "mail@aliahammad.com" },
                { icon: <FaGlobe />, label: "Website", value: "www.aliahammad.com" },
                { icon: <FaMapMarkerAlt />, label: "Location", value: "Kollam, Kerala, India" }
              ].map((item, index) => (
                <div key={index} className="info-item" style={{ '--delay': `${index * 0.1}s` }}>
                  <div className="info-icon">{item.icon}</div>
                  <div className="info-details">
                    <span className="info-label">{item.label}</span>
                    <span className="info-value">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="social-links">
              <a href="https://www.linkedin.com/in/ali-ahammad-li0812" className="social-link linkedin">
                <FaLinkedin />
              </a>
              <a href="https://github.com/li812" className="social-link github">
                <FaGithub />
              </a>
              <a href="https://www.instagram.com/the_raptor_rider_/" className="social-link instagram">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Bio Card */}
          <div
            className="bio-card"
            ref={el => cardRefs.current[1] = el}
          >
            <div className="bio-header">
              <div className="bio-icon">
                <FaCode />
              </div>
              <div className="bio-title">
                <h3>Hello There!</h3>
                <p>My journey in technology</p>
              </div>
            </div>

            <div className="bio-content">
              <p>
                I am a <span className="highlight">Data Science Enthusiast</span>, <span className="highlight">AI Researcher</span>, and dedicated student currently pursuing a Masters in Computer Application. With a robust background in developing cutting-edge machine learning models for predictive analytics, computer vision, and natural language processing (NLP), I bring a wealth of experience to any project.
              </p>
              <p>
                Throughout my professional journey, I have demonstrated proficiency in data collection, preprocessing, and analysis garnered from diverse sources, including Marine Automation Systems and Aerial Data Sources. My expertise extends to the realm of <span className="highlight">Full Stack Development</span>, where I have adeptly designed, developed, and deployed websites utilizing technologies such as the Laravel framework.
              </p>
              <p>
                Driven by an unwavering passion for leveraging technology to solve intricate problems and foster innovation, I am committed to making meaningful contributions in every endeavor I undertake.
              </p>

              <div className="stats-container">
                <div className="stat-item">
                  <div className="stat-number">5+</div>
                  <div className="stat-label">Years Experience</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">30+</div>
                  <div className="stat-label">Projects Completed</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">20+</div>
                  <div className="stat-label">Technologies</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Tech Elements */}
        <div className="floating-elements">
          <div className="tech-float tech-1"><FaRocket /></div>
          <div className="tech-float tech-2"><FaBrain /></div>
          <div className="tech-float tech-3"><FaCode /></div>
          <div className="tech-float tech-4"><FaLightbulb /></div>
        </div>
      </div>

      <style jsx>{`
        .about-section {
          position: relative;
          background: linear-gradient(135deg, #0a0e27 0%, #1e1e2e 50%, #2d1b69 100%);
          overflow: hidden;
          padding: 100px 0;
          color: white;
        }

        .about-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 30%, rgba(0, 217, 255, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.1) 0%, transparent 40%);
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

        .section-header {
          text-align: center;
          margin-bottom: 80px;
          position: relative;
          z-index: 2;
          opacity: 0;
          transform: translateY(50px);
          transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .section-header.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .header-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.5rem;
          background: rgba(0, 217, 255, 0.1);
          border: 1px solid rgba(0, 217, 255, 0.3);
          border-radius: 50px;
          color: #00d9ff;
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
          animation: badgePulse 3s ease-in-out infinite;
        }

        .badge-icon {
          font-size: 1.2rem;
          animation: badgeRotate 4s ease-in-out infinite;
        }

        .section-title {
          font-size: clamp(3rem, 6vw, 5rem);
          font-weight: 900;
          background: linear-gradient(135deg, #00d9ff 0%, #9333ea 50%, #64ffda 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .title-underline {
          width: 150px;
          height: 6px;
          background: linear-gradient(90deg, #00d9ff, #9333ea, #64ffda);
          margin: 0 auto 2rem;
          border-radius: 3px;
          position: relative;
          animation: shimmer 3s ease-in-out infinite;
        }

        .title-underline::after {
          content: '';
          position: absolute;
          top: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 18px;
          background: #00d9ff;
          border-radius: 9px;
          box-shadow: 0 0 30px rgba(0, 217, 255, 0.7);
          animation: pulse 2s ease-in-out infinite;
        }

        .section-subtitle {
          font-size: 1.4rem;
          color: rgba(255, 255, 255, 0.8);
          max-width: 700px;
          margin: 0 auto 3rem;
          line-height: 1.6;
          font-weight: 400;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 400px 1fr;
          gap: 3rem;
          position: relative;
          z-index: 2;
        }

        .info-card, .bio-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 0;
          overflow: hidden;
          opacity: 0;
          transform: translateY(50px) scale(0.95);
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .info-card.animate-in, .bio-card.animate-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .info-card:hover, .bio-card:hover {
          transform: translateY(-10px);
          box-shadow: 
            0 30px 60px rgba(0, 0, 0, 0.4),
            0 0 40px rgba(0, 217, 255, 0.2);
          border-color: rgba(0, 217, 255, 0.3);
        }

        .card-header {
          padding: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .profile-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .profile-image {
          position: relative;
          width: 80px;
          height: 80px;
          border-radius: 20px;
          overflow: hidden;
          border: 3px solid rgba(0, 217, 255, 0.3);
        }

        .profile-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .status-dot {
          position: absolute;
          bottom: 4px;
          right: 4px;
          width: 16px;
          height: 16px;
          background: #10b981;
          border: 3px solid rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .profile-info h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 0.25rem 0;
          background: linear-gradient(135deg, #00d9ff, #9333ea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .profile-info p {
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
          font-size: 0.9rem;
        }

        .info-content {
          padding: 1.5rem 2rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-radius: 12px;
          margin-bottom: 0.5rem;
          transition: all 0.3s ease;
          animation: slideInLeft 0.6s ease-out;
          animation-delay: var(--delay);
          animation-fill-mode: both;
          cursor: pointer;
        }

        .info-item:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateX(10px);
        }

        .info-icon {
          width: 45px;
          height: 45px;
          background: linear-gradient(135deg, rgba(0, 217, 255, 0.2), rgba(147, 51, 234, 0.2));
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #00d9ff;
          font-size: 1.2rem;
          border: 1px solid rgba(0, 217, 255, 0.3);
        }

        .info-details {
          flex: 1;
        }

        .info-label {
          display: block;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 0.25rem;
          font-weight: 500;
        }

        .info-value {
          display: block;
          font-size: 1rem;
          color: white;
          font-weight: 600;
        }

        .social-links {
          display: flex;
          gap: 1rem;
          padding: 1.5rem 2rem 2rem;
          justify-content: center;
        }

        .social-link {
          width: 50px;
          height: 50px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-size: 1.2rem;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .social-link.linkedin {
          background: linear-gradient(135deg, #0077b5, #005885);
        }

        .social-link.github {
          background: linear-gradient(135deg, #333, #000);
        }

        .social-link.instagram {
          background: linear-gradient(135deg, #e4405f, #833ab4);
        }

        .social-link:hover {
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }

        .bio-header {
          padding: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .bio-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #00d9ff, #9333ea);
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          animation: iconPulse 3s ease-in-out infinite;
        }

        .bio-title h3 {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0 0 0.25rem 0;
          background: linear-gradient(135deg, #00d9ff, #9333ea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .bio-title p {
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
          font-size: 0.95rem;
        }

        .bio-content {
          padding: 2rem;
        }

        .bio-content p {
          font-size: 1rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.96);
          margin-bottom: 1.5rem;
        }

        .highlight {
          background: linear-gradient(135deg, #00d9ff, #9333ea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 600;
          position: relative;
        }

        .stats-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin: 3rem 0;
        }

        .stat-item {
          text-align: center;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .stat-item:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-5px);
          border-color: rgba(0, 217, 255, 0.3);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #00d9ff, #9333ea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          font-weight: 500;
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
          font-size: 2rem;
          color: rgba(0, 217, 255, 0.2);
          animation: techFloat 8s ease-in-out infinite;
        }

        .tech-1 {
          top: 15%;
          right: 10%;
          animation-delay: 0s;
        }

        .tech-2 {
          top: 60%;
          left: 5%;
          animation-delay: 2s;
        }

        .tech-3 {
          bottom: 20%;
          right: 15%;
          animation-delay: 4s;
        }

        .tech-4 {
          top: 40%;
          left: 85%;
          animation-delay: 6s;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes iconPulse {
          0%, 100% { 
            transform: scale(1) rotate(0deg);
            box-shadow: 0 0 20px rgba(0, 217, 255, 0.3);
          }
          50% { 
            transform: scale(1.1) rotate(5deg);
            box-shadow: 0 0 30px rgba(0, 217, 255, 0.5);
          }
        }

        @keyframes shimmer {
          0%, 100% { 
            transform: scaleX(1);
            opacity: 1;
          }
          50% { 
            transform: scaleX(1.1);
            opacity: 0.8;
          }
        }

        @keyframes techFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
            opacity: 0.2;
          }
          25% { 
            transform: translateY(-20px) rotate(90deg);
            opacity: 0.4;
          }
          50% { 
            transform: translateY(-10px) rotate(180deg);
            opacity: 0.3;
          }
          75% { 
            transform: translateY(-30px) rotate(270deg);
            opacity: 0.5;
          }
        }

        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .stats-container {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .profile-section {
            flex-direction: column;
            text-align: center;
          }

          .bio-header {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
};

export default About;