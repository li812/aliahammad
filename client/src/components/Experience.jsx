import React from 'react';
import { useTimelineEffect } from '../utils/effects';

const Experience = () => {
  // Apply timeline animations
  useTimelineEffect();

  return (
    <div id="fh5co-resume" className="fh5co-bg-color">
      <div className="container">
        <div className="row animate-box" data-animate-effect="fadeInUp">
          <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
            <h2>My Resume</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-md-offset-0">
            <ul className="timeline">
              <li className="timeline-heading text-center animate-box">
                <div><h3 style={{color: 'white'}}>Work Experience</h3></div>
              </li>
              <li className="animate-box timeline-unverted">
                <div className="timeline-badge"><i className="icon-suitcase"></i></div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h3 className="timeline-title">Data Science Intern</h3>
                    <span className="company"><a href="https://www.infomakes.in">InfoMakes IT Infrastructure</a> - 2024 - Current</span>
                  </div>
                </div>
              </li>
              <li className="timeline-inverted animate-box">
                <div className="timeline-badge"><i className="icon-suitcase"></i></div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h3 className="timeline-title">Data Science Intern</h3>
                    <span className="company"><a href="https://www.smecautomation.com">Marine Automations</a> - 2023</span>
                  </div>
                </div>
              </li>
              <li className="animate-box timeline-unverted">
                <div className="timeline-badge"><i className="icon-suitcase"></i></div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h3 className="timeline-title">Full Stack Developer</h3>
                    <span className="company"><a href="https://www.infomakes.in">InfoMakes IT Infrastructure</a> - 2022</span>
                  </div>
                </div>
              </li>

              <br />
              <li className="timeline-heading text-center animate-box">
                <div><h3 style={{color: 'white'}}>Education</h3></div>
              </li>
              <li className="timeline-inverted animate-box">
                <div className="timeline-badge"><i className="icon-graduation-cap"></i></div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h3 className="timeline-title">Masters of Computer Application</h3>
                    <span className="company">University of Kerala - 2023 - </span>
                  </div>
                </div>
              </li>
              <li className="animate-box timeline-unverted">
                <div className="timeline-badge"><i className="icon-graduation-cap"></i></div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h3 className="timeline-title">B.Sc Computer Science</h3>
                    <span className="company">University of Kerala - 2019 - 2022</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;