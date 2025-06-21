import React, { useEffect, useRef } from 'react';
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaCode, 
  FaRocket,
  FaBrain,
  FaDatabase,
  FaCloud,
  FaMobile,
  FaCog,
  FaShieldAlt,
  FaChartLine,
  FaCube,
  FaArrowRight
} from 'react-icons/fa';
import { 
  createAdvancedObserver, 
  createMagneticEffect, 
  createParticleSystem,
  createEntranceAnimation 
} from '../../utils/animations';

const Projects = ({ 
  showParticles = true,
  animationDuration = 1000,
  staggerDelay = 200,
  cardHoverEffect = true
}) => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const particleContainerRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    // Initialize particle system
    if (particleContainerRef.current && showParticles) {
      const particleSystem = createParticleSystem(particleContainerRef.current, {
        particleCount: 70,
        particleSize: { min: 1, max: 4 },
        speed: { min: 0.3, max: 1.2 },
        color: ['#00d9ff', '#9333ea', '#ffffff', '#64ffda'],
        opacity: { min: 0.2, max: 0.6 },
        connectionDistance: 100,
        showConnections: true
      });

      return () => particleSystem.destroy();
    }
  }, [showParticles]);

  useEffect(() => {
    // Intersection observer for cards
    const observer = createAdvancedObserver((element) => {
      element.classList.add('animate-in');
    }, {
      threshold: 0.1,
      rootMargin: '-50px 0px',
      staggerDelay: staggerDelay
    });

    cardRefs.current.forEach(card => {
      if (card) observer.observe(card);
    });

    // Observe header
    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, [staggerDelay]);

  useEffect(() => {
    // Magnetic effect for cards
    if (cardHoverEffect) {
      const cards = cardRefs.current.filter(card => card !== null);
      createMagneticEffect(cards, {
        strength: 25,
        smoothing: 0.2,
        triggerArea: 1.1
      });
    }
  }, [cardHoverEffect]);

  const getProjectIcon = (type) => {
    const iconMap = {
      'IoT System': <FaRocket size={20} />,
      'Package': <FaCube size={20} />,
      'Research': <FaBrain size={20} />,
      'System': <FaCog size={20} />,
      'Security': <FaShieldAlt size={20} />,
      'AI Application': <FaBrain size={20} />,
      'Mobile App': <FaMobile size={20} />,
      'Web App': <FaCode size={20} />
    };
    return iconMap[type] || <FaCode size={20} />;
  };

  const getTechIcon = (tech) => {
    const techIconMap = {
      'Spring Boot': <FaCode />,
      'Django': <FaCode />,
      'React.js': <FaCode />,
      'React Native': <FaMobile />,
      'AWS': <FaCloud />,
      'Google Cloud': <FaCloud />,
      'Docker': <FaCog />,
      'Python': <FaCode />,
      'MySQL': <FaDatabase />,
      'Computer Vision': <FaBrain />,
      'Deep Learning': <FaBrain />,
      'Machine Learning': <FaBrain />,
      'Security': <FaShieldAlt />
    };
    return techIconMap[tech] || <FaCode />;
  };

  const projects = [
    {
      title: "EcoZync",
      description: "A comprehensive IoT-based environmental monitoring system featuring multi-cloud architecture, real-time AI insights, and cross-platform support with advanced data visualization.",
      image: "images/ecozync.png",
      link: "https://github.com/li812/EcoZync-public",
      tech: ["Spring Boot", "Django", "React.js", "React Native", "AWS", "Google Cloud", "Docker", "Grafana"],
      type: "Polyglot Realtime IoT System"
    },
    {
      title: "LiSQL",
      description: "A powerful Python package engineered to streamline interactions with multiple MySQL databases across different servers, featuring robust connection management and optimized query execution.",
      image: "images/lisql.png",
      link: "https://pypi.org/project/lisql/",
      tech: ["Python", "MySQL", "Database", "PyPI"],
      type: "Package"
    },
    {
      title: "3D Face Reconstructor",
      description: "Cutting-edge 3D facial reconstruction system that transforms 2D images into detailed 3D models using MTCNN facial detection, DPT depth estimation, and Open3D mesh generation techniques.",
      image: "images/3d-face.png",
      link: "https://github.com/li812/3D-Face-Recontructor/",
      tech: ["Computer Vision", "Deep Learning", "MTCNN", "DPT", "Open3D"],
      type: "Research"
    },
    {
      title: "Pandemic Control System",
      description: "Comprehensive health response platform with Django backend, Android application, and CNN-based test result classification using PyTorch for real-time pandemic management.",
      image: "images/pandemo.png",
      link: "https://github.com/li812/Pandemic-Controlling-System/",
      tech: ["Django", "Android", "PyTorch", "CNN", "MySQL"],
      type: "System"
    },
    {
      title: "Phishing URL Detector",
      description: "Advanced machine learning-based security solution for real-time phishing URL detection and classification, featuring high accuracy threat identification and prevention capabilities.",
      image: "images/phishing.png",
      link: "https://github.com/li812/Phishing-URL-Checker",
      tech: ["Machine Learning", "Python", "Security", "Classification"],
      type: "Security"
    },
    {
      title: "Deepfake Detection Suite",
      description: "State-of-the-art deepfake detection system utilizing Meso4 CNN architecture, integrated with Django for web deployment and real-time video processing capabilities.",
      image: "images/deepfake.png",
      link: "https://github.com/li812/Deepfake-Detection-Meso4-Django",
      tech: ["Deep Learning", "CNN", "Django", "Computer Vision"],
      type: "AI Application"
    },
    {
      title: "Attendance System Using Facial Recognition",
      description: "Intelligent attendance tracking system using advanced facial recognition algorithms for fast and efficient employee attendance management with computer vision technology.",
      image: "images/at.png",
      link: "https://github.com/li812/Attendance-System-Using-Facial-Recognition/",
      tech: ["Computer Vision", "Python", "OpenCV", "Face Recognition"],
      type: "AI Application"
    },
    {
      title: "Real-time Chat Application",
      description: "Modern real-time messaging platform built with modern web technologies, featuring instant messaging, file sharing, and seamless user experience across devices.",
      image: "images/chat.png",
      link: "https://github.com/li812/chat-app",
      tech: ["Node.js", "Socket.io", "React.js", "MongoDB"],
      type: "Web App"
    }
  ];

  return (
    <section id="fh5co-work" className="projects-section" ref={sectionRef}>
      {/* Particle Background */}
      {showParticles && (
        <div className="particle-container" ref={particleContainerRef}></div>
      )}
      
      <div className="modern-container">
        <div className="section-header" ref={headerRef}>
          <div className="header-badge">
            <FaRocket className="badge-icon" />
            <span>Featured Work</span>
          </div>
          <h2 className="section-title">Innovative Projects</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            Cutting-edge solutions combining AI, Machine Learning, and Full-Stack Development
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="project-card"
              ref={el => cardRefs.current[index] = el}
            >
              <div className="card-glow"></div>
              
              {/* Project Image */}
              <div className="project-image-container">
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="project-type-badge">
                  {getProjectIcon(project.type)}
                  <span>{project.type}</span>
                </div>
              </div>

              {/* Project Content */}
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                </div>
                
                <p className="project-description">{project.description}</p>
                
                {/* Technology Stack */}
                <div className="tech-stack">
                  <h4 className="tech-title">
                    <FaCog className="tech-icon" />
                    Tech Stack
                  </h4>
                  <div className="tech-tags">
                    {project.tech.slice(0, 6).map((tech, techIndex) => (
                      <div 
                        key={techIndex} 
                        className="tech-tag"
                        style={{ 
                          '--delay': `${techIndex * 0.1}s`,
                          '--index': techIndex 
                        }}
                      >
                        {getTechIcon(tech)}
                        <span>{tech}</span>
                      </div>
                    ))}
                    {project.tech.length > 6 && (
                      <div className="tech-tag more-tech">
                        +{project.tech.length - 6} more
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Actions */}
                <div className="project-actions">
                  <a 
                    href={project.link} 
                    className="project-cta primary"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <span>View Project</span>
                    <FaExternalLinkAlt className="cta-icon" />
                  </a>
                  {project.link.includes('github.com') && (
                    <a 
                      href={project.link} 
                      className="project-cta secondary"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <FaGithub className="github-icon" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section Footer */}
        <div className="section-footer">
          <div className="footer-content">
            <h3 className="footer-title">Explore More Projects</h3>
            <p className="footer-description">
              Discover additional projects and contributions on my GitHub profile
            </p>
            <a 
              href="https://github.com/li812" 
              className="github-cta"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaGithub className="github-logo" />
              <span>View All Projects</span>
              <div className="cta-glow"></div>
            </a>
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
        .projects-section {
          position: relative;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          overflow: hidden;
          padding: 120px 0;
          color: white;
          min-height: 100vh;
        }

        .projects-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 30%, rgba(0, 217, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(100, 255, 218, 0.05) 0%, transparent 50%);
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

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          position: relative;
          z-index: 2;
          max-width: 1400px;
          margin: 0 auto;
        }

        .project-card {
          position: relative;
          opacity: 0;
          transform: translateY(80px) rotateX(15deg);
          transition: all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          overflow: hidden;
          cursor: pointer;
          height: 520px;
          display: flex;
          flex-direction: column;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .project-card.animate-in {
          opacity: 1;
          transform: translateY(0) rotateX(0deg);
        }

        .project-card:hover {
          transform: translateY(-10px) scale(1.02);
          border-color: rgba(0, 217, 255, 0.4);
          box-shadow: 
            0 30px 60px rgba(0, 217, 255, 0.15),
            0 0 40px rgba(0, 217, 255, 0.1);
        }

        .card-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          right: -50%;
          bottom: -50%;
          background: radial-gradient(circle, rgba(0, 217, 255, 0.15) 0%, transparent 70%);
          opacity: 0;
          transition: all 0.8s ease;
          z-index: 1;
          animation: rotate 25s linear infinite;
        }

        .project-card:hover .card-glow {
          opacity: 1;
          animation-play-state: paused;
        }

        .project-image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .project-image {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.5s ease;
          filter: brightness(0.9) contrast(1.1);
        }

        .project-card:hover .project-image img {
          transform: scale(1.05);
          filter: brightness(1) contrast(1.2);
        }

        .project-type-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 3;
        }

        .project-content {
          padding: 1.5rem;
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .project-header {
          margin-bottom: 1rem;
        }

        .project-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: white;
          margin: 0;
          line-height: 1.3;
          background: linear-gradient(135deg, #00d9ff, #9333ea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .project-description {
          font-size: 0.9rem;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 1.25rem;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .tech-stack {
          margin-bottom: 1.5rem;
        }

        .tech-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 0.75rem;
        }

        .tech-icon {
          color: #00d9ff;
          font-size: 0.8rem;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech-tag {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.3rem 0.6rem;
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 15px;
          font-size: 0.7rem;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: pointer;
          animation: tagSlideIn 0.6s ease-out;
          animation-delay: var(--delay);
          animation-fill-mode: both;
        }

        .tech-tag:hover {
          background: linear-gradient(135deg, #00d9ff, #9333ea);
          color: white;
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 5px 15px rgba(0, 217, 255, 0.3);
          border-color: transparent;
        }

        .tech-tag.more-tech {
          background: rgba(0, 217, 255, 0.1);
          color: #00d9ff;
          border-color: rgba(0, 217, 255, 0.3);
        }

        .tech-tag.more-tech:hover {
          background: rgba(0, 217, 255, 0.2);
          transform: translateY(-2px) scale(1.05);
        }

        .project-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: auto;
        }

        .project-cta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.85rem;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          flex: 1;
          justify-content: center;
        }

        .project-cta.primary {
          background: linear-gradient(135deg, #00d9ff, #9333ea);
          color: white;
          border: none;
          box-shadow: 0 5px 15px rgba(0, 217, 255, 0.3);
        }

        .project-cta.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 217, 255, 0.4);
        }

        .project-cta.secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          flex: none;
          width: 50px;
          height: 50px;
          padding: 0;
          border-radius: 50%;
        }

        .project-cta.secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(0, 217, 255, 0.5);
          transform: translateY(-2px);
        }

        .cta-icon {
          transition: transform 0.3s ease;
          font-size: 0.8rem;
        }

        .project-cta:hover .cta-icon {
          transform: translateX(3px);
        }

        .section-footer {
          text-align: center;
          margin-top: 6rem;
          position: relative;
          z-index: 2;
        }

        .footer-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .footer-title {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #00d9ff, #9333ea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
        }

        .footer-description {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 2.5rem;
          line-height: 1.6;
        }

        .github-cta {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem 2.5rem;
          background: linear-gradient(135deg, #333, #000);
          color: white;
          text-decoration: none;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .github-cta:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        .github-logo {
          font-size: 1.5rem;
        }

        .cta-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: all 0.6s ease;
        }

        .github-cta:hover .cta-glow {
          left: 100%;
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
          font-size: 2.5rem;
          color: rgba(0, 217, 255, 0.2);
          animation: techFloat 8s ease-in-out infinite;
        }

        .tech-1 {
          top: 10%;
          right: 8%;
          animation-delay: 0s;
        }

        .tech-2 {
          top: 40%;
          left: 5%;
          animation-delay: 2s;
        }

        .tech-3 {
          bottom: 30%;
          right: 12%;
          animation-delay: 4s;
        }

        .tech-4 {
          top: 70%;
          left: 15%;
          animation-delay: 6s;
        }

        .tech-5 {
          bottom: 10%;
          left: 50%;
          animation-delay: 8s;
        }

        /* Animations */
        @keyframes badgePulse {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(0, 217, 255, 0.3);
          }
          50% { 
            box-shadow: 0 0 30px rgba(0, 217, 255, 0.5);
          }
        }

        @keyframes badgeRotate {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(90deg); }
          50% { transform: rotate(180deg); }
          75% { transform: rotate(270deg); }
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

        @keyframes pulse {
          0%, 100% { 
            transform: translateX(-50%) scale(1);
            opacity: 0.7;
          }
          50% { 
            transform: translateX(-50%) scale(1.2);
            opacity: 1;
          }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes tagSlideIn {
          from {
            opacity: 0;
            transform: translateY(15px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
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

        /* Responsive Design */
        @media (max-width: 1200px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .project-card {
            height: auto;
            min-height: 480px;
          }

          .project-content {
            padding: 1.25rem;
          }

          .project-image-container {
            height: 180px;
          }

          .tech-tags {
            gap: 0.4rem;
          }

          .tech-tag {
            padding: 0.25rem 0.5rem;
            font-size: 0.65rem;
          }

          .project-actions {
            flex-direction: column;
          }

          .project-cta.secondary {
            width: 100%;
            height: auto;
            padding: 0.75rem 1.25rem;
            border-radius: 20px;
            flex: 1;
          }

          .floating-elements {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .projects-section {
            padding: 80px 0;
          }

          .section-header {
            margin-bottom: 60px;
          }

          .project-content {
            padding: 1rem;
          }

          .project-title {
            font-size: 1.2rem;
          }

          .project-description {
            font-size: 0.85rem;
          }

          .section-footer {
            margin-top: 4rem;
          }

          .footer-title {
            font-size: 2rem;
          }

          .github-cta {
            padding: 1rem 2rem;
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;