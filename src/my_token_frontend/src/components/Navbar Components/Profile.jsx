import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthProvider';

const Profile = () => {
  const [principal, setPrincipal] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [balance, setBalance] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { callFunction } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const [p, name, mail, bal] = await callFunction.get_profile_details();
        setPrincipal(p);
        setUsername(name);
        setEmail(mail);
        setBalance(bal);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('❌ Failed to load profile information.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      setError('');
      setSuccess('');
      await callFunction.update_profile_details(username, email);
      setSuccess('✅ Profile updated successfully!');
    } catch (err) {
      console.error('Update error:', err);
      setError('❌ Failed to update profile.');
    }
  };

  if (loading) return <p style={styles.status}>Loading profile...</p>;
  if (error) return <p style={{ ...styles.status, color: '#ff4d4f' }}>{error}</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>👤 Profile</h2>

        <div style={styles.detail}>
          <strong style={styles.label}>Principal:</strong>
          <span style={styles.principal}>{principal}</span>
        </div>

        <div style={styles.detail}>
          <strong style={styles.label}>Username:</strong>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.detail}>
          <strong style={styles.label}>Email:</strong>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.detail}>
          <strong style={styles.label}>Balance:</strong>
          <span style={styles.value}>{balance}</span>
        </div>

        <button onClick={handleUpdate} style={styles.button}>
          🔄 Update Details
        </button>

        {success && <div style={styles.successBox}>{success}</div>}
        {error && <div style={styles.errorBox}>{error}</div>}
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
    marginBottom: '20px',
    fontSize: '17px',
    display: 'flex',
    flexDirection: 'column',
    wordBreak: 'break-word',
  },
  label: {
    color: '#FFD700',
    marginBottom: '6px',
    fontWeight: 'bold',
  },
  principal: {
    fontFamily: 'monospace',
    fontSize: '15px',
    color: '#FFD700',
    background: 'rgba(255,255,255,0.05)',
    padding: '8px',
    borderRadius: '6px',
    border: '1px solid rgba(255, 215, 0, 0.3)',
    boxShadow: '0 0 8px rgba(255, 215, 0, 0.2)',
  },
  value: {
    color: '#FFD700',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    fontFamily: 'monospace',
    borderRadius: '8px',
    border: '1px solid rgba(255,215,0,0.3)',
    background: 'rgba(255, 255, 255, 0.05)',
    color: '#FFD700',
    outline: 'none',
    boxShadow: '0 0 8px rgba(255, 215, 0, 0.2)',
  },
  button: {
    width: '100%',
    padding: '14px',
    fontSize: '16px',
    background: 'linear-gradient(90deg, #FFD700, #ffcc33)',
    color: '#000',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 0 10px rgba(255, 215, 0, 0.4)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  status: {
    fontSize: '18px',
    color: '#FFD700',
    textAlign: 'center',
    paddingTop: '40px',
  },
  successBox: {
    marginTop: '20px',
    backgroundColor: 'rgba(0, 255, 128, 0.1)',
    border: '1px solid #10b981',
    color: '#10b981',
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '15px',
    fontWeight: 500,
  },
  errorBox: {
    marginTop: '20px',
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    border: '1px solid #ff4d4f',
    color: '#ff4d4f',
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '15px',
    fontWeight: 500,
  },
};

export default Profile;
