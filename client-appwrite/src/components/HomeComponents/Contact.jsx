import React, { useEffect, useRef, useState } from 'react';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaUser,
  FaPaperPlane,
  FaClock,
  FaGlobe,
  FaCode,
  FaBrain,
  FaRocket,
  FaDatabase,
  FaCloud
} from 'react-icons/fa';
import {
  createAdvancedObserver,
  createMagneticEffect,
  createParticleSystem
} from '../../utils/animations';

const Contact = ({
  // Animation control props
  cardHoverEnabled = true,
  cardHoverIntensity = 'medium', // 'subtle', 'medium', 'intense'
  cardHoverDuration = 0.4,
  cardTransformEnabled = false,
  cardGlowEnabled = false,
  cardShadowEnabled = true,
  quickActionHoverEnabled = true,
  quickActionHoverStyle = 'lift', // 'lift', 'scale', 'glow', 'slide'
  customHoverColors = {
    primary: 'rgba(0, 217, 255, 0.4)',
    secondary: 'rgba(147, 51, 234, 0.3)',
    accent: 'rgba(100, 255, 218, 0.2)'
  }
}) => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const particleContainerRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    // Initialize particle system
    if (particleContainerRef.current) {
      const particleSystem = createParticleSystem(particleContainerRef.current, {
        particleCount: 80,
        particleSize: { min: 1, max: 3 },
        speed: { min: 0.3, max: 0.8 },
        color: ['#00d9ff', '#9333ea', '#ffffff', '#64ffda'],
        opacity: { min: 0.2, max: 0.6 },
        connectionDistance: 100,
        showConnections: true
      });

      return () => particleSystem.destroy();
    }
  }, []);

  useEffect(() => {
    // Intersection observer for animations
    const observer = createAdvancedObserver((element) => {
      element.classList.add('animate-in');
    }, {
      threshold: 0.1,
      rootMargin: '-50px 0px',
      staggerDelay: 200
    });

    cardRefs.current.forEach(card => {
      if (card) observer.observe(card);
    });

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Magnetic effect for cards
    if (cardTransformEnabled) {
      const cards = cardRefs.current.filter(card => card !== null);
      createMagneticEffect(cards, {
        strength: 20,
        smoothing: 0.3,
        triggerArea: 1.2
      });
    }
  }, [cardTransformEnabled]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission (no backend connection for now)
    setTimeout(() => {
      setMessage('Message sent successfully! I\'ll get back to you soon.');
      setMessageType('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
      setLoading(false);

      // Clear message after 5 seconds
      setTimeout(() => setMessage(''), 5000);
    }, 2000);
  };

  // Get hover transform values based on intensity
  const getHoverTransform = (intensity) => {
    const transforms = {
      subtle: 'translateY(-3px) scale(1.01)',
      medium: 'translateY(-5px) scale(1.02)',
      intense: 'translateY(-10px) scale(1.05)'
    };
    return transforms[intensity] || transforms.medium;
  };

  // Get hover shadow values based on intensity
  const getHoverShadow = (intensity) => {
    const shadows = {
      subtle: '0 15px 30px rgba(0, 217, 255, 0.1), 0 0 20px rgba(0, 217, 255, 0.05)',
      medium: '0 25px 50px rgba(0, 217, 255, 0.15), 0 0 30px rgba(0, 217, 255, 0.1)',
      intense: '0 40px 80px rgba(0, 217, 255, 0.2), 0 0 50px rgba(0, 217, 255, 0.15)'
    };
    return shadows[intensity] || shadows.medium;
  };

  // Get quick action hover transform
  const getQuickActionTransform = (style) => {
    const transforms = {
      lift: 'translateY(-3px)',
      scale: 'scale(1.05)',
      glow: 'translateY(-2px) scale(1.02)',
      slide: 'translateX(5px)'
    };
    return transforms[style] || transforms.lift;
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      label: 'Email',
      value: 'mail@aliahammad.com',
      link: 'mailto:mail@aliahammad.com',
      color: '#00d9ff'
    },
    {
      icon: <FaPhone />,
      label: 'Phone',
      value: '+91 9895850894',
      link: 'tel:+919895850894',
      color: '#9333ea'
    },
    {
      icon: <FaMapMarkerAlt />,
      label: 'Location',
      value: 'Kollam, Kerala, India',
      link: '#',
      color: '#64ffda'
    },
    {
      icon: <FaGlobe />,
      label: 'Website',
      value: 'www.aliahammad.com',
      link: 'https://www.aliahammad.com',
      color: '#f59e0b'
    }
  ];

  const socialLinks = [
    {
      icon: <FaLinkedin />,
      label: 'LinkedIn',
      link: 'https://www.linkedin.com/in/ali-ahammad-li0812',
      color: '#0077b5'
    },
    {
      icon: <FaGithub />,
      label: 'GitHub',
      link: 'https://github.com/li812',
      color: '#333'
    },
    {
      icon: <FaInstagram />,
      label: 'Instagram',
      link: 'https://www.instagram.com/the_raptor_rider_/',
      color: '#e4405f'
    }
  ];

  return (
    <section id="fh5co-consult" className="contact-section" ref={sectionRef}>
      {/* Particle Background */}
      <div className="particle-container" ref={particleContainerRef}></div>

      <div className="modern-container">
        <div className="section-header" ref={headerRef}>
          <div className="header-badge">
            <FaEnvelope className="badge-icon" />
            <span>Get In Touch</span>
          </div>
          <h2 className="section-title">Contact Me</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            Let's discuss your next project or collaboration opportunity
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Information Card */}
          <div className="contact-info-card" ref={el => cardRefs.current[0] = el}>
            <div className="card-glow"></div>

            <div className="card-header">
              <div className="contact-avatar">
                <img src="images/user-3.jpg" alt="Ali Ahammad" />
                <div className="avatar-status"></div>
              </div>
              <div className="contact-details">
                <h3>Ali Ahammad</h3>
                <p>Full Stack Developer & AI Researcher</p>
                <div className="availability">
                  <FaClock className="clock-icon" />
                  <span>Available for Projects</span>
                </div>
              </div>
            </div>

            <div className="contact-methods">
              <h4 className="methods-title">Contact Information</h4>
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="contact-method"
                  style={{ '--delay': `${index * 0.1}s` }}
                >
                  <div className="method-icon" style={{ '--icon-color': info.color }}>
                    {info.icon}
                  </div>
                  <div className="method-info">
                    <span className="method-label">{info.label}</span>
                    <span className="method-value">{info.value}</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="social-section">
              <h4 className="social-title">Follow Me</h4>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    className="social-link"
                    style={{
                      '--social-color': social.color,
                      '--delay': `${index * 0.1}s`
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                  >
                    {social.icon}
                    <span className="social-tooltip">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="contact-form-card" ref={el => cardRefs.current[1] = el}>
            <div className="card-glow"></div>

            <div className="form-header">
              <h3>Send a Message</h3>
              <p>I'd love to hear about your project or answer any questions</p>
            </div>

            {message && (
              <div className={`message-alert ${messageType}`}>
                <div className="message-icon">
                  {messageType === 'success' ? <FaPaperPlane /> : <FaEnvelope />}
                </div>
                <span>{message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form" ref={formRef}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your first name"
                    required
                    disabled={loading}
                  />
                  <div className="input-focus-line"></div>
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your last name"
                    required
                    disabled={loading}
                  />
                  <div className="input-focus-line"></div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your email address"
                  required
                  disabled={loading}
                />
                <div className="input-focus-line"></div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="What's this about?"
                  required
                  disabled={loading}
                />
                <div className="input-focus-line"></div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Tell me about your project or inquiry..."
                  rows="6"
                  required
                  disabled={loading}
                ></textarea>
                <div className="input-focus-line"></div>
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="loading-spinner"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <FaPaperPlane className="submit-icon" />
                  </>
                )}
                <div className="button-glow"></div>
              </button>
            </form>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="quick-actions" ref={el => cardRefs.current[2] = el}>
          <h3 className="quick-title">Quick Actions</h3>
          <div className="action-buttons">
            <a href="mailto:mail@aliahammad.com" className="action-btn primary">
              <FaEnvelope className="action-icon" />
              <span>Email Me</span>
              <div className="btn-glow"></div>
            </a>

            <a href="tel:+919895850894" className="action-btn secondary">
              <FaPhone className="action-icon" />
              <span>Call Me</span>
              <div className="btn-glow"></div>
            </a>

            <a href="https://www.linkedin.com/in/ali-ahammad-li0812" className="action-btn tertiary" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="action-icon" />
              <span>LinkedIn</span>
              <div className="btn-glow"></div>
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
        .contact-section {
          position: relative;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          overflow: hidden;
          padding: 120px 0;
          color: white;
          min-height: 100vh;
        }

        .contact-section::before {
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

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 3rem;
          margin-bottom: 4rem;
        }

        .contact-info-card,
        .contact-form-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          position: relative;
          transition: all ${cardHoverDuration}s cubic-bezier(0.34, 1.56, 0.64, 1);
          opacity: 0;
          transform: translateY(40px) scale(0.95);
        }

        .contact-info-card.animate-in,
        .contact-form-card.animate-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        ${cardHoverEnabled ? `
        .contact-info-card:hover,
        .contact-form-card:hover {
          ${cardTransformEnabled ? `transform: ${getHoverTransform(cardHoverIntensity)};` : ''}
          ${cardShadowEnabled ? `box-shadow: ${getHoverShadow(cardHoverIntensity)};` : ''}
          border-color: ${customHoverColors.primary};
        }
        ` : ''}

        .card-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          right: -50%;
          bottom: -50%;
          background: radial-gradient(circle, ${customHoverColors.primary} 0%, transparent 70%);
          opacity: 0;
          transition: all 0.8s ease;
          z-index: 1;
          animation: rotate 25s linear infinite;
        }

        ${cardGlowEnabled && cardHoverEnabled ? `
        .contact-info-card:hover .card-glow,
        .contact-form-card:hover .card-glow {
          opacity: 1;
          animation-play-state: paused;
        }
        ` : ''}

        .card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          z-index: 2;
        }

        .contact-avatar {
          position: relative;
          width: 80px;
          height: 80px;
          border-radius: 20px;
          overflow: hidden;
          border: 3px solid rgba(0, 217, 255, 0.3);
          flex-shrink: 0;
        }

        .contact-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .avatar-status {
          position: absolute;
          bottom: 5px;
          right: 5px;
          width: 20px;
          height: 20px;
          background: #10b981;
          border: 3px solid white;
          border-radius: 50%;
          animation: statusPulse 2s ease-in-out infinite;
        }

        .contact-details h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
        }

        .contact-details p {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1rem;
        }

        .availability {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #10b981;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .clock-icon {
          animation: clockTick 2s ease-in-out infinite;
        }

        .contact-methods {
          margin-bottom: 2rem;
          position: relative;
          z-index: 2;
        }

        .methods-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: white;
          margin-bottom: 1.5rem;
        }

        .contact-method {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-radius: 12px;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
          margin-bottom: 0.5rem;
          animation: slideInLeft 0.6s ease-out;
          animation-delay: var(--delay);
          animation-fill-mode: both;
        }

        .contact-method:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateX(10px);
        }

        .method-icon {
          width: 45px;
          height: 45px;
          background: linear-gradient(135deg, rgba(0, 217, 255, 0.2), rgba(147, 51, 234, 0.2));
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--icon-color);
          font-size: 1.2rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .contact-method:hover .method-icon {
          background: var(--icon-color);
          color: white;
          transform: scale(1.1);
        }

        .method-info {
          display: flex;
          flex-direction: column;
        }

        .method-label {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 0.25rem;
        }

        .method-value {
          font-size: 1rem;
          color: white;
          font-weight: 500;
        }

        .social-section {
          position: relative;
          z-index: 2;
        }

        .social-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: white;
          margin-bottom: 1.5rem;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          position: relative;
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-decoration: none;
          font-size: 1.2rem;
          transition: all 0.3s ease;
          animation: slideInUp 0.6s ease-out;
          animation-delay: var(--delay);
          animation-fill-mode: both;
        }

        .social-link:hover {
          background: var(--social-color);
          border-color: var(--social-color);
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }

        .social-tooltip {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 0.8rem;
          opacity: 0;
          transition: all 0.3s ease;
          pointer-events: none;
          white-space: nowrap;
        }

        .social-link:hover .social-tooltip {
          opacity: 1;
          bottom: -45px;
        }

        .form-header {
          margin-bottom: 2rem;
          position: relative;
          z-index: 2;
        }

        .form-header h3 {
          font-size: 1.8rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
        }

        .form-header p {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }

        .message-alert {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          margin-bottom: 2rem;
          font-weight: 500;
          animation: slideInDown 0.5s ease-out;
        }

        .message-alert.success {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #10b981;
        }

        .message-alert.error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
        }

        .message-icon {
          font-size: 1.2rem;
        }

        .contact-form {
          position: relative;
          z-index: 2;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .form-group {
          position: relative;
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 1rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          transition: all 0.3s ease;
          font-family: inherit;
          position: relative;
          z-index: 1;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: rgba(0, 217, 255, 0.5);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 20px rgba(0, 217, 255, 0.2);
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .input-focus-line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #00d9ff, #9333ea);
          transition: all 0.3s ease;
          border-radius: 1px;
        }

        .form-input:focus + .input-focus-line,
        .form-textarea:focus + .input-focus-line {
          width: 100%;
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          width: 100%;
          padding: 1.2rem 2rem;
          background: linear-gradient(135deg, #00d9ff, #9333ea);
          color: white;
          border: none;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
          letter-spacing: 0.5px;
        }

        .submit-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(0, 217, 255, 0.4);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }

        .submit-icon {
          transition: transform 0.3s ease;
        }

        .submit-button:hover .submit-icon {
          transform: translateX(5px);
        }

        .button-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: all 0.6s ease;
        }

        .submit-button:hover .button-glow {
          left: 100%;
        }

        .quick-actions {
          text-align: center;
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .quick-actions.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .quick-title {
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #00d9ff, #9333ea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 2rem;
        }

        .action-buttons {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 1rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
          letter-spacing: 0.5px;
        }

        .action-btn.primary {
          background: linear-gradient(135deg, #00d9ff, #9333ea);
          color: white;
          border: none;
        }

        .action-btn.secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }

        .action-btn.tertiary {
          background: rgba(0, 119, 181, 0.2);
          color: #0077b5;
          border: 2px solid rgba(0, 119, 181, 0.3);
          backdrop-filter: blur(10px);
        }

        ${quickActionHoverEnabled ? `
        .action-btn:hover {
          transform: ${getQuickActionTransform(quickActionHoverStyle)};
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .action-btn.primary:hover {
          box-shadow: 0 10px 25px ${customHoverColors.primary};
        }

        .action-btn.tertiary:hover {
          background: rgba(0, 119, 181, 0.3);
          border-color: rgba(0, 119, 181, 0.5);
        }
        ` : ''}

        .action-icon {
          transition: transform 0.3s ease;
        }

        ${quickActionHoverEnabled ? `
        .action-btn:hover .action-icon {
          transform: translateX(3px);
        }
        ` : ''}

        .btn-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: all 0.6s ease;
        }

        ${quickActionHoverEnabled ? `
        .action-btn:hover .btn-glow {
          left: 100%;
        }
        ` : ''}

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
          top: 15%;
          right: 8%;
          animation-delay: 0s;
        }

        .tech-2 {
          top: 45%;
          left: 5%;
          animation-delay: 2s;
        }

        .tech-3 {
          bottom: 35%;
          right: 12%;
          animation-delay: 4s;
        }

        .tech-4 {
          top: 75%;
          left: 15%;
          animation-delay: 6s;
        }

        .tech-5 {
          bottom: 15%;
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

        @keyframes statusPulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.2);
            opacity: 0.8;
          }
        }

        @keyframes clockTick {
          0%, 50%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(15deg); }
          75% { transform: rotate(-15deg); }
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

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
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
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .card-header {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .action-buttons {
            flex-direction: column;
            align-items: center;
          }

          .action-btn {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }

          .floating-elements {
            display: none;
          }

          .social-links {
            justify-content: center;
          }

          .contact-info-card,
          .contact-form-card {
            padding: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .contact-section {
            padding: 80px 0;
          }

          .section-header {
            margin-bottom: 40px;
          }

          .contact-grid {
            gap: 1.5rem;
          }

          .contact-info-card,
          .contact-form-card {
            padding: 1.25rem;
          }

          .form-input,
          .form-textarea {
            padding: 0.8rem 1rem;
          }

          .submit-button {
            padding: 1rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;