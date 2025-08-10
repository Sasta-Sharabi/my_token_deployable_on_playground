import React from 'react';
import docIcon from '../../assets/aoi.png'; // Replace with a documentation icon

const Aoi = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Icon */}
        <img src={docIcon} alt="Documentation Icon" style={styles.icon} />

        <h2 style={styles.title}>Area of Improvement</h2>
        <div style={styles.textBox}>
          <p>
            <ul>
                <li>AirDrop could be added for user loyality to platform. Terms can be time based or task based or new user registration.</li>
                <li>The CoreX coin contain 8 decimals. The code can be updated to handle decimal denominations.</li>
                <li>A Transaction history section could be added to NavBar for showing the past transactions data along with timestamp. </li>
                <li>A time based restriction on Faucet claim could be implemented. </li>
                <li>More User Details could be used for Profile.</li>
                <li>The All User page could be improved for showing more details of users.</li>
                <li>A Little Fee could be charged for every transaction.</li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    background: 'radial-gradient(circle at center, #0f0f0f 0%, #000000 100%)',
    minHeight: '100vh',
    fontFamily: `'Inter', sans-serif`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  card: {
    width: '100%',
    maxWidth: '800px',
    background: 'rgba(20, 20, 20, 0.75)',
    backdropFilter: 'blur(16px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 215, 0, 0.3)',
    boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)',
    padding: '30px 40px',
    color: '#f5f5f5',
    textAlign: 'center',
  },
  icon: {
    width: '100px',
    marginBottom: '15px',
    animation: 'float 3s ease-in-out infinite, glow 2s ease-in-out infinite alternate',
  },
  title: {
    fontSize: '26px',
    marginBottom: '25px',
    fontWeight: 700,
    color: '#FFD700',
    borderBottom: '2px solid rgba(255, 215, 0, 0.4)',
    paddingBottom: '10px',
    textShadow: '0 0 6px rgba(255, 215, 0, 0.5)',
  },
  textBox: {
    fontSize: '16px',
    textAlign: 'left',
    color: '#FFD700',
    background: 'rgba(255, 215, 0, 0.05)',
    padding: '15px 20px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 215, 0, 0.3)',
    boxShadow: '0 0 6px rgba(255, 215, 0, 0.2)',
    lineHeight: '1.6',
  },
};

// Inject animation styles into document head
const animationStyles = `
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
@keyframes glow {
  0% { filter: drop-shadow(0 0 3px gold) drop-shadow(0 0 6px gold); }
  100% { filter: drop-shadow(0 0 8px gold) drop-shadow(0 0 15px gold); }
}
`;
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = animationStyles;
  document.head.appendChild(styleEl);
}

export default Aoi;
