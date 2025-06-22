import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  FaBars,
  FaTimes,
  FaChartLine,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaFileAlt,
  FaUsers,
  FaUserShield
} from 'react-icons/fa';
import { MdDashboard, MdAnalytics } from "react-icons/md";
import './dashboard.css';

// Import page components
import Stats from './Stats';
import Inquiries from './Inquiries';

const Base = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('stats');
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleComponentChange = (component) => {
    setActiveComponent(component);
    setMobileMenuOpen(false);
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.name) {
      return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return 'AA';
  };

  // Navigation items with modern styling
  const navigationItems = [
    {
      id: 'stats',
      label: 'Dashboard',
      icon: <MdDashboard />,
      component: 'stats',
      description: 'Overview & Analytics'
    },
    {
      id: 'inquiries',
      label: 'Inquiries',
      icon: <FaEnvelope />,
      component: 'inquiries',
      description: 'Contact Messages'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <MdAnalytics />,
      component: 'analytics',
      description: 'Detailed Reports',
      disabled: true
    },
    {
      id: 'content',
      label: 'Content',
      icon: <FaFileAlt />,
      component: 'content',
      description: 'Manage Portfolio',
      disabled: true
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <FaCog />,
      component: 'settings',
      description: 'System Config',
      disabled: true
    }
  ];

  // Get page title and description
  const getPageInfo = () => {
    const item = navigationItems.find(item => item.component === activeComponent);
    return {
      title: item ? item.label : 'Dashboard',
      description: item ? item.description : 'Welcome to your admin dashboard'
    };
  };

  // Get page subtitle based on active component
  const getPageSubtitle = () => {
    switch (activeComponent) {
      case 'stats':
        return 'Monitor your portfolio performance, visitor analytics, and key metrics in real-time.';
      case 'inquiries':
        return 'Manage contact form submissions, client communications, and respond to messages.';
      case 'analytics':
        return 'Deep dive into detailed analytics, user behavior, and performance insights.';
      case 'content':
        return 'Update your portfolio content, manage projects, and publish new articles.';
      case 'settings':
        return 'Configure system settings, preferences, and account management options.';
      default:
        return 'Welcome to your modern portfolio administration dashboard.';
    }
  };

  // Render active component
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'stats':
        return <Stats />;
      case 'inquiries':
        return <Inquiries />;
      case 'analytics':
        return (
          <div className="dashboard-card">
            <div className="card-header">
              <h3 className="card-title">Advanced Analytics</h3>
              <span className="status-badge new">Coming Soon</span>
            </div>
            <div className="card-body">
              <p>Advanced analytics dashboard with detailed insights, user behavior tracking, and performance metrics will be available soon.</p>
              <div className="mt-4">
                <button className="action-btn primary">
                  <MdAnalytics />
                  Get Notified
                </button>
              </div>
            </div>
          </div>
        );
      case 'content':
        return (
          <div className="dashboard-card">
            <div className="card-header">
              <h3 className="card-title">Content Management</h3>
              <span className="status-badge new">Coming Soon</span>
            </div>
            <div className="card-body">
              <p>Comprehensive content management system for updating portfolio sections, managing projects, and publishing articles.</p>
              <div className="mt-4">
                <button className="action-btn primary">
                  <FaFileAlt />
                  Get Notified
                </button>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="dashboard-card">
            <div className="card-header">
              <h3 className="card-title">System Settings</h3>
              <span className="status-badge new">Coming Soon</span>
            </div>
            <div className="card-body">
              <p>Advanced system configuration, user preferences, security settings, and account management options.</p>
              <div className="mt-4">
                <button className="action-btn primary">
                  <FaCog />
                  Get Notified
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <Stats />;
    }
  };

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const pageInfo = getPageInfo();

  return (
    <div className="dashboard-container">
      {/* Modern Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            AA
          </div>
          <h2 className="sidebar-title">Admin Console</h2>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navigationItems.map((item) => (
            <div key={item.id} className="nav-item">
              <button
                className={`nav-link ${activeComponent === item.component ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
                onClick={() => !item.disabled && handleComponentChange(item.component)}
                disabled={item.disabled}
                title={sidebarCollapsed ? `${item.label} - ${item.description}` : item.description}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.label}</span>
              </button>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Modern Top Navbar */}
        <header className="dashboard-navbar">
          <div className="navbar-left">
            <button
              className="sidebar-toggle"
              onClick={toggleSidebar}
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <FaBars />
            </button>
            <h1 className="navbar-title">{pageInfo.title}</h1>
          </div>

          <div className="navbar-right">
            {/* Mobile menu toggle */}
            {isMobile && (
              <button
                className="sidebar-toggle"
                onClick={toggleMobileMenu}
                title="Toggle menu"
              >
                {mobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            )}

            {/* User info */}
            <div className="navbar-user">
              <div className="user-avatar">
                {getUserInitials()}
              </div>
              <div className="user-info">
                <div className="user-name">
                  {user?.name || user?.email?.split('@')[0] || 'Administrator'}
                </div>
                <div className="user-role">
                  <FaUserShield style={{ fontSize: '0.75rem', marginRight: '0.25rem' }} />
                  Admin
                </div>
              </div>
            </div>

            {/* Logout button */}
            <button
              className="logout-btn"
              onClick={handleLogout}
              disabled={loading}
              title="Logout"
            >
              {loading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                </div>
              ) : (
                <>
                  <FaSignOutAlt />
                  {!isMobile && <span>Logout</span>}
                </>
              )}
            </button>
          </div>
        </header>

        {/* Modern Page Content */}
        <div className="dashboard-content">
          {/* Content Header */}
          <div className="content-header">
            <h1 className="content-title">{pageInfo.title}</h1>
            <p className="content-subtitle">{getPageSubtitle()}</p>
          </div>

          {/* Dynamic Content */}
          <div className="content-body fade-in">
            {renderActiveComponent()}
          </div>
        </div>
      </main>

      {/* Mobile overlay */}
      {mobileMenuOpen && isMobile && (
        <div
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 50
          }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Base;