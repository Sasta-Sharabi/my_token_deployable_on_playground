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
  const { callFunction, logout } = useAuth();

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
        setError('Failed to load profile information.');
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
  if (error) return <p style={{ ...styles.status, color: 'red' }}>{error}</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>👤 Profile</h2>

        <div style={styles.detail}>
          <strong>Principal:</strong>
          <span style={styles.principal}>{principal}</span>
        </div>

        <div style={styles.detail}>
          <strong>Username:</strong>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.detail}>
          <strong>Email:</strong>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.detail}>
          <strong>Balance:</strong> <span>{balance}</span>
        </div>

        <button onClick={handleUpdate} style={styles.updateButton}>🔄 Update Details</button>

        {success && <div style={styles.successBox}>{success}</div>}
        {error && <div style={styles.errorBox}>{error}</div>}
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
    flexDirection: 'column',
    wordBreak: 'break-word',
  },
  principal: {
    fontFamily: 'monospace',
    fontSize: '15px',
    color: '#0f172a',
    marginTop: '6px',
  },
  input: {
    padding: '8px',
    marginTop: '6px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '15px',
  },
  updateButton: {
    marginTop: '20px',
    padding: '10px 16px',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  status: {
    fontSize: '18px',
    color: '#64748b',
    textAlign: 'center',
    paddingTop: '40px',
  },
  successBox: {
    marginTop: '20px',
    backgroundColor: '#d1fae5',
    border: '1px solid #10b981',
    color: '#065f46',
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '15px',
    fontWeight: 500,
  },
  errorBox: {
    marginTop: '20px',
    backgroundColor: '#fee2e2',
    border: '1px solid #ef4444',
    color: '#991b1b',
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '15px',
    fontWeight: 500,
  },
};

export default Profile;
