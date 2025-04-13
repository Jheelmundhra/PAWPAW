import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';


const Login = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const success = await login(email, password);
      if (success) {
        onClose();
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  // Inline styles that match your existing design
  const styles = {
    modal: {
      position: 'relative',
      background: '#fff',
      padding: '30px',
      borderRadius: '12px',
      width: '100%',
      maxWidth: '400px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      margin: '0 auto'
    },
    closeBtn: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: '#B36A63'
    },
    header: {
      textAlign: 'center',
      marginBottom: '25px'
    },
    title: {
      color: '#f09618',
      marginBottom: '8px'
    },
    subtitle: {
      color: '#666'
    },
    error: {
      color: '#ff6b6b',
      textAlign: 'center',
      marginBottom: '15px',
      padding: '10px',
      background: '#ffebee',
      borderRadius: '6px'
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      color: '#333',
      fontWeight: '500'
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '16px'
    },
    submitBtn: {
      width: '100%',
      padding: '14px',
      background: '#f09618',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '10px'
    },
    footer: {
      textAlign: 'center',
      marginTop: '20px',
      color: '#666'
    },
    link: {
      color: '#f09618',
      textDecoration: 'none'
    }
  };

  // Dark mode adjustments
  if (document.querySelector('.container.dark')) {
    styles.modal.background = '#1a1a1a';
    styles.title.color = '#f8ded0';
    styles.subtitle.color = '#ccc';
    styles.label.color = '#f8ded0';
    styles.input.background = '#2d2d2d';
    styles.input.borderColor = '#444';
    styles.input.color = '#fff';
    styles.footer.color = '#ccc';
  }

  return (
    <div style={styles.modal}>
      <button style={styles.closeBtn} onClick={onClose}>×</button>
      
      <div style={styles.header}>
        <h2 style={styles.title}>Welcome Back!</h2>
        <p style={styles.subtitle}>Log in to continue your pet adoption journey</p>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.submitBtn}>
          Log In
        </button>
      </form>

      <div style={styles.footer}>
        <p>Don't have an account? <Link to="#" onClick={() => { onClose(); }} style={styles.link}>Sign up</Link></p>
        <p><Link to="#" style={styles.link}>Forgot password?</Link></p>
      </div>
    </div>
  );
};

export default Login;