import React, { useEffect } from 'react'
import Header from './components/Header'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Medium from './components/Medium'
import Contact from './components/Contact'
import Footer from './components/Footer'
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