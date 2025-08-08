import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../AuthProvider';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { callFunction } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0); // rerender trigger

  const fetchUsers = useCallback(async () => {
    try {
      const userList = await callFunction.get_all_users();
      console.log('Fetched users:', userList);
      setUsers(userList);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  }, [callFunction]);

  useEffect(() => {
    fetchUsers(); // fetch when component mounts or refreshTrigger changes

    const interval = setInterval(fetchUsers, 5000); // refresh every 5s

    return () => clearInterval(interval);
  }, [fetchUsers, refreshTrigger]);

  const manualRefresh = () => {
    setLoading(true);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>👥 All Registered Users</h2>
          <button onClick={manualRefresh} style={styles.refreshBtn}>🔄 Refresh</button>
        </div>

        {loading ? (
          <p style={styles.status}>Loading users...</p>
        ) : users.length === 0 ? (
          <p style={styles.status}>No users found.</p>
        ) : (
          <UserTable users={users} />
        )}
      </div>
    </div>
  );
};

const UserTable = ({ users }) => {
  return (
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Principal</th>
            <th style={styles.th}>Balance</th>
          </tr>
        </thead>
        <tbody>
          {users.map(([principal, balance], idx) => (
            <tr key={idx} style={idx % 2 === 0 ? styles.rowEven : styles.rowOdd}>
              <td style={styles.td}>{principal}</td>
              <td style={styles.td}>{balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
    maxWidth: '1000px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.07)',
    padding: '30px 40px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '26px',
    fontWeight: 700,
    color: '#1e293b',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '10px',
  },
  refreshBtn: {
    padding: '8px 12px',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  status: {
    fontSize: '17px',
    color: '#64748b',
    marginTop: '20px',
  },
  tableWrapper: {
    overflowX: 'auto',
    marginTop: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0',
    minWidth: '600px',
  },
  th: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    textAlign: 'left',
    padding: '14px 20px',
    fontSize: '16px',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  },
  td: {
    padding: '14px 20px',
    fontSize: '15px',
    color: '#334155',
    backgroundColor: '#f9fafb',
    borderBottom: '1px solid #e2e8f0',
  },
  rowEven: {
    backgroundColor: '#f1f5f9',
  },
  rowOdd: {
    backgroundColor: '#ffffff',
  },
};

export default AllUsers;
