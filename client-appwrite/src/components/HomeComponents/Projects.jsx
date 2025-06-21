/* filepath: /Users/li/GitHub/aliahammad/client-appwrite/src/components/HomeComponents/Projects.jsx */
import React from 'react';

const Projects = () => {
  const projects = [
    {
      title: "EcoZync",
      description: "A full-stack IoT-based environmental monitoring system with multi-cloud architecture, real-time AI insights, and cross-platform support.",
      image: "images/ecozync.png",
      link: "https://github.com/li812/EcoZync-public",
      tech: ["Spring Boot", "Django", "React.js", "React Native", "AWS", "Google Cloud", "Docker"],
      type: "IoT System",
      featured: true
    },
    {
      title: "LiSQL",
      description: "A feature-rich Python package designed to streamline interactions with multiple MySQL databases across different servers.",
      image: "images/lisql.png",
      link: "https://pypi.org/project/lisql/",
      tech: ["Python", "MySQL", "Database", "PyPI"],
      type: "Package"
    },
    {
      title: "3D Face Reconstructor",
      description: "Creates 3D models of human faces from 2D images using MTCNN facial detection, DPT depth estimation, and Open3D mesh generation.",
      image: "images/3d-face.png",
      link: "https://github.com/li812/3D-Face-Recontructor/",
      tech: ["Computer Vision", "Deep Learning", "MTCNN", "DPT", "Open3D"],
      type: "Research"
    },
    {
      title: "Pandemic Controlling System",
      description: "A comprehensive health response platform with Django backend, Android app, and CNN-based test result classification using PyTorch.",
      image: "images/pandemo.png",
      link: "https://github.com/li812/Pandemic-Controlling-System/",
      tech: ["Django", "Android", "PyTorch", "CNN", "MySQL"],
      type: "System"
    },
    {
      title: "Phishing URL Checker",
      description: "Machine learning-based solution to identify and classify phishing URLs in real-time with high accuracy detection.",
      image: "images/phishing.png",
      link: "https://github.com/li812/Phishing-URL-Checker",
      tech: ["Machine Learning", "Python", "Security", "Classification"],
      type: "Security"
    },
    {
      title: "Deepfake Detection System",
      description: "Detects deepfakes in videos using the Meso4 CNN model, integrated with Django for web deployment and real-time processing.",
      image: "images/deepfake.png",
      link: "https://github.com/li812/Deepfake-Detection-Meso4-Django",
      tech: ["Deep Learning", "CNN", "Django", "Computer Vision"],
      type: "AI Application"
    }
  ];

  return (
    <section id="fh5co-work" className="modern-section">
      <div className="modern-container">
        <div className="section-header text-center">
          <h2 className="modern-heading">Featured Projects</h2>
          <p className="section-subtitle">Innovative solutions combining AI, ML, and Full-Stack Development</p>
        </div>

        <div className="projects-grid modern-grid modern-grid-2">
          {projects.map((project, index) => (
            <div key={index} className={`project-card modern-card ${project.featured ? 'featured-project' : ''}`}>
              {project.featured && <div className="featured-badge">🌟 Featured</div>}
              
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer" title="View Project">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7Z"/>
                      </svg>
                    </a>
                    {project.link.includes('github.com') && (
                      <a href={project.link} className="project-link github-link" target="_blank" rel="noopener noreferrer" title="View Code">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-type">{project.type}</span>
                </div>
                
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center" style={{ marginTop: '3rem' }}>
          <a href="https://github.com/li812" className="modern-btn" target="_blank" rel="noopener noreferrer">
            View All Projects on GitHub
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7Z"/>
            </svg>
          </a>
        </div>
      </div>

      <style jsx>{`
        .section-header {
          margin-bottom: 4rem;
        }

        .section-subtitle {
          font-size: 1.2rem;
          color: var(--text-secondary);
          margin-top: 1rem;
        }

        .projects-grid {
          gap: 2rem;
        }

        .project-card {
          overflow: hidden;
          transition: all 0.3s ease;
          position: relative;
        }

        .featured-project {
          border: 2px solid var(--primary-color);
          box-shadow: 0 8px 25px rgba(0, 217, 255, 0.15);
        }

        .featured-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          z-index: 2;
        }

        .project-image {
          position: relative;
          height: 200px;
          overflow: hidden;
          border-radius: 12px;
          margin-bottom: 1.5rem;
        }

        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .project-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .project-card:hover .project-overlay {
          opacity: 1;
        }

        .project-card:hover .project-image img {
          transform: scale(1.1);
        }

        .project-links {
          display: flex;
          gap: 1rem;
        }

        .project-link {
          width: 50px;
          height: 50px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .project-link:hover {
          transform: scale(1.1);
          background: var(--primary-color);
          color: white;
        }

        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .project-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .project-type {
          padding: 0.25rem 0.75rem;
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
          color: white;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .project-description {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech-tag {
          padding: 0.4rem 0.8rem;
          background: #f1f5f9;
          color: #475569;
          border-radius: 16px;
          font-size: 0.8rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .tech-tag:hover {
          background: var(--primary-color);
          color: white;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .project-header {
            flex-direction: column;
            gap: 0.5rem;
          }

          .project-links {
            gap: 0.5rem;
          }

          .project-link {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;