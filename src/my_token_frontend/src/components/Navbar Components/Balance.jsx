import React, { useState } from 'react';
// import { mini_task3_backend } from 'declarations/mini_task3_backend';
import { useAuth } from '../../AuthProvider';

const Balance = () => {
  const [principal, setPrincipal] = useState('');
  const [balance, setBalance] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const { callFunction} = useAuth();

  const handleCheckBalance = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    setBalance(null);

    try {
      const result = await callFunction.check_balance_of(principal);
      console.log(result);
      setBalance(result);
      setStatus('✅ Balance fetched successfully.');
    } catch (err) {
      console.error("Error fetching balance:", err);
      setStatus('❌ Failed to fetch balance. Check the Principal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔍 Check Balance</h2>
        <form onSubmit={handleCheckBalance} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Principal ID:</label>
            <input
              type="text"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              required
              style={styles.inputBox}
              placeholder="Enter principal ID"
            />
          </div>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Checking...' : 'Check Balance'}
          </button>
        </form>
        {status && <p style={styles.status}>{status}</p>}
        {balance !== null && (
          <div style={styles.resultBox}>
            <strong>Balance:</strong> {balance}
          </div>
        )}
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  label: {
    fontSize: '16px',
    color: '#334155',
    marginBottom: '8px',
  },
  inputBox: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    fontFamily: 'monospace',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    outline: 'none',
    backgroundColor: '#f8fafc',
  },
  button: {
    width: '100%',
    padding: '14px',
    fontSize: '16px',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  status: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#334155',
  },
  resultBox: {
    marginTop: '10px',
    fontSize: '17px',
    color: '#1e293b',
    background: '#f1f5f9',
    padding: '10px 15px',
    borderRadius: '8px',
    wordBreak: 'break-word',
  },
};

export default Balance;
