import React, { useEffect, useRef, useState } from 'react';
import {
  FaCertificate,
  FaAward,
  FaTrophy,
  FaMedal,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaIdCard,
  FaCheckCircle,
  FaRocket,
  FaBrain,
  FaCode,
  FaDatabase,
  FaShieldAlt,
  FaChartLine,
  FaRobot,
  FaCloud,
  FaGraduationCap,
  FaMobile,
  FaLock,
  FaSearch,
  FaGamepad,
  FaInfinity,
  FaStar,
  FaBuilding,
  FaUniversity,
  FaLaptop,
  FaChartBar,
  FaTimes
} from 'react-icons/fa';
import {
  SiMeta,
  SiGoogle,
  SiKaggle,
  SiCoursera,
  SiFreecodecamp
} from 'react-icons/si';

const CertificationsAndLicenses = ({
  showParticles = true,
  animationDuration = 1000,
  staggerDelay = 150,
  cardHoverEffect = true,
  showFilters = true
}) => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const particleContainerRef = useRef(null);
  const headerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredCertifications, setFilteredCertifications] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get provider icon with proper fallbacks and course folder images
  const getProviderIcon = (provider) => {
    const iconMap = {
      'IBM': <img src="/src/assets/Course/IBM.png" alt="IBM" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />,
      'Google': <img src="/src/assets/Course/google.png" alt="Google" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />,
      'Meta': <SiMeta style={{ color: '#0668E1', fontSize: '40px' }} />,
      'Kaggle': <SiKaggle style={{ color: '#20BEFF', fontSize: '40px' }} />,
      'Coursera': <SiCoursera style={{ color: '#0056D3', fontSize: '40px' }} />,
      'freeCodeCamp': <SiFreecodecamp style={{ color: '#0A0A23', fontSize: '40px' }} />,
      'Maven Analytics': <FaChartLine style={{ color: '#FF6B35', fontSize: '40px' }} />,
      'SMEClabs': <FaGraduationCap style={{ color: '#8B5CF6', fontSize: '40px' }} />,
      'Global Tech Council': <FaShieldAlt style={{ color: '#10B981', fontSize: '40px' }} />,
      'Skillshop': <SiGoogle style={{ color: '#34A853', fontSize: '40px' }} />
    };
    return iconMap[provider] || <FaCertificate style={{ color: '#00d9ff', fontSize: '40px' }} />;
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    const iconMap = {
      'Data Science': <FaDatabase style={{ color: '#3B82F6' }} />,
      'AI/ML': <FaBrain style={{ color: '#8B5CF6' }} />,
      'Web Development': <FaCode style={{ color: '#10B981' }} />,
      'Cybersecurity': <FaShieldAlt style={{ color: '#EF4444' }} />,
      'Cloud': <FaCloud style={{ color: '#0EA5E9' }} />,
      'Mobile': <FaMobile style={{ color: '#F59E0B' }} />,
      'Analytics': <FaChartLine style={{ color: '#EC4899' }} />,
      'General': <FaAward style={{ color: '#64748B' }} />
    };
    return iconMap[category] || <FaCertificate style={{ color: '#00d9ff' }} />;
  };

  // Get status badge
  const getStatusBadge = (expires) => {
    if (!expires || expires === '–') {
      return { text: 'Lifetime', color: '#10B981', icon: <FaInfinity /> };
    }

    const expireDate = new Date(expires);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expireDate - today) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry > 365) {
      return { text: 'Valid', color: '#10B981', icon: <FaCheckCircle /> };
    } else if (daysUntilExpiry > 90) {
      return { text: 'Expiring Soon', color: '#F59E0B', icon: <FaCalendarAlt /> };
    } else {
      return { text: 'Expired', color: '#EF4444', icon: <FaCalendarAlt /> };
    }
  };

  // Open modal with selected certificate
  const openModal = (cert) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
    setTimeout(() => setSelectedCert(null), 300);
  };

  // Certifications data
  const certifications = [
    {
      id: 'ibm-ds-prof',
      title: 'IBM Data Science Professional Certificate',
      provider: 'IBM',
      issuedDate: 'Jun 2025',
      credentialId: 'HJCWGQRTXGMY',
      verificationLink: 'https://www.credly.com/org/ibm',
      expires: '–',
      category: 'Data Science',
      level: 'Professional',
      description: 'Comprehensive program covering data science methodologies, Python programming, machine learning, and data visualization.',
      skills: ['Python', 'Machine Learning', 'Data Analysis', 'SQL', 'Data Visualization'],
      featured: true
    },
    {
      id: 'ibm-ai-dev',
      title: 'IBM AI Developer Specialization',
      provider: 'IBM',
      issuedDate: 'Jun 2025',
      credentialId: '8CVSR0YCQIAW',
      verificationLink: 'https://www.credly.com/org/ibm',
      expires: '–',
      category: 'AI/ML',
      level: 'Specialization',
      description: 'Advanced AI development skills including machine learning, deep learning, and AI application development.',
      skills: ['AI Development', 'Machine Learning', 'Deep Learning', 'Python', 'TensorFlow'],
      featured: true
    },
    {
      id: 'ibm-capstone',
      title: 'Applied Data Science Capstone',
      provider: 'IBM',
      issuedDate: 'Jun 2025',
      credentialId: '7YPR5V2FENN5',
      verificationLink: 'https://www.credly.com/org/ibm',
      expires: '–',
      category: 'Data Science',
      level: 'Advanced',
      description: 'Capstone project demonstrating end-to-end data science skills and real-world application.',
      skills: ['Project Management', 'Data Science', 'Machine Learning', 'Python', 'Research']
    },
    {
      id: 'ibm-gen-ai',
      title: 'Building Generative AI-Powered Apps with Python',
      provider: 'IBM',
      issuedDate: 'Jun 2025',
      credentialId: 'KIVV7W5OXT5P',
      verificationLink: 'https://www.credly.com/org/ibm',
      expires: '–',
      category: 'AI/ML',
      level: 'Advanced',
      description: 'Developing generative AI applications using Python and modern AI frameworks.',
      skills: ['Generative AI', 'Python', 'LLMs', 'AI Applications', 'GPT']
    },
    {
      id: 'ibm-data-analysis',
      title: 'Data Analysis with Python',
      provider: 'IBM',
      issuedDate: 'Jun 2025',
      credentialId: 'YE9TIF63NW9Y',
      verificationLink: 'https://www.credly.com/org/ibm',
      expires: '–',
      category: 'Data Science',
      level: 'Intermediate',
      description: 'Python-based data analysis using pandas, numpy, and statistical methods.',
      skills: ['Python', 'Pandas', 'NumPy', 'Data Analysis', 'Statistics']
    },
    {
      id: 'ibm-ml-python',
      title: 'Machine Learning with Python',
      provider: 'IBM',
      issuedDate: 'Jun 2025',
      credentialId: 'O78W82RN4JAH',
      verificationLink: 'https://www.credly.com/org/ibm',
      expires: '–',
      category: 'AI/ML',
      level: 'Intermediate',
      description: 'Machine learning algorithms and implementation using Python and scikit-learn.',
      skills: ['Machine Learning', 'Python', 'Scikit-learn', 'Algorithms', 'Model Evaluation']
    },
    {
      id: 'ibm-python-ds-ai',
      title: 'Python for Data Science and AI',
      provider: 'IBM',
      issuedDate: 'Jun 2025',
      credentialId: '–',
      verificationLink: 'https://www.credly.com/org/ibm',
      expires: '–',
      category: 'Data Science',
      level: 'Beginner',
      description: 'Foundation course in Python programming for data science and AI applications.',
      skills: ['Python', 'Programming', 'Data Science', 'AI Fundamentals', 'Libraries']
    },
    {
      id: 'meta-react-native',
      title: 'React Native',
      provider: 'Meta',
      issuedDate: 'May 2025',
      credentialId: 'PZES6QYN8OHG',
      verificationLink: 'https://www.coursera.org/professional-certificates/meta-react-native',
      expires: '–',
      category: 'Mobile',
      level: 'Professional',
      description: 'Mobile app development using React Native framework for cross-platform applications.',
      skills: ['React Native', 'Mobile Development', 'JavaScript', 'iOS', 'Android'],
      featured: true
    },
    {
      id: 'ibm-ds-orientation',
      title: 'Data Science Orientation',
      provider: 'IBM',
      issuedDate: 'May 2025',
      credentialId: '–',
      verificationLink: 'https://www.credly.com/org/ibm',
      expires: '–',
      category: 'Data Science',
      level: 'Beginner',
      description: 'Introduction to data science concepts, methodologies, and career paths.',
      skills: ['Data Science', 'Analytics', 'Career Development', 'Methodology', 'Overview']
    },
    {
      id: 'google-cybersecurity',
      title: 'Google Cybersecurity Specialization',
      provider: 'Google',
      issuedDate: 'Mar 2024',
      credentialId: 'DWY7Z7NHHR4V',
      verificationLink: 'https://www.coursera.org/professional-certificates/google-cybersecurity',
      expires: '–',
      category: 'Cybersecurity',
      level: 'Professional',
      description: 'Comprehensive cybersecurity program covering security fundamentals, risk management, and incident response.',
      skills: ['Cybersecurity', 'Risk Management', 'Incident Response', 'Security Analysis', 'Network Security'],
      featured: true
    },
    {
      id: 'google-cybersecurity-foundations',
      title: 'Foundations of Cybersecurity',
      provider: 'Google',
      issuedDate: 'Dec 2023',
      credentialId: '–',
      verificationLink: 'https://www.coursera.org/learn/foundations-of-cybersecurity',
      expires: '–',
      category: 'Cybersecurity',
      level: 'Beginner',
      description: 'Foundational concepts in cybersecurity including threats, vulnerabilities, and security controls.',
      skills: ['Security Fundamentals', 'Threat Analysis', 'Cybersecurity Concepts', 'Risk Assessment', 'Compliance']
    },
    {
      id: 'fcc-ml-python',
      title: 'Machine Learning with Python',
      provider: 'freeCodeCamp',
      issuedDate: 'Sep 2023',
      credentialId: '–',
      verificationLink: 'https://freecodecamp.org/certification',
      expires: '–',
      category: 'AI/ML',
      level: 'Intermediate',
      description: 'Practical machine learning implementation using Python and popular ML libraries.',
      skills: ['Machine Learning', 'Python', 'TensorFlow', 'Neural Networks', 'Data Processing']
    },
    {
      id: 'maven-chatgpt',
      title: 'ChatGPT for Data Analytics',
      provider: 'Maven Analytics',
      issuedDate: 'Jul 2023',
      credentialId: '–',
      verificationLink: 'https://www.mavenanalytics.io',
      expires: '–',
      category: 'Analytics',
      level: 'Intermediate',
      description: 'Using ChatGPT and AI tools for enhanced data analysis and reporting workflows.',
      skills: ['ChatGPT', 'Data Analytics', 'AI Tools', 'Automation', 'Productivity']
    },
    {
      id: 'kaggle-game-ai',
      title: 'Intro to Game AI and Reinforcement Learning',
      provider: 'Kaggle',
      issuedDate: 'Jul 2023',
      credentialId: '–',
      verificationLink: 'https://www.kaggle.com/learn/certification',
      expires: '–',
      category: 'AI/ML',
      level: 'Intermediate',
      description: 'Game AI development and reinforcement learning algorithms for intelligent agents.',
      skills: ['Reinforcement Learning', 'Game AI', 'Algorithms', 'Python', 'Agent Development']
    },
    {
      id: 'kaggle-intermediate-ml',
      title: 'Intermediate Machine Learning',
      provider: 'Kaggle',
      issuedDate: 'May 2023',
      credentialId: '–',
      verificationLink: 'https://www.kaggle.com/learn/certification',
      expires: '–',
      category: 'AI/ML',
      level: 'Intermediate',
      description: 'Advanced machine learning techniques including ensemble methods and feature engineering.',
      skills: ['Advanced ML', 'Ensemble Methods', 'Feature Engineering', 'Model Optimization', 'Kaggle']
    },
    {
      id: 'google-analytics',
      title: 'Advanced Google Analytics',
      provider: 'Google',
      issuedDate: 'Apr 2023',
      credentialId: '–',
      verificationLink: 'https://skillshop.exceedlms.com',
      expires: 'Apr 2026',
      category: 'Analytics',
      level: 'Advanced',
      description: 'Advanced web analytics using Google Analytics for data-driven decision making.',
      skills: ['Google Analytics', 'Web Analytics', 'Data Analysis', 'Digital Marketing', 'Reporting']
    },
    {
      id: 'fcc-data-analysis',
      title: 'Data Analysis with Python',
      provider: 'freeCodeCamp',
      issuedDate: 'Apr 2023',
      credentialId: '–',
      verificationLink: 'https://freecodecamp.org/certification',
      expires: '–',
      category: 'Data Science',
      level: 'Intermediate',
      description: 'Data analysis and visualization using Python, pandas, and matplotlib.',
      skills: ['Data Analysis', 'Python', 'Pandas', 'Matplotlib', 'Visualization']
    },
    {
      id: 'kaggle-intro-ml',
      title: 'Intro to Machine Learning',
      provider: 'Kaggle',
      issuedDate: 'Apr 2023',
      credentialId: '–',
      verificationLink: 'https://www.kaggle.com/learn/certification',
      expires: '–',
      category: 'AI/ML',
      level: 'Beginner',
      description: 'Introduction to machine learning concepts and basic algorithm implementation.',
      skills: ['Machine Learning Basics', 'Algorithms', 'Python', 'Data Science', 'Kaggle']
    },
    {
      id: 'smeclabs-data-science',
      title: 'Master in Data Science',
      provider: 'SMEClabs',
      issuedDate: 'Mar 2023',
      credentialId: '98893',
      verificationLink: 'https://smeclabs.com',
      expires: '–',
      category: 'Data Science',
      level: 'Master',
      description: 'Comprehensive master\'s level program in data science methodologies and applications.',
      skills: ['Data Science', 'Advanced Analytics', 'Research', 'Project Management', 'Leadership'],
      featured: true
    },
    {
      id: 'gtc-white-hat',
      title: 'Certified White Hat Hacker',
      provider: 'Global Tech Council',
      issuedDate: 'Aug 2022',
      credentialId: '–',
      verificationLink: 'https://globaltechcouncil.org',
      expires: '–',
      category: 'Cybersecurity',
      level: 'Professional',
      description: 'Ethical hacking and penetration testing certification for cybersecurity professionals.',
      skills: ['Ethical Hacking', 'Penetration Testing', 'Security Assessment', 'Vulnerability Analysis', 'OWASP']
    },
    {
      id: 'google-digital-marketing',
      title: 'Fundamentals of Digital Marketing',
      provider: 'Google',
      issuedDate: 'Jun 2021',
      credentialId: '4NT GTE 5RK',
      verificationLink: 'https://learndigital.withgoogle.com',
      expires: '–',
      category: 'General',
      level: 'Beginner',
      description: 'Digital marketing fundamentals including SEO, SEM, social media, and analytics.',
      skills: ['Digital Marketing', 'SEO', 'SEM', 'Social Media', 'Analytics']
    }
  ];

  // Filter certifications
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredCertifications(certifications);
    } else {
      setFilteredCertifications(
        certifications.filter(cert => cert.category === activeFilter)
      );
    }
  }, [activeFilter]);

  // Get unique categories for filters
  const categories = ['all', ...new Set(certifications.map(cert => cert.category))];

  useEffect(() => {
    // Simple intersection observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, index * staggerDelay);
          }
        });
      },
      { threshold: 0.1, rootMargin: '-20px 0px' }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    cardRefs.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [staggerDelay, filteredCertifications]);

  return (
    <section id="fh5co-certifications" className="certifications-section" ref={sectionRef}>
      <div className="modern-container">
        <div className="section-header" ref={headerRef}>
          <div className="header-badge">
            <FaCertificate className="badge-icon" />
            <span>Achievements</span>
          </div>
          <h2 className="section-title">Certifications & Licenses</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            Professional certifications and continuous learning journey across cutting-edge technologies
          </p>
        </div>

        {/* Statistics Section */}
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-icon">
              <FaCertificate />
            </div>
            <div className="stat-info">
              <span className="stat-number">{certifications.length}</span>
              <span className="stat-label">Total Certifications</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaAward />
            </div>
            <div className="stat-info">
              <span className="stat-number">{certifications.filter(cert => cert.featured).length}</span>
              <span className="stat-label">Featured Achievements</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaBrain />
            </div>
            <div className="stat-info">
              <span className="stat-number">{new Set(categories.slice(1)).size}</span>
              <span className="stat-label">Skill Categories</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaCheckCircle />
            </div>
            <div className="stat-info">
              <span className="stat-number">{certifications.filter(cert => getStatusBadge(cert.expires).text === 'Lifetime').length}</span>
              <span className="stat-label">Lifetime Valid</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        {showFilters && (
          <div className="filter-container">
            <div className="filter-tabs">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-tab ${activeFilter === category ? 'active' : ''}`}
                  onClick={() => setActiveFilter(category)}
                >
                  {category === 'all' ? (
                    <FaStar className="tab-icon" />
                  ) : (
                    getCategoryIcon(category)
                  )}
                  <span>{category === 'all' ? 'All' : category}</span>
                  <span className="count">
                    {category === 'all'
                      ? certifications.length
                      : certifications.filter(cert => cert.category === category).length
                    }
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Compact Certifications Grid - 3 cards per row */}
        <div className="certifications-grid">
          {filteredCertifications.map((cert, index) => (
            <div
              key={cert.id}
              className={`compact-cert-card ${cert.featured ? 'featured' : ''}`}
              ref={el => cardRefs.current[index] = el}
              onClick={() => openModal(cert)}
            >
              {/* Provider Icon */}
              <div className="cert-provider-icon">
                {getProviderIcon(cert.provider)}
              </div>

              {/* Certificate Info */}
              <div className="cert-info">
                <h3 className="cert-title">{cert.title}</h3>
                <div className="cert-meta">
                  <span className="cert-provider">{cert.provider}</span>
                  <span className="cert-date">{cert.issuedDate}</span>
                </div>
                <div className="cert-category">
                  {getCategoryIcon(cert.category)}
                  <span>{cert.category}</span>
                </div>
                {cert.credentialId !== '–' && (
                  <div className="cert-id">
                    <FaIdCard />
                    <span>ID: {cert.credentialId}</span>
                  </div>
                )}
              </div>

              {/* Status Badge */}
              <div
                className="status-indicator"
                style={{ '--status-color': getStatusBadge(cert.expires).color }}
              >
                {getStatusBadge(cert.expires).icon}
              {cert.featured && (
                <div className="featured-badge">
                  <FaTrophy />
                </div>
              )}
              </div>

              
            </div>
          ))}
        </div>



        {/* Floating Tech Elements */}
        <div className="floating-elements">
          <div className="tech-float tech-1"><FaRocket /></div>
          <div className="tech-float tech-2"><FaBrain /></div>
          <div className="tech-float tech-3"><FaCode /></div>
          <div className="tech-float tech-4"><FaDatabase /></div>
          <div className="tech-float tech-5"><FaShieldAlt /></div>
        </div>
      </div>

      {/* Modal with Flip Animation */}
      {isModalOpen && selectedCert && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className={`modal-card ${isModalOpen ? 'flipped' : ''}`}>
              {/* Front Side */}
              <div className="modal-front">
                <div className="modal-header">
                  <div className="modal-provider">
                    {getProviderIcon(selectedCert.provider)}
                    <div>
                      <h2>{selectedCert.title}</h2>
                      <p>{selectedCert.provider} • {selectedCert.level}</p>
                    </div>
                  </div>
                  <button className="modal-close" onClick={closeModal}>
                    <FaTimes />
                  </button>
                </div>

                <div className="modal-content">
                  <div className="modal-details">
                    <div className="detail-item">
                      <FaCalendarAlt className="detail-icon" />
                      <div>
                        <span className="detail-label">Issued Date</span>
                        <span className="detail-value">{selectedCert.issuedDate}</span>
                      </div>
                    </div>

                    {selectedCert.credentialId !== '–' && (
                      <div className="detail-item">
                        <FaIdCard className="detail-icon" />
                        <div>
                          <span className="detail-label">Credential ID</span>
                          <span className="detail-value">{selectedCert.credentialId}</span>
                        </div>
                      </div>
                    )}

                    <div className="detail-item">
                      <div
                        className="status-badge-large"
                        style={{ '--status-color': getStatusBadge(selectedCert.expires).color }}
                      >
                        {getStatusBadge(selectedCert.expires).icon}
                        <span>{getStatusBadge(selectedCert.expires).text}</span>
                      </div>
                    </div>
                  </div>

                  <div className="modal-description">
                    <h3>About this Certificate</h3>
                    <p>{selectedCert.description}</p>
                  </div>

                  <div className="modal-skills">
                    <h3>Skills Acquired</h3>
                    <div className="skills-grid">
                      {selectedCert.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="modal-actions">
                    <a
                      href={selectedCert.verificationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="verify-btn"
                    >
                      <FaExternalLinkAlt />
                      Verify Certificate
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .certifications-section {
          position: relative;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          overflow: hidden;
          padding: 100px 0;
          color: white;
          min-height: 100vh;
        }

        .certifications-section::before {
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
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-radius: 50px;
          color: #f59e0b;
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
          background: linear-gradient(135deg, #f59e0b 0%, #00d9ff 50%, #9333ea 100%);
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
          background: linear-gradient(90deg, #f59e0b, #00d9ff, #9333ea);
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
          background: #f59e0b;
          border-radius: 6px;
          box-shadow: 0 0 20px rgba(245, 158, 11, 0.7);
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

        .filter-container {
          margin-bottom: 3rem;
        }

        .filter-tabs {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 900px;
          margin: 0 auto;
        }

        .filter-tab {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 25px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .filter-tab:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(245, 158, 11, 0.3);
          color: white;
          transform: translateY(-2px);
        }

        .filter-tab.active {
          background: linear-gradient(135deg, #f59e0b, #ff8c00);
          border-color: transparent;
          color: white;
          box-shadow: 0 8px 25px rgba(245, 158, 11, 0.3);
        }

        .tab-icon {
          font-size: 1rem;
        }

        .count {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.2rem 0.5rem;
          border-radius: 10px;
          font-size: 0.75rem;
          font-weight: 600;
          min-width: 20px;
          text-align: center;
        }

        .filter-tab.active .count {
          background: rgba(255, 255, 255, 0.3);
        }

        /* COMPACT CARDS - 3 PER ROW */
        .certifications-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 4rem;
        }

        .compact-cert-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
          position: relative;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          opacity: 0;
          transform: translateY(40px) scale(0.95);
          height: 220px;
          display: flex;
          flex-direction: column;
        }

        .compact-cert-card.animate-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .compact-cert-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(245, 158, 11, 0.4);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.4),
            0 0 30px rgba(245, 158, 11, 0.2);
        }

        .compact-cert-card.featured {
          border-color: rgba(245, 158, 11, 0.3);
          background: linear-gradient(135deg, 
            rgba(245, 158, 11, 0.08) 0%, 
            rgba(255, 255, 255, 0.05) 100%);
        }

        .cert-provider-icon {
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .compact-cert-card:hover .cert-provider-icon {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(245, 158, 11, 0.4);
          transform: scale(1.1);
        }

        .cert-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .cert-title {
          font-size: 1rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
        }

        .cert-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
          font-size: 0.85rem;
        }

        .cert-provider {
          color: #00d9ff;
          font-weight: 600;
        }

        .cert-date {
          color: rgba(255, 255, 255, 0.7);
          font-weight: 500;
        }

        .cert-category {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 0.5rem;
        }

        .cert-id {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
          font-family: 'Courier New', monospace;
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

        .featured-badge {
          position: absolute;
          top: 0rem;
          right: 3rem;
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, #f59e0b, #ff8c00);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.8rem;
          animation: featuredPulse 3s ease-in-out infinite;
        }

        /* MODAL STYLES */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: modalFadeIn 0.3s ease-out;
          padding: 2rem;
        }

        .modal-container {
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          perspective: 1000px;
        }

        .modal-card {
          position: relative;
          width: 100%;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: modalSlideIn 0.5s ease-out;
        }

        .modal-card.flipped {
          transform: rotateY(0deg);
        }

        .modal-front {
          backface-visibility: hidden;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          color: white;
          overflow: hidden;
        }

        .modal-header {
          padding: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .modal-provider {
          display: flex;
          gap: 1rem;
          align-items: center;
          flex: 1;
        }

        .modal-provider h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          line-height: 1.3;
        }

        .modal-provider p {
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          font-size: 0.9rem;
        }

        .modal-close {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .modal-close:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .modal-content {
          padding: 2rem;
        }

        .modal-details {
          display: grid;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .detail-icon {
          color: #f59e0b;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .detail-label {
          display: block;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.8rem;
          margin-bottom: 0.25rem;
        }

        .detail-value {
          display: block;
          color: white;
          font-weight: 600;
          font-size: 0.95rem;
        }

        .status-badge-large {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid var(--status-color);
          border-radius: 25px;
          color: var(--status-color);
          font-weight: 600;
          font-size: 0.9rem;
        }

        .modal-description {
          margin-bottom: 2rem;
        }

        .modal-description h3 {
          color: #f59e0b;
          font-size: 1.2rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .modal-description p {
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.95rem;
        }

        .modal-skills {
          margin-bottom: 2rem;
        }

        .modal-skills h3 {
          color: #f59e0b;
          font-size: 1.2rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .skill-tag {
          padding: 0.5rem 1rem;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-radius: 20px;
          color: #f59e0b;
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .skill-tag:hover {
          background: rgba(245, 158, 11, 0.2);
          transform: translateY(-2px);
        }

        .modal-actions {
          text-align: center;
        }

        .verify-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #f59e0b, #ff8c00);
          color: white;
          text-decoration: none;
          border-radius: 25px;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .verify-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(245, 158, 11, 0.4);
        }

        .stats-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
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
          border-color: rgba(245, 158, 11, 0.3);
          transform: translateY(-5px);
        }

        .stat-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #f59e0b, #ff8c00);
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
          background: linear-gradient(135deg, #f59e0b, #00d9ff);
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
          color: rgba(245, 158, 11, 0.2);
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
            box-shadow: 0 0 20px rgba(245, 158, 11, 0.3);
          }
          50% { 
            box-shadow: 0 0 30px rgba(245, 158, 11, 0.5);
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
            box-shadow: 0 0 10px rgba(245, 158, 11, 0.3);
          }
          50% { 
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(245, 158, 11, 0.5);
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

        @keyframes modalFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .certifications-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .certifications-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .compact-cert-card {
            height: auto;
            min-height: 200px;
          }

          .filter-tabs {
            justify-content: flex-start;
            overflow-x: auto;
            padding-bottom: 0.5rem;
          }

          .filter-tab {
            flex-shrink: 0;
            padding: 0.6rem 1rem;
            font-size: 0.8rem;
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

          .modal-overlay {
            padding: 1rem;
          }

          .modal-header {
            padding: 1.5rem;
          }

          .modal-content {
            padding: 1.5rem;
          }

          .modal-provider {
            flex-direction: column;
            text-align: center;
            gap: 0.75rem;
          }

          .modal-details {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .certifications-section {
            padding: 80px 0;
          }

          .section-header {
            margin-bottom: 40px;
          }

          .stats-section {
            grid-template-columns: 1fr;
          }

          .compact-cert-card {
            padding: 1rem;
            height: auto;
          }

          .cert-title {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
};

export default CertificationsAndLicenses;