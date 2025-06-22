import React, { useEffect, useRef } from 'react';
import { 
  FaBriefcase, 
  FaGraduationCap, 
  FaCode, 
  FaRocket,
  FaBrain,
  FaDatabase,
  FaCloud,
  FaChalkboardTeacher,
  FaUserTie,
  FaLaptopCode,
  FaUniversity,
  FaAward,
  FaCertificate,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaStar,
  FaReact,
  FaPython,
  FaJava,
  FaJs,
  FaDocker,
  FaAws,
  FaNodeJs,
  FaMobile,
  FaServer,
  FaGitAlt,
  FaLinux,
  FaHtml5,
  FaCss3Alt
} from 'react-icons/fa';
import { 
  SiDjango,
  SiFlask,
  SiSpringboot,
  SiTensorflow,
  SiPytorch,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiFirebase,
  SiGooglecloud,
  SiKubernetes,
  SiExpress,
  SiBootstrap,
  SiTailwindcss,
  SiTypescript,
  SiCplusplus,
  SiR,
  SiSwift,
  SiGo,
  SiScala,
  SiOpencv,
  SiGrafana,
  SiApachehadoop,
  SiApachespark,
  SiTableau,
  SiDigitalocean,
  SiCloudflare,
  SiNginx,
  SiNextdotjs,
  SiKeras,
  SiJupyter,
  SiNumpy,
  SiPandas,
  SiScipy,
  SiScikitlearn,
  SiSqlite,
  SiNestjs
} from 'react-icons/si';

import { TbBrandCSharp } from "react-icons/tb";

import { 
  createAdvancedObserver, 
  createMagneticEffect, 
  createParticleSystem,
  createEntranceAnimation 
} from '../../utils/animations';

