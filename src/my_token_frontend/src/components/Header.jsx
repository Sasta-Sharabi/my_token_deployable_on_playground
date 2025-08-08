import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider';

const Header = () => {
  const { callFunction, logout } = useAuth();
  const [principal, setPrincipal] = useState('N/A');
  const [balance, setBalance] = useState('Loading...');

  useEffect(() => {
    const fetchHeaderDetails = async () => {
      try {
        const [p, b] = await callFunction.get_header_details();
        setPrincipal(p);
        setBalance(b);
      } catch (error) {
        console.error('Error fetching header details:', error);
        setPrincipal('Error');
        setBalance('Error');
      }
    };

    fetchHeaderDetails();
    const interval = setInterval(fetchHeaderDetails, 5000);

    return () => clearInterval(interval);
  }, [callFunction]);

  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <img src="logo.png" alt="Logo" style={styles.logoImage} />
        <span style={styles.logoText}>Token</span>
      </div>

      <div style={styles.rightSection}>
        <span style={styles.info}><strong>Principal:</strong> {principal}</span>
        <span style={styles.info}><strong>Balance:</strong> {balance}</span>
        <button onClick={logout} style={styles.logoutButton}>Log Out</button>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    padding: '12px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: `'Inter', sans-serif`,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoImage: {
    height: '50px',
    width: '100px',
    objectFit: 'contain',
  },
  logoText: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#1e293b',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  info: {
    fontSize: '14px',
    color: '#475569',
  },
  logoutButton: {
    padding: '10px 16px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#ef4444',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default Header;
