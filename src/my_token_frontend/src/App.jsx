import { useState } from 'react';
import { AuthProvider, useAuth } from './AuthProvider';
import Home from './Home';
import Login from './Login';
import MainApp from './MainApp';

function AppContent() {
  const { isAuth, authUser } = useAuth();

  if (!authUser) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.card}>
          <h2 style={styles.loadingText}>🔄 Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <main>
      {isAuth ? <MainApp /> : <Login />}
    </main>
  );
}

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

const styles = {
  loadingContainer: {
    padding: '40px',
    background: 'linear-gradient(to right, #eef2f3, #ffffff)',
    minHeight: '100vh',
    fontFamily: `'Inter', sans-serif`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    maxWidth: '500px',
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.07)',
    padding: '30px 40px',
    textAlign: 'center',
  },
  loadingText: {
    fontSize: '22px',
    fontWeight: 600,
    color: '#334155',
  },
};

export default App;
