import React from 'react';
import { useAuth } from './AuthProvider';

const Login = () => {
  const { login } = useAuth();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          🔐 Welcome to <span style={styles.coinName}>CoreX</span>
        </h2>
        <p style={styles.subtitle}>
          Click the button below to log in using Internet Identity.
        </p>
        <button onClick={login} style={styles.button}>Log in</button>
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
    maxWidth: '500px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.07)',
    padding: '30px 40px',
    textAlign: 'center',
  },
  title: {
    fontSize: '28px',
    fontWeight: 700,
    marginBottom: '15px',
    color: '#1e293b',
  },
  coinName: {
    color: '#3b82f6',       // Highlight color (blue)
    fontWeight: 800,
    letterSpacing: '1px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#475569',
    marginBottom: '30px',
  },
  button: {
    padding: '14px 28px',
    fontSize: '16px',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default Login;
