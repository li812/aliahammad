/**
 * Contact Model for Appwrite Database
 * 
 * Collection Schema:
 * - id: string (auto-generated)
 * - firstName: string (required)
 * - lastName: string (required) 
 * - email: string (required)
 * - subject: string (required)
 * - message: string (required)
 * - createdAt: datetime (auto-generated)
 * - status: string (default: 'new') - 'new', 'read', 'replied'
 * - ipAddress: string (optional)
 */

export const ContactModel = {
  // Validation rules
  validate: (contactData) => {
    const errors = {};
    
    if (!contactData.firstName || contactData.firstName.trim().length < 2) {
      errors.firstName = 'First name must be at least 2 characters long';
    }
    
    if (!contactData.lastName || contactData.lastName.trim().length < 2) {
      errors.lastName = 'Last name must be at least 2 characters long';
    }
    
    if (!contactData.email || !isValidEmail(contactData.email)) {
      errors.email = 'Please provide a valid email address';
    }
    
    if (!contactData.subject || contactData.subject.trim().length < 5) {
      errors.subject = 'Subject must be at least 5 characters long';
    }
    
    if (!contactData.message || contactData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },
  
  // Transform form data to database format
  transformToDatabase: (formData) => ({
    firstName: formData.firstName.trim(),
    lastName: formData.lastName.trim(),
    email: formData.email.toLowerCase().trim(),
    subject: formData.subject.trim(),
    message: formData.message.trim(),
    // Don't include status - let Appwrite use the default value
    createdAt: new Date().toISOString(),
    ipAddress: getClientIP() || 'unknown'
  }),
  
  // Transform database data to display format
  transformFromDatabase: (dbData) => ({
    id: dbData.$id,
    firstName: dbData.firstName,
    lastName: dbData.lastName,
    fullName: `${dbData.firstName} ${dbData.lastName}`,
    email: dbData.email,
    subject: dbData.subject,
    message: dbData.message,
    status: dbData.status || 'new', // fallback to 'new' if not set
    createdAt: new Date(dbData.createdAt),
    ipAddress: dbData.ipAddress
  })
};

// Helper functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function getClientIP() {
  return null; // Will be handled server-side in real implementation
}

export default ContactModel;