import React, { useEffect } from 'react'
import Header from './components/Header'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Medium from './components/Medium'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
  useEffect(() => {
    // Hide loader after component mounts
    const timer = setTimeout(() => {
      const loader = document.querySelector('.fh5co-loader');
      if (loader) {
        loader.style.display = 'none';
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="fh5co-loader"></div>
      <div id="page">
        <Header />
        <About />
        <Projects />
        <Experience />
        <Medium />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}

export default App