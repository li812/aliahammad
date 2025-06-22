import { ContactService } from '../services/contactService';

export class InquiriesController {
  
  /**
   * Fetch all inquiries with pagination and filtering
   * @param {Object} options - Query options
   * @param {Object} callbacks - Callback functions
   * @returns {Promise<Object>} - Response with inquiries data
   */
  static async fetchInquiries(options = {}, callbacks = {}) {
    const { onSuccess, onError, onLoading } = callbacks;
    
    try {
      // Set loading state
      if (onLoading) onLoading(true);
      
      const { limit = 50, offset = 0, status = null } = options;
      
      const response = await ContactService.getContacts({
        limit,
        offset,
        status
      });
      
      if (response.success) {
        const result = {
          success: true,
          data: response.data.contacts,
          total: response.data.total,
          message: 'Inquiries fetched successfully'
        };
        
        if (onSuccess) onSuccess(result);
        return result;
      } else {
        const errorResponse = {
          success: false,
          error: response.error || 'Failed to fetch inquiries',
          details: response.details
        };
        
        if (onError) onError(errorResponse);
        return errorResponse;
      }
      
    } catch (error) {
      console.error('Fetch inquiries controller error:', error);
      
      const errorResponse = {
        success: false,
        error: 'An unexpected error occurred while fetching inquiries',
        details: error.message
      };
      
      if (onError) onError(errorResponse);
      return errorResponse;
      
    } finally {
      if (onLoading) onLoading(false);
    }
  }
  
  /**
   * Update inquiry status
   * @param {string} inquiryId - Inquiry ID
   * @param {string} newStatus - New status value
   * @param {Object} callbacks - Callback functions
   * @returns {Promise<Object>} - Update response
   */
  static async updateInquiryStatus(inquiryId, newStatus, callbacks = {}) {
    const { onSuccess, onError, onLoading } = callbacks;
    
    try {
      // Set loading state
      if (onLoading) onLoading(inquiryId);
      
      // Validate inputs
      if (!inquiryId) {
        const errorResponse = {
          success: false,
          error: 'Inquiry ID is required'
        };
        
        if (onError) onError(errorResponse);
        return errorResponse;
      }
      
      const validStatuses = ['new', 'read', 'replied'];
      if (!validStatuses.includes(newStatus)) {
        const errorResponse = {
          success: false,
          error: 'Invalid status value'
        };
        
        if (onError) onError(errorResponse);
        return errorResponse;
      }
      
      const response = await ContactService.updateContactStatus(inquiryId, newStatus);
      
      if (response.success) {
        const result = {
          success: true,
          data: response.data,
          message: `Inquiry marked as ${newStatus}`
        };
        
        if (onSuccess) onSuccess(result);
        return result;
      } else {
        const errorResponse = {
          success: false,
          error: response.error || 'Failed to update inquiry status',
          details: response.details
        };
        
        if (onError) onError(errorResponse);
        return errorResponse;
      }
      
    } catch (error) {
      console.error('Update inquiry status controller error:', error);
      
      const errorResponse = {
        success: false,
        error: 'An unexpected error occurred while updating status',
        details: error.message
      };
      
      if (onError) onError(errorResponse);
      return errorResponse;
      
    } finally {
      if (onLoading) onLoading(null);
    }
  }
  
  /**
   * Delete an inquiry
   * @param {string} inquiryId - Inquiry ID
   * @param {Object} callbacks - Callback functions
   * @returns {Promise<Object>} - Delete response
   */
  static async deleteInquiry(inquiryId, callbacks = {}) {
    const { onSuccess, onError, onLoading } = callbacks;
    
    try {
      // Set loading state
      if (onLoading) onLoading(inquiryId);
      
      // Validate input
      if (!inquiryId) {
        const errorResponse = {
          success: false,
          error: 'Inquiry ID is required'
        };
        
        if (onError) onError(errorResponse);
        return errorResponse;
      }
      
      const response = await ContactService.deleteContact(inquiryId);
      
      if (response.success) {
        const result = {
          success: true,
          inquiryId,
          message: 'Inquiry deleted successfully'
        };
        
        if (onSuccess) onSuccess(result);
        return result;
      } else {
        const errorResponse = {
          success: false,
          error: response.error || 'Failed to delete inquiry',
          details: response.details
        };
        
        if (onError) onError(errorResponse);
        return errorResponse;
      }
      
    } catch (error) {
      console.error('Delete inquiry controller error:', error);
      
      const errorResponse = {
        success: false,
        error: 'An unexpected error occurred while deleting inquiry',
        details: error.message
      };
      
      if (onError) onError(errorResponse);
      return errorResponse;
      
    } finally {
      if (onLoading) onLoading(null);
    }
  }
  
