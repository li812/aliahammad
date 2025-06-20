import React from 'react';

const About = () => {
return (
   <div id="fh5co-about" className="animate-box" data-animate-effect="fadeInUp">
      <div className="container">
         <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
               <h2>About Me</h2>
            </div>
         </div>
         <div className="row">
            <div className="col-md-4 animate-box" data-animate-effect="fadeInLeft">
               <ul className="info" style={{ padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '10px' }}><span className="first-block">Full Name:</span><span className="second-block">Ali Ahammad</span></li>
                  <li style={{ marginBottom: '10px' }}><span className="first-block">Phone:</span><span className="second-block">+91 9895850894</span></li>
                  <li style={{ marginBottom: '10px' }}><span className="first-block">Email:</span><span className="second-block">mail@aliahammad.com</span></li>
                  <li style={{ marginBottom: '10px' }}><span className="first-block">Website:</span><span className="second-block">www.aliahammad.com</span></li>
                  <li style={{ marginBottom: '10px' }}><span className="first-block">Address:</span><span className="second-block">House No : 254,<br/>12 Muri Nagar, Thattamala PO, Kollam 691020, Kerala, India.</span></li>
               </ul>
            </div>
            <div className="col-md-8 animate-box" data-animate-effect="fadeInRight">
               <h2>Hello There!</h2>
               <p>
                  My name is Ali Ahammad, and I am a Data Science Enthusiast, AI Researcher, and dedicated student currently pursuing a Masters in Computer Application. With a robust background in developing cutting-edge machine learning models for predictive analytics, computer vision, and natural language processing (NLP), I bring a wealth of experience to any project.
               </p>
               <p>
                  Throughout my professional journey, I have demonstrated proficiency in data collection, preprocessing, and analysis garnered from diverse sources, including Marine Automation Systems and Aerial Data Sources. My expertise extends to the realm of Full Stack Development, where I have adeptly designed, developed, and deployed websites utilizing technologies such as the Laravel framework.
               </p>
               <p>
                  Driven by an unwavering passion for leveraging technology to solve intricate problems and foster innovation, I am committed to making meaningful contributions in every endeavor I undertake.
               </p>
               <div id="social-icons">
                  <ul className="fh5co-social-icons" style={{
                     display: 'flex',
                     listStyle: 'none',
                     padding: 0,
                     margin: 0,
                     gap: '10px'
                  }}>
                     <li><a href="https://www.linkedin.com/in/ali-ahammad-li0812"><i className="icon-linkedin2"></i></a></li>
                     <li><a href="https://github.com/li812"><i className="icon-github2"></i></a></li>
                     <li><a href="https://www.instagram.com/the_raptor_rider_/"><i className="icon-instagram2"></i></a></li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   </div>
);
};

export default About;