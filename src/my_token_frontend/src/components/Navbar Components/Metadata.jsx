import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthProvider';

const Metadata = () => {
  const [metadata, setMetadata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { callFunction } = useAuth();

  useEffect(() => {
    let intervalId;

    const fetchMetadata = async () => {
      try {
        const data = await callFunction.get_token_metadata();
        console.log(data);
        setMetadata(data);
        setError('');
      } catch (err) {
        console.error('Error fetching token metadata:', err);
        setError('❌ Failed to load token details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
    intervalId = setInterval(fetchMetadata, 3000);

    return () => clearInterval(intervalId);
  }, [callFunction]);

  if (loading)
    return <p style={styles.status}>Loading token details...</p>;
  if (error)
    return <p style={{ ...styles.status, color: '#ff4d4f' }}>{error}</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>💠 Token Details</h2>

        <div style={styles.detail}>
          <strong style={styles.label}>Name:</strong>
          <span style={styles.value}>{metadata[0]}</span>
        </div>

        <div style={styles.detail}>
          <strong style={styles.label}>Native Currency:</strong>
          <span style={styles.value}>{metadata[1]}</span>
        </div>

        <div style={styles.detail}>
          <strong style={styles.label}>Total Supply:</strong>
          <span style={styles.value}>{metadata[2]}</span>
        </div>

        <div style={styles.detail}>
          <strong style={styles.label}>Minting Account:</strong>
          <span style={styles.value}>{metadata[3]}</span>
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
    maxWidth: '600px',
    background: 'rgba(20, 20, 20, 0.75)',
    backdropFilter: 'blur(16px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 215, 0, 0.3)',
    boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)',
    padding: '30px 40px',
    color: '#f5f5f5',
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
  detail: {
    marginBottom: '16px',
    fontSize: '17px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(255, 215, 0, 0.05)',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 215, 0, 0.15)',
  },
  label: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  value: {
    color: '#FFD700',
    fontFamily: 'monospace',
  },
  status: {
    fontSize: '18px',
    color: '#FFD700',
    textAlign: 'center',
    paddingTop: '40px',
  },
};

export default Metadata;
