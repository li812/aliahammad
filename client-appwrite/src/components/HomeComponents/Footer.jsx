import React from 'react';
import { useParallaxEffect, useFullHeightEffect } from '../../utils/effects';

const Footer = () => {
  // Apply parallax and full height effects like Header
  useParallaxEffect();
  useFullHeightEffect();

  return (
    <>
      <div id="fh5co-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <p>&copy; 2025 Ali Ahammad. All Rights Reserved. <br/>Designed by <a href="https://www.aliahammad.com" target="_blank" rel="noopener noreferrer">Ali Ahammad</a></p>
            </div>
          </div>
        </div>
      </div>

      <div className="gototop js-top">
        <a href="#" className="js-gotop"><i className="icon-arrow-up22"></i></a>
      </div>
    </>
  );
};

export default Footer;