import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const CLILogin = () => {
  const { login } = useAuth();
  const [output, setOutput] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [step, setStep] = useState('welcome'); // welcome, email, password, authenticating
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const terminalRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    // Initial welcome message
    const initialOutput = [
      { type: 'system', text: 'Ali Ahammad Portfolio Console v2.1.0' },
      { type: 'system', text: 'Copyright (c) 2025 Ali Ahammad. All rights reserved.' },
      { type: 'system', text: '' },
      { type: 'info', text: 'Initializing secure authentication terminal...' },
      { type: 'success', text: 'Authentication system ready.' },
      { type: 'system', text: '' },
      { type: 'prompt', text: 'Please enter your admin credentials to access the dashboard.' },
      { type: 'system', text: '' },
      { type: 'input', text: 'admin@console:~$ login' },
      { type: 'prompt', text: 'Email:' }
    ];
    
    setOutput(initialOutput);
    
    // Auto-focus input
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, []);

  useEffect(() => {
    // Scroll to bottom when output changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const addOutput = (text, type = 'system') => {
    setOutput(prev => [...prev, { type, text }]);
  };

  const handleSpecialCommands = (command) => {
    switch (command.toLowerCase()) {
      case 'help':
        addOutput('Available commands:', 'info');
        addOutput('  login     - Start authentication process', 'system');
        addOutput('  clear     - Clear terminal', 'system');
        addOutput('  about     - About this system', 'system');
        addOutput('  exit      - Return to portfolio', 'system');
        addOutput('', 'system');
        return true;
      
      case 'clear':
        setOutput([
          { type: 'system', text: 'Ali Ahammad Portfolio Console v2.1.0' },
          { type: 'prompt', text: 'Terminal cleared. Type "login" to authenticate.' }
        ]);
        return true;
      
      case 'about':
        addOutput('Ali Ahammad Portfolio Admin Console', 'info');
        addOutput('Built with React + Appwrite Backend', 'system');
        addOutput('Secure authentication terminal interface', 'system');
        addOutput('', 'system');
        return true;
      
      case 'exit':
        addOutput('Returning to portfolio...', 'info');
        setTimeout(() => {
          window.history.pushState({}, '', '/');
          window.location.reload();
        }, 1000);
        return true;
      
      case 'login':
        if (step === 'welcome') {
          addOutput('Email:', 'prompt');
          setStep('email');
          return true;
        }
        break;
    }
    return false;
  };

  const handleCommand = async (input) => {
    const command = input.trim();
    
    // Add user input to output
    addOutput(`${getCurrentPrompt()} ${command}`, 'input');

    // Handle special commands first
    if (step === 'welcome' && handleSpecialCommands(command)) {
      return;
    }

    switch (step) {
      case 'welcome':
      case 'email':
        if (command === '') {
          addOutput('Email cannot be empty. Please enter your admin email:', 'error');
          return;
        }
        
        if (!isValidEmail(command)) {
          addOutput('Invalid email format. Please enter a valid email address:', 'error');
          return;
        }

        setCredentials(prev => ({ ...prev, email: command }));
        addOutput('Password:', 'prompt');
        setStep('password');
        break;

      case 'password':
        if (command === '') {
          addOutput('Password cannot be empty. Please enter your password:', 'error');
          return;
        }

        setCredentials(prev => ({ ...prev, password: command }));
        setStep('authenticating');
        setIsLoading(true);
        
        addOutput('Authenticating...', 'info');
        
        try {
          const response = await login({
            email: credentials.email,
            password: command
          });

          if (response.success) {
            addOutput('Authentication successful!', 'success');
            addOutput('Redirecting to dashboard...', 'info');
            addOutput('', 'system');
            
            // Redirect to dashboard after a short delay
            setTimeout(() => {
              window.history.pushState({}, '', '/dashboard');
              window.location.reload(); // Simple way to trigger route change
            }, 1500);
          } else {
            addOutput(`Authentication failed: ${response.error}`, 'error');
            addOutput('', 'system');
            addOutput('Please try again.', 'prompt');
            addOutput('Email:', 'prompt');
            setStep('email');
            setCredentials({ email: '', password: '' });
          }
        } catch (error) {
          addOutput(`System error: ${error.message}`, 'error');
          addOutput('Please try again.', 'prompt');
          addOutput('Email:', 'prompt');
          setStep('email');
          setCredentials({ email: '', password: '' });
        }
        
        setIsLoading(false);
        break;

      default:
        addOutput('Invalid command', 'error');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      e.preventDefault();
      handleCommand(currentInput);
      setCurrentInput('');
    }
  };

  const getCurrentPrompt = () => {
    switch (step) {
      case 'email':
        return 'Email:';
      case 'password':
        return 'Password:';
      default:
        return 'admin@console:~$';
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const getTextColor = (type) => {
    switch (type) {
      case 'system': return '#888';
      case 'success': return '#00ff00';
      case 'error': return '#ff4444';
      case 'info': return '#44aaff';
      case 'prompt': return '#ffaa00';
      case 'input': return '#ffffff';
      default: return '#ffffff';
    }
  };

  const renderOutput = () => {
    return output.map((line, index) => (
      <div
        key={index}
        style={{
          color: getTextColor(line.type),
          marginBottom: '4px',
          fontFamily: 'Monaco, "Lucida Console", monospace',
          fontSize: '14px',
          lineHeight: '1.4'
        }}
      >
        {line.text}
      </div>
    ));
  };

  return (
    <div style={{
      backgroundColor: '#000',
      color: '#fff',
      minHeight: '100vh',
      fontFamily: 'Monaco, "Lucida Console", monospace',
      padding: '20px',
      overflow: 'hidden'
    }}>
      {/* Terminal Header */}
      <div style={{
        borderBottom: '1px solid #333',
        paddingBottom: '10px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ color: '#888', fontSize: '12px' }}>
          Ali Ahammad Portfolio - Admin Console
        </div>
        <div style={{ 
          display: 'flex', 
          gap: '8px',
          alignItems: 'center'
        }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            borderRadius: '50%', 
            backgroundColor: '#ff5f56' 
          }}></div>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            borderRadius: '50%', 
            backgroundColor: '#ffbd2e' 
          }}></div>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            borderRadius: '50%', 
            backgroundColor: '#27ca3f' 
          }}></div>
        </div>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        style={{
          height: 'calc(100vh - 120px)',
          overflowY: 'auto',
          paddingRight: '10px'
        }}
      >
        {renderOutput()}
        
        {/* Current Input Line */}
        {!isLoading && step !== 'authenticating' && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '8px'
          }}>
            <span style={{ 
              color: getTextColor('prompt'),
              marginRight: '8px'
            }}>
              {getCurrentPrompt()}
            </span>
            <input
              ref={inputRef}
              type={step === 'password' ? 'password' : 'text'}
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#fff',
                fontFamily: 'Monaco, "Lucida Console", monospace',
                fontSize: '14px',
                flex: 1,
                caretColor: '#00ff00'
              }}
              autoComplete="off"
              disabled={isLoading}
            />
            <span style={{
              color: '#00ff00',
              animation: 'blink 1s infinite',
              marginLeft: '2px'
            }}>
              █
            </span>
          </div>
        )}
        
        {/* Loading Animation */}
        {isLoading && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '8px',
            color: '#44aaff'
          }}>
            <span>Processing</span>
            <span style={{ animation: 'dots 1.5s infinite' }}>...</span>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
          
          @keyframes dots {
            0% { content: ''; }
            25% { content: '.'; }
            50% { content: '..'; }
            75% { content: '...'; }
            100% { content: ''; }
          }
          
          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: #111;
          }
          
          ::-webkit-scrollbar-thumb {
            background: #333;
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}
      </style>

      {/* Footer */}
      <div style={{
        position: 'fixed',
        bottom: '10px',
        left: '20px',
        color: '#444',
        fontSize: '10px'
      }}>
        <div>Tip: Try 'help' command for assistance</div>
        <div>Press Ctrl+C to return to portfolio</div>
      </div>

      {/* Back to Portfolio Link */}
      <div style={{
        position: 'fixed',
        bottom: '10px',
        right: '20px'
      }}>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.history.pushState({}, '', '/');
            window.location.reload();
          }}
          style={{
            color: '#666',
            textDecoration: 'none',
            fontSize: '12px',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.color = '#00ff00'}
          onMouseLeave={(e) => e.target.style.color = '#666'}
        >
          ← Back to Portfolio
        </a>
      </div>
    </div>
  );
};

export default CLILogin;