import React, { useState } from 'react';
// import { mini_task3_backend } from 'declarations/mini_task3_backend';
import { useAuth } from '../../AuthProvider';

const Transfer = () => {
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const { callFunction, logout } = useAuth();

  const handleTransfer = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      console.log(amount);
      const result = await callFunction.transfer_to(receiver, amount.toString());
      console.log(result);
      setStatus(`Transfer status: ${result}`);
    } catch (err) {
      console.error("Transfer failed:", err);
      setStatus('❌ Transfer failed. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>💸 Transfer Tokens</h2>
        <form onSubmit={handleTransfer} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Receiver Principal:</label>
            <textarea
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              required
              style={styles.principalBox}
              placeholder="Enter receiver principal"
              rows={2}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Amount:</label>
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
              style={styles.amountBox}
              placeholder="Enter amount (u128)"
            />
          </div>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Transferring...' : 'Transfer'}
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
  principalBox: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    fontFamily: 'monospace',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    outline: 'none',
    resize: 'none',
    overflow: 'hidden',
    wordBreak: 'break-word',
    lineHeight: '1.4',
    minHeight: '60px',
    backgroundColor: '#f8fafc',
  },
  amountBox: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    fontFamily: 'monospace',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    outline: 'none',
    backgroundColor: '#f8fafc',
    wordBreak: 'break-word',
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
    whiteSpace: 'pre-wrap',
  },
};

export default Transfer;
