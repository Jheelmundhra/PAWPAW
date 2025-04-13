import { color } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled on the container
    setIsDarkMode(!!document.querySelector('.container.dark'));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log('Signup form submitted:', formData);
  };

  // Dark mode styles
  const darkStyles = {
    container: {
      backgroundColor: '#121212'
    },
    card: {
      background: '#1a1a1a',
      color: '#f0f0f0'
    },
    title: {
      color: '#f8ded0'
    },
    subtitle: {
      color: '#ccc'
    },
    label: {
      color: '#f8ded0'
    },
    input: {
      background: '#2d2d2d',
      borderColor: '#444',
      color: '#fff'
    },
    footer: {
      color: '#ccc'
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '70vh',
      backgroundColor: isDarkMode ? darkStyles.container.backgroundColor : '#f8f8f8',
      padding: '16px'
    }}>
      <div style={{
        background: isDarkMode ? darkStyles.card.background : 'white',
        padding: '24px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '320px',
        color: isDarkMode ? darkStyles.card.color : '#333'
      }}>
        <h1 style={{
          color: isDarkMode ? darkStyles.title.color : '#f09618',
          margin: '0 0 6px 0',
          fontSize: '20px',
          fontWeight: '600',
          textAlign: 'center',
        //   color:'#f09618',
        }}>Create Your Account</h1>
        
        <p style={{
          color: isDarkMode ? darkStyles.subtitle.color : '#666',
          margin: '0 0 20px 0',
          fontSize: '14px',
          textAlign: 'center'
        }}>Join our pet adoption community</p>
        
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '4px',
              color: isDarkMode ? darkStyles.label.color : '#333',
              fontSize: '14px',
              fontWeight: '500'
            }}>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid',
                borderColor: isDarkMode ? darkStyles.input.borderColor : '#ddd',
                borderRadius: '4px',
                fontSize: '14px',
                backgroundColor: isDarkMode ? darkStyles.input.background : 'white',
                color: isDarkMode ? darkStyles.input.color : '#333'
              }}
            />
          </div>
          
          {/* Email */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '4px',
              color: isDarkMode ? darkStyles.label.color : '#333',
              fontSize: '14px',
              fontWeight: '500'
            }}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid',
                borderColor: isDarkMode ? darkStyles.input.borderColor : '#ddd',
                borderRadius: '4px',
                fontSize: '14px',
                backgroundColor: isDarkMode ? darkStyles.input.background : 'white',
                color: isDarkMode ? darkStyles.input.color : '#333'
              }}
            />
          </div>
          
          {/* Password */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '4px',
              color: isDarkMode ? darkStyles.label.color : '#333',
              fontSize: '14px',
              fontWeight: '500'
            }}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid',
                borderColor: isDarkMode ? darkStyles.input.borderColor : '#ddd',
                borderRadius: '4px',
                fontSize: '14px',
                backgroundColor: isDarkMode ? darkStyles.input.background : 'white',
                color: isDarkMode ? darkStyles.input.color : '#333'
              }}
            />
          </div>
          
          {/* Confirm Password */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '4px',
              color: isDarkMode ? darkStyles.label.color : '#333',
              fontSize: '14px',
              fontWeight: '500'
            }}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid',
                borderColor: isDarkMode ? darkStyles.input.borderColor : '#ddd',
                borderRadius: '4px',
                fontSize: '14px',
                backgroundColor: isDarkMode ? darkStyles.input.background : 'white',
                color: isDarkMode ? darkStyles.input.color : '#333'
              }}
            />
          </div>
          
          <button type="submit" style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#f09618',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            marginBottom: '16px'
          }}>
            Sign Up
          </button>
        </form>
        
        <div style={{ 
          fontSize: '13px', 
          color: isDarkMode ? darkStyles.footer.color : '#666', 
          textAlign: 'center',
          lineHeight: '1.4'
        }}>
          <p style={{ margin: '0 0 4px 0' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ 
              color: '#f09618', 
              textDecoration: 'none', 
              fontWeight: '500' 
            }}>
              Log in
            </Link>
          </p>
          <p style={{ margin: '0' }}>
            <Link to="/forgot-password" style={{ 
              color: '#f09618', 
              textDecoration: 'none', 
              fontWeight: '500' 
            }}>
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;