  /**
   * Get inquiry statistics
   * @param {Object} callbacks - Callback functions
   * @returns {Promise<Object>} - Statistics response
   */
  static async getInquiryStats(callbacks = {}) {
    const { onSuccess, onError, onLoading } = callbacks;
    
    try {
      if (onLoading) onLoading(true);
      
      const response = await ContactService.getContactStats();
      
      if (response.success) {
        const result = {
          success: true,
          data: response.data,
          message: 'Statistics fetched successfully'
        };
        
        if (onSuccess) onSuccess(result);
        return result;
      } else {
        const errorResponse = {
          success: false,
          error: response.error || 'Failed to fetch statistics',
          details: response.details
        };
        
        if (onError) onError(errorResponse);
        return errorResponse;
      }
      
    } catch (error) {
      console.error('Get inquiry stats controller error:', error);
      
      const errorResponse = {
        success: false,
        error: 'An unexpected error occurred while fetching statistics',
        details: error.message
      };
      
      if (onError) onError(errorResponse);
      return errorResponse;
      
    } finally {
      if (onLoading) onLoading(false);
    }
  }
  
  /**
   * Filter inquiries based on criteria
   * @param {Array} inquiries - Array of inquiries
   * @param {Object} filters - Filter criteria
   * @returns {Array} - Filtered inquiries
   */
  static filterInquiries(inquiries, filters) {
    const { statusFilter = 'all', searchTerm = '' } = filters;
    
    return inquiries.filter(inquiry => {
      // Status filter
      const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter;
      
      // Search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm || 
        inquiry.fullName.toLowerCase().includes(searchLower) ||
        inquiry.email.toLowerCase().includes(searchLower) ||
        inquiry.subject.toLowerCase().includes(searchLower) ||
        inquiry.message.toLowerCase().includes(searchLower);
      
      return matchesStatus && matchesSearch;
    });
  }
  
  /**
   * Calculate inquiry statistics from array
   * @param {Array} inquiries - Array of inquiries
   * @returns {Object} - Statistics object
   */
  static calculateStats(inquiries) {
    const total = inquiries.length;
    const newCount = inquiries.filter(i => i.status === 'new').length;
    const readCount = inquiries.filter(i => i.status === 'read').length;
    const repliedCount = inquiries.filter(i => i.status === 'replied').length;
    
    return {
      total,
      newCount,
      readCount,
      repliedCount,
      pendingCount: newCount + readCount, // New + Read = Pending
      completionRate: total > 0 ? ((repliedCount / total) * 100).toFixed(1) : 0
    };
  }
  
  /**
   * Get status badge configuration
   * @param {string} status - Inquiry status
   * @returns {Object} - Badge configuration
   */
  static getStatusBadgeConfig(status) {
    const badges = {
      new: { 
        label: 'New', 
        className: 'status-badge new', 
        color: '#ef4444',
        priority: 3 
      },
      read: { 
        label: 'Read', 
        className: 'status-badge read', 
        color: '#10b981',
        priority: 2 
      },
      replied: { 
        label: 'Replied', 
        className: 'status-badge replied', 
        color: '#9333ea',
        priority: 1 
      }
    };
    
    return badges[status] || badges.new;
  }
  
  /**
   * Sort inquiries by various criteria
   * @param {Array} inquiries - Array of inquiries
   * @param {string} sortBy - Sort criteria
   * @param {string} sortOrder - Sort order (asc/desc)
   * @returns {Array} - Sorted inquiries
   */
  static sortInquiries(inquiries, sortBy = 'createdAt', sortOrder = 'desc') {
    return [...inquiries].sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.fullName.toLowerCase();
          bValue = b.fullName.toLowerCase();
          break;
        case 'email':
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        case 'subject':
          aValue = a.subject.toLowerCase();
          bValue = b.subject.toLowerCase();
          break;
        case 'status':
          // Sort by status priority
          const aConfig = this.getStatusBadgeConfig(a.status);
          const bConfig = this.getStatusBadgeConfig(b.status);
          aValue = aConfig.priority;
          bValue = bConfig.priority;
          break;
        case 'createdAt':
        default:
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }
  
  /**
   * Validate inquiry actions
   * @param {Object} inquiry - Inquiry object
   * @param {string} action - Action to validate
   * @returns {Object} - Validation result
   */
  static validateAction(inquiry, action) {
    if (!inquiry) {
      return {
        isValid: false,
        error: 'Inquiry not found'
      };
    }
    
    switch (action) {
      case 'markAsRead':
        if (inquiry.status !== 'new') {
          return {
            isValid: false,
            error: 'Only new inquiries can be marked as read'
          };
        }
        break;
        
      case 'markAsReplied':
        if (inquiry.status === 'replied') {
          return {
            isValid: false,
            error: 'Inquiry is already marked as replied'
          };
        }
        break;
        
      case 'delete':
        // Allow deletion of any inquiry
        break;
        
      default:
        return {
          isValid: false,
          error: 'Invalid action'
        };
    }
    
    return {
      isValid: true
    };
  }
  
  /**
   * Format inquiry date for display
   * @param {string|Date} date - Date to format
   * @param {string} format - Format type
   * @returns {string} - Formatted date
   */
  static formatDate(date, format = 'short') {
    const dateObj = new Date(date);
    
    switch (format) {
      case 'short':
        return dateObj.toLocaleDateString();
      case 'long':
        return dateObj.toLocaleString();
      case 'relative':
        return this.getRelativeTime(dateObj);
      default:
        return dateObj.toLocaleDateString();
    }
  }
  
  /**
   * Get relative time string
   * @param {Date} date - Date object
   * @returns {string} - Relative time string
   */
  static getRelativeTime(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
  }
}

export default InquiriesController;