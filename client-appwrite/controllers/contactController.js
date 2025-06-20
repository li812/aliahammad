import { ContactService } from '../services/contactService';

export class ContactController {
  
  /**
   * Handle contact form submission
   * @param {Object} formData - Contact form data
   * @param {function} onSuccess - Success callback
   * @param {function} onError - Error callback
   * @param {function} onLoading - Loading state callback
   */
  static async handleContactSubmission(formData, callbacks = {}) {
    const { onSuccess, onError, onLoading } = callbacks;
    
    try {
      // Set loading state
      if (onLoading) onLoading(true);
      
      // Submit contact form
      const response = await ContactService.submitContact(formData);
      
      if (response.success) {
        // Success callback
        if (onSuccess) onSuccess(response);
        
        return {
          success: true,
          message: response.message,
          data: response.data
        };
      } else {
        // Handle validation errors
        if (onError) onError(response);
        
        return {
          success: false,
          error: response.error,
          validationErrors: response.validationErrors
        };
      }
      
    } catch (error) {
      console.error('Contact controller error:', error);
      
      const errorResponse = {
        success: false,
        error: 'An unexpected error occurred',
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
   * Handle contact form validation
   * @param {Object} formData - Form data to validate
   * @returns {Object} - Validation result
   */
  static validateContactForm(formData) {
    const errors = {};
    
    // First name validation
    if (!formData.firstName || formData.firstName.trim().length < 2) {
      errors.firstName = 'First name is required (minimum 2 characters)';
    }
    
    // Last name validation
    if (!formData.lastName || formData.lastName.trim().length < 2) {
      errors.lastName = 'Last name is required (minimum 2 characters)';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Subject validation
    if (!formData.subject || formData.subject.trim().length < 5) {
      errors.subject = 'Subject is required (minimum 5 characters)';
    }
    
    // Message validation
    if (!formData.message || formData.message.trim().length < 10) {
      errors.message = 'Message is required (minimum 10 characters)';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
  
  /**
   * Extract form data from form element
   * @param {HTMLFormElement} formElement - The contact form element
   * @returns {Object} - Extracted form data
   */
  static extractFormData(formElement) {
    const formData = new FormData(formElement);
    
    return {
      firstName: formData.get('firstName') || '',
      lastName: formData.get('lastName') || '',
      email: formData.get('email') || '',
      subject: formData.get('subject') || '',
      message: formData.get('message') || ''
    };
  }
  
  /**
   * Reset form validation errors
   * @param {HTMLFormElement} formElement - The contact form element
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
   * Display form validation errors
   * @param {HTMLFormElement} formElement - The contact form element
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
   * Show success message
   * @param {HTMLFormElement} formElement - The contact form element
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
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      successElement.remove();
    }, 5000);
  }
  
  /**
   * Show general error message
   * @param {HTMLFormElement} formElement - The contact form element
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

export default ContactController;