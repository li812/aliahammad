/* filepath: /Users/li/GitHub/aliahammad/client-appwrite/src/components/HomeComponents/Experience.jsx */
import React, { useEffect } from 'react';

const Experience = () => {
  useEffect(() => {
    const timelineItems = document.querySelectorAll('.timeline .animate-box');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animated-fast');
          }, index * 200);
        }
      });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div id="fh5co-resume" className="section-padding">
      <div className="container">
        <div className="row animate-box">
          <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
            <h2 style={{ color: 'white', fontSize: 'var(--font-size-5xl)', marginBottom: '2rem' }}>My Resume</h2>
          </div>
        </div>
        
        <div className="row" style={{ marginTop: '4rem' }}>
          <div className="col-md-12">
            <ul className="timeline">
              
              {/* Work Experience */}
              <li className="timeline-heading text-center animate-box">
                <div>
                  <h3 style={{ color: 'white', fontSize: 'var(--font-size-3xl)', margin: '3rem 0' }}>
                    Work Experience
                  </h3>
                </div>
              </li>
              
              <li className="animate-box timeline-unverted">
                <div className="timeline-badge">
                  <i className="icon-suitcase"></i>
                </div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h3 className="timeline-title">Intern Software Developer</h3>
                    <span className="company">Serve Techno Research - 2023-2025</span>
                  </div>
                </div>
              </li>
              
              <li className="timeline-inverted animate-box">
                <div className="timeline-badge">
                  <i className="icon-suitcase"></i>
                </div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h3 className="timeline-title">Freelance Developer</h3>
                    <span className="company">Self-Employed - 2019-Present</span>
                  </div>
                </div>
              </li>
              
              <li className="animate-box timeline-unverted">
                <div className="timeline-badge">
                  <i className="icon-suitcase"></i>
                </div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h3 className="timeline-title">Programming Trainer</h3>
                    <span className="company">G-Tec Education - 2021-2022</span>
                  </div>
                </div>
              </li>

              {/* Education */}
              <li className="timeline-heading text-center animate-box">
                <div>
                  <h3 style={{ color: 'white', fontSize: 'var(--font-size-3xl)', margin: '3rem 0' }}>
                    Education
                  </h3>
                </div>
              </li>
              
              <li className="timeline-inverted animate-box">
                <div className="timeline-badge">
                  <i className="icon-graduation-cap"></i>
                </div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h3 className="timeline-title">Master of Computer Application</h3>
                    <span className="company">University of Kerala - 2023-2025</span>
                  </div>
                </div>
              </li>
              
              <li className="animate-box timeline-unverted">
                <div className="timeline-badge">
                  <i className="icon-graduation-cap"></i>
                </div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h3 className="timeline-title">B.Sc Computer Science</h3>
                    <span className="company">University of Kerala - 2019-2022</span>
                  </div>
                </div>
              </li>
              
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        .timeline-title {
          font-size: var(--font-size-xl) !important;
        }

        .company {
          font-size: var(--font-size-base) !important;
        }
      `}</style>
    </div>
  );
};

export default Experience;