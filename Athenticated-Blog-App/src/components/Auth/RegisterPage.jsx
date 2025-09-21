import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import Spinner from '../Spinner';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { register, loading } = useAuth();
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      await register({ username, email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <Spinner />;

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Register</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Register</button>
        <p style={{ marginTop: 15 }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: '60px auto',
    padding: 20,
    boxShadow: '0 0 12px rgba(0,0,0,0.1)',
    borderRadius: 8,
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: 12,
    marginBottom: 15,
    borderRadius: 4,
    border: '1px solid #ccc',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2ecc71',
    color: 'white',
    padding: 12,
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 15,
  }
};
