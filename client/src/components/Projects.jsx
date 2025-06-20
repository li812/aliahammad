import React from 'react';

const Projects = () => {
  return (
    <div id="fh5co-work" className="fh5co-bg-dark">
      <div className="container">
        <div className="row animate-box">
          <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
            <h2>My Projects</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 text-center col-padding animate-box">
            <a href="https://pypi.org/project/lisql/" className="work" style={{backgroundImage: 'url(images/lisql.png)'}}>
              <div className="desc">
                <h3>LiSQL</h3>
                <span>A feature-rich Python package designed to streamline interactions with multiple MySQL databases across different servers.</span>
              </div>
            </a>
          </div>
          <div className="col-md-3 text-center col-padding animate-box">
            <a href="https://github.com/li812/3D-Face-Recontructor/" className="work" style={{backgroundImage: 'url(images/3d-face.png)'}}>
              <div className="desc">
                <h3>3D Face Recontructor</h3>
                <span>This project involves creating a 3D model of a human face from a 2D image.</span>
              </div>
            </a>
          </div>
          <div className="col-md-3 text-center col-padding animate-box">
            <a href="https://github.com/li812/Attendance-System-Using-Facial-Recognition/" className="work" style={{backgroundImage: 'url(images/at.png)'}}>
              <div className="desc">
                <h3>Attendance System Using Facial Recognition</h3>
                <span>The attendance system using facial recognition allows for fast and efficient tracking of employee attendance using computer vision algorithms.</span>
              </div>
            </a>
          </div>
          <div className="col-md-3 text-center col-padding animate-box">
            <a href="https://github.com/li812/Pandemic-Controlling-System/" className="work" style={{backgroundImage: 'url(images/pandemo.png)'}}>
              <div className="desc">
                <h3>Pandemic Controlling System</h3>
                <span>Pandemic Control System: a web and android app solution for governments and citizens to control and overcome pandemics.</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;