import React, { useEffect, useRef } from 'react';
import { 
  FaCode, 
  FaReact, 
  FaServer, 
  FaDatabase, 
  FaBrain, 
  FaEye, 
  FaChartBar, 
  FaHdd, 
  FaRocket, 
  FaCloud,
  FaPython,
  FaDocker,
  FaCertificate,
  FaAward,
  FaStar,
  FaNodeJs,
  FaJava,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaMobile,
  FaAws,
  FaGitAlt,
  FaLinux
} from 'react-icons/fa';
import { 
  SiSpringboot,
  SiDjango,
  SiFlask,
  SiExpress,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
  SiTensorflow,
  SiPytorch,
  SiPython,
  SiKeras,
  SiOpencv,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiNextdotjs,
  SiTypescript,
  SiBootstrap,
  SiTailwindcss,
  SiKubernetes,
  SiApachehadoop,
  SiApachespark,
  SiTableau,
  SiGrafana,
  SiDigitalocean,
  SiAppwrite,
  SiSwift,
  SiGo,
  SiScala,
  SiR,
  SiSqlite,
  SiCloudflare,
  SiNginx,
  SiSimpleanalytics
} from 'react-icons/si';
import { TbBrandCSharp } from "react-icons/tb";
import { 
  createAdvancedObserver, 
  createMagneticEffect, 
  createParticleSystem
} from '../../utils/animations';

