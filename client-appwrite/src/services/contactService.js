import { databases, appwriteConfig } from '../config/appwrite';
import { ID, Query } from 'appwrite';
import { ContactModel } from '../models/contacts';

export class ContactService {
  
  /**
   * Submit a new contact form
   * @param {Object} contactData - Form data from contact form
   * @returns {Promise<Object>} - Response with success/error status
   */
  static async submitContact(contactData) {
    try {
      // Validate the contact data
      const validation = ContactModel.validate(contactData);
      
      if (!validation.isValid) {
        return {
          success: false,
          error: 'Validation failed',
          validationErrors: validation.errors
        };
      }
      
      // Transform data for database
      const dbData = ContactModel.transformToDatabase(contactData);
      
      // Create document in Appwrite
      const response = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.contactsCollectionId,
        ID.unique(),
        dbData
      );
      
      return {
        success: true,
        data: ContactModel.transformFromDatabase(response),
        message: 'Thank you for your message! I will get back to you soon.'
      };
      
    } catch (error) {
      console.error('Contact submission error:', error);
      
      return {
        success: false,
        error: 'Failed to submit contact form',
        details: error.message
      };
    }
  }
  
  /**
   * Get all contacts (for admin dashboard)
   * @param {Object} options - Query options (limit, offset, status filter)
   * @returns {Promise<Object>} - List of contacts
   */
  static async getContacts(options = {}) {
    try {
      const { limit = 25, offset = 0, status = null } = options;
      
      const queries = [
        Query.limit(limit),
        Query.offset(offset),
        Query.orderDesc('createdAt')
      ];
      
      if (status && status !== 'all') {
        queries.push(Query.equal('status', status));
      }
      
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.contactsCollectionId,
        queries
      );
      
      return {
        success: true,
        data: {
          contacts: response.documents.map(ContactModel.transformFromDatabase),
          total: response.total
        }
      };
      
    } catch (error) {
      console.error('Get contacts error:', error);
      
      return {
        success: false,
        error: 'Failed to fetch contacts',
        details: error.message
      };
    }
  }
  
  /**
   * Update contact status (for admin dashboard)
   * @param {string} contactId - Contact document ID
   * @param {string} status - New status ('new', 'read', 'replied')
   * @returns {Promise<Object>} - Update response
   */
  static async updateContactStatus(contactId, status) {
    try {
      const validStatuses = ['new', 'read', 'replied'];
      
      if (!validStatuses.includes(status)) {
        return {
          success: false,
          error: 'Invalid status value'
        };
      }
      
      const response = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.contactsCollectionId,
        contactId,
        { status }
      );
      
      return {
        success: true,
        data: ContactModel.transformFromDatabase(response)
      };
      
    } catch (error) {
      console.error('Update contact status error:', error);
      
      return {
        success: false,
        error: 'Failed to update contact status',
        details: error.message
      };
    }
  }
  
  /**
   * Delete a contact (for admin dashboard)
   * @param {string} contactId - Contact document ID
   * @returns {Promise<Object>} - Delete response
   */
  static async deleteContact(contactId) {
    try {
      await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.contactsCollectionId,
        contactId
      );
      
      return {
        success: true,
        message: 'Contact deleted successfully'
      };
      
    } catch (error) {
      console.error('Delete contact error:', error);
      
      return {
        success: false,
        error: 'Failed to delete contact',
        details: error.message
      };
    }
  }
  
  /**
   * Get contact statistics (for admin dashboard)
   * @returns {Promise<Object>} - Statistics data
   */
  static async getContactStats() {
    try {
      // Get all contacts first
      const allContactsResponse = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.contactsCollectionId,
        [Query.limit(1000)] // Increase limit to get all contacts for stats
      );

      const allContacts = allContactsResponse.documents;
      
      // Calculate stats from the retrieved data
      const stats = {
        total: allContacts.length,
        new: allContacts.filter(contact => contact.status === 'new').length,
        read: allContacts.filter(contact => contact.status === 'read').length,
        replied: allContacts.filter(contact => contact.status === 'replied').length
      };
      
      return {
        success: true,
        data: stats
      };
      
    } catch (error) {
      console.error('Get contact stats error:', error);
      
      return {
        success: false,
        error: 'Failed to fetch contact statistics',
        details: error.message
      };
    }
  }
  
  /**
   * Transform database document to frontend format
   * @param {Object} dbData - Database document
   * @returns {Object} - Transformed contact data
   */
  static transformFromDatabase(dbData) {
    return {
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
  }
}

export default ContactService;