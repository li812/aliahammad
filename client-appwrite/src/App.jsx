import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/HomeComponents/Header'
import About from './components/HomeComponents/About'
import Projects from './components/HomeComponents/Projects'
import Experience from './components/HomeComponents/Experience'
import Medium from './components/HomeComponents/Medium'
import Contact from './components/HomeComponents/Contact'
import Footer from './components/HomeComponents/Footer'
import CLILogin from './pages/CLILogin'
import Dashboard from './pages/dashboard/base'
import { AuthProvider } from './context/AuthContext'
import { useAllEffectsHook } from './utils/effects'
import './App.css'

// Home component for the portfolio
const Home = () => {
  // Initialize all effects for home page
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
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/console" element={<CLILogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App