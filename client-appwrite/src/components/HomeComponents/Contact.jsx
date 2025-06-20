import React, { useState } from 'react';
import { useFormEffect } from '../../utils/effects';
import { ContactController } from '../../controllers/contactController';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Apply form animations
  useFormEffect();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('🚀 Contact form submitted');
    
    const form = e.target;
    const formData = {
      firstName: form.fname.value,
      lastName: form.lname.value,
      email: form.email.value,
      subject: form.subject.value,
      message: form.message.value
    };

    console.log('📝 Form data:', formData);

    try {
      const response = await ContactController.handleContactSubmission(formData, {
        onLoading: (isLoading) => {
          console.log('⏳ Loading state:', isLoading);
          setLoading(isLoading);
        },
        onSuccess: (response) => {
          console.log('✅ Success:', response);
          setMessage(response.message);
          setMessageType('success');
          form.reset();
          // Clear message after 5 seconds
          setTimeout(() => setMessage(''), 5000);
        },
        onError: (response) => {
          console.log('❌ Error:', response);
          setMessage(response.error || 'Failed to send message');
          setMessageType('error');
          // Clear message after 5 seconds
          setTimeout(() => setMessage(''), 5000);
        }
      });

      console.log('📊 Final response:', response);
    } catch (error) {
      console.error('💥 Unexpected error:', error);
      setMessage('An unexpected error occurred');
      setMessageType('error');
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <div id="fh5co-consult">
      <div className="video fh5co-video" style={{backgroundImage: 'url(images/cover_bg_1.jpg)'}}>
        <div className="overlay"></div>
      </div>
      <div className="choose animate-box" data-animate-effect="fadeInRight">
        <h2>Contact</h2>
        
        {message && (
          <div style={{
            color: messageType === 'success' ? '#28a745' : '#dc3545',
            backgroundColor: messageType === 'success' ? '#d4edda' : '#f8d7da',
            border: `1px solid ${messageType === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
            padding: '12px',
            borderRadius: '4px',
            marginBottom: '20px',
            fontWeight: 'bold'
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row form-group">
            <div className="col-md-6">
              <input 
                type="text" 
                name="fname"
                id="fname" 
                className="form-control" 
                placeholder="Your firstname"
                required
                disabled={loading}
              />
            </div>
          </div>
          <div className="row form-group">
            <div className="col-md-6">
              <input 
                type="text" 
                name="lname"
                id="lname" 
                className="form-control" 
                placeholder="Your lastname"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-12">
              <input 
                type="email" 
                name="email"
                id="email" 
                className="form-control" 
                placeholder="Your email address"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-12">
              <input 
                type="text" 
                name="subject"
                id="subject" 
                className="form-control" 
                placeholder="Your subject of this message"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-12">
              <textarea 
                name="message" 
                id="message" 
                cols="30" 
                rows="10" 
                className="form-control" 
                placeholder="Say something about us"
                required
                disabled={loading}
              ></textarea>
            </div>
          </div>
          
          <div className="form-group">
            <input 
              type="submit" 
              value={loading ? "Sending..." : "Send Message"} 
              className="btn btn-primary"
              disabled={loading}
              style={{
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            />
          </div>
        </form>	
      </div>
    </div>
  );
};

export default Contact;