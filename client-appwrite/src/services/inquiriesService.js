import { ContactService } from './contactService';
import { Query } from 'appwrite';
import { databases, appwriteConfig } from '../config/appwrite';

export class InquiriesService extends ContactService {
  
  /**
   * Get inquiries with advanced filtering and sorting
   * @param {Object} options - Query options
   * @returns {Promise<Object>} - Response with inquiries
   */
  static async getInquiriesAdvanced(options = {}) {
    try {
      const { 
        limit = 25, 
        offset = 0, 
        status = null,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        dateFrom = null,
        dateTo = null,
        searchTerm = null
      } = options;
      
      const queries = [
        Query.limit(limit),
        Query.offset(offset)
      ];
      
      // Status filter
      if (status && status !== 'all') {
        queries.push(Query.equal('status', status));
      }
      
      // Date range filter
      if (dateFrom) {
        queries.push(Query.greaterThanEqual('createdAt', dateFrom));
      }
      
      if (dateTo) {
        queries.push(Query.lessThanEqual('createdAt', dateTo));
      }
      
      // Sorting
      if (sortOrder === 'desc') {
        queries.push(Query.orderDesc(sortBy));
      } else {
        queries.push(Query.orderAsc(sortBy));
      }
      
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.contactsCollectionId,
        queries
      );
      
      let contacts = response.documents.map(doc => this.transformFromDatabase(doc));
      
      // Client-side search filtering if needed
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        contacts = contacts.filter(contact => 
          contact.fullName.toLowerCase().includes(searchLower) ||
          contact.email.toLowerCase().includes(searchLower) ||
          contact.subject.toLowerCase().includes(searchLower) ||
          contact.message.toLowerCase().includes(searchLower)
        );
      }
      
