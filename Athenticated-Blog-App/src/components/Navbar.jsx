import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      <nav style={styles.nav}>
        <div style={styles.logo} onClick={() => navigate('/')}>MyBlogCMS</div>

        <div style={styles.hamburger} onClick={toggleMenu}>
          <div
            style={{
              ...styles.bar,
              transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }}
          />
          <div
            style={{
              ...styles.bar,
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <div
            style={{
              ...styles.bar,
              transform: menuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none',
            }}
          />
        </div>

        <div
          style={{
            ...styles.linksContainer,
            ...(menuOpen ? styles.linksContainerOpen : {}),
          }}
        >
          {user ? (
            <>
              <NavLink
                to="/dashboard"
                style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/new"
                style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
                onClick={() => setMenuOpen(false)}
              >
                New Post
              </NavLink>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
                onClick={() => setMenuOpen(false)}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

const primaryColor = '#2c3e50';  
const accentColor = '#27ae60';   
const textColor = '#ecf0f1';     

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 2rem',
    height: '64px',
    backgroundColor: primaryColor,
    color: textColor,
    position: 'sticky',
    top: 0,
    zIndex: 999,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  logo: {
    fontWeight: '700',
    fontSize: '1.5rem',
    cursor: 'pointer',
    userSelect: 'none',
  },
  linksContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',


    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  linksContainerOpen: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '64px',
    right: 0,
    backgroundColor: primaryColor,
    width: '100%',
    padding: '1rem 0',
    gap: '1rem',
  },
  link: {
    color: textColor,
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '1rem',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
  },
  activeLink: {
    color: accentColor,
    textDecoration: 'underline',
    fontWeight: '700',
  },
  logoutBtn: {
    backgroundColor: accentColor,
    border: 'none',
    padding: '0.5rem 1.2rem',
    borderRadius: '4px',
    color: textColor,
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontSize: '1rem',
  },
  hamburger: {
    display: 'none',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '24px',
    height: '18px',
    cursor: 'pointer',
    userSelect: 'none',
  },
  bar: {
    height: '3px',
    width: '100%',
    backgroundColor: textColor,
    borderRadius: '2px',
    transition: 'all 0.3s ease',
  },

  
  '@media (max-width: 768px)': {
    linksContainer: {
      display: 'none',
      flexDirection: 'column',
      position: 'absolute',
      top: '64px',
      right: 0,
      backgroundColor: primaryColor,
      width: '100%',
      padding: '1rem 0',
      gap: '1rem',
    },
    hamburger: {
      display: 'flex',
    },
  },
};
