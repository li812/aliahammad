import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CLILogin = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const hasInitialized = useRef(false);

  const [output, setOutput] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [step, setStep] = useState('welcome');
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const terminalRef = useRef();
  const inputRef = useRef();

  const addOutput = useCallback((text, type = 'default') => {
    setOutput(prev => [...prev, { text, type }]);
  }, []);

  const executeBootSequence = useCallback(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const sequence = [
      'Terminal v1.0.0',
      'Type "help" for available commands.',
      ''
    ];

    sequence.forEach((text, index) => {
      setTimeout(() => {
        addOutput(text, 'system');
      }, index * 200);
    });
  }, [addOutput]);

  const handleSpecialCommands = useCallback((command) => {
    const cmd = command.toLowerCase();

    switch (cmd) {
      case 'help':
        addOutput('Available commands:', 'info');
        addOutput('  login  - Start authentication', 'info');
        addOutput('  clear  - Clear screen', 'info');
        addOutput('  exit   - Exit terminal', 'info');
        return true;

      case 'clear':
        setOutput([]);
        setStep('welcome');
        setCredentials({ email: '', password: '' });
        return true;

      case 'exit':
        navigate('/');
        return true;

      case 'login':
        if (step === 'welcome') {
          addOutput('Enter email:', 'prompt');
          setStep('email');
          return true;
        }
        addOutput('Login already in progress. Type "clear" to reset.', 'error');
        return true;
    }
    return false;
  }, [step, navigate, addOutput]);

  const getCurrentPrompt = useCallback(() => {
    switch (step) {
      case 'email':
      case 'password':
        return 'auth$';
      default:
        return 'user$';
    }
  }, [step]);

  const handleCommand = useCallback(async (input) => {
    const command = input.trim();
    
    // Show what user typed
    addOutput(`${getCurrentPrompt()} ${step === 'password' ? '*'.repeat(command.length) : command}`, 'input');

    if (handleSpecialCommands(command)) {
      return;
    }

    switch (step) {
      case 'welcome':
        if (command) {
          addOutput(`Command not found: ${command}`, 'error');
          addOutput('Type "help" for available commands.', 'info');
        }
        break;

      case 'email':
        if (!command) {
          addOutput('Email required.', 'error');
          addOutput('Enter email:', 'prompt');
          return;
        }

        if (!command.includes('@')) {
          addOutput('Invalid email format.', 'error');
          addOutput('Enter email:', 'prompt');
          return;
        }

        setCredentials(prev => ({ ...prev, email: command }));
        addOutput('Enter password:', 'prompt');
        setStep('password');
        break;

      case 'password':
        if (!command) {
          addOutput('Password required.', 'error');
          addOutput('Enter password:', 'prompt');
          return;
        }

        setStep('authenticating');
        setIsLoading(true);
        addOutput('Authenticating...', 'info');

        setTimeout(async () => {
          try {
            const response = await login({
              email: credentials.email,
              password: command
            });

            if (response.success) {
              addOutput('Login successful!', 'success');
              setTimeout(() => navigate('/dashboard'), 1000);
            } else {
              addOutput('Login failed.', 'error');
              addOutput('Enter email:', 'prompt');
              setStep('email');
              setCredentials({ email: '', password: '' });
            }
          } catch (error) {
            addOutput(`Error: ${error.message}`, 'error');
            addOutput('Enter email:', 'prompt');
            setStep('email');
            setCredentials({ email: '', password: '' });
          }
          setIsLoading(false);
        }, 1500);
        break;
    }
  }, [step, addOutput, getCurrentPrompt, handleSpecialCommands, credentials.email, login, navigate]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !isLoading) {
      e.preventDefault();
      handleCommand(currentInput);
      setCurrentInput('');
    }
  }, [isLoading, currentInput, handleCommand]);

  const getTextColor = (type) => {
    switch (type) {
      case 'error': return '#ff6b6b';
      case 'success': return '#51cf66';
      case 'info': return '#74c0fc';
      case 'prompt': return '#ffd43b';
      case 'input': return '#ffffff';
      case 'system': return '#868e96';
      default: return '#ffffff';
    }
  };

  // Auto-redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Initialize terminal
  useEffect(() => {
    executeBootSequence();
    setTimeout(() => inputRef.current?.focus(), 500);
  }, [executeBootSequence]);

  // Cursor blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div style={{
      backgroundColor: '#1a1a1a',
      color: '#ffffff',
      minHeight: '100vh',
      fontFamily: '"Monaco", "Menlo", "Ubuntu Mono", monospace',
      padding: '20px',
      fontSize: '14px'
    }}>
      <div
        ref={terminalRef}
        style={{
          height: 'calc(100vh - 80px)',
          overflowY: 'auto',
          paddingBottom: '20px'
        }}
      >
        {/* Output */}
        {output.map((line, index) => (
          <div
            key={index}
            style={{
              color: getTextColor(line.type),
              marginBottom: '4px',
              lineHeight: '1.4'
            }}
          >
            {line.text}
          </div>
        ))}

        {/* Current Input Line */}
        {!isLoading && step !== 'authenticating' && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '8px'
          }}>
            <span style={{
              color: '#51cf66',
              marginRight: '8px'
            }}>
              {getCurrentPrompt()}
            </span>

            <span style={{ color: '#ffffff' }}>
              {step === 'password' ? '●'.repeat(currentInput.length) : currentInput}
            </span>

            <span style={{
              color: '#51cf66',
              opacity: showCursor ? 1 : 0,
              marginLeft: '2px'
            }}>
              ▎
            </span>

            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyPress}
              style={{
                position: 'absolute',
                left: '-9999px',
                opacity: 0
              }}
              autoComplete="off"
              disabled={isLoading}
            />
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div style={{
            color: '#74c0fc',
            marginTop: '8px'
          }}>
            Processing...
          </div>
        )}
      </div>

      <style>
        {`
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: #2a2a2a; }
          ::-webkit-scrollbar-thumb { background: #444; border-radius: 4px; }
          ::-webkit-scrollbar-thumb:hover { background: #555; }
          ::selection { background-color: #444; }
        `}
      </style>
    </div>
  );
};

export default CLILogin;