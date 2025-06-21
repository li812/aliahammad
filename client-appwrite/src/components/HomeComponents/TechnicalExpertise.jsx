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
  FaCog
} from 'react-icons/fa';

const TechnicalExpertise = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, index * 150);
          }
        });
      },
      { threshold: 0.1, rootMargin: '-20px 0px' }
    );

    cardRefs.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      title: "Backend Development",
      icon: <FaServer size={28} />,
      skills: ["Django", "Flask", "Spring Boot", "Express.js"],
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Frontend Development", 
      icon: <FaReact size={28} />,
      skills: ["React.js", "Next.js", "React Native", "Bootstrap", "Tailwind"],
      color: "from-cyan-500 to-teal-500",
      bgColor: "bg-cyan-50"
    },
    {
      title: "Programming Languages",
      icon: <FaCode size={28} />,
      skills: ["Python", "Java", "JavaScript", "TypeScript", "C", "C++", "R", "Swift", "Go", "Scala"],
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50"
    },
    {
      title: "Machine Learning",
      icon: <FaBrain size={28} />,
      skills: ["Scikit-Learn", "TensorFlow", "PyTorch"],
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50"
    },
    {
      title: "Computer Vision & AI",
      icon: <FaCog size={28} />,
      skills: ["OpenCV", "Scikit-Image", "YOLO", "BLIP", "MTCNN", "DPT", "Open3D"],
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50"
    },
    {
      title: "Data Science & Analytics",
      icon: <FaChartBar size={28} />,
      skills: ["Pandas", "Matplotlib", "Seaborn", "Power BI", "Tableau", "Grafana"],
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50"
    },
    {
      title: "Big Data Technologies",
      icon: <FaHdd size={28} />,
      skills: ["Apache Hadoop", "Apache Spark"],
      color: "from-yellow-500 to-amber-500",
      bgColor: "bg-yellow-50"
    },
    {
      title: "Databases",
      icon: <FaDatabase size={28} />,
      skills: ["MySQL", "PostgreSQL", "DynamoDB", "MongoDB", "Firestore", "Appwrite DB", "SQLite"],
      color: "from-slate-500 to-gray-600",
      bgColor: "bg-slate-50"
    },
    {
      title: "DevOps & Deployment",
      icon: <FaRocket size={28} />,
      skills: ["Docker", "Kubernetes", "Git", "Linux", "Cloudflare Tunnel", "Nginx"],
      color: "from-violet-500 to-purple-600",
      bgColor: "bg-violet-50"
    },
    {
      title: "Cloud & BaaS Platforms",
      icon: <FaCloud size={28} />,
      skills: ["Firebase", "Appwrite", "AWS", "DigitalOcean", "Google Cloud AI"],
      color: "from-sky-500 to-blue-500",
      bgColor: "bg-sky-50"
    }
  ];

  return (
    <section id="fh5co-skills" className="modern-section skills-section" ref={sectionRef}>
      <div className="modern-container">
        <div className="section-header text-center">
          <h2 className="modern-heading">Technical Expertise</h2>
          <div className="heading-underline"></div>
          <p className="section-subtitle">Comprehensive skillset across full-stack development, AI, and cloud technologies</p>
        </div>

        <div className="skills-grid-modern">
          {skillCategories.map((category, index) => (
            <div 
              key={index} 
              className="skill-card-modern"
              ref={el => cardRefs.current[index] = el}
            >
              <div className="card-background"></div>
              <div className="card-content">
                <div className="skill-header">
                  <div className={`skill-icon-wrapper gradient-${index}`}>
                    {category.icon}
                  </div>
                  <div className="skill-title-section">
                    <h4 className="skill-title">{category.title}</h4>
                    <div className="skill-count">{category.skills.length} technologies</div>
                  </div>
                </div>
                
                <div className="skill-tags-container">
                  {category.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex} 
                      className="skill-tag-modern"
                      style={{ 
                        '--delay': `${skillIndex * 0.1}s`,
                        '--index': skillIndex 
                      }}
                    >
                      {skill}
                      <div className="tag-shine"></div>
                    </span>
                  ))}
                </div>

                <div className="card-footer">
                  <div className="progress-indicator">
                    <div className={`progress-bar gradient-${index}`}></div>
                  </div>
                </div>
              </div>
              
              <div className="card-glow"></div>
            </div>
          ))}
        </div>

        {/* Floating Background Elements */}
        <div className="floating-bg-elements">
          <div className="bg-element element-1"></div>
          <div className="bg-element element-2"></div>
          <div className="bg-element element-3"></div>
          <div className="bg-element element-4"></div>
        </div>
      </div>

      <style jsx>{`
        .skills-section {
          position: relative;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          overflow: hidden;
        }

        .skills-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(0, 217, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .section-header {
          margin-bottom: 5rem;
          position: relative;
          z-index: 2;
        }

        .heading-underline {
          width: 100px;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-color), var(--primary-dark));
          margin: 1.5rem auto;
          border-radius: 2px;
          position: relative;
        }

        .heading-underline::after {
          content: '';
          position: absolute;
          top: -3px;
          left: 50%;
          transform: translateX(-50%);
          width: 16px;
          height: 10px;
          background: var(--primary-color);
          border-radius: 5px;
        }

        .section-subtitle {
          font-size: var(--font-size-lg);
          color: var(--text-secondary);
          margin-top: 1rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .skills-grid-modern {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 2rem;
          position: relative;
          z-index: 2;
        }

        .skill-card-modern {
          position: relative;
          opacity: 0;
          transform: translateY(50px) scale(0.9);
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .skill-card-modern.animate-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .card-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: all 0.4s ease;
        }

        .skill-card-modern:hover .card-background {
          background: rgba(255, 255, 255, 0.98);
          transform: translateY(-2px);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(0, 217, 255, 0.1);
        }

        .card-content {
          position: relative;
          padding: 2.5rem;
          z-index: 2;
        }

        .skill-header {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .skill-icon-wrapper {
          width: 70px;
          height: 70px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }

        .gradient-0 { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
        .gradient-1 { background: linear-gradient(135deg, #06b6d4, #0891b2); }
        .gradient-2 { background: linear-gradient(135deg, #8b5cf6, #6366f1); }
        .gradient-3 { background: linear-gradient(135deg, #ec4899, #e11d48); }
        .gradient-4 { background: linear-gradient(135deg, #f97316, #dc2626); }
        .gradient-5 { background: linear-gradient(135deg, #10b981, #059669); }
        .gradient-6 { background: linear-gradient(135deg, #eab308, #d97706); }
        .gradient-7 { background: linear-gradient(135deg, #64748b, #475569); }
        .gradient-8 { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }
        .gradient-9 { background: linear-gradient(135deg, #0ea5e9, #3b82f6); }

        .skill-icon-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: all 0.5s ease;
        }

        .skill-card-modern:hover .skill-icon-wrapper::before {
          left: 100%;
        }

        .skill-title-section {
          flex: 1;
        }

        .skill-title {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-bold);
          color: var(--text-primary);
          margin: 0 0 0.5rem 0;
          line-height: 1.3;
        }

        .skill-count {
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
          font-weight: var(--font-weight-medium);
        }

        .skill-tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .skill-tag-modern {
          position: relative;
          padding: 0.75rem 1.25rem;
          background: linear-gradient(135deg, rgba(0, 217, 255, 0.1), rgba(0, 180, 216, 0.1));
          color: var(--primary-color);
          border: 1px solid rgba(0, 217, 255, 0.2);
          border-radius: 25px;
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          overflow: hidden;
          animation: tagSlideIn 0.6s ease-out;
          animation-delay: var(--delay);
          animation-fill-mode: both;
        }

        .skill-tag-modern:hover {
          background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
          color: white;
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 8px 20px rgba(0, 217, 255, 0.3);
          border-color: var(--primary-color);
        }

        .tag-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: all 0.5s ease;
        }

        .skill-tag-modern:hover .tag-shine {
          left: 100%;
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .progress-indicator {
          width: 100%;
          height: 6px;
          background: rgba(0, 217, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
          position: relative;
        }

        .progress-bar {
          height: 100%;
          width: 0%;
          border-radius: 3px;
          animation: progressFill 2s ease-out 1s forwards;
        }

        .card-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          right: -50%;
          bottom: -50%;
          background: radial-gradient(circle, rgba(0, 217, 255, 0.1) 0%, transparent 70%);
          opacity: 0;
          transition: all 0.6s ease;
          z-index: 1;
        }

        .skill-card-modern:hover .card-glow {
          opacity: 1;
          animation: pulse 2s ease-in-out infinite;
        }

        .floating-bg-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 1;
        }

        .bg-element {
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          opacity: 0.05;
          animation: bgFloat 8s ease-in-out infinite;
        }

        .element-1 {
          top: 10%;
          left: 10%;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          animation-delay: 0s;
        }

        .element-2 {
          top: 20%;
          right: 15%;
          background: linear-gradient(135deg, #8b5cf6, #6366f1);
          animation-delay: 2s;
        }

        .element-3 {
          bottom: 30%;
          left: 20%;
          background: linear-gradient(135deg, #10b981, #059669);
          animation-delay: 4s;
        }

        .element-4 {
          bottom: 10%;
          right: 25%;
          background: linear-gradient(135deg, #ec4899, #e11d48);
          animation-delay: 6s;
        }

        @keyframes tagSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes progressFill {
          from { width: 0%; }
          to { width: 85%; }
        }

        @keyframes pulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.1;
          }
          50% { 
            transform: scale(1.1);
            opacity: 0.2;
          }
        }

        @keyframes bgFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
            opacity: 0.05;
          }
          33% { 
            transform: translateY(-30px) rotate(120deg);
            opacity: 0.1;
          }
          66% { 
            transform: translateY(10px) rotate(240deg);
            opacity: 0.05;
          }
        }

        @media (max-width: 768px) {
          .skills-grid-modern {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .skill-header {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .skill-icon-wrapper {
            margin: 0 auto;
          }

          .skill-tags-container {
            gap: 0.5rem;
          }

          .skill-tag-modern {
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
          }

          .card-content {
            padding: 2rem;
          }
        }

        @media (max-width: 480px) {
          .skills-grid-modern {
            grid-template-columns: 1fr;
          }

          .skill-card-modern {
            margin: 0;
          }

          .card-content {
            padding: 1.5rem;
          }

          .skill-header {
            gap: 0.75rem;
          }

          .skill-icon-wrapper {
            width: 60px;
            height: 60px;
          }
        }
      `}</style>
    </section>
  );
};

export default TechnicalExpertise;