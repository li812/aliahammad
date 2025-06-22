import React, { useEffect, useRef, useState } from 'react';
import {
  FaRocket,
  FaBlog,
  FaEye,
  FaHeart,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaClock,
  FaTag,
  FaBrain,
  FaCode,
  FaDatabase,
  FaCloud
} from 'react-icons/fa';
import {
  SiMedium,
  SiMysql
} from 'react-icons/si';
import { LuBrainCircuit } from "react-icons/lu";
import { GiMaterialsScience } from "react-icons/gi";
import {
  createAdvancedObserver,
  createMagneticEffect,
  createParticleSystem
} from '../../utils/animations';

const ArticlesAndBlogs = ({
  showParticles = true,
  animationDuration = 1000,
  staggerDelay = 200,
  cardHoverEffect = true
}) => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const particleContainerRef = useRef(null);
  const headerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    // Initialize particle system
    if (particleContainerRef.current && showParticles) {
      const particleSystem = createParticleSystem(particleContainerRef.current, {
        particleCount: 50,
        particleSize: { min: 1, max: 3 },
        speed: { min: 0.2, max: 0.8 },
        color: ['#00d9ff', '#9333ea', '#ffffff', '#64ffda'],
        opacity: { min: 0.2, max: 0.6 },
        connectionDistance: 100,
        showConnections: true
      });

      return () => particleSystem.destroy();
    }
  }, [showParticles]);

  useEffect(() => {
    // Intersection observer for animations
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

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, [staggerDelay, filteredArticles]);

  useEffect(() => {
    // Magnetic effect for cards
    if (cardHoverEffect) {
      const cards = cardRefs.current.filter(card => card !== null);
      createMagneticEffect(cards, {
        strength: 20,
        smoothing: 0.3,
        triggerArea: 1.2
      });
    }
  }, [cardHoverEffect, filteredArticles]);

  // Get category icon
  const getCategoryIcon = (category) => {
    const iconMap = {
      'Quantum Computing': <GiMaterialsScience style={{ color: '#8b5cf6' }} />,
      'Deep Learning': <LuBrainCircuit style={{ color: '#ec4899' }} />,
      'Database': <SiMysql style={{ color: '#4479A1' }} />,
      'AI/ML': <FaBrain style={{ color: '#f59e0b' }} />,
      'Web Development': <FaCode style={{ color: '#06b6d4' }} />,
      'default': <FaBlog style={{ color: '#00d9ff' }} />
    };

    return iconMap[category] || iconMap['default'];
  };

  // Get platform icon
  const getPlatformIcon = (platform) => {
    const iconMap = {
      'Medium': <SiMedium style={{ color: '#00ab6c' }} />,
      'Blog': <FaBlog style={{ color: '#00d9ff' }} />,
      'default': <FaBlog style={{ color: '#00d9ff' }} />
    };

    return iconMap[platform] || iconMap['default'];
  };

  // Articles data
  const articles = [
    {
      id: 'quantum-computing',
      title: 'Quantum Computing Horizon: The Odyssey of Tomorrow\'s Computing',
      excerpt: 'An illuminating journey into quantum computing\'s transformative potential, bridging classical bits and qubits through superposition and entanglement.',
      description: 'Explore the revolutionary world of quantum computing, from the fundamental principles of superposition and entanglement to real-world applications in cryptography, optimization, and artificial intelligence. This comprehensive guide demystifies quantum mechanics for developers and tech enthusiasts.',
      image: 'images/quan.png',
      publishedDate: 'Nov 20, 2023',
      readTime: '8 min read',
      category: 'Quantum Computing',
      platform: 'Medium',
      link: 'https://medium.com/@aliahammad_3446/quantum-computing-horizon-the-odyssey-of-tomorrows-computing-17a6a49514ba',
      likes: 249,
      views: 308,
      tags: ['Quantum Computing', 'Future Tech', 'Physics', 'Computing'],
      featured: true
    },
    {
      id: '3d-face-reconstruction',
      title: 'Leveraging Deep Learning for 3D Facial Reconstruction from 2D Images',
      excerpt: 'Transforming 2D facial images into lifelike 3D models with cutting-edge deep learning methods for unprecedented accuracy and realism.',
      description: 'A comprehensive methodology for converting 2D facial photographs into detailed 3D models using advanced deep learning techniques. Covers MTCNN for facial detection, depth estimation algorithms, and mesh generation techniques for creating realistic 3D representations.',
      image: 'images/3d.png',
      publishedDate: 'May 10, 2024',
      readTime: '12 min read',
      category: 'Deep Learning',
      platform: 'Medium',
      link: 'https://medium.com/@aliahammad_3446/leveraging-deep-learning-for-3d-facial-reconstruction-from-2d-images-a-comprehensive-methodology-738640511b04',
      likes: 342,
      views: 521,
      tags: ['Deep Learning', 'Computer Vision', '3D Modeling', 'AI'],
      featured: true
    },
    {
      id: 'lisql-guide',
      title: 'Simplifying MySQL Database Interaction with LiSQL: A Comprehensive Guide',
      excerpt: 'Streamlining MySQL workflows with LiSQL: robust connection management, efficient database operations, and seamless table management.',
      description: 'Learn how to simplify MySQL database operations with LiSQL, an open-source Python package designed for data scientists and developers. Covers installation, configuration, advanced querying, and real-world use cases for multi-database management.',
      image: 'images/lisql.png',
      publishedDate: 'May 16, 2024',
      readTime: '10 min read',
      category: 'Database',
      platform: 'Medium',
      link: 'https://medium.com/@aliahammad_3446/simplifying-mysql-database-interaction-with-lisql-a-comprehensive-guide-f64c9b6b0a6b',
      likes: 156,
      views: 287,
      tags: ['Python', 'MySQL', 'Database', 'Open Source'],
      featured: false
    }
  ];

  // Filter articles
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(articles.filter(article => article.category === activeFilter));
    }
  }, [activeFilter]);

  // Get unique categories for filters
  const categories = ['all', ...new Set(articles.map(article => article.category))];

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <section id="fh5co-blog" className="articles-section" ref={sectionRef}>
      {/* Particle Background */}
      <div className="particle-container" ref={particleContainerRef}></div>

      <div className="modern-container">
        <div className="section-header" ref={headerRef}>
          <div className="header-badge">
            <FaBlog className="badge-icon" />
            <span>Publications</span>
          </div>
          <h2 className="section-title">Articles & Blogs</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            Insights and discoveries in technology, AI, and software development
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="filter-section">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
            >
              {category === 'all' ? 'All Articles' : category}
            </button>
          ))}
        </div>


        {/* Articles Grid */}
        <div className="articles-grid">
          {filteredArticles.map((article, index) => (
            <article
              key={article.id}
              className={`article-card ${article.featured ? 'featured' : ''}`}
              ref={el => cardRefs.current[index] = el}
            >
              <div className="card-glow"></div>

              {/* Article Image */}
              <div className="article-image-container">
                <div className="article-image">
                  <img src={article.image} alt={article.title} />
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <div className="category-badge">
                        {getCategoryIcon(article.category)}
                        <span>{article.category}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {article.featured && (
                  <div className="featured-badge">
                    <FaRocket />
                  </div>
                )}
              </div>

              {/* Article Content */}
              <div className="article-content">
                <div className="article-meta">
                  <div className="meta-item">
                    <FaCalendarAlt className="meta-icon" />
                    <span>{article.publishedDate}</span>
                  </div>
                  <div className="meta-item">
                    <FaClock className="meta-icon" />
                    <span>{article.readTime}</span>
                  </div>
                  <div className="meta-item platform">
                    {getPlatformIcon(article.platform)}
                    <span>{article.platform}</span>
                  </div>
                </div>

                <h3 className="article-title">{article.title}</h3>
                <p className="article-excerpt">{article.excerpt}</p>

                {/* Tags */}
                <div className="article-tags">
                  {article.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="article-tag"
                      style={{ '--delay': `${tagIndex * 0.1}s` }}
                    >
                      <FaTag className="tag-icon" />
                      {tag}
                    </span>
                  ))}
                  {article.tags.length > 6 && (
                    <span className="more-tags">+{article.tags.length - 6}</span>
                  )}
                </div>


                {/* Read More Button */}
                <a
                  href={article.link}
                  className="read-more-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Read Article</span>
                  <FaExternalLinkAlt className="btn-icon" />
                  <div className="btn-glow"></div>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Section Footer */}
        <div className="section-footer">
          <div className="footer-content">
            <h3 className="footer-title">More Articles Coming Soon</h3>
            <p className="footer-description">
              Stay tuned for more insights on technology, AI, and software development
            </p>
            <a
              href="https://medium.com/@aliahammad_3446"
              className="medium-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiMedium className="medium-logo" />
              <span>Follow on Medium</span>
              <div className="cta-glow"></div>
            </a>
          </div>
        </div>

        {/* Floating Tech Elements */}
        <div className="floating-elements">
          <div className="tech-float tech-1"><FaBlog /></div>
          <div className="tech-float tech-2"><FaBrain /></div>
          <div className="tech-float tech-3"><FaCode /></div>
          <div className="tech-float tech-4"><FaDatabase /></div>
          <div className="tech-float tech-5"><FaCloud /></div>
        </div>
      </div>

      <style jsx>{`
        .articles-section {
          position: relative;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          overflow: hidden;
          padding: 120px 0;
          color: white;
          min-height: 100vh;
        }

        .articles-section::before {
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

        .filter-section {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 4rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 25px;
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          backdrop-filter: blur(10px);
        }

        .filter-btn:hover {
          background: rgba(0, 217, 255, 0.1);
          border-color: rgba(0, 217, 255, 0.3);
          color: #00d9ff;
          transform: translateY(-2px);
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #00d9ff, #9333ea);
          border-color: transparent;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 217, 255, 0.3);
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

        .articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 2.5rem;
          margin-bottom: 6rem;
        }

        .article-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          overflow: hidden;
          max-width: 450px;
          position: relative;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          opacity: 0;
          transform: translateY(40px) scale(0.95);
          min-height: 500px;
          display: flex;
          flex-direction: column;
        }

        .article-card.animate-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .article-card:hover {
          transform: translateY(-10px) scale(1.02);
          border-color: rgba(0, 217, 255, 0.4);
          box-shadow: 
            0 30px 60px rgba(0, 217, 255, 0.15),
            0 0 40px rgba(0, 217, 255, 0.1);
        }

        .article-card.featured {
          border-color: rgba(0, 217, 255, 0.3);
          background: linear-gradient(135deg, 
            rgba(0, 217, 255, 0.08) 0%, 
            rgba(255, 255, 255, 0.05) 100%);
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

        .article-card:hover .card-glow {
          opacity: 1;
          animation-play-state: paused;
        }

        .article-image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .article-image {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
        }

        .article-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.4s ease;
        }

        .article-card:hover .article-image img {
          transform: scale(1.1);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0, 217, 255, 0.8), rgba(147, 51, 234, 0.8));
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .article-card:hover .image-overlay {
          opacity: 1;
        }

        .overlay-content {
          text-align: center;
          transform: translateY(20px);
          transition: all 0.3s ease;
        }

        .article-card:hover .overlay-content {
          transform: translateY(0);
        }

        .category-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          color: white;
          font-weight: 600;
          backdrop-filter: blur(10px);
        }

        .featured-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #00d9ff, #9333ea);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1rem;
          animation: featuredPulse 3s ease-in-out infinite;
          z-index: 2;
        }

        .article-content {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 2;
        }

        .article-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.85rem;
        }

        .meta-item.platform {
          color: #00d9ff;
          font-weight: 600;
        }

        .meta-icon {
          font-size: 0.8rem;
        }

        .article-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: white;
          margin-bottom: 1rem;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .article-excerpt {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .article-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .article-tag {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.3rem 0.8rem;
          background: rgba(0, 217, 255, 0.1);
          border: 1px solid rgba(0, 217, 255, 0.3);
          border-radius: 12px;
          color: #00d9ff;
          font-size: 0.75rem;
          font-weight: 500;
          transition: all 0.3s ease;
          animation: tagSlideIn 0.6s ease-out;
          animation-delay: var(--delay);
          animation-fill-mode: both;
        }

        .article-tag:hover {
          background: rgba(0, 217, 255, 0.2);
          transform: translateY(-2px);
        }

        .tag-icon {
          font-size: 0.7rem;
        }

        .more-tags {
          padding: 0.3rem 0.8rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.75rem;
        }

        .article-stats {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
        }

        .stat-icon.likes {
          color: #ec4899;
        }

        .stat-icon.views {
          color: #06b6d4;
        }

        .read-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #00d9ff, #9333ea);
          color: white;
          text-decoration: none;
          border-radius: 25px;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          align-self: flex-start;
        }

        .read-more-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 217, 255, 0.4);
        }

        .btn-icon {
          transition: transform 0.3s ease;
        }

        .read-more-btn:hover .btn-icon {
          transform: translateX(3px);
        }

        .btn-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: all 0.6s ease;
        }

        .read-more-btn:hover .btn-glow {
          left: 100%;
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
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .medium-cta {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 2rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          color: white;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }

        .medium-cta:hover {
          background: rgba(0, 171, 108, 0.2);
          border-color: rgba(0, 171, 108, 0.4);
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(0, 171, 108, 0.3);
        }

        .medium-logo {
          font-size: 1.5rem;
          color: #00ab6c;
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

        .medium-cta:hover .cta-glow {
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
        @media (max-width: 1200px) {
          .articles-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .articles-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .article-card {
            min-height: auto;
          }

          .article-content {
            padding: 1.25rem;
          }

          .article-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
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

          .filter-section {
            gap: 0.5rem;
          }

          .filter-btn {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }

          .floating-elements {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .articles-section {
            padding: 80px 0;
          }

          .section-header {
            margin-bottom: 40px;
          }

          .stats-section {
            grid-template-columns: 1fr;
          }

          .article-content {
            padding: 1rem;
          }

          .article-title {
            font-size: 1.2rem;
          }

          .footer-title {
            font-size: 2rem;
          }

          .medium-cta {
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default ArticlesAndBlogs;