const Experience = ({ 
  showParticles = true,
  animationDuration = 1000,
  staggerDelay = 200,
  cardHoverEffect = true 
}) => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const particleContainerRef = useRef(null);
  const headerRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    // Initialize particle system
    if (particleContainerRef.current && showParticles) {
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
  }, [showParticles]);

  useEffect(() => {
    // Intersection observer for timeline items
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

    // Observe timeline line
    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => observer.disconnect();
  }, [staggerDelay]);

  useEffect(() => {
    // Magnetic effect for timeline cards
    if (cardHoverEffect) {
      const cards = cardRefs.current.filter(card => card !== null);
      createMagneticEffect(cards, {
        strength: 15,
        smoothing: 0.2,
        triggerArea: 1.1
      });
    }
  }, [cardHoverEffect]);

  // Technology icons mapping
  const getTechIcon = (tech) => {
    const iconMap = {
      // Frameworks & Libraries
      'Django': <SiDjango style={{ color: '#092E20' }} />,
      'Flask': <SiFlask style={{ color: '#000000' }} />,
      'Spring Boot': <SiSpringboot style={{ color: '#6DB33F' }} />,
      'React': <FaReact style={{ color: '#61DAFB' }} />,
      'React.js': <FaReact style={{ color: '#61DAFB' }} />,
      'Next.js': <SiNextdotjs style={{ color: '#000000' }} />,
      'Express.js': <SiExpress style={{ color: '#000000' }} />,
      'Bootstrap': <SiBootstrap style={{ color: '#7952B3' }} />,
      'Tailwind CSS': <SiTailwindcss style={{ color: '#06B6D4' }} />,
      
      // Languages
      'Python': <FaPython style={{ color: '#3776AB' }} />,
      'JavaScript': <FaJs style={{ color: '#F7DF1E' }} />,
      'TypeScript': <SiTypescript style={{ color: '#3178C6' }} />,
      'Java': <FaJava style={{ color: '#007396' }} />,
      'C++': <SiCplusplus style={{ color: '#00599C' }} />,
      'C': <TbBrandCSharp style={{ color: '#239120' }} />,
      'R': <SiR style={{ color: '#276DC3' }} />,
      'Swift': <SiSwift style={{ color: '#FA7343' }} />,
      'Go': <SiGo style={{ color: '#00ADD8' }} />,
      'Scala': <SiScala style={{ color: '#DC322F' }} />,
      
      // Machine Learning & AI
      'AI/ML': <FaBrain style={{ color: '#FF6B6B' }} />,
      'Machine Learning': <FaBrain style={{ color: '#FF6B6B' }} />,
      'Deep Learning': <FaBrain style={{ color: '#9B59B6' }} />,
      'TensorFlow': <SiTensorflow style={{ color: '#FF6F00' }} />,
      'PyTorch': <SiPytorch style={{ color: '#EE4C2C' }} />,
      'Keras': <SiKeras style={{ color: '#D00000' }} />,
      'Scikit-Learn': <SiScikitlearn style={{ color: '#F7931E' }} />,
      'OpenCV': <SiOpencv style={{ color: '#5C3EE8' }} />,
      'Computer Vision': <SiOpencv style={{ color: '#5C3EE8' }} />,
      'NLP': <FaBrain style={{ color: '#8E44AD' }} />,
      
      // Data Science & Analytics
      'Data Analysis': <FaCode style={{ color: '#2ECC71' }} />,
      'Data Science': <FaCode style={{ color: '#3498DB' }} />,
      'Statistics': <FaCode style={{ color: '#E74C3C' }} />,
      'Pandas': <SiPandas style={{ color: '#150458' }} />,
      'NumPy': <SiNumpy style={{ color: '#013243' }} />,
      'Jupyter': <SiJupyter style={{ color: '#F37626' }} />,
      'Tableau': <SiTableau style={{ color: '#E97627' }} />,
      'Grafana': <SiGrafana style={{ color: '#F46800' }} />,
      
      // Big Data
      'Apache Hadoop': <SiApachehadoop style={{ color: '#66CCFF' }} />,
      'Apache Spark': <SiApachespark style={{ color: '#E25A1C' }} />,
      'Big Data': <FaDatabase style={{ color: '#FF9500' }} />,
      
      // Databases
      'MySQL': <SiMysql style={{ color: '#4479A1' }} />,
      'PostgreSQL': <SiPostgresql style={{ color: '#336791' }} />,
      'MongoDB': <SiMongodb style={{ color: '#47A248' }} />,
      'SQLite': <SiSqlite style={{ color: '#003B57' }} />,
      'Database': <FaDatabase style={{ color: '#336791' }} />,
      'Database Systems': <FaDatabase style={{ color: '#336791' }} />,
      'Database Design': <FaDatabase style={{ color: '#336791' }} />,
      
      // Cloud & DevOps
      'AWS': <FaAws style={{ color: '#FF9900' }} />,
      'Google Cloud': <SiGooglecloud style={{ color: '#4285F4' }} />,
      'Firebase': <SiFirebase style={{ color: '#FFCA28' }} />,
      'DigitalOcean': <SiDigitalocean style={{ color: '#0080FF' }} />,
      'Docker': <FaDocker style={{ color: '#2496ED' }} />,
      'Kubernetes': <SiKubernetes style={{ color: '#326CE5' }} />,
      'Cloudflare': <SiCloudflare style={{ color: '#F38020' }} />,
      'Nginx': <SiNginx style={{ color: '#009639' }} />,
      'Cloud Computing': <FaCloud style={{ color: '#0080FF' }} />,
      
      // Development Tools
      'Git': <FaGitAlt style={{ color: '#F05032' }} />,
      'Linux': <FaLinux style={{ color: '#FCC624' }} />,
      'Node.js': <FaNodeJs style={{ color: '#339933' }} />,
      'IoT': <FaServer style={{ color: '#00D9FF' }} />,
      
      // Web Technologies
      'HTML5': <FaHtml5 style={{ color: '#E34F26' }} />,
      'CSS3': <FaCss3Alt style={{ color: '#1572B6' }} />,
      'Web Development': <FaCode style={{ color: '#61DAFB' }} />,
      'Web Technologies': <FaCode style={{ color: '#61DAFB' }} />,
      'Mobile App Development': <FaMobile style={{ color: '#25D366' }} />,
      
      // Academic Subjects
      'Advanced Algorithms': <FaCode style={{ color: '#8E44AD' }} />,
      'Software Engineering': <FaCode style={{ color: '#3498DB' }} />,
      'Data Structures': <FaCode style={{ color: '#E74C3C' }} />,
      'Programming': <FaCode style={{ color: '#2ECC71' }} />,
      'Mathematics': <FaCode style={{ color: '#F39C12' }} />,
      'Computer Networks': <FaServer style={{ color: '#9B59B6' }} />,
      'Operating Systems': <FaLinux style={{ color: '#34495E' }} />,
      
      // Package Management
      'PyPI': <FaPython style={{ color: '#3776AB' }} />,
      
      // Default
      'default': <FaCode style={{ color: '#00D9FF' }} />
    };
    
    return iconMap[tech] || iconMap['default'];
  };

  const workExperience = [
    {
      id: 'work-1',
      title: 'Intern Software Developer',
      subtitle: 'AI, IoT & Django Specialist',
      company: 'Serve Techno Research',
      location: 'Kollam, Kerala, India',
      period: '2023 - 2025',
      type: 'work',
      icon: <FaLaptopCode size={18} />,
      iconColor: '#00d9ff',
      description: 'Developing cutting-edge AI and IoT solutions using Django framework. Working on machine learning models, data processing pipelines, and full-stack applications. Leading multiple cross-functional teams in developing innovative solutions for marine automation systems and aerial data processing. Implementing advanced computer vision algorithms and natural language processing models for real-time data analysis.',
      technologies: ['Django', 'Flask', 'Python', 'AI/ML', 'React', 'React Native', 'IoT', 'PostgreSQL', 'Docker'],
      achievements: [
        'Built 5+ production-ready AI applications',
        'Built 20+ Academic projects',
        'Optimized system performance by 40%',
        'Led IoT integration projects',
        'Developed marine automation solutions',
        'Implemented real-time data processing systems'
      ]
    },
    {
      id: 'work-2',
      title: 'Freelance Developer',
      subtitle: 'Full Stack Web/ML/DL Developer',
      company: 'Self-Employed',
      location: 'Remote',
      period: '2019 - Present',
      type: 'work',
      icon: <FaUserTie size={18} />,
      iconColor: '#9333ea',
      description: 'Providing comprehensive development services including web applications, machine learning solutions, and deep learning projects for diverse clients worldwide. Specializing in end-to-end project delivery from concept to deployment, working with startups and enterprises to build scalable solutions. Expertise in modern web technologies, cloud architecture, and AI-powered applications.',
      technologies: ['TensorFlow', 'AWS', 'MongoDB', 'Node.js', 'Django', 'Flask', 'Python', 'AI/ML', 'React', 'React Native', 'IoT', 'PostgreSQL', 'Docker'],
      achievements: [
        '30+ successful project deliveries',
        'Maintained 98% client satisfaction rate',
        'Expertise across multiple tech stacks',
        'Built AI-powered SaaS applications',
        'Implemented cloud-native architectures',
        'Created scalable mobile applications'
      ]
    },
    {
      id: 'work-3',
      title: 'Programming Trainer',
      subtitle: 'Computer Science Instructor',
      company: 'G-Tec Computer Education',
      location: 'Karicode, Kollam, Kerala',
      period: 'May 2021 - September 2022',
      type: 'work',
      icon: <FaChalkboardTeacher size={18} />,
      iconColor: '#64ffda',
      description: 'Taught programming fundamentals and advanced concepts to students pursuing computer science education. Developed comprehensive curriculum covering multiple programming languages, database design, and software development methodologies. Mentored aspiring developers and guided them through hands-on projects and industry best practices.',
      technologies: ['Python', 'Java', 'C++', 'Web Development', 'Database Design'],
      achievements: [
        'Trained 200+ students successfully',
        'Developed interactive learning modules',
        'Achieved 95% student pass rate',
        'Created comprehensive course materials',
        'Established industry partnerships',
        'Launched coding bootcamp programs'
      ]
    }
  ];

  const education = [
    {
      id: 'edu-1',
      title: 'Master of Computer Application',
      subtitle: 'Advanced Computing & Software Development',
      company: 'University of Kerala',
      location: 'Kerala, India',
      period: '2023 - 2025',
      type: 'education',
      icon: <FaGraduationCap size={18} />,
      iconColor: '#f59e0b',
      description: 'Pursuing advanced studies in computer applications with focus on software engineering, data structures, algorithms, and emerging technologies. The program encompasses comprehensive training in modern software development methodologies, advanced database systems, machine learning applications, and mobile app development. Currently working on thesis research in AI-powered systems.',
      technologies: ['Advanced Algorithms', 'Software Engineering', 'Machine Learning', 'Database Systems', 'Web Technologies', 'Mobile App Development'],
      achievements: [
        'Maintaining excellent academic record',
        'Active in research projects',
        'Leadership in tech communities',
        'Published research papers',
        'Won multiple coding competitions',
        'Led student development programs'
      ]
    },
    {
      id: 'edu-2',
      title: 'Bachelor of Science in Computer Science',
      subtitle: 'Computer Science & Programming',
      company: 'University of Kerala',
      location: 'Kerala, India',
      period: '2019 - 2022',
      type: 'education',
      icon: <FaUniversity size={18} />,
      iconColor: '#10b981',
      description: 'Completed comprehensive undergraduate program covering fundamental and advanced computer science concepts with practical applications. The curriculum included extensive training in programming languages, data structures, algorithms, computer networks, operating systems, and modern web technologies. Graduated with distinction and strong foundation in theoretical and practical computer science.',
      technologies: ['Data Structures', 'Programming', 'Mathematics', 'Computer Networks', 'Operating Systems', 'Web Development', 'Cloud Computing'],
      achievements: [
        'Graduated with distinction',
        'Led multiple academic projects',
        'Published research papers',
        'Won best project awards',
        'Mentored junior students',
        'Active in coding clubs'
      ]
    }
  ];

  const getTimelineIcon = (type) => {
    switch (type) {
      case 'work':
        return <FaBriefcase size={16} />;
      case 'education':
        return <FaGraduationCap size={16} />;
      case 'certification':
        return <FaAward size={16} />;
      default:
        return <FaStar size={16} />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'work':
        return '#00d9ff';
      case 'education':
        return '#f59e0b';
      case 'certification':
        return '#ec4899';
      default:
        return '#64ffda';
    }
  };

  return (
    <section id="fh5co-resume" className="experience-section" ref={sectionRef}>
      {/* Particle Background */}
      {showParticles && (
        <div className="particle-container" ref={particleContainerRef}></div>
      )}

      <div className="modern-container">
        <div className="section-header" ref={headerRef}>
          <div className="header-badge">
            <FaBriefcase className="badge-icon" />
            <span>Career Journey</span>
          </div>
          <h2 className="section-title">Experience & Education</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            A comprehensive journey through professional experience, academic achievements, and continuous learning
          </p>
        </div>

        {/* Work Experience Section */}
        <div className="timeline-section">
          <div className="section-divider" ref={el => cardRefs.current[0] = el}>
            <div className="divider-icon work-icon">
              <FaBriefcase />
            </div>
            <h3 className="divider-title">Professional Experience</h3>
            <p className="divider-subtitle">Building innovative solutions and leading technical initiatives</p>
          </div>

          <div className="timeline" ref={timelineRef}>
            <div className="timeline-line"></div>
            {workExperience.map((item, index) => (
              <div
                key={item.id}
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                ref={el => cardRefs.current[index + 1] = el}
              >
                <div className="timeline-marker" style={{ '--marker-color': item.iconColor }}>
                  {getTimelineIcon(item.type)}
                  <div className="marker-pulse"></div>
                </div>
                
                <div className="timeline-card">
                  <div className="card-glow"></div>
                  
                  <div className="card-header">
                    <div className="role-icon" style={{ '--icon-color': item.iconColor }}>
                      {item.icon}
                    </div>
                    <div className="role-info">
                      <h4 className="role-title">{item.title}</h4>
                      <p className="role-subtitle">{item.subtitle}</p>
                      <div className="company-info">
                        <span className="company-name">{item.company}</span>
                        <div className="meta-info">
                          <span className="location">
                            <FaMapMarkerAlt />
                            {item.location}
                          </span>
                          <span className="period">
                            <FaCalendarAlt />
                            {item.period}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="role-badge" style={{ '--badge-color': item.iconColor }}>
                      {item.type}
                    </div>
                  </div>

                  <div className="card-content">
                    <p className="description">{item.description}</p>

                    <div className="technologies">
                      <h6 className="section-title-small">Technologies & Skills</h6>
                      <div className="tech-tags">
                        {item.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex} 
                            className="tech-tag"
                            style={{ '--delay': `${techIndex * 0.1}s` }}
                          >
                            {getTechIcon(tech)}
                            <span>{tech}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="achievements">
                      <h6 className="section-title-small">Key Achievements</h6>
                      <ul className="achievements-list">
                        {item.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="achievement-item">
                            <FaStar className="achievement-icon" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="timeline-section">
          <div className="section-divider" ref={el => cardRefs.current[workExperience.length + 1] = el}>
            <div className="divider-icon education-icon">
              <FaGraduationCap />
            </div>
            <h3 className="divider-title">Academics</h3>
            <p className="divider-subtitle">Academic foundation and continuous learning journey</p>
          </div>

          <div className="timeline">
            <div className="timeline-line"></div>
            {education.map((item, index) => (
              <div
                key={item.id}
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                ref={el => cardRefs.current[workExperience.length + index + 2] = el}
              >
                <div className="timeline-marker" style={{ '--marker-color': item.iconColor }}>
                  {getTimelineIcon(item.type)}
                  <div className="marker-pulse"></div>
                </div>
                
                <div className="timeline-card">
                  <div className="card-glow"></div>
                  
                  <div className="card-header">
                    <div className="role-icon" style={{ '--icon-color': item.iconColor }}>
                      {item.icon}
                    </div>
                    <div className="role-info">
                      <h4 className="role-title">{item.title}</h4>
                      <p className="role-subtitle">{item.subtitle}</p>
                      <div className="company-info">
                        <span className="company-name">{item.company}</span>
                        <div className="meta-info">
                          <span className="location">
                            <FaMapMarkerAlt />
                            {item.location}
                          </span>
                          <span className="period">
                            <FaCalendarAlt />
                            {item.period}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="role-badge" style={{ '--badge-color': item.iconColor }}>
                      {item.type}
                    </div>
                  </div>

                  <div className="card-content">
                    <p className="description">{item.description}</p>

                    <div className="technologies">
                      <h6 className="section-title-small">Core Subjects & Skills</h6>
                      <div className="tech-tags">
                        {item.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex} 
                            className="tech-tag"
                            style={{ '--delay': `${techIndex * 0.1}s` }}
                          >
                            {getTechIcon(tech)}
                            <span>{tech}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="achievements">
                      <h6 className="section-title-small">Highlights</h6>
                      <ul className="achievements-list">
                        {item.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="achievement-item">
                            <FaStar className="achievement-icon" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
        .experience-section {
          position: relative;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          overflow: hidden;
          padding: 100px 0;
          color: white;
          min-height: auto;
        }

        .experience-section::before {
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
          margin-bottom: 60px;
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
          max-width: 600px;
          margin: 0 auto 2rem;
          line-height: 1.6;
          font-weight: 400;
        }

        .timeline-section {
          margin-bottom: 3rem;
          position: relative;
          z-index: 2;
        }

        .section-divider {
          text-align: center;
          margin-bottom: 3rem;
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .section-divider.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .divider-icon {
          width: 60px;
          height: 60px;
          margin: 0 auto 1rem;
          background: linear-gradient(135deg, rgba(0, 217, 255, 0.2), rgba(147, 51, 234, 0.2));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: #00d9ff;
          border: 2px solid rgba(0, 217, 255, 0.3);
          animation: iconFloat 4s ease-in-out infinite;
        }

        .work-icon {
          color: #00d9ff;
        }

        .education-icon {
          color: #f59e0b;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(147, 51, 234, 0.2));
          border-color: rgba(245, 158, 11, 0.3);
        }

        .divider-title {
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #00d9ff, #9333ea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .divider-subtitle {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 500px;
          margin: 0 auto;
        }

        .timeline {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
        }

        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(to bottom, #00d9ff, #9333ea, #64ffda);
          transform: translateX(-50%);
          border-radius: 2px;
          opacity: 0;
          animation: lineGrow 2s ease-out 0.5s forwards;
        }

        .timeline-item {
          position: relative;
          margin-bottom: 2.5rem;
          opacity: 0;
          transform: translateY(40px) scale(0.95);
          transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .timeline-item.animate-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .timeline-item.left .timeline-card {
          margin-right: 55%;
          margin-left: 0;
        }

        .timeline-item.right .timeline-card {
          margin-left: 55%;
          margin-right: 0;
        }

        .timeline-marker {
          position: absolute;
          left: 50%;
          top: 1rem;
          transform: translateX(-50%);
          width: 40px;
          height: 40px;
          background: var(--marker-color, #00d9ff);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1rem;
          z-index: 10;
          box-shadow: 0 0 20px rgba(0, 217, 255, 0.5);
          border: 3px solid rgba(255, 255, 255, 0.1);
          position: relative;
        }

        .marker-pulse {
          position: absolute;
          top: -6px;
          left: -6px;
          right: -6px;
          bottom: -6px;
          border: 2px solid var(--marker-color, #00d9ff);
          border-radius: 50%;
          animation: markerPulse 2s ease-in-out infinite;
        }

        .timeline-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          transition: all 0.5s ease;
          box-shadow: 
            0 10px 25px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .timeline-card:hover {
          transform: translateY(-5px) scale(1.02);
          border-color: rgba(0, 217, 255, 0.4);
          box-shadow: 
            0 20px 40px rgba(0, 217, 255, 0.15),
            0 0 30px rgba(0, 217, 255, 0.1);
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

        .timeline-card:hover .card-glow {
          opacity: 1;
          animation-play-state: paused;
        }

        .card-header {
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          position: relative;
          z-index: 2;
        }

        .role-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--icon-color);
          font-size: 1.2rem;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .timeline-card:hover .role-icon {
          background: linear-gradient(135deg, rgba(0, 217, 255, 0.2), rgba(147, 51, 234, 0.2));
          border-color: var(--icon-color);
          transform: scale(1.1);
        }

        .role-info {
          flex: 1;
          min-width: 0;
        }

        .role-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: white;
          margin: 0 0 0.25rem 0;
          line-height: 1.2;
        }

        .role-subtitle {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0 0 0.75rem 0;
          font-weight: 500;
        }

        .company-info {
          margin-bottom: 0;
        }

        .company-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: #00d9ff;
          display: block;
          margin-bottom: 0.5rem;
        }

        .meta-info {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .location, .period {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 500;
        }

        .location svg, .period svg {
          font-size: 0.75rem;
          color: #64ffda;
        }

        .role-badge {
          padding: 0.4rem 0.8rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid var(--badge-color);
          border-radius: 16px;
          color: var(--badge-color);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: capitalize;
          backdrop-filter: blur(10px);
          flex-shrink: 0;
          height: fit-content;
        }

        .card-content {
          padding: 1.5rem;
          position: relative;
          z-index: 2;
        }

        .description {
          font-size: 0.9rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 1.5rem;
          text-align: justify;
        }

        .technologies, .achievements {
          margin-bottom: 1.5rem;
        }

        .section-title-small {
          font-size: 0.85rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          margin: 0 0 1rem 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .section-title-small::before {
          content: '';
          width: 20px;
          height: 2px;
          background: linear-gradient(90deg, #00d9ff, #9333ea);
          border-radius: 1px;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech-tag {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.8rem;
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 14px;
          font-size: 0.75rem;
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
          box-shadow: 0 4px 12px rgba(0, 217, 255, 0.3);
          border-color: transparent;
        }

        .tech-tag svg {
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .achievements-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 0.5rem;
        }

        .achievement-item {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          padding: 0.4rem 0;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.4;
        }

        .achievement-icon {
          color: #f59e0b;
          font-size: 0.7rem;
          flex-shrink: 0;
          margin-top: 0.1rem;
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

        @keyframes iconFloat {
          0%, 100% { 
            transform: translateY(0px);
          }
          50% { 
            transform: translateY(-10px);
          }
        }

        @keyframes lineGrow {
          from { 
            opacity: 0;
            height: 0;
          }
          to { 
            opacity: 1;
            height: 100%;
          }
        }

        @keyframes markerPulse {
          0%, 100% { 
            opacity: 0.5;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.1);
          }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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
        @media (max-width: 768px) {
          .timeline-line {
            left: 30px;
          }

          .timeline-marker {
            left: 30px;
            transform: translateX(-50%);
            width: 35px;
            height: 35px;
          }

          .timeline-item.left .timeline-card,
          .timeline-item.right .timeline-card {
            margin-left: 70px;
            margin-right: 0;
          }

          .card-header {
            flex-direction: column;
            gap: 1rem;
            padding: 1.25rem;
          }

          .role-icon {
            align-self: center;
            width: 45px;
            height: 45px;
          }

          .meta-info {
            flex-direction: column;
            gap: 0.5rem;
          }

          .tech-tags {
            gap: 0.4rem;
          }

          .tech-tag {
            padding: 0.3rem 0.6rem;
            font-size: 0.7rem;
          }

          .achievements-list {
            grid-template-columns: 1fr;
          }

          .floating-elements {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .experience-section {
            padding: 80px 0;
          }

          .section-header {
            margin-bottom: 40px;
          }

          .timeline-section {
            margin-bottom: 2rem;
          }

          .card-content {
            padding: 1.25rem;
          }

          .divider-title {
            font-size: 1.5rem;
          }

          .role-title {
            font-size: 1.1rem;
          }

          .description {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Experience;