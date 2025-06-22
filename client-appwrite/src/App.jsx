import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/HomeComponents/Header'
import About from './components/HomeComponents/About'
import TechnicalExpertise from './components/HomeComponents/TechnicalExpertise'
import Projects from './components/HomeComponents/Projects'
import Experience from './components/HomeComponents/Experience'
import CertificationsAndLicenses from './components/HomeComponents/CertificationsAndLicenses'
import Medium from './components/HomeComponents/Medium'
import Contact from './components/HomeComponents/Contact'
import Footer from './components/HomeComponents/Footer'
import CLILogin from './pages/CLILogin'
import Dashboard from './pages/dashboard/base'
import { AuthProvider } from './context/AuthContext'
import './App.css'

// Home component for the portfolio
const Home = () => {
  return (
    <div className="modern-portfolio">
      <Header />
      <About />
      <TechnicalExpertise />
      <Projects />
      <Experience />
      <CertificationsAndLicenses />
      <Medium />
      <Contact />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/console" element={<CLILogin />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App