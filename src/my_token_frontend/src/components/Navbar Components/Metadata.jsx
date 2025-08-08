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
        console.error("Error fetching token metadata:", err);
        setError('Failed to load token details.');
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchMetadata();

    // Set up interval to refresh every 3 seconds
    intervalId = setInterval(fetchMetadata, 3000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, [callFunction]);

  if (loading) return <p style={styles.status}>Loading token details...</p>;
  if (error) return <p style={{ ...styles.status, color: 'red' }}>{error}</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>💠 Token Details</h2>
        <div style={styles.detail}><strong>Name:</strong> <span>{metadata[0]}</span></div>
        <div style={styles.detail}><strong>Native Currency:</strong> <span>{metadata[1]}</span></div>
        <div style={styles.detail}><strong>Total Supply:</strong> <span>{metadata[2]}</span></div>
        <div style={styles.detail}><strong>Minting Account:</strong> <span>{metadata[3]}</span></div>
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
    alignItems: 'flex-start',
  },
  card: {
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.07)',
    padding: '30px 40px',
  },
  title: {
    fontSize: '26px',
    marginBottom: '25px',
    fontWeight: 700,
    color: '#1e293b',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '10px',
  },
  detail: {
    marginBottom: '16px',
    fontSize: '17px',
    color: '#334155',
    display: 'flex',
    justifyContent: 'space-between',
  },
  status: {
    fontSize: '18px',
    color: '#64748b',
    textAlign: 'center',
    paddingTop: '40px',
  },
};

export default Metadata;