      return {
        success: true,
        data: {
          contacts,
          total: response.total,
          limit,
          offset
        }
      };
      
    } catch (error) {
      console.error('Get inquiries advanced error:', error);
      
      return {
        success: false,
        error: 'Failed to fetch inquiries',
        details: error.message
      };
    }
  }
  
  /**
   * Bulk update inquiry statuses
   * @param {Array} inquiryIds - Array of inquiry IDs
   * @param {string} status - New status
   * @returns {Promise<Object>} - Bulk update response
   */
  static async bulkUpdateStatus(inquiryIds, status) {
    try {
      const validStatuses = ['new', 'read', 'replied'];
      
      if (!validStatuses.includes(status)) {
        return {
          success: false,
          error: 'Invalid status value'
        };
      }
      
      if (!Array.isArray(inquiryIds) || inquiryIds.length === 0) {
        return {
          success: false,
          error: 'No inquiry IDs provided'
        };
      }
      
      const updatePromises = inquiryIds.map(id => 
        this.updateContactStatus(id, status)
      );
      
      const results = await Promise.allSettled(updatePromises);
      
      const successful = results.filter(result => 
        result.status === 'fulfilled' && result.value.success
      ).length;
      
      const failed = results.length - successful;
      
      return {
        success: failed === 0,
        data: {
          total: results.length,
          successful,
          failed,
          results
        },
        message: `Updated ${successful} inquiries successfully${failed > 0 ? `, ${failed} failed` : ''}`
      };
      
    } catch (error) {
      console.error('Bulk update status error:', error);
      
      return {
        success: false,
        error: 'Failed to bulk update statuses',
        details: error.message
      };
    }
  }
  
  /**
   * Bulk delete inquiries
   * @param {Array} inquiryIds - Array of inquiry IDs
   * @returns {Promise<Object>} - Bulk delete response
   */
  static async bulkDeleteInquiries(inquiryIds) {
    try {
      if (!Array.isArray(inquiryIds) || inquiryIds.length === 0) {
        return {
          success: false,
          error: 'No inquiry IDs provided'
        };
      }
      
      const deletePromises = inquiryIds.map(id => 
        this.deleteContact(id)
      );
      
      const results = await Promise.allSettled(deletePromises);
      
      const successful = results.filter(result => 
        result.status === 'fulfilled' && result.value.success
      ).length;
      
      const failed = results.length - successful;
      
      return {
        success: failed === 0,
        data: {
          total: results.length,
          successful,
          failed,
          results
        },
        message: `Deleted ${successful} inquiries successfully${failed > 0 ? `, ${failed} failed` : ''}`
      };
      
    } catch (error) {
      console.error('Bulk delete inquiries error:', error);
      
      return {
        success: false,
        error: 'Failed to bulk delete inquiries',
        details: error.message
      };
    }
  }
  
  /**
   * Get inquiry analytics data
   * @param {Object} options - Analytics options
   * @returns {Promise<Object>} - Analytics response
   */
  static async getInquiryAnalytics(options = {}) {
    try {
      const { period = 'month' } = options;
      
      // Calculate date range based on period
      const now = new Date();
      let fromDate;
      
      switch (period) {
        case 'week':
          fromDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case 'year':
          fromDate = new Date(now.setFullYear(now.getFullYear() - 1));
          break;
        case 'month':
        default:
          fromDate = new Date(now.setMonth(now.getMonth() - 1));
          break;
      }
      
      // Get all inquiries within the period
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.contactsCollectionId,
        [
          Query.greaterThanEqual('createdAt', fromDate.toISOString()),
          Query.orderDesc('createdAt'),
          Query.limit(1000)
        ]
      );
      
      const inquiries = response.documents.map(doc => this.transformFromDatabase(doc));
      
      // Calculate analytics
      const analytics = {
        totalInquiries: inquiries.length,
        statusBreakdown: {
          new: inquiries.filter(i => i.status === 'new').length,
          read: inquiries.filter(i => i.status === 'read').length,
          replied: inquiries.filter(i => i.status === 'replied').length
        },
        dailyTrend: this.calculateDailyTrend(inquiries, period),
        responseRate: this.calculateResponseRate(inquiries),
        avgResponseTime: this.calculateAvgResponseTime(inquiries),
        topEmailDomains: this.getTopEmailDomains(inquiries),
        subjectAnalysis: this.analyzeSubjects(inquiries)
      };
      
      return {
        success: true,
        data: analytics,
        period,
        dateRange: {
          from: fromDate.toISOString(),
          to: new Date().toISOString()
        }
      };
      
    } catch (error) {
      console.error('Get inquiry analytics error:', error);
      
      return {
        success: false,
        error: 'Failed to fetch inquiry analytics',
        details: error.message
      };
    }
  }
  
  /**
   * Calculate daily trend data
   * @param {Array} inquiries - Inquiries array
   * @param {string} period - Time period
   * @returns {Array} - Daily trend data
   */
  static calculateDailyTrend(inquiries, period) {
    const days = period === 'week' ? 7 : period === 'year' ? 365 : 30;
    const trend = [];
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const count = inquiries.filter(inquiry => {
        const inquiryDate = new Date(inquiry.createdAt).toISOString().split('T')[0];
        return inquiryDate === dateStr;
      }).length;
      
      trend.unshift({
        date: dateStr,
        count,
        dayName: date.toLocaleDateString('en', { weekday: 'short' })
      });
    }
    
    return trend;
  }
  
  /**
   * Calculate response rate
   * @param {Array} inquiries - Inquiries array
   * @returns {number} - Response rate percentage
   */
  static calculateResponseRate(inquiries) {
    if (inquiries.length === 0) return 0;
    
    const repliedCount = inquiries.filter(i => i.status === 'replied').length;
    return ((repliedCount / inquiries.length) * 100).toFixed(1);
  }
  
  /**
   * Calculate average response time
   * @param {Array} inquiries - Inquiries array
   * @returns {string} - Average response time
   */
  static calculateAvgResponseTime(inquiries) {
    const repliedInquiries = inquiries.filter(i => i.status === 'replied');
    
    if (repliedInquiries.length === 0) return 'N/A';
    
    // This would require storing response timestamps
    // For now, return a placeholder
    return '< 24 hours';
  }
  
  /**
   * Get top email domains
   * @param {Array} inquiries - Inquiries array
   * @returns {Array} - Top email domains
   */
  static getTopEmailDomains(inquiries) {
    const domains = {};
    
    inquiries.forEach(inquiry => {
      const domain = inquiry.email.split('@')[1];
      domains[domain] = (domains[domain] || 0) + 1;
    });
    
    return Object.entries(domains)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([domain, count]) => ({ domain, count }));
  }
  
  /**
   * Analyze inquiry subjects
   * @param {Array} inquiries - Inquiries array
   * @returns {Object} - Subject analysis
   */
  static analyzeSubjects(inquiries) {
    const keywords = {};
    const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'about', 'regarding', 'inquiry', 'question'];
    
    inquiries.forEach(inquiry => {
      const words = inquiry.subject.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 2 && !commonWords.includes(word));
      
      words.forEach(word => {
        keywords[word] = (keywords[word] || 0) + 1;
      });
    });
    
    const topKeywords = Object.entries(keywords)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([keyword, count]) => ({ keyword, count }));
    
    return {
      totalSubjects: inquiries.length,
      uniqueKeywords: Object.keys(keywords).length,
      topKeywords
    };
  }
  
  /**
   * Export inquiries data
   * @param {Object} options - Export options
   * @returns {Promise<Object>} - Export response
   */
  static async exportInquiries(options = {}) {
    try {
      const { format = 'csv', dateFrom, dateTo, status } = options;
      
      // Get all inquiries based on filters
      const queries = [Query.orderDesc('createdAt'), Query.limit(1000)];
      
      if (status && status !== 'all') {
        queries.push(Query.equal('status', status));
      }
      
      if (dateFrom) {
        queries.push(Query.greaterThanEqual('createdAt', dateFrom));
      }
      
      if (dateTo) {
        queries.push(Query.lessThanEqual('createdAt', dateTo));
      }
      
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.contactsCollectionId,
        queries
      );
      
      const inquiries = response.documents.map(doc => this.transformFromDatabase(doc));
      
      let exportData;
      
      switch (format) {
        case 'csv':
          exportData = this.convertToCSV(inquiries);
          break;
        case 'json':
          exportData = JSON.stringify(inquiries, null, 2);
          break;
        default:
          throw new Error('Unsupported export format');
      }
      
      return {
        success: true,
        data: exportData,
        format,
        count: inquiries.length,
        filename: `inquiries_export_${new Date().toISOString().split('T')[0]}.${format}`
      };
      
    } catch (error) {
      console.error('Export inquiries error:', error);
      
      return {
        success: false,
        error: 'Failed to export inquiries',
        details: error.message
      };
    }
  }
  
  /**
   * Convert inquiries to CSV format
   * @param {Array} inquiries - Inquiries array
   * @returns {string} - CSV string
   */
  static convertToCSV(inquiries) {
    const headers = ['ID', 'Full Name', 'Email', 'Subject', 'Message', 'Status', 'Created At', 'IP Address'];
    
    const rows = inquiries.map(inquiry => [
      inquiry.id,
      `"${inquiry.fullName}"`,
      inquiry.email,
      `"${inquiry.subject}"`,
      `"${inquiry.message.replace(/"/g, '""')}"`,
      inquiry.status,
      new Date(inquiry.createdAt).toISOString(),
      inquiry.ipAddress || 'Unknown'
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }
  
  /**
   * Transform database data with additional processing
   * @param {Object} dbData - Database document
   * @returns {Object} - Transformed inquiry data
   */
  static transformFromDatabase(dbData) {
    const baseTransform = {
      id: dbData.$id,
      firstName: dbData.firstName,
      lastName: dbData.lastName,
      fullName: `${dbData.firstName} ${dbData.lastName}`,
      email: dbData.email,
      subject: dbData.subject,
      message: dbData.message,
      status: dbData.status || 'new',
      createdAt: dbData.createdAt || dbData.$createdAt,
      ipAddress: dbData.ipAddress || 'Unknown'
    };
    
    // Add additional computed fields
    return {
      ...baseTransform,
      excerpt: baseTransform.message.length > 100 ? 
        baseTransform.message.substring(0, 100) + '...' : 
        baseTransform.message,
      isNew: baseTransform.status === 'new',
      isRead: baseTransform.status === 'read',
      isReplied: baseTransform.status === 'replied',
      createdAtFormatted: new Date(baseTransform.createdAt).toLocaleString(),
      emailDomain: baseTransform.email.split('@')[1]
    };
  }
}

export default InquiriesService;