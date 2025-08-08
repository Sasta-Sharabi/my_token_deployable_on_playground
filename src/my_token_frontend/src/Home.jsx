import React, { useState } from 'react';
import { useAuth } from './AuthProvider';

const Home = () => {
  const [result, setResult] = useState('');
  const { callFunction, logout } = useAuth();

  const handleClick = async () => {
    const id = await callFunction.greet();
    setResult(id);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>👋 Welcome</h1>
        
        <button style={styles.actionButton} onClick={handleClick}>
          Show My Principal ID
        </button>

        {result && (
          <div style={styles.resultBox}>
            <h3 style={styles.label}>Your Principal ID:</h3>
            <p style={styles.principal}>{result}</p>
          </div>
        )}

        <button style={styles.logoutButton} onClick={logout}>
          🚪 Log Out
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    background: 'linear-gradient(to right, #eef2f3, #ffffff)',
    minHeight: '100vh',
    fontFamily: `'Inter', sans-serif`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.07)',
    padding: '30px 40px',
    textAlign: 'center',
  },
  title: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#1e293b',
    marginBottom: '25px',
  },
  actionButton: {
    width: '100%',
    padding: '14px',
    fontSize: '16px',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginBottom: '25px',
  },
  logoutButton: {
    width: '100%',
    padding: '14px',
    fontSize: '16px',
    backgroundColor: '#ef4444',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '30px',
  },
  resultBox: {
    backgroundColor: '#f1f5f9',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    padding: '16px',
    wordBreak: 'break-word',
  },
  label: {
    marginBottom: '6px',
    fontSize: '16px',
    fontWeight: 600,
    color: '#334155',
  },
  principal: {
    fontFamily: 'monospace',
    fontSize: '14px',
    color: '#0f172a',
  },
};

export default Home;