const TechnicalExpertise = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const particleContainerRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    // Initialize particle system
    if (particleContainerRef.current) {
      const particleSystem = createParticleSystem(particleContainerRef.current, {
        particleCount: 60,
        particleSize: { min: 1, max: 3 },
        speed: { min: 0.2, max: 1 },
        color: ['#00d9ff', '#9333ea', '#ffffff', '#64ffda'],
        opacity: { min: 0.2, max: 0.5 },
        connectionDistance: 80,
        showConnections: true
      });

      return () => particleSystem.destroy();
    }
  }, []);

  useEffect(() => {
    // Intersection observer for cards
    const observer = createAdvancedObserver((element) => {
      element.classList.add('animate-in');
    }, {
      threshold: 0.1,
      rootMargin: '-50px 0px',
      staggerDelay: 150
    });

    cardRefs.current.forEach(card => {
      if (card) observer.observe(card);
    });

    // Observe header
    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

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

  // Technology icons mapping
  const getTechIcon = (tech) => {
    const iconMap = {
      // Programming Languages
      'Python': <SiPython style={{ color: '#3776AB' }} />,
      'Java': <FaJava style={{ color: '#007396' }} />,
      'JavaScript': <FaJs style={{ color: '#F7DF1E' }} />,
      'TypeScript': <SiTypescript style={{ color: '#3178C6' }} />,
      'C': <FaCode style={{ color: '#A8B9CC' }} />,
      'C++': <FaCode style={{ color: '#00599C' }} />,
      'C#': <TbBrandCSharp style={{ color: '#239120' }} />,
      'R': <SiR style={{ color: '#276DC3' }} />,
      'Swift': <SiSwift style={{ color: '#FA7343' }} />,
      'Go': <SiGo style={{ color: '#00ADD8' }} />,
      'Scala': <SiScala style={{ color: '#DC322F' }} />,

      // Frontend Development
      'React.js': <FaReact style={{ color: '#61DAFB' }} />,
      'Next.js': <SiNextdotjs style={{ color: '#000000' }} />,
      'React Native': <FaReact style={{ color: '#61DAFB' }} />,
      'Bootstrap': <SiBootstrap style={{ color: '#7952B3' }} />,
      'Tailwind CSS': <SiTailwindcss style={{ color: '#06B6D4' }} />,
      'HTML5': <FaHtml5 style={{ color: '#E34F26' }} />,
      'CSS3': <FaCss3Alt style={{ color: '#1572B6' }} />,

      // Backend Development
      'Django': <SiDjango style={{ color: '#092E20' }} />,
      'Flask': <SiFlask style={{ color: '#000000' }} />,
      'Spring Boot': <SiSpringboot style={{ color: '#6DB33F' }} />,
      'Express.js': <SiExpress style={{ color: '#000000' }} />,
      'Node.js': <FaNodeJs style={{ color: '#339933' }} />,

      // Databases
      'MySQL': <SiMysql style={{ color: '#4479A1' }} />,
      'PostgreSQL': <SiPostgresql style={{ color: '#4169E1' }} />,
      'DynamoDB': <FaDatabase style={{ color: '#FF9900' }} />,
      'MongoDB': <SiMongodb style={{ color: '#47A248' }} />,
      'Firestore': <SiFirebase style={{ color: '#FFCA28' }} />,
      'Appwrite DB': <SiAppwrite style={{ color: '#FD366E' }} />,
      'SQLite': <SiSqlite style={{ color: '#003B57' }} />,

      // AI/ML
      'Scikit-Learn': <SiScikitlearn style={{ color: '#F7931E' }} />,
      'TensorFlow': <SiTensorflow style={{ color: '#FF6F00' }} />,
      'PyTorch': <SiPytorch style={{ color: '#EE4C2C' }} />,
      'Keras': <SiKeras style={{ color: '#D00000' }} />,
      'Transformers': <FaBrain style={{ color: '#FFD43B' }} />,
      'LangChain': <FaBrain style={{ color: '#1C3F94' }} />,

      // Computer Vision
      'OpenCV': <SiOpencv style={{ color: '#5C3EE8' }} />,
      'Scikit-Image': <FaEye style={{ color: '#FF6B6B' }} />,
      'YOLO': <FaEye style={{ color: '#00FFFF' }} />,
      'BLIP': <FaEye style={{ color: '#FF69B4' }} />,
      'KerasCV': <SiKeras style={{ color: '#D00000' }} />,

      // Data Analytics
      'Pandas': <SiPandas style={{ color: '#150458' }} />,
      'Matplotlib': <FaChartBar style={{ color: '#11557C' }} />,
      'Seaborn': <FaChartBar style={{ color: '#388E3C' }} />,
      'Power BI': <SiSimpleanalytics style={{ color: '#F2C811' }} />,
      'Tableau': <SiTableau style={{ color: '#E97627' }} />,
      'Grafana': <SiGrafana style={{ color: '#F46800' }} />,
      'NumPy': <SiNumpy style={{ color: '#013243' }} />,

      // Big Data
      'Apache Hadoop': <SiApachehadoop style={{ color: '#66CCFF' }} />,
      'Apache Spark': <SiApachespark style={{ color: '#E25A1C' }} />,

      // DevOps & Deployment
      'Docker': <FaDocker style={{ color: '#2496ED' }} />,
      'Kubernetes': <SiKubernetes style={{ color: '#326CE5' }} />,
      'Git': <FaGitAlt style={{ color: '#F05032' }} />,
      'Linux': <FaLinux style={{ color: '#FCC624' }} />,
      'Cloudflare Tunnel': <SiCloudflare style={{ color: '#F38020' }} />,
      'Nginx': <SiNginx style={{ color: '#009639' }} />,

      // Cloud Platforms
      'Firebase': <SiFirebase style={{ color: '#FFCA28' }} />,
      'Appwrite': <SiAppwrite style={{ color: '#FD366E' }} />,
      'AWS': <FaAws style={{ color: '#FF9900' }} />,
      'DigitalOcean': <SiDigitalocean style={{ color: '#0080FF' }} />,

      // Default fallback
      'default': <FaCode style={{ color: '#00D9FF' }} />
    };
    
    return iconMap[tech] || iconMap['default'];
  };

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <FaCode size={36} />,
      skills: ["Python", "Java", "JavaScript", "TypeScript", "C", "C++", "R", "Swift", "Go", "Scala"],
      iconColor: "#8b5cf6",
      description: "Multi-language expertise",
      featured: true
    },
    {
      title: "Frontend Development",
      icon: <FaReact size={36} />,
      skills: ["React.js", "Next.js", "React Native", "Bootstrap", "Tailwind CSS"],
      iconColor: "#06b6d4",
      description: "Modern user interfaces"
    },
    {
      title: "Backend Development",
      icon: <FaServer size={36} />,
      skills: ["Django", "Flask", "Spring Boot", "Express.js"],
      iconColor: "#3b82f6",
      description: "Robust server-side solutions"
    },
    {
      title: "Databases",
      icon: <FaDatabase size={36} />,
      skills: ["MySQL", "PostgreSQL", "DynamoDB", "MongoDB", "Firestore", "Appwrite DB", "SQLite"],
      iconColor: "#64748b",
      description: "Data storage solutions"
    },
    {
      title: "Artificial Intelligence",
      icon: <FaBrain size={36} />,
      skills: ["Scikit-Learn", "TensorFlow", "PyTorch", "Keras", "Transformers", "LangChain"],
      iconColor: "#ec4899",
      description: "AI, Deep learning and Machine Learning",
      featured: true
    },
    {
      title: "Computer Vision",
      icon: <FaEye size={36} />,
      skills: ["OpenCV", "Scikit-Image", "YOLO", "BLIP", "KerasCV"],
      iconColor: "#f97316",
      description: "Visual intelligence systems"
    },
    {
      title: "Data Analytics",
      icon: <FaChartBar size={36} />,
      skills: ["Pandas", "Matplotlib", "Seaborn", "Power BI", "Tableau", "Grafana"],
      iconColor: "#10b981",
      description: "Data-driven insights"
    },
    {
      title: "Big Data Technologies",
      icon: <FaHdd size={36} />,
      skills: ["Apache Hadoop", "Apache Spark"],
      iconColor: "#eab308",
      description: "Large-scale data processing"
    },
    {
      title: "DevOps & Deployment",
      icon: <FaRocket size={36} />,
      skills: ["Docker", "Kubernetes", "Git", "Linux", "Cloudflare Tunnel", "Nginx"],
      iconColor: "#8b5cf6",
      description: "Infrastructure automation",
      featured: true
    },
    {
      title: "Cloud Platforms",
      icon: <FaCloud size={36} />,
      skills: ["Firebase", "Appwrite", "AWS", "DigitalOcean"],
      iconColor: "#0ea5e9",
      description: "Cloud-native solutions"
    }
  ];

  return (
    <section id="fh5co-skills" className="skills-section" ref={sectionRef}>
      {/* Particle Background */}
      <div className="particle-container" ref={particleContainerRef}></div>

      <div className="modern-container">
        <div className="section-header" ref={headerRef}>
          <div className="header-badge">
            <FaCertificate className="badge-icon" />
            <span>Skills</span>
          </div>
          <h2 className="section-title">Technical Expertise</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            Comprehensive skillset across full-stack development, AI/ML, and cloud technologies
          </p>
        </div>

        {/* Statistics Section */}
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-icon">
              <FaCode />
            </div>
            <div className="stat-info">
              <span className="stat-number">{skillCategories.length}</span>
              <span className="stat-label">Skill Categories</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <FaAward />
            </div>
            <div className="stat-info">
              <span className="stat-number">{skillCategories.filter(skill => skill.featured).length}</span>
              <span className="stat-label">Core Specializations</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <FaBrain />
            </div>
            <div className="stat-info">
              <span className="stat-number">{skillCategories.reduce((total, category) => total + category.skills.length, 0)}</span>
              <span className="stat-label">Technologies</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <FaRocket />
            </div>
            <div className="stat-info">
              <span className="stat-number">5+</span>
              <span className="stat-label">Years Experience</span>
            </div>
          </div>
        </div>

        {/* Skills Grid - 3 cards per row */}
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className={`skill-card ${category.featured ? 'featured' : ''}`}
              ref={el => cardRefs.current[index] = el}
            >
              {/* Skill Icon */}
              <div className="skill-provider-icon">
                <div className="skill-icon" style={{ '--icon-color': category.iconColor }}>
                  {category.icon}
                </div>
              </div>

              {/* Skill Info */}
              <div className="skill-info">
                <h3 className="skill-title">{category.title}</h3>
                <div className="skill-meta">
                  <span className="skill-description">{category.description}</span>
                  <span className="skill-count">{category.skills.length} technologies</span>
                </div>
                
                <div className="skill-tag-tes">
                  {category.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex} 
                      className="skill-tag-te"
                      style={{ '--delay': `${skillIndex * 0.1}s` }}
                    >
                      {getTechIcon(skill)}
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Status Indicator */}
              <div 
                className="status-indicator"
                style={{ '--status-color': category.iconColor }}
              >
                <FaStar />
              </div>

              {category.featured && (
                <div className="featured-badge-te">
                  <FaAward />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Floating Tech Elements */}
        <div className="floating-elements">
          <div className="tech-float tech-1"><FaCode /></div>
          <div className="tech-float tech-2"><FaBrain /></div>
          <div className="tech-float tech-3"><FaRocket /></div>
          <div className="tech-float tech-4"><FaDatabase /></div>
          <div className="tech-float tech-5"><FaPython /></div>
          <div className="tech-float tech-6"><FaReact /></div>
          <div className="tech-float tech-7"><SiSpringboot /></div>
          <div className="tech-float tech-8"><FaDocker /></div>
        </div>
      </div>

      <style jsx>{`
        .skills-section {
          position: relative;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          overflow: hidden;
          padding: 100px 0;
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
            radial-gradient(circle at 40% 80%, rgba(245, 158, 11, 0.05) 0%, transparent 50%);
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
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 2;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
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
          font-size: clamp(2.5rem, 5vw, 4rem);
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
          width: 120px;
          height: 4px;
          background: linear-gradient(90deg, #00d9ff, #9333ea, #64ffda);
          margin: 0 auto 1.5rem;
          border-radius: 2px;
          position: relative;
          animation: shimmer 3s ease-in-out infinite;
        }

        .title-underline::after {
          content: '';
          position: absolute;
          top: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 24px;
          height: 12px;
          background: #00d9ff;
          border-radius: 6px;
          box-shadow: 0 0 20px rgba(0, 217, 255, 0.7);
          animation: pulse 2s ease-in-out infinite;
        }

        .section-subtitle {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          max-width: 700px;
          margin: 0 auto 3rem;
          line-height: 1.6;
          font-weight: 400;
        }

        .stats-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 4rem;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(0, 217, 255, 0.3);
          transform: translateY(-5px);
        }

        .stat-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #00d9ff, #9333ea);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.3rem;
          flex-shrink: 0;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 800;
          background: linear-gradient(135deg, #00d9ff, #9333ea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 500;
        }

        /* SKILL CARDS - 3 PER ROW */
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
          max-width: 400px;
          border-radius: 28px;
          overflow: hidden;
          padding: 1.5rem;
          margin: 1rem auto;
          cursor: pointer;
        }


        .skill-card.animate-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .skill-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(0, 217, 255, 0.4);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.4),
            0 0 30px rgba(0, 217, 255, 0.2);
        }

        .skill-card.featured {
          border-color: rgba(0, 217, 255, 0.3);
          background: linear-gradient(135deg, 
            rgba(0, 217, 255, 0.08) 0%, 
            rgba(255, 255, 255, 0.05) 100%);
        }

        .skill-provider-icon {
          width: 70px;
          height: 70px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .skill-card:hover .skill-provider-icon {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(0, 217, 255, 0.4);
          transform: scale(1.1);
        }

        .skill-icon {
          color: var(--icon-color);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .skill-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .skill-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .skill-meta {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .skill-description {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .skill-count {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.8rem;
          font-family: 'Courier New', monospace;
        }

        .skill-tag-tes {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: auto;
        }

        .skill-tag-te {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.8rem;
          background: rgba(0, 217, 255, 0.1);
          border: 1px solid rgba(0, 217, 255, 0.3);
          border-radius: 14px;
          color: #00d9ff;
          font-size: 0.75rem;
          font-weight: 500;
          transition: all 0.3s ease;
          animation: tagSlideIn 0.6s ease-out;
          animation-delay: var(--delay);
          animation-fill-mode: both;
        }

        .skill-tag-te:hover {
          background: rgba(0, 217, 255, 0.2);
          transform: translateY(-2px) scale(1.05);
          border-color: rgba(0, 217, 255, 0.5);
          box-shadow: 0 4px 12px rgba(0, 217, 255, 0.3);
        }

        .skill-tag-te svg {
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .status-indicator {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid var(--status-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--status-color);
          font-size: 0.9rem;
        }

        .featured-badge-te {
          position: absolute;
          top: 1rem;
          left: 19rem;
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, #00d9ff, #9333ea);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.8rem;
          animation: featuredPulse 3s ease-in-out infinite;
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
          top: 10%;
          right: 8%;
          animation-delay: 0s;
        }

        .tech-2 {
          top: 40%;
          left: 5%;
          animation-delay: 1s;
        }

        .tech-3 {
          bottom: 30%;
          right: 12%;
          animation-delay: 2s;
        }

        .tech-4 {
          top: 70%;
          left: 15%;
          animation-delay: 3s;
        }

        .tech-5 {
          bottom: 10%;
          left: 50%;
          animation-delay: 4s;
        }

        .tech-6 {
          top: 25%;
          right: 40%;
          animation-delay: 5s;
        }

        .tech-7 {
          bottom: 60%;
          left: 80%;
          animation-delay: 6s;
        }

        .tech-8 {
          top: 80%;
          right: 30%;
          animation-delay: 7s;
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

        @keyframes featuredPulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 10px rgba(0, 217, 255, 0.3);
          }
          50% { 
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(0, 217, 255, 0.5);
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

        @keyframes tagSlideIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .skill-card {
            min-height: auto;
            padding: 1.25rem;
          }

          .stats-section {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }

          .stat-card {
            padding: 1rem;
          }

          .stat-icon {
            width: 40px;
            height: 40px;
            font-size: 1.1rem;
          }

          .stat-number {
            font-size: 1.5rem;
          }

          .floating-elements {
            display: none;
          }

          .skill-provider-icon {
            width: 60px;
            height: 60px;
          }

          .skill-tag-tes {
            gap: 0.3rem;
          }

          .skill-tag-te {
            padding: 0.3rem 0.6rem;
            font-size: 0.7rem;
          }
        }

        @media (max-width: 480px) {
          .skills-section {
            padding: 80px 0;
          }

          .section-header {
            margin-bottom: 40px;
          }

          .stats-section {
            grid-template-columns: 1fr;
          }

          .skill-card {
            padding: 1rem;
          }

          .skill-title {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default TechnicalExpertise;