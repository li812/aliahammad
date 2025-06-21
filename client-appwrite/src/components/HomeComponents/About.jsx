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
  FaHandPaper,
  FaLaptopCode,
  FaRocket,
  FaBolt,
  FaBullseye
} from 'react-icons/fa';

const About = () => {
  const aboutRef = useRef(null);
  const cardRefs = useRef([]);

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

    cardRefs.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="fh5co-about" className="modern-section about-section" ref={aboutRef}>
      <div className="modern-container">
        <div className="section-header text-center">
          <h2 className="modern-heading">About Me</h2>
          <div className="heading-underline"></div>
        </div>

        <div className="about-content">
          <div className="about-grid">
            {/* Personal Info Card */}
            <div 
              className="info-card glass-card"
              ref={el => cardRefs.current[0] = el}
            >
              <div className="card-header">
                <div className="profile-mini">
                  <img src="images/user-3.jpg" alt="Ali Ahammad" />
                  <div className="status-indicator"></div>
                </div>
                <div className="card-title">
                  <h3>Personal Information</h3>
                  <p>Get to know me better</p>
                </div>
              </div>
              
              <div className="info-list">
                {[
                  { icon: <FaUser />, label: "Full Name", value: "Ali Ahammad" },
                  { icon: <FaPhone />, label: "Phone", value: "+91 9895850894" },
                  { icon: <FaEnvelope />, label: "Email", value: "mail@aliahammad.com" },
                  { icon: <FaGlobe />, label: "Website", value: "www.aliahammad.com" },
                  { icon: <FaMapMarkerAlt />, label: "Address", value: "Kollam, Kerala, India" }
                ].map((item, index) => (
                  <div key={index} className="info-item" style={{ '--delay': `${index * 0.1}s` }}>
                    <span className="info-icon">{item.icon}</span>
                    <div className="info-content">
                      <span className="info-label">{item.label}</span>
                      <span className="info-value">{item.value}</span>
                    </div>
                    <div className="hover-effect"></div>
                  </div>
                ))}
              </div>

              <div className="card-footer">
                <div className="social-preview">
                  <a href="https://www.linkedin.com/in/ali-ahammad-li0812" className="social-mini">
                    <FaLinkedin size={16} />
                  </a>
                  <a href="https://github.com/li812" className="social-mini">
                    <FaGithub size={16} />
                  </a>
                  <a href="https://www.instagram.com/the_raptor_rider_/" className="social-mini">
                    <FaInstagram size={16} />
                  </a>
                </div>
              </div>
            </div>

            {/* Bio Card */}
            <div 
              className="bio-card glass-card"
              ref={el => cardRefs.current[1] = el}
            >
              <div className="card-header">
                <div className="bio-icon">
                  <div className="icon-wrapper">
                    <FaHandPaper size={24} />
                  </div>
                </div>
                <div className="card-title">
                  <h3>Hello There!</h3>
                  <p>My journey in tech</p>
                </div>
              </div>

              <div className="bio-content">
                <div className="bio-text">
                  <p className="modern-text">
                    I am a <span className="highlight">Data Science Enthusiast</span>, <span className="highlight">AI Researcher</span>, and dedicated student currently pursuing a Masters in Computer Application. With a robust background in developing cutting-edge machine learning models for predictive analytics, computer vision, and natural language processing (NLP), I bring a wealth of experience to any project.
                  </p>
                  <p className="modern-text">
                    Throughout my professional journey, I have demonstrated proficiency in data collection, preprocessing, and analysis garnered from diverse sources, including Marine Automation Systems and Aerial Data Sources. My expertise extends to the realm of <span className="highlight">Full Stack Development</span>, where I have adeptly designed, developed, and deployed websites utilizing technologies such as the Laravel framework.
                  </p>
                  <p className="modern-text">
                    Driven by an unwavering passion for leveraging technology to solve intricate problems and foster innovation, I am committed to making meaningful contributions in every endeavor I undertake.
                  </p>
                </div>

                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-number">5+</div>
                    <div className="stat-label">Years Experience</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">20+</div>
                    <div className="stat-label">Projects Completed</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">10+</div>
                    <div className="stat-label">Technologies</div>
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <button className="cta-button">
                  <span>View My Resume</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="floating-decorations">
            <div className="float-element element-1">
              <FaLaptopCode size={40} />
            </div>
            <div className="float-element element-2">
              <FaRocket size={40} />
            </div>
            <div className="float-element element-3">
              <FaBolt size={40} />
            </div>
            <div className="float-element element-4">
              <FaBullseye size={40} />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-section {
          position: relative;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          overflow: hidden;
        }

        .about-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300d9ff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }

        .section-header {
          margin-bottom: 6rem;
          position: relative;
        }

        .heading-underline {
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-color), var(--primary-dark));
          margin: 1rem auto;
          border-radius: 2px;
          position: relative;
        }

        .heading-underline::after {
          content: '';
          position: absolute;
          top: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 12px;
          height: 8px;
          background: var(--primary-color);
          border-radius: 4px;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 400px 1fr;
          gap: 3rem;
          align-items: start;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          padding: 0;
          overflow: hidden;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.05);
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          opacity: 0;
          transform: translateY(50px);
        }

        .glass-card.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .glass-card:hover {
          transform: translateY(-8px);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(0, 217, 255, 0.1);
        }

        .card-header {
          padding: 2rem 2rem 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .profile-mini {
          position: relative;
          width: 60px;
          height: 60px;
          border-radius: 16px;
          overflow: hidden;
          border: 3px solid rgba(0, 217, 255, 0.2);
        }

        .profile-mini img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .status-indicator {
          position: absolute;
          bottom: 4px;
          right: 4px;
          width: 12px;
          height: 12px;
          background: #10b981;
          border: 2px solid white;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .bio-icon {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-wrapper {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          animation: iconFloat 3s ease-in-out infinite;
        }

        .card-title h3 {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-bold);
          color: var(--text-primary);
          margin: 0;
        }

        .card-title p {
          color: var(--text-secondary);
          margin: 0.25rem 0 0 0;
          font-size: var(--font-size-sm);
        }

        .info-list {
          padding: 1rem 2rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          margin: 0.5rem 0;
          border-radius: 12px;
          position: relative;
          cursor: pointer;
          transition: all 0.3s ease;
          animation: slideInLeft 0.6s ease-out;
          animation-delay: var(--delay);
          animation-fill-mode: both;
        }

        .info-item:hover {
          background: rgba(0, 217, 255, 0.05);
          transform: translateX(8px);
        }

        .info-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, rgba(0, 217, 255, 0.1), rgba(0, 180, 216, 0.1));
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-color);
          flex-shrink: 0;
          font-size: 1.2rem;
        }

        .info-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .info-label {
          font-weight: var(--font-weight-medium);
          color: var(--text-secondary);
          font-size: var(--font-size-sm);
        }

        .info-value {
          color: var(--text-primary);
          font-weight: var(--font-weight-semibold);
          font-size: var(--font-size-base);
        }

        .hover-effect {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(0, 217, 255, 0.1), transparent);
          border-radius: 12px;
          opacity: 0;
          transform: translateX(-100%);
          transition: all 0.6s ease;
        }

        .info-item:hover .hover-effect {
          opacity: 1;
          transform: translateX(100%);
        }

        .bio-content {
          padding: 1rem 2rem 2rem;
        }

        .bio-text {
          margin-bottom: 2rem;
        }

        .bio-text p {
          margin-bottom: 1.5rem;
          line-height: 1.7;
        }

        .highlight {
          background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: var(--font-weight-semibold);
          position: relative;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .stat-item {
          text-align: center;
          padding: 1.5rem 1rem;
          background: rgba(0, 217, 255, 0.05);
          border-radius: 16px;
          transition: all 0.3s ease;
          border: 1px solid rgba(0, 217, 255, 0.1);
        }

        .stat-item:hover {
          background: rgba(0, 217, 255, 0.1);
          transform: translateY(-4px);
        }

        .stat-number {
          font-size: var(--font-size-3xl);
          font-weight: var(--font-weight-extrabold);
          background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: var(--text-secondary);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
        }

        .card-footer {
          padding: 1rem 2rem 2rem;
        }

        .social-preview {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .social-mini {
          width: 40px;
          height: 40px;
          background: rgba(0, 217, 255, 0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-color);
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .social-mini:hover {
          background: var(--primary-color);
          color: white;
          transform: translateY(-2px);
        }

        .cta-button {
          width: 100%;
          padding: 1rem 1.5rem;
          background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
          color: white;
          border: none;
          border-radius: 12px;
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-semibold);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 217, 255, 0.3);
        }

        .floating-decorations {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .float-element {
          position: absolute;
          opacity: 0.1;
          animation: float 6s ease-in-out infinite;
          color: var(--primary-color);
        }

        .element-1 {
          top: 10%;
          right: 10%;
          animation-delay: 0s;
        }

        .element-2 {
          top: 60%;
          left: 5%;
          animation-delay: 2s;
        }

        .element-3 {
          bottom: 20%;
          right: 20%;
          animation-delay: 4s;
        }

        .element-4 {
          top: 30%;
          left: 80%;
          animation-delay: 1s;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(5deg); }
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

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
        }

        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .card-header {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .info-item {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
          }

          .info-item:hover {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </section>
  );
};

export default About;