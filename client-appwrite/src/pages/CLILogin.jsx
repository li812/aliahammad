/* filepath: /Users/li/GitHub/aliahammad/client-appwrite/src/pages/CLILogin.jsx */

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CLILogin = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const timeoutRefs = useRef([]);
  const MAX_OUTPUT_LINES = 200;

  const [output, setOutput] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [step, setStep] = useState('welcome');
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showCursor, setShowCursor] = useState(true);
  const terminalRef = useRef();
  const inputRef = useRef();

  // Matrix-style typing effect
  const [typingQueue, setTypingQueue] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Check if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      typeOutput('ACCESS GRANTED. REDIRECTING TO SECURE SHELL...', 'success');
      setTimeout(() => navigate('/dashboard'), 2000);
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Realistic terminal boot sequence
    const bootSequence = [
      { text: 'Initializing secure terminal...', type: 'system', delay: 100 },
      { text: 'Loading authentication protocols...', type: 'system', delay: 300 },
      { text: 'Establishing encrypted connection...', type: 'system', delay: 200 },
      { text: 'Terminal ready.', type: 'success', delay: 400 },
      { text: '', type: 'system', delay: 100 },
      { text: '████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗     ', type: 'banner', delay: 50 },
      { text: '╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║     ', type: 'banner', delay: 50 },
      { text: '   ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║     ', type: 'banner', delay: 50 },
      { text: '   ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     ', type: 'banner', delay: 50 },
      { text: '   ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗', type: 'banner', delay: 50 },
      { text: '   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝', type: 'banner', delay: 50 },
      { text: '', type: 'system', delay: 200 },
      { text: 'SECURE AUTHENTICATION TERMINAL v3.7.2', type: 'header', delay: 100 },
      { text: 'Classification: RESTRICTED ACCESS', type: 'warning', delay: 100 },
      { text: 'Connection established from: ' + getClientInfo(), type: 'info', delay: 100 },
      { text: 'Session timeout: 15 minutes', type: 'info', delay: 100 },
      { text: '', type: 'system', delay: 200 },
      { text: 'WARNING: Unauthorized access prohibited. All activities monitored.', type: 'warning', delay: 100 },
      { text: '', type: 'system', delay: 300 },
      { text: 'Type "help" for available commands.', type: 'prompt', delay: 100 }
    ];

    executeBootSequence(bootSequence);

    // Auto-focus input after boot
    setTimeout(() => {
      inputRef.current?.focus();
    }, bootSequence.length * 100 + 1000);
  }, []);

  // Cursor blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Scroll to bottom when output changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  const getClientInfo = () => {
    const now = new Date();
    return `${window.location.hostname} [${now.toISOString().slice(0, 19)}Z]`;
  };

  const getCurrentTimestamp = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 8);
  };

  const executeBootSequence = (sequence) => {
    sequence.forEach((item, index) => {
      setTimeout(() => {
        setOutput(prev => [...prev, {
          type: item.type,
          text: item.text,
          timestamp: getCurrentTimestamp()
        }]);
      }, index * item.delay);
    });
  };

  const typeOutput = (text, type = 'system', instant = false) => {
    if (instant) {
      addOutput(text, type);
      return;
    }

    // Simulate typing effect for important messages
    setIsTyping(true);
    const chars = text.split('');
    let currentText = '';

    chars.forEach((char, index) => {
      setTimeout(() => {
        currentText += char;
        if (index === chars.length - 1) {
          addOutput(currentText, type);
          setIsTyping(false);
        }
      }, index * 50);
    });
  };

  const addOutput = (text, type = 'system') => {
    setOutput(prev => {
      const newOutput = [...prev, {
        type,
        text,
        timestamp: getCurrentTimestamp()
      }];
      return newOutput.slice(-MAX_OUTPUT_LINES);
    });
  };

  const resetToWelcome = () => {
    setStep('welcome');
    setCredentials({ email: '', password: '' });
    setCurrentInput('');
    addOutput('', 'system');
    typeOutput('OPERATION CANCELLED. Returning to command prompt.', 'warning');
  };

  const resetToEmail = () => {
    setStep('email');
    setCredentials({ email: '', password: '' });
    setCurrentInput('');
    typeOutput('AUTHENTICATION FAILED. Please retry.', 'error');
    addOutput('Enter email address:', 'prompt');
  };

  const handleSpecialCommands = (command) => {
    const cmd = command.toLowerCase();

    switch (cmd) {
      case 'help':
        addOutput('AVAILABLE COMMANDS:', 'header');
        addOutput('  login      - Initiate authentication sequence', 'info');
        addOutput('  clear      - Clear terminal buffer', 'info');
        addOutput('  status     - System status information', 'info');
        addOutput('  whoami     - Display current user context', 'info');
        addOutput('  exit       - Terminate session', 'info');
        addOutput('  cancel     - Abort current operation', 'info');
        addOutput('', 'system');
        return true;

      case 'clear':
        setOutput([]);
        setTimeout(() => {
          addOutput('Terminal buffer cleared.', 'success');
          addOutput('', 'system');
        }, 100);
        setStep('welcome');
        setCredentials({ email: '', password: '' });
        return true;

      case 'status':
        addOutput('SYSTEM STATUS:', 'header');
        addOutput(`Session ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}`, 'info');
        addOutput(`Uptime: ${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`, 'info');
        addOutput(`Memory usage: ${Math.floor(Math.random() * 40 + 30)}%`, 'info');
        addOutput(`Network latency: ${Math.floor(Math.random() * 50 + 10)}ms`, 'info');
        addOutput('Security level: MAXIMUM', 'success');
        addOutput('', 'system');
        return true;

      case 'whoami':
        if (isAuthenticated) {
          addOutput('Current user: root@admin-console', 'success');
          addOutput('Privileges: ADMINISTRATOR', 'success');
        } else {
          addOutput('Current user: anonymous@guest-shell', 'warning');
          addOutput('Privileges: NONE - Authentication required', 'error');
        }
        addOutput('', 'system');
        return true;

      case 'exit':
        typeOutput('Terminating session...', 'warning');
        setTimeout(() => {
          addOutput('Connection closed.', 'error');
          setTimeout(() => navigate('/'), 1000);
        }, 1500);
        return true;

      case 'cancel':
        if (step !== 'welcome') {
          resetToWelcome();
          return true;
        }
        addOutput('No operation to cancel.', 'error');
        return true;

      case 'login':
        if (step === 'welcome') {
          typeOutput('Initiating authentication protocol...', 'info');
          setTimeout(() => {
            addOutput('Enter email address:', 'prompt');
            setStep('email');
          }, 1000);
          return true;
        } else {
          addOutput('Authentication already in progress. Type "cancel" to abort.', 'error');
          return true;
        }

      // Easter eggs for hacker feel
      case 'ls':
        addOutput('total 8', 'system');
        addOutput('drwxr-xr-x  2 root root 4096 Jan 15 10:30 .', 'system');
        addOutput('drwxr-xr-x  3 root root 4096 Jan 15 10:30 ..', 'system');
        addOutput('-rw-------  1 root root 1337 Jan 15 10:30 auth.key', 'system');
        addOutput('-rwxr-xr-x  1 root root 2048 Jan 15 10:30 login.sh', 'system');
        addOutput('', 'system');
        return true;

      case 'ps':
        addOutput('PID TTY          TIME CMD', 'system');
        addOutput('1024 pts/0    00:00:01 auth-daemon', 'system');
        addOutput('1337 pts/0    00:00:00 secure-shell', 'system');
        addOutput('2048 pts/0    00:00:00 ps', 'system');
        addOutput('', 'system');
        return true;

      case 'uname -a':
        addOutput('SecureOS 5.4.0-74-generic #83-Ubuntu SMP Sat May 8 02:35:39 UTC 2025 x86_64 x86_64 x86_64 GNU/Linux', 'system');
        addOutput('', 'system');
        return true;
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

    // Display command with timestamp
    const displayCommand = step === 'password' ? '*'.repeat(command.length) : command;
    addOutput(`[${getCurrentTimestamp()}] ${getCurrentPrompt()} ${displayCommand}`, 'input');

    // Handle special commands first
    if (handleSpecialCommands(command)) {
      return;
    }

    switch (step) {
      case 'welcome':
        addOutput(`bash: ${command}: command not found`, 'error');
        addOutput('Type "help" for available commands or "login" to authenticate.', 'prompt');
        break;

      case 'email':
        if (command === '') {
          addOutput('ERROR: Email address required.', 'error');
          addOutput('Enter email address:', 'prompt');
          return;
        }

        if (!isValidEmail(command)) {
          addOutput('ERROR: Invalid email format.', 'error');
          addOutput('Enter email address:', 'prompt');
          return;
        }

        setCredentials(prev => ({ ...prev, email: command }));
        addOutput('Email accepted. Proceeding to password verification.', 'success');
        setTimeout(() => {
          addOutput('Enter password:', 'prompt');
          setStep('password');
        }, 500);
        break;

      case 'password':
        if (command === '') {
          addOutput('ERROR: Password required.', 'error');
          addOutput('Enter password:', 'prompt');
          return;
        }

        setStep('authenticating');
        setIsLoading(true);

        addOutput('Validating credentials...', 'info');
        addOutput('Checking security clearance...', 'info');
        addOutput('Verifying access permissions...', 'info');

        setTimeout(async () => {
          try {
            const response = await login({
              email: credentials.email,
              password: command
            });

            if (response.success) {
              addOutput('AUTHENTICATION SUCCESSFUL', 'success');
              addOutput('Access granted to administrative interface.', 'success');
              addOutput('Establishing secure connection...', 'info');
              addOutput('Welcome, Administrator.', 'success');
              setTimeout(() => {
                navigate('/dashboard');
              }, 2000);
            } else {
              addOutput('AUTHENTICATION FAILED', 'error');
              addOutput(`Reason: ${response.error}`, 'error');
              addOutput('Access denied.', 'error');
              setTimeout(() => resetToEmail(), 1500);
            }
          } catch (error) {
            addOutput('SYSTEM ERROR', 'error');
            addOutput(`Fatal: ${error.message}`, 'error');
            setTimeout(() => resetToEmail(), 1500);
          }

          setIsLoading(false);
        }, 2000);
        break;

      case 'authenticating':
        addOutput('Authentication in progress... Please wait.', 'warning');
        break;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading && !isTyping) {
      e.preventDefault();

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
        const commands = ['help', 'login', 'clear', 'status', 'whoami', 'exit'];
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
    } else if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      if (step !== 'welcome') {
        addOutput('^C', 'input');
        resetToWelcome();
      }
    }
  };

  const getCurrentPrompt = () => {
    switch (step) {
      case 'email':
        return 'auth@secure-login:~$';
      case 'password':
        return 'auth@secure-login:~$';
      case 'authenticating':
        return '';
      default:
        return isAuthenticated ? 'root@admin-console:~#' : 'guest@terminal:~$';
    }
  };

  const getTextColor = (type) => {
    switch (type) {
      case 'system': return '#666666';
      case 'success': return '#00ff41';
      case 'error': return '#ff0000';
      case 'info': return '#00ffff';
      case 'prompt': return '#ffff00';
      case 'input': return '#ffffff';
      case 'warning': return '#ffa500';
      case 'header': return '#ff00ff';
      case 'banner': return '#00ff41';
      default: return '#ffffff';
    }
  };

  const renderOutput = () => {
    return output.map((line, index) => (
      <div
        key={index}
        style={{
          color: getTextColor(line.type),
          marginBottom: '2px',
          fontFamily: '"Courier New", Courier, monospace',
          fontSize: '13px',
          lineHeight: '1.2',
          letterSpacing: '0.5px'
        }}
      >
        {line.text}
      </div>
    ));
  };

  return (
    <div style={{
      backgroundColor: '#000000',
      color: '#00ff41',
      minHeight: '100vh',
      fontFamily: '"Courier New", Courier, monospace',
      padding: '10px',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Matrix-style background effect */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(circle at 20% 80%, rgba(0, 255, 65, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(0, 255, 255, 0.03) 0%, transparent 50%),
          linear-gradient(90deg, transparent 79px, rgba(0, 255, 65, 0.03) 80px, rgba(0, 255, 65, 0.03) 81px, transparent 82px)
        `,
        backgroundSize: '100% 100%, 100% 100%, 81px 100%',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        style={{
          height: 'calc(100vh - 60px)',
          overflowY: 'auto',
          paddingRight: '10px',
          position: 'relative',
          zIndex: 1
        }}
      >
        {renderOutput()}

        {/* Current Input Line */}
        {!isLoading && step !== 'authenticating' && !isTyping && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '4px'
          }}>
            <span style={{
              color: '#00ff41',
              marginRight: '8px',
              whiteSpace: 'nowrap',
              fontSize: '13px'
            }}>
              {getCurrentPrompt()}
            </span>

            <div style={{
              flex: 1,
              position: 'relative',
              fontFamily: '"Courier New", Courier, monospace',
              fontSize: '13px',
              color: '#ffffff'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                minHeight: '16px'
              }}>
                <span style={{
                  color: '#ffffff',
                  whiteSpace: 'pre',
                  letterSpacing: '0.5px'
                }}>
                  {step === 'password' ? '●'.repeat(currentInput.length) : currentInput}
                </span>

                {/* Cursor */}
                <span style={{
                  color: '#00ff41',
                  opacity: showCursor ? 1 : 0,
                  marginLeft: '1px',
                  fontSize: '13px'
                }}>
                  █
                </span>
              </div>

              {/* Hidden input */}
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
                  color: 'transparent',
                  caretColor: 'transparent',
                  fontFamily: '"Courier New", Courier, monospace',
                  fontSize: '13px',
                  zIndex: 1
                }}
                autoComplete="off"
                disabled={isLoading || isTyping}
              />
            </div>
          </div>
        )}

        {/* Loading Animation */}
        {isLoading && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '4px',
            color: '#00ffff'
          }}>
            <span>Processing</span>
            <span style={{
              animation: 'dots 1.5s infinite',
              marginLeft: '5px'
            }}>...</span>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div style={{
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        height: '20px',
        backgroundColor: '#001100',
        borderTop: '1px solid #003300',
        color: '#00ff41',
        fontSize: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 10px',
        fontFamily: '"Courier New", Courier, monospace'
      }}>
        <div>SECURE TERMINAL | CTRL+C: Interrupt | TAB: Complete | ESC: Cancel</div>
        <div>{getCurrentTimestamp()} | {isAuthenticated ? 'AUTHENTICATED' : 'GUEST'}</div>
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes dots {
            0% { opacity: 0; }
            25% { opacity: 1; }
            50% { opacity: 1; }
            75% { opacity: 0; }
            100% { opacity: 0; }
          }
          
          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 6px;
          }
          
          ::-webkit-scrollbar-track {
            background: #001100;
          }
          
          ::-webkit-scrollbar-thumb {
            background: #003300;
            border-radius: 0;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: #005500;
          }

          /* Text selection */
          ::selection {
            background-color: #003300;
            color: #00ff41;
          }
        `}
      </style>
    </div>
  );
};

export default CLILogin;


