import { LoginService } from '../services/loginService';

export class LoginController {
  
  /**
   * Handle admin login
   * @param {Object} credentials - Login credentials
   * @param {Object} callbacks - Success/error callbacks
   * @returns {Promise<Object>} - Login response
   */
  static async handleLogin(credentials, callbacks = {}) {
    const { onSuccess, onError, onLoading } = callbacks;
    
    try {
      // Set loading state
      if (onLoading) onLoading(true);
      
      // Validate credentials
      const validation = this.validateLoginForm(credentials);
      if (!validation.isValid) {
        const errorResponse = {
          success: false,
          error: 'Validation failed',
          validationErrors: validation.errors
        };
        
        if (onError) onError(errorResponse);
        return errorResponse;
      }
      
      // Attempt login
      const response = await LoginService.login(credentials);
      
      if (response.success) {
        // Success callback
        if (onSuccess) onSuccess(response);
        return response;
      } else {
        // Error callback
        if (onError) onError(response);
        return response;
      }
      
    } catch (error) {
      console.error('Login controller error:', error);
      
      const errorResponse = {
        success: false,
        error: 'An unexpected error occurred during login',
        details: error.message
      };
      
      if (onError) onError(errorResponse);
      return errorResponse;
      
    } finally {
      // Clear loading state
      if (onLoading) onLoading(false);
    }
  }
  
  /**
   * Handle admin logout
   * @param {Object} callbacks - Success/error callbacks
   * @returns {Promise<Object>} - Logout response
   */
  static async handleLogout(callbacks = {}) {
    const { onSuccess, onError, onLoading } = callbacks;
    
    try {
      // Set loading state
      if (onLoading) onLoading(true);
      
      // Attempt logout
      const response = await LoginService.logout();
      
      if (response.success) {
        // Success callback
        if (onSuccess) onSuccess(response);
        return response;
      } else {
        // Error callback
        if (onError) onError(response);
        return response;
      }
      
    } catch (error) {
      console.error('Logout controller error:', error);
      
      const errorResponse = {
        success: false,
        error: 'An unexpected error occurred during logout',
        details: error.message
      };
      
      if (onError) onError(errorResponse);
      return errorResponse;
      
    } finally {
      // Clear loading state
      if (onLoading) onLoading(false);
    }
  }
  
  /**
   * Check if user is authenticated (Appwrite handles JWT validation)
   * @returns {Promise<Object>} - Authentication status
   */
  static async checkAuthentication() {
    try {
      const response = await LoginService.getCurrentUser();
      
      if (response.success) {
        return {
          isAuthenticated: true,
          user: response.data
        };
      } else {
        return {
          isAuthenticated: false,
          user: null
        };
      }
      
    } catch (error) {
      console.error('Authentication check error:', error);
      return {
        isAuthenticated: false,
        user: null,
        error: error.message
      };
    }
  }
  
  /**
   * Validate login form data
   * @param {Object} credentials - Login credentials
   * @returns {Object} - Validation result
   */
  static validateLoginForm(credentials) {
    const errors = {};
    
    // Email validation
    if (!credentials.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!credentials.password) {
      errors.password = 'Password is required';
    } else if (credentials.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
  
  /**
   * Display login form errors
   * @param {HTMLFormElement} formElement - The login form element
   * @param {Object} errors - Validation errors object
   */
  static displayFormErrors(formElement, errors) {
    // Clear previous errors
    this.clearFormErrors(formElement);
    
    Object.keys(errors).forEach(fieldName => {
      const field = formElement.querySelector(`[name="${fieldName}"], #${fieldName}`);
      if (field) {
        // Add error class
        field.classList.add('error');
        
        // Create error message element
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = '#dc3545';
        errorElement.style.fontSize = '14px';
        errorElement.style.marginTop = '5px';
        errorElement.textContent = errors[fieldName];
        
        // Insert error message after the field
        field.parentNode.insertBefore(errorElement, field.nextSibling);
      }
    });
  }
  
  /**
   * Clear form validation errors
   * @param {HTMLFormElement} formElement - The login form element
   */
  static clearFormErrors(formElement) {
    const errorElements = formElement.querySelectorAll('.error-message');
    errorElements.forEach(element => element.remove());
    
    const inputElements = formElement.querySelectorAll('.form-control');
    inputElements.forEach(element => {
      element.classList.remove('error');
    });
  }
  
  /**
   * Show success message
   * @param {HTMLFormElement} formElement - The login form element
   * @param {string} message - Success message
   */
  static showSuccessMessage(formElement, message) {
    // Clear any existing messages
    const existingMessages = formElement.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(element => element.remove());
    
    // Create success message element
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.style.color = '#28a745';
    successElement.style.backgroundColor = '#d4edda';
    successElement.style.border = '1px solid #c3e6cb';
    successElement.style.padding = '12px';
    successElement.style.borderRadius = '4px';
    successElement.style.marginBottom = '20px';
    successElement.textContent = message;
    
    // Insert success message at the top of the form
    formElement.insertBefore(successElement, formElement.firstChild);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      successElement.remove();
    }, 3000);
  }
  
  /**
   * Show error message
   * @param {HTMLFormElement} formElement - The login form element
   * @param {string} message - Error message
   */
  static showErrorMessage(formElement, message) {
    // Clear any existing messages
    const existingMessages = formElement.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(element => element.remove());
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = '#dc3545';
    errorElement.style.backgroundColor = '#f8d7da';
    errorElement.style.border = '1px solid #f5c6cb';
    errorElement.style.padding = '12px';
    errorElement.style.borderRadius = '4px';
    errorElement.style.marginBottom = '20px';
    errorElement.textContent = message;
    
    // Insert error message at the top of the form
    formElement.insertBefore(errorElement, formElement.firstChild);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      errorElement.remove();
    }, 5000);
  }
}

export default LoginController;