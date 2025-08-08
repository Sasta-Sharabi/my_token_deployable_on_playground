import React, { useState } from 'react';
// import { mini_task3_backend } from 'declarations/mini_task3_backend';
import { useAuth } from '../../AuthProvider';

const Mint = () => {
  const [amount, setAmount] = useState('');
  const [principal, setPrincipal] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const { callFunction, logout } = useAuth();

  const handleMint = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const result = await callFunction.mint_tokens( amount.toString(),principal);
      console.log(result);
      setStatus(` Mint status: ${result}`);
    } catch (err) {
      console.error("Mint failed:", err);
      setStatus('❌ Mint failed. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🪙 Mint Tokens</h2>
        <form onSubmit={handleMint} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Principal ID:</label>
            <input
              type="text"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              required
              placeholder="Enter Principal ID"
              style={styles.inputBox}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Amount to Mint:</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={amount}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) setAmount(val);
              }}
              required
              placeholder="Enter amount (u128)"
              style={styles.inputBox}
            />
          </div>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Minting...' : 'Mint'}
          </button>
        </form>
        {status && <p style={styles.status}>{status}</p>}
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
    backgroundColor: '#10b981',
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
    whiteSpace: 'pre-wrap',
  },
};

export default Mint;
