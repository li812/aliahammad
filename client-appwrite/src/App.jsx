import React, { useEffect } from 'react'
import Header from './components/HomeComponents/Header'
import About from './components/HomeComponents/About'
import Projects from './components/HomeComponents/Projects'
import Experience from './components/HomeComponents/Experience'
import Medium from './components/HomeComponents/Medium'
import Contact from './components/HomeComponents/Contact'
import Footer from './components/HomeComponents/Footer'
import { useAllEffectsHook } from './utils/effects'
import './App.css'

function App() {
  // Initialize all effects
  useAllEffectsHook();

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