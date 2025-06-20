import React, { useState, useEffect } from 'react';
import { LoginController } from '../../controllers/loginController';

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Check if already authenticated
  useEffect(() => {
    checkExistingAuth();
  }, []);

  const checkExistingAuth = async () => {
    const authStatus = await LoginController.checkAuthentication();
    if (authStatus.isAuthenticated) {
      onLoginSuccess && onLoginSuccess(authStatus.user);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await LoginController.handleLogin(formData, {
      onLoading: setLoading,
      onSuccess: (response) => {
        setErrors({});
        // Redirect to dashboard or call success callback
        onLoginSuccess && onLoginSuccess(response.data.user);
      },
      onError: (response) => {
        if (response.validationErrors) {
          setErrors(response.validationErrors);
        } else {
          setErrors({ general: response.error });
        }
      }
    });
  };

  return (
    <div className="login-container" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f9fa'
    }}>
      <div className="login-form" style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Admin Login</h2>
        
        {errors.general && (
          <div style={{
            color: '#dc3545',
            backgroundColor: '#f8d7da',
            border: '1px solid #f5c6cb',
            padding: '12px',
            borderRadius: '4px',
            marginBottom: '20px'
          }}>
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`form-control ${errors.email ? 'error' : ''}`}
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${errors.email ? '#dc3545' : '#ddd'}`,
                borderRadius: '4px',
                fontSize: '16px'
              }}
              placeholder="Enter your admin email"
              disabled={loading}
            />
            {errors.email && (
              <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                {errors.email}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`form-control ${errors.password ? 'error' : ''}`}
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${errors.password ? '#dc3545' : '#ddd'}`,
                borderRadius: '4px',
                fontSize: '16px'
              }}
              placeholder="Enter your password"
              disabled={loading}
            />
            {errors.password && (
              <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                {errors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: loading ? '#6c757d' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;