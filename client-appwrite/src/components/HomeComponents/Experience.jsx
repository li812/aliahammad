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
  FaStar
} from 'react-icons/fa';
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
      description: 'Developing cutting-edge AI and IoT solutions using Django framework. Working on machine learning models, data processing pipelines, and full-stack applications.',
      technologies: ['Django', 'Flask', 'Python', 'AI/ML', 'React', 'React Native', 'IoT', 'PostgreSQL', 'Docker'],
      achievements: [
        'Built 5+ production-ready applications',
        'Built 20+ Academic projects',
        'Optimized system performance by 40%',
        'Led IoT integration projects'
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
      description: 'Providing comprehensive development services including web applications, machine learning solutions, and deep learning projects for diverse clients.',
      technologies: ['TensorFlow', 'AWS', 'MongoDB', 'Node.js', 'Django', 'Flask', 'Python', 'AI/ML', 'React', 'React Native', 'IoT', 'PostgreSQL', 'Docker'],
      achievements: [
        '30+ successful project deliveries',
        'Maintained 98% client satisfaction rate',
        'Expertise across multiple tech stacks'
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
      description: 'Taught programming fundamentals and advanced concepts to students. Developed curriculum and mentored aspiring developers.',
      technologies: ['Python', 'Java', 'C++', 'Web Development', 'Database Design'],
      achievements: [
        'Trained 50+ students successfully',
        'Developed interactive learning modules',
        'Achieved 95% student pass rate'
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
      description: 'Pursuing advanced studies in computer applications with focus on software engineering, data structures, algorithms, and emerging technologies.',
      technologies: ['Advanced Algorithms', 'Software Engineering', 'Machine Learning', 'Database Systems', 'Web Technologies', 'Mobile App Development'],
      achievements: [
        'Maintaining excellent academic record',
        'Active in research projects',
        'Leadership in tech communities'
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
      description: 'Completed comprehensive undergraduate program covering fundamental and advanced computer science concepts with practical applications.',
      technologies: ['Data Structures', 'Programming', 'Mathematics', 'Computer Networks', 'Operating Systems', 'Web Development', 'Cloud Computing'],
      achievements: [
        'Graduated with distinction',
        'Led multiple academic projects',
        'Published research papers'
      ]
    },
    {
      id: 'edu-3',
      title: 'Master in Data Science',
      subtitle: 'Specialized Data Science Program',
      company: 'SMEClabs',
      location: 'Online',
      period: '2023',
      type: 'certification',
      icon: <FaCertificate size={18} />,
      iconColor: '#ec4899',
      description: 'Intensive program focused on data science methodologies, machine learning algorithms, and practical implementation of AI solutions.',
      technologies: ['Machine Learning', 'Data Analysis', 'Python', 'Statistics', 'Deep Learning'],
      achievements: [
        'Completed 15+ hands-on projects',
        'Mastered ML/DL frameworks',
        'Industry-relevant certifications'
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
                  
                  {/* Compact Header */}
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

                  {/* Compact Content */}
                  <div className="card-content">
                    <p className="description">{item.description}</p>

                    {/* Compact Technologies */}
                    <div className="technologies">
                      <div className="tech-tags">
                        {item.technologies.slice(0, 15).map((tech, techIndex) => (
                          <span 
                            key={techIndex} 
                            className="tech-tag"
                            style={{ '--delay': `${techIndex * 0.1}s` }}
                          >
                            {tech}
                          </span>
                        ))}
                        {item.technologies.length > 8 && (
                          <span className="tech-tag more-tech">
                            +{item.technologies.length - 8}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Compact Achievements */}
                    <div className="achievements">
                      <ul className="achievements-list">
                        {item.achievements.slice(0, 2).map((achievement, achIndex) => (
                          <li key={achIndex} className="achievement-item">
                            <FaStar className="achievement-icon" />
                            {achievement}
                          </li>
                        ))}
                        {item.achievements.length > 2 && (
                          <li className="achievement-item more-achievements">
                            <FaStar className="achievement-icon" />
                            +{item.achievements.length - 2} more achievements
                          </li>
                        )}
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
            <h3 className="divider-title">Education & Certifications</h3>
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
                  
                  {/* Compact Header */}
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

                  {/* Compact Content */}
                  <div className="card-content">
                    <p className="description">{item.description}</p>

                    {/* Compact Technologies */}
                    <div className="technologies">
                      <div className="tech-tags">
                        {item.technologies.slice(0, 4).map((tech, techIndex) => (
                          <span 
                            key={techIndex} 
                            className="tech-tag"
                            style={{ '--delay': `${techIndex * 0.1}s` }}
                          >
                            {tech}
                          </span>
                        ))}
                        {item.technologies.length > 8 && (
                          <span className="tech-tag more-tech">
                            +{item.technologies.length - 8}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Compact Achievements */}
                    <div className="achievements">
                      <ul className="achievements-list">
                        {item.achievements.slice(0, 2).map((achievement, achIndex) => (
                          <li key={achIndex} className="achievement-item">
                            <FaStar className="achievement-icon" />
                            {achievement}
                          </li>
                        ))}
                        {item.achievements.length > 2 && (
                          <li className="achievement-item more-achievements">
                            <FaStar className="achievement-icon" />
                            +{item.achievements.length - 2} more highlights
                          </li>
                        )}
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
          max-height: 440px;
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
          padding: 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          position: relative;
          z-index: 2;
        }

        .role-icon {
          width: 45px;
          height: 45px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--icon-color);
          font-size: 1.1rem;
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
          font-size: 1.1rem;
          font-weight: 700;
          color: white;
          margin: 0 0 0.25rem 0;
          line-height: 1.2;
        }

        .role-subtitle {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0 0 0.75rem 0;
          font-weight: 500;
        }

        .company-info {
          margin-bottom: 0;
        }

        .company-name {
          font-size: 1rem;
          font-weight: 600;
          color: #00d9ff;
          display: block;
          margin-bottom: 0.25rem;
        }

        .meta-info {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .location, .period {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 500;
        }

        .location svg, .period svg {
          font-size: 0.7rem;
          color: #64ffda;
        }

        .role-badge {
          padding: 0.35rem 0.75rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid var(--badge-color);
          border-radius: 15px;
          color: var(--badge-color);
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: capitalize;
          backdrop-filter: blur(10px);
          flex-shrink: 0;
          height: fit-content;
        }

        .card-content {
          padding: 1.25rem;
          position: relative;
          z-index: 2;
        }

        .description {
          font-size: 0.85rem;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .technologies {
          margin-bottom: 1rem;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .tech-tag {
          padding: 0.25rem 0.6rem;
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
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
          box-shadow: 0 4px 12px rgba(0, 217, 255, 0.3);
          border-color: transparent;
        }

        .tech-tag.more-tech {
          background: rgba(0, 217, 255, 0.1);
          color: #00d9ff;
          border-color: rgba(0, 217, 255, 0.3);
        }

        .achievements {
          margin-top: 1rem;
        }

        .achievements-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .achievement-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem 0;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.3;
        }

        .achievement-icon {
          color: #f59e0b;
          font-size: 0.6rem;
          flex-shrink: 0;
        }

        .achievement-item.more-achievements {
          color: rgba(0, 217, 255, 0.8);
          font-style: italic;
        }

        .achievement-item.more-achievements .achievement-icon {
          color: #00d9ff;
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
            gap: 0.75rem;
            padding: 1rem;
          }

          .role-icon {
            align-self: center;
            width: 40px;
            height: 40px;
          }

          .meta-info {
            flex-direction: column;
            gap: 0.25rem;
          }

          .tech-tags {
            gap: 0.3rem;
          }

          .tech-tag {
            padding: 0.2rem 0.5rem;
            font-size: 0.65rem;
          }

          .timeline-card {
            max-height: none;
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
            padding: 1rem;
          }

          .divider-title {
            font-size: 1.5rem;
          }

          .role-title {
            font-size: 1rem;
          }

          .description {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Experience;