import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CLILogin = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const timeoutRefs = useRef([]);
  const MAX_OUTPUT_LINES = 100;
  
  const [output, setOutput] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [step, setStep] = useState('welcome'); // welcome, email, password, authenticating
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef();
  const inputRef = useRef();

  // Check if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      addOutput('Already authenticated. Redirecting to dashboard...', 'info');
      setTimeout(() => navigate('/dashboard'), 1000);
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Clean initial welcome message - no auto login command
    const initialOutput = [
      { type: 'system', text: 'Ali Ahammad Portfolio Console v2.1.0' },
      { type: 'system', text: 'Copyright (c) 2025 Ali Ahammad. All rights reserved.' },
      { type: 'system', text: '' },
      { type: 'info', text: 'Initializing secure authentication terminal...' },
      { type: 'success', text: 'Authentication system ready.' },
      { type: 'system', text: '' },
      { type: 'prompt', text: 'Welcome to the admin console. Type "help" for available commands.' },
      { type: 'system', text: '' }
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

  useEffect(() => {
    // Cleanup timeouts on unmount
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  const addOutput = (text, type = 'system') => {
    setOutput(prev => {
      const newOutput = [...prev, { type, text }];
      return newOutput.slice(-MAX_OUTPUT_LINES);
    });
  };

  const resetToWelcome = () => {
    setStep('welcome');
    setCredentials({ email: '', password: '' });
    setCurrentInput('');
    addOutput('', 'system');
    addOutput('Authentication cancelled. Type "login" to try again.', 'prompt');
  };

  const resetToEmail = () => {
    setStep('email');
    setCredentials({ email: '', password: '' });
    setCurrentInput('');
    addOutput('Please try again.', 'prompt');
    addOutput('Email:', 'prompt');
  };

  const handleSpecialCommands = (command) => {
    const cmd = command.toLowerCase();
    
    switch (cmd) {
      case 'help':
        addOutput('Available commands:', 'info');
        addOutput('  login     - Start authentication process', 'system');
        addOutput('  clear     - Clear terminal', 'system');
        addOutput('  about     - About this system', 'system');
        addOutput('  exit      - Return to portfolio', 'system');
        addOutput('  cancel    - Cancel current operation', 'system');
        addOutput('', 'system');
        return true;
      
      case 'clear':
        setOutput([
          { type: 'system', text: 'Ali Ahammad Portfolio Console v2.1.0' },
          { type: 'prompt', text: 'Terminal cleared. Type "help" for commands.' }
        ]);
        setStep('welcome');
        setCredentials({ email: '', password: '' });
        return true;
      
      case 'about':
        addOutput('Ali Ahammad Portfolio Admin Console', 'info');
        addOutput('Built with React + Appwrite Backend', 'system');
        addOutput('Secure authentication terminal interface', 'system');
        addOutput('Version 2.1.0 - Terminal UI', 'system');
        addOutput('', 'system');
        return true;
      
      case 'exit':
        addOutput('Returning to portfolio...', 'info');
        setTimeout(() => navigate('/'), 1000);
        return true;
      
      case 'cancel':
        if (step !== 'welcome') {
          resetToWelcome();
          return true;
        }
        addOutput('Nothing to cancel.', 'error');
        return true;
      
      case 'login':
        if (step === 'welcome') {
          addOutput('Starting authentication process...', 'info');
          addOutput('Email:', 'prompt');
          setStep('email');
          return true;
        } else {
          addOutput('Authentication already in progress. Type "cancel" to restart.', 'error');
          return true;
        }
    }
    return false;
  };

  const sanitizeInput = (input) => {
    return input.trim().replace(/[<>]/g, '');
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleCommand = async (input) => {
    const command = sanitizeInput(input);
    
    // For password step, mask the input in display
    const displayCommand = step === 'password' ? '*'.repeat(command.length) : command;
    addOutput(`${getCurrentPrompt()} ${displayCommand}`, 'input');

    // Handle special commands in any step (except authenticating)
    if (step !== 'authenticating' && handleSpecialCommands(command)) {
      return;
    }

    switch (step) {
      case 'welcome':
        // In welcome state, only special commands work
        addOutput(`Unknown command: ${command}`, 'error');
        addOutput('Type "help" for available commands or "login" to authenticate.', 'prompt');
        break;

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

        // Start authentication
        setStep('authenticating');
        setIsLoading(true);
        
        addOutput('Authenticating...', 'info');
        
        try {
          const response = await login({
            email: credentials.email,
            password: command
          });

          if (response.success) {
            addOutput('✓ Authentication successful!', 'success');
            addOutput('Welcome to the admin dashboard.', 'success');
            addOutput('Redirecting...', 'info');
            
            setTimeout(() => {
              navigate('/dashboard');
            }, 1500);
          } else {
            addOutput(`✗ Authentication failed: ${response.error}`, 'error');
            resetToEmail();
          }
        } catch (error) {
          addOutput(`✗ System error: ${error.message}`, 'error');
          resetToEmail();
        }
        
        setIsLoading(false);
        break;

      case 'authenticating':
        addOutput('Please wait, authentication in progress...', 'info');
        break;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      e.preventDefault();
      
      // Add to command history (excluding passwords)
      if (currentInput.trim() && step !== 'password') {
        setCommandHistory(prev => [...prev, currentInput.trim()]);
        setHistoryIndex(-1);
      }
      
      handleCommand(currentInput);
      setCurrentInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && step !== 'password') {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0 && step !== 'password') {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (step === 'welcome') {
        // Auto-completion for commands
        const commands = ['help', 'login', 'clear', 'about', 'exit'];
        const matches = commands.filter(cmd => cmd.startsWith(currentInput.toLowerCase()));
        if (matches.length === 1) {
          setCurrentInput(matches[0]);
        }
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      if (step !== 'welcome' && step !== 'authenticating') {
        resetToWelcome();
      }
    }
  };

  const getCurrentPrompt = () => {
    switch (step) {
      case 'email':
        return 'Email:';
      case 'password':
        return 'Password:';
      case 'authenticating':
        return '';
      default:
        return 'admin@console:~$';
    }
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
              marginRight: '8px',
              whiteSpace: 'nowrap'
            }}>
              {getCurrentPrompt()}
            </span>
            
            {/* Terminal input container */}
            <div style={{
              flex: 1,
              position: 'relative',
              fontFamily: 'Monaco, "Lucida Console", monospace',
              fontSize: '14px',
              color: '#fff'
            }}>
              {/* Visible text with cursor */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                minHeight: '20px'
              }}>
                {/* Display current input text */}
                <span style={{ 
                  color: '#fff',
                  whiteSpace: 'pre' // Preserve spaces
                }}>
                  {step === 'password' ? '*'.repeat(currentInput.length) : currentInput}
                </span>
                
                {/* Blinking cursor */}
                <span style={{
                  color: '#00ff00',
                  animation: 'blink 1s infinite',
                  marginLeft: '1px'
                }}>
                  █
                </span>
              </div>
              
              {/* Hidden input for capturing keystrokes */}
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyPress}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'transparent', // Make input text invisible
                  caretColor: 'transparent', // Hide default cursor
                  fontFamily: 'Monaco, "Lucida Console", monospace',
                  fontSize: '14px',
                  zIndex: 1
                }}
                autoComplete="off"
                disabled={isLoading}
                placeholder=""
              />
            </div>
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
            0% { opacity: 0; }
            25% { opacity: 1; }
            50% { opacity: 1; }
            75% { opacity: 0; }
            100% { opacity: 0; }
          }
          
          /* Ensure input focus doesn't show default cursor */
          input:focus {
            caret-color: transparent !important;
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
        <div>Commands: help | login | clear | about | exit</div>
        <div>ESC: Cancel operation | TAB: Auto-complete</div>
      </div>

      {/* Back to Portfolio Link */}
      <div style={{
        position: 'fixed',
        bottom: '10px',
        right: '20px'
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            backgroundColor: 'transparent',
            border: '1px solid #666',
            color: '#666',
            padding: '5px 10px',
            borderRadius: '3px',
            fontSize: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = '#00ff00';
            e.target.style.borderColor = '#00ff00';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#666';
            e.target.style.borderColor = '#666';
          }}
        >
          ← Back to Portfolio
        </button>
      </div>
    </div>
  );
};

export default CLILogin;