import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CLILogin = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const timeoutRefs = useRef([]);
  const MAX_OUTPUT_LINES = 100;
  
  // Check if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      addOutput('Already authenticated. Redirecting to dashboard...', 'info');
      setTimeout(() => navigate('/dashboard'), 1000);
    }
  }, [isAuthenticated, navigate]);

  const [output, setOutput] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [step, setStep] = useState('welcome'); // welcome, email, password, authenticating
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
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
    setOutput(prev => {
      const newOutput = [...prev, { type, text }];
      // Keep only last MAX_OUTPUT_LINES
      return newOutput.slice(-MAX_OUTPUT_LINES);
    });
  };

  const addOutputWithDelay = (text, type = 'system', delay = 0) => {
    const timeout = setTimeout(() => {
      setOutput(prev => [...prev, { type, text }]);
    }, delay);
    
    timeoutRefs.current.push(timeout);
    return timeout;
  };

  const resetToLogin = () => {
    setStep('email');
    setCredentials({ email: '', password: '' });
    setCurrentInput('');
    addOutput('', 'system');
    addOutput('Please try again.', 'prompt');
    addOutput('Email:', 'prompt');
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
        setTimeout(() => navigate('/'), 1000);
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

  const sanitizeInput = (input) => {
    return input.trim().replace(/[<>]/g, '');
  };

  const handleCommand = async (input) => {
    const command = sanitizeInput(input);
    
    // For password step, don't log the actual password
    const displayCommand = step === 'password' ? '*'.repeat(command.length) : command;
    addOutput(`${getCurrentPrompt()} ${displayCommand}`, 'input');

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

        // Store email and move to password step
        setCredentials(prev => ({ ...prev, email: command }));
        addOutput('Password:', 'prompt');
        setStep('password');
        break;

      case 'password':
        if (command === '') {
          addOutput('Password cannot be empty. Please enter your password:', 'error');
          return;
        }

        // Now we have both email and password, proceed with authentication
        setStep('authenticating');
        setIsLoading(true);
        
        addOutput('Authenticating...', 'info');
        
        try {
          const response = await login({
            email: credentials.email // Use stored email
            , password: command // Use current password input
          });

          if (response.success) {
            addOutput('Authentication successful!', 'success');
            addOutput('Redirecting to dashboard...', 'info');
            
            setTimeout(() => {
              window.location.href = '/dashboard'; // Better navigation
            }, 1500);
          } else {
            addOutput(`Authentication failed: ${response.error}`, 'error');
            resetToLogin();
          }
        } catch (error) {
          addOutput(`System error: ${error.message}`, 'error');
          resetToLogin();
        }
        
        setIsLoading(false);
        break;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      e.preventDefault();
      
      // Add to command history
      if (currentInput.trim()) {
        setCommandHistory(prev => [...prev, currentInput.trim()]);
        setHistoryIndex(-1);
      }
      
      handleCommand(currentInput);
      setCurrentInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Basic auto-completion for commands
      const commands = ['help', 'login', 'clear', 'about', 'exit'];
      const matches = commands.filter(cmd => cmd.startsWith(currentInput.toLowerCase()));
      if (matches.length === 1) {
        setCurrentInput(matches[0]);
      }
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