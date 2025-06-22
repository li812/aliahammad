import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
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
const Base = lazy(() => import('./pages/dashboard/base'));

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

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return <LoadingSpinner />;
  }

  // Redirect to console login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/console" replace />;
  }

  // Render the protected component if authenticated
  return children;
};

// Public Route Component (redirect to dashboard if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return <LoadingSpinner />;
  }

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Render the public component if not authenticated
  return children;
};

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

// App Routes Component (needs to be inside AuthProvider to access useAuth)
const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        
        {/* Login Route - redirect to dashboard if already authenticated */}
        <Route 
          path="/console" 
          element={
            <PublicRoute>
              <CLILogin />
            </PublicRoute>
          } 
        />
        
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Base />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <AppRoutes />
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