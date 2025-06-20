import { account } from '../src/config/appwrite';

export class LoginService {
  
  /**
   * Login admin user with email and password
   * @param {Object} credentials - Login credentials
   * @returns {Promise<Object>} - Login response
   */
  static async login(credentials) {
    try {
      const { email, password } = credentials;
      
      // Validate input
      if (!email || !password) {
        return {
          success: false,
          error: 'Email and password are required'
        };
      }
      
      // Create session (Appwrite handles JWT automatically)
      const session = await account.createEmailPasswordSession(email, password);
      
      // Get user data
      const user = await account.get();
      
      return {
        success: true,
        data: {
          user: {
            userId: user.$id,
            email: user.email,
            name: user.name,
            status: user.status,
            emailVerification: user.emailVerification
          },
          session: {
            sessionId: session.$id,
            userId: session.userId,
            expire: session.expire
          }
        },
        message: 'Login successful'
      };
      
    } catch (error) {
      console.error('Login error:', error);
      
      let errorMessage = 'Login failed';
      
      // Handle specific Appwrite errors
      if (error.code === 401) {
        errorMessage = 'Invalid email or password';
      } else if (error.code === 429) {
        errorMessage = 'Too many login attempts. Please try again later';
      }
      
      return {
        success: false,
        error: errorMessage,
        details: error.message
      };
    }
  }
  
  /**
   * Logout current user
   * @returns {Promise<Object>} - Logout response
   */
  static async logout() {
    try {
      await account.deleteSession('current');
      
      return {
        success: true,
        message: 'Logout successful'
      };
      
    } catch (error) {
      console.error('Logout error:', error);
      
      return {
        success: false,
        error: 'Failed to logout',
        details: error.message
      };
    }
  }
  
  /**
   * Get current user session (Appwrite handles JWT validation)
   * @returns {Promise<Object>} - Current user data
   */
  static async getCurrentUser() {
    try {
      const user = await account.get();
      
      return {
        success: true,
        data: {
          userId: user.$id,
          email: user.email,
          name: user.name,
          status: user.status,
          emailVerification: user.emailVerification,
          registration: user.registration
        }
      };
      
    } catch (error) {
      // This means no valid session exists
      return {
        success: false,
        error: 'No active session found'
      };
    }
  }
  
  /**
   * Check if user has an active session
   * @returns {Promise<boolean>} - Session validity
   */
  static async isAuthenticated() {
    try {
      await account.get();
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default LoginService;