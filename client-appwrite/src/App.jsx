import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import './App.css'

// Lazy load all major components for code splitting
const Header = lazy(() => import('./components/HomeComponents/Header'));
const About = lazy(() => import('./components/HomeComponents/About'));
const TechnicalExpertise = lazy(() => import('./components/HomeComponents/TechnicalExpertise'));
const Projects = lazy(() => import('./components/HomeComponents/Projects'));
const Experience = lazy(() => import('./components/HomeComponents/Experience'));
const CertificationsAndLicenses = lazy(() => import('./components/HomeComponents/CertificationsAndLicenses'));
const ArticlesAndBlogs = lazy(() => import('./components/HomeComponents/ArticlesAndBlogs'));
const Contact = lazy(() => import('./components/HomeComponents/Contact'));
const Footer = lazy(() => import('./components/HomeComponents/Footer'));
const CLILogin = lazy(() => import('./pages/CLILogin'));
const Dashboard = lazy(() => import('./pages/dashboard/base'));

// Loading component with portfolio theme
const LoadingSpinner = ({ minimal = false }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: minimal ? '100px' : '100vh',
    backgroundColor: minimal ? 'transparent' : '#0a0a0a',
    color: '#64ffda',
    fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace',
    fontSize: '14px'
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }}>
      <div style={{
        width: '20px',
        height: '20px',
        border: '2px solid #64ffda',
        borderTop: '2px solid transparent',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      Loading...
    </div>
  </div>
);

// Home component with lazy loading
const Home = () => {
  return (
    <div className="modern-portfolio">
      <Suspense fallback={<LoadingSpinner minimal />}>
        <Header />
      </Suspense>
      <Suspense fallback={<LoadingSpinner minimal />}>
        <About />
      </Suspense>
      <Suspense fallback={<LoadingSpinner minimal />}>
        <TechnicalExpertise />
      </Suspense>
      <Suspense fallback={<LoadingSpinner minimal />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<LoadingSpinner minimal />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<LoadingSpinner minimal />}>
        <CertificationsAndLicenses />
      </Suspense>
      <Suspense fallback={<LoadingSpinner minimal />}>
        <ArticlesAndBlogs />
      </Suspense>
      <Suspense fallback={<LoadingSpinner minimal />}>
        <Contact />
      </Suspense>
      <Suspense fallback={<LoadingSpinner minimal />}>
        <Footer />
      </Suspense>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/console" element={<CLILogin />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
      
      {/* Add spinner animation CSS */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </AuthProvider>
  );
}

export default App