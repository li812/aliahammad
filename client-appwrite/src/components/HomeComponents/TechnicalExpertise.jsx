import React, { useEffect, useRef } from 'react';
import { 
  FaServer, 
  FaReact, 
  FaCode, 
  FaBrain, 
  FaDatabase, 
  FaCloud,
  FaChartBar,
  FaHdd,
  FaRocket,
  FaCog,
  FaMobile,
  FaTools
} from 'react-icons/fa';
import { 
  createAdvancedObserver, 
  createMagneticEffect, 
  createParticleSystem,
  createEntranceAnimation 
} from '../../utils/animations';

const TechnicalExpertise = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const particleContainerRef = useRef(null);

  useEffect(() => {
    // Initialize particle system
    if (particleContainerRef.current) {
      const particleSystem = createParticleSystem(particleContainerRef.current, {
        particleCount: 60,
        particleSize: { min: 1, max: 3 },
        speed: { min: 0.2, max: 1 },
        color: ['#00d9ff', '#9333ea', '#64ffda'],
        opacity: { min: 0.2, max: 0.5 },
        connectionDistance: 100,
        showConnections: true
      });

      return () => particleSystem.destroy();
    }
  }, []);

  useEffect(() => {
    // Advanced intersection observer for cards
    const observer = createAdvancedObserver(
      (element) => {
        element.classList.add('animate-in');
      },
      {
        threshold: 0.1,
        rootMargin: '-50px 0px',
        staggerDelay: 200
      }
    );

    cardRefs.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Magnetic effect for cards
    const cards = cardRefs.current.filter(card => card !== null);
    createMagneticEffect(cards, {
      strength: 30,
      smoothing: 0.2,
      triggerArea: 1.1
    });
  }, []);

  const skillCategories = [
    {
      title: "Backend Development",
      icon: <FaServer size={36} />,
      skills: ["Django", "Flask", "Spring Boot", "Express.js", "FastAPI"],
      gradient: "from-blue-500 via-blue-600 to-indigo-700",
      iconColor: "#3b82f6",
      description: "Robust server-side solutions"
    },
    {
      title: "Frontend Development", 
      icon: <FaReact size={36} />,
      skills: ["React.js", "Next.js", "Vue.js", "Bootstrap", "Tailwind CSS"],
      gradient: "from-cyan-500 via-teal-500 to-emerald-600",
      iconColor: "#06b6d4",
      description: "Modern user interfaces"
    },
    {
      title: "Mobile Development",
      icon: <FaMobile size={36} />,
      skills: ["React Native", "Flutter", "Android Studio", "iOS", "Expo"],
      gradient: "from-green-500 via-emerald-500 to-teal-600",
      iconColor: "#10b981",
      description: "Cross-platform mobile apps"
    },
    {
      title: "Programming Languages",
      icon: <FaCode size={36} />,
      skills: ["Python", "Java", "JavaScript", "TypeScript", "C++", "Go"],
      gradient: "from-purple-500 via-indigo-500 to-purple-700",
      iconColor: "#8b5cf6",
      description: "Multi-language expertise"
    },
    {
      title: "Machine Learning",
      icon: <FaBrain size={36} />,
      skills: ["Scikit-Learn", "TensorFlow", "PyTorch", "Keras", "OpenAI"],
      gradient: "from-pink-500 via-rose-500 to-red-600",
      iconColor: "#ec4899",
      description: "AI & ML algorithms"
    },
    {
      title: "Computer Vision & AI",
      icon: <FaCog size={36} />,
      skills: ["OpenCV", "YOLO", "MTCNN", "DPT", "Open3D", "MediaPipe"],
      gradient: "from-orange-500 via-red-500 to-red-700",
      iconColor: "#f97316",
      description: "Visual intelligence systems"
    },
    {
      title: "Data Science & Analytics",
      icon: <FaChartBar size={36} />,
      skills: ["Pandas", "NumPy", "Matplotlib", "Power BI", "Tableau", "Grafana"],
      gradient: "from-emerald-500 via-green-500 to-teal-600",
      iconColor: "#10b981",
      description: "Data-driven insights"
    },
    {
      title: "Big Data Technologies",
      icon: <FaHdd size={36} />,
      skills: ["Apache Hadoop", "Apache Spark", "Kafka", "Elasticsearch"],
      gradient: "from-yellow-500 via-amber-500 to-orange-600",
      iconColor: "#eab308",
      description: "Large-scale data processing"
    },
    {
      title: "Databases",
      icon: <FaDatabase size={36} />,
      skills: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "DynamoDB", "Firestore"],
      gradient: "from-slate-500 via-gray-600 to-zinc-700",
      iconColor: "#64748b",
      description: "Data storage solutions"
    },
    {
      title: "DevOps & Deployment",
      icon: <FaRocket size={36} />,
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux", "Nginx"],
      gradient: "from-violet-500 via-purple-600 to-indigo-700",
      iconColor: "#8b5cf6",
      description: "Infrastructure automation"
    },
    {
      title: "Cloud & BaaS Platforms",
      icon: <FaCloud size={36} />,
      skills: ["Firebase", "Appwrite", "AWS", "Google Cloud", "DigitalOcean"],
      gradient: "from-sky-500 via-blue-500 to-cyan-600",
      iconColor: "#0ea5e9",
      description: "Cloud-native solutions"
    },
    {
      title: "Development Tools",
      icon: <FaTools size={36} />,
      skills: ["Git", "VSCode", "Postman", "Figma", "Jira", "Jenkins"],
      gradient: "from-indigo-500 via-purple-500 to-pink-600",
      iconColor: "#6366f1",
      description: "Development ecosystem"
    }
  ];

  return (
    <section id="fh5co-skills" className="skills-section" ref={sectionRef}>
      {/* Particle Background */}
      <div className="particle-container" ref={particleContainerRef}></div>
      
      <div className="modern-container">
        <div className="section-header">
          <h2 className="section-title">Technical Expertise</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            Comprehensive skillset across full-stack development, AI/ML, and cloud technologies
          </p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div 
              key={index} 
              className="skill-card"
              ref={el => cardRefs.current[index] = el}
            >
              <div className="card-glow"></div>
              <div className="card-content">
                <div className="skill-header">
                  <div 
                    className="skill-icon" 
                    style={{ '--icon-color': category.iconColor }}
                  >
                    {category.icon}
                    <div className="icon-glow"></div>
                  </div>
                  <div className="skill-info">
                    <h4 className="skill-title">{category.title}</h4>
                    <p className="skill-description">{category.description}</p>
                    <div className="skill-count">{category.skills.length} technologies</div>
                  </div>
                </div>
                
                <div className="skill-tags">
                  {category.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex} 
                      className="skill-tag"
                      style={{ 
                        '--delay': `${skillIndex * 0.1}s`,
                        '--index': skillIndex 
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="card-footer">
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ '--fill-color': category.iconColor }}
                      ></div>
                    </div>
                    <span className="progress-label">Expert Level</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Tech Elements */}
        <div className="floating-elements">
          <div className="tech-float tech-1"><FaCode /></div>
          <div className="tech-float tech-2"><FaBrain /></div>
          <div className="tech-float tech-3"><FaRocket /></div>
          <div className="tech-float tech-4"><FaDatabase /></div>
        </div>
      </div>

      <style jsx>{`
        .skills-section {
          position: relative;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          overflow: hidden;
          padding: 120px 0;
          color: white;
          min-height: 100vh;
        }

        .skills-section::before {
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
          margin: 0 auto;
          line-height: 1.6;
          font-weight: 400;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          position: relative;
          z-index: 2;
          max-width: 1400px;
          margin: 0 auto;
        }

        .skill-card {
          position: relative;
          opacity: 0;
          transform: translateY(60px) rotateX(20deg);
          transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 28px;
          overflow: hidden;
          cursor: pointer;
        }

        .skill-card.animate-in {
          opacity: 1;
          transform: translateY(0) rotateX(0deg);
        }

        .skill-card:hover {
          transform: translateY(-20px) scale(1.03);
          border-color: rgba(0, 217, 255, 0.4);
          box-shadow: 0 25px 50px rgba(0, 217, 255, 0.2);
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
          animation: rotate 20s linear infinite;
        }

        .skill-card:hover .card-glow {
          opacity: 1;
          animation-play-state: paused;
        }

        .card-content {
          position: relative;
          padding: 2.5rem;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .skill-header {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .skill-icon {
          width: 90px;
          height: 90px;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.15), 
            rgba(255, 255, 255, 0.05)
          );
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--icon-color);
          position: relative;
          overflow: hidden;
          transition: all 0.5s ease;
          flex-shrink: 0;
        }

        .skill-icon::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transform: translateX(-100%) translateY(-100%) rotate(45deg);
          transition: all 0.8s ease;
        }

        .icon-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, var(--icon-color), transparent);
          opacity: 0;
          border-radius: 50%;
          transition: all 0.5s ease;
        }

        .skill-card:hover .skill-icon::before {
          transform: translateX(100%) translateY(100%) rotate(45deg);
        }

        .skill-card:hover .skill-icon {
          background: linear-gradient(135deg, 
            rgba(0, 217, 255, 0.2), 
            rgba(147, 51, 234, 0.2)
          );
          border-color: var(--icon-color);
          box-shadow: 0 0 40px rgba(0, 217, 255, 0.4);
          transform: scale(1.1);
        }

        .skill-card:hover .icon-glow {
          opacity: 0.3;
        }

        .skill-info {
          flex: 1;
        }

        .skill-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: white;
          margin: 0 0 0.5rem 0;
          line-height: 1.3;
        }

        .skill-description {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0 0 0.5rem 0;
          line-height: 1.4;
        }

        .skill-count {
          font-size: 0.9rem;
          color: rgba(0, 217, 255, 0.8);
          font-weight: 600;
          background: rgba(0, 217, 255, 0.1);
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          display: inline-block;
        }

        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 2rem;
          flex: 1;
        }

        .skill-tag {
          position: relative;
          padding: 0.75rem 1.25rem;
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          overflow: hidden;
          animation: tagSlideIn 0.8s ease-out;
          animation-delay: var(--delay);
          animation-fill-mode: both;
        }

        .skill-tag::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(0, 217, 255, 0.3), 
            transparent
          );
          transition: all 0.6s ease;
        }

        .skill-tag:hover {
          background: linear-gradient(135deg, #00d9ff, #9333ea);
          color: white;
          transform: translateY(-4px) scale(1.08);
          box-shadow: 0 12px 30px rgba(0, 217, 255, 0.4);
          border-color: transparent;
        }

        .skill-tag:hover::before {
          left: 100%;
        }

        .card-footer {
          margin-top: auto;
        }

        .progress-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .progress-bar {
          flex: 1;
          height: 10px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 5px;
          overflow: hidden;
          position: relative;
        }

        .progress-fill {
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, var(--fill-color), #9333ea);
          border-radius: 5px;
          animation: progressFill 2.5s ease-out 1s forwards;
          position: relative;
        }

        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.6), 
            transparent
          );
          animation: progressShine 2s ease-out 3s;
        }

        .progress-label {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 500;
          white-space: nowrap;
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
          animation: floatMove 8s ease-in-out infinite;
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
          bottom: 25%;
          right: 15%;
          animation-delay: 4s;
        }

        .tech-4 {
          top: 40%;
          right: 5%;
          animation-delay: 6s;
        }

        @keyframes tagSlideIn {
          from {
            opacity: 0;
            transform: translateY(25px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes progressFill {
          from { width: 0%; }
          to { width: 90%; }
        }

        @keyframes progressShine {
          0% { left: -100%; }
          100% { left: 100%; }
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

        @keyframes floatMove {
          0%, 100% { 
            transform: translateY(0px) rotateZ(0deg);
            opacity: 0.2;
          }
          25% { 
            transform: translateY(-20px) rotateZ(90deg);
            opacity: 0.4;
          }
          50% { 
            transform: translateY(-10px) rotateZ(180deg);
            opacity: 0.3;
          }
          75% { 
            transform: translateY(-30px) rotateZ(270deg);
            opacity: 0.5;
          }
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .skill-header {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .skill-icon {
            margin: 0 auto;
            width: 80px;
            height: 80px;
          }

          .skill-tags {
            gap: 0.5rem;
            justify-content: center;
          }

          .skill-tag {
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
          }

          .card-content {
            padding: 2rem;
          }

          .section-title {
            font-size: clamp(2.5rem, 8vw, 4rem);
          }

          .section-subtitle {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 480px) {
          .card-content {
            padding: 1.5rem;
          }

          .skill-header {
            gap: 0.75rem;
          }

          .skill-icon {
            width: 70px;
            height: 70px;
          }

          .progress-container {
            flex-direction: column;
            gap: 0.5rem;
          }

          .progress-label {
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
};

export default TechnicalExpertise;