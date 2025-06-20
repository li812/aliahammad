import React from 'react';
import { useParallaxEffect, useFullHeightEffect } from '../utils/effects';

const Header = () => {
  // Apply parallax and full height effects specifically to header
  useParallaxEffect();
  useFullHeightEffect();

  return (
    <header 
      id="fh5co-header" 
      className="fh5co-cover js-fullheight" 
      role="banner" 
      style={{backgroundImage: 'url(images/cover_bg_3.jpg)'}}
      data-stellar-background-ratio="0.5"
    >
      <div className="overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2 text-center">
            <div className="display-t js-fullheight">
              <div className="display-tc js-fullheight animate-box" data-animate-effect="fadeIn">
                <div 
                  className="profile-thumb" 
                  style={{background: 'url(images/user-3.jpg)'}}
                ></div>
                <h1><span>Ali Ahammad</span></h1>
                <h3><span>Data Science Enthusiast / AI Researcher / Student</span></h3>
                <div>
                  <ul className="fh5co-social-icons">
                    <li>
                      <a href="https://www.linkedin.com/in/ali-ahammad-li0812">
                        <i className="icon-linkedin2"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://github.com/li812">
                        <i className="icon-github2"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/the_raptor_rider_/">
                        <i className="icon-instagram2"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;