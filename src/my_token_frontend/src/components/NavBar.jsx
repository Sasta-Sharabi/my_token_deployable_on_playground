import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <NavLink to="/" end style={getLinkStyle}>
            Allusers
          </NavLink>
        </li>
        <li style={styles.navItem}>
          <NavLink to="/transfer" style={getLinkStyle}>
            Transfer
          </NavLink>
        </li>
        <li style={styles.navItem}>
          <NavLink to="/mint" style={getLinkStyle}>
            Mint
          </NavLink>
        </li>
        <li style={styles.navItem}>
          <NavLink to="/balance" style={getLinkStyle}>
            Balance
          </NavLink>
        </li>
        <li style={styles.navItem}>
          <NavLink to="/profile" style={getLinkStyle}>
            Profile
          </NavLink>
        </li>
        <li style={styles.navItem}>
          <NavLink to="/metadata" style={getLinkStyle}>
            Token Details
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

// This function gives active links a highlighted style
const getLinkStyle = ({ isActive }) => ({
  color: isActive ? '#fff' : '#333',
  backgroundColor: isActive ? '#007bff' : 'transparent',
  borderRadius: '8px',
  padding: '6px 12px',
  textDecoration: 'none',
  fontSize: '18px',
  fontWeight: '500',
  transition: '0.2s',
});

const styles = {
  navbar: {
    width: '100%',
    padding: '20px 0',
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '40px',
    margin: 0,
    padding: 0,
  },
  navItem: {},
};

export default Navbar;
