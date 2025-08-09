import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider';
import coreXLogo from '../assets/logo.png';
import walletLogo from '../assets/wallet.png';
import './Header.css';

const Header = () => {
  const { callFunction, logout } = useAuth();
  const [principal, setPrincipal] = useState('N/A');
  const [balance, setBalance] = useState('Loading...');
  const [showDetails, setShowDetails] = useState(false);

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
      {/* Logo */}
      <div style={styles.logoContainer}>
        <img src={coreXLogo} alt="CoreX Logo" style={styles.logoImage} />
        <span style={styles.logoText}>
          Core<span style={styles.logoTextX}>X</span>
        </span>
      </div>

      {/* User Card */}
      <div
        style={styles.userCard}
        onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
      >
        <span style={styles.userMainText}><img src={walletLogo} height='20px'></img>{balance} CRX </span>

        {showDetails && (
          <div style={styles.userDetails}>
            <p><strong>Principal:</strong> {principal}</p>
            <p><strong>Balance:</strong> {balance}</p>
          </div>
        )}
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        style={styles.logoutButton}
        onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 18px rgba(255, 215, 0, 0.85)'}
        onMouseLeave={(e) => e.currentTarget.style.boxShadow = styles.logoutButton.boxShadow}
      >
        Log Out
      </button>
    </header>
  );
};

const styles = {
  header: {
    background: 'radial-gradient(circle at center, #000000 0%, #1a1a1a 100%)',
    padding: '14px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: `'Inter', sans-serif`,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
    borderBottom: '1px solid rgba(255, 215, 0, 0.2)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoImage: {
    height: '50px',
    width: '50px',
    objectFit: 'contain',
    filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.7))',
    animation: 'spinLogo 8s linear infinite',
  },
  logoText: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#fff',
    letterSpacing: '1px',
  },
  logoTextX: {
    color: '#FFD700',
    textShadow: '0 0 8px rgba(255, 215, 0, 0.7)',
  },
  userCard: {
    position: 'relative',
    background: 'linear-gradient(145deg, rgba(26, 26, 26, 0.98), rgba(15, 15, 15, 0.98))',
    border: '1px solid rgba(255, 215, 0, 0.25)',
    boxShadow: '0 4px 15px rgba(255, 215, 0, 0.15)',
    borderRadius: '14px',
    padding: '12px 18px',
    cursor: 'pointer',
    color: '#FFD700',
    fontWeight: 500,
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    maxWidth: '220px',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    zIndex: 2,
  }, 
  userCardHover: {
    transform: 'scale(1.02)',
    boxShadow: '0 6px 20px rgba(255, 215, 0, 0.3)',
  },
  userMainText: {
    fontSize: '15px',
    letterSpacing: '0.5px',
  },
  userDetails: {
    position: 'absolute',
    top: '115%',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'linear-gradient(160deg, rgba(26, 26, 26, 0.98), rgba(10, 10, 10, 0.98))',
    border: '1px solid rgba(255, 215, 0, 0.35)',
    boxShadow: '0 8px 25px rgba(255, 215, 0, 0.2)',
    padding: '12px 16px',
    borderRadius: '12px',
    color: '#fff',
    width: '260px',
    maxWidth: '90vw',
    fontSize: '13px',
    zIndex: 3,
    animation: 'fadeIn 0.25s ease-out',
  },
  logoutButton: {
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: 'bold',
    background: 'linear-gradient(90deg, #FFD700, #FFB700)',
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 0 10px rgba(255, 215, 0, 0.6)',
    transition: 'all 0.3s ease',
  },
};

export default Header;
