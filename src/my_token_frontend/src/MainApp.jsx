import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './AuthProvider';

import Header from './components/Header';
import NavBar from './components/NavBar';
import AllUsers from './components/Navbar Components/AllUsers';
import Transfer from './components/Navbar Components/Transfer';
import Balance from './components/Navbar Components/Balance';
import Mint from './components/Navbar Components/Mint';
import Profile from './components/Navbar Components/Profile';
import Metadata from './components/Navbar Components/Metadata';
import Faucet from './components/Navbar Components/Faucet';
import Documentation from './components/Navbar Components/Documentation';
import Transaction from './components/Navbar Components/Transaction';


function MainApp() {
  const { authUser, callFunction } = useAuth();
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const registerUser = async () => {
      if (!authUser?.principal || registered) return;

      try {
        await callFunction.register_user();
        setRegistered(true);
      } catch (err) {
        console.error('Registration failed:', err);
        setError('Could not register user. Please try again.');
      }
    };

    registerUser();
  }, [authUser, registered, callFunction]);

  return (
    <BrowserRouter>
      <Header />
      <NavBar />

      {error && (
        <div style={styles.errorBox}>
          ⚠️ {error}
        </div>
      )}

      <Routes>
        <Route path="/" element={<AllUsers />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/balance" element={<Balance />} />
        <Route path="/mint" element={<Mint />} />
        <Route path="/faucet" element={<Faucet   />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/transactions" element={<Transaction />} />
        <Route path="/metadata" element={<Metadata />} />
        <Route path="/docs" element={<Documentation />} />
      </Routes>
    </BrowserRouter>
  );
}

const styles = {
  errorBox: {
    margin: '20px',
    padding: '12px 20px',
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    border: '1px solid #fca5a5',
    borderRadius: '8px',
    fontFamily: `'Inter', sans-serif`,
    fontSize: '15px',
  },
};

export default MainApp;
