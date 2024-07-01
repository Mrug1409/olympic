import React, { useState } from 'react';
import axios from 'axios'; 
import './login.css';

const Signin = () => {
  const [username, setUsername] = useState('username');
  const [password, setPassword] = useState('password');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }

    document.getElementById(name).style.fontFamily = "Montserrat black";
  };

  const setEmptyValue = (event) => {
    const { name } = event.target;
    document.getElementById(name).value = "";
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;

  
    if (value.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
    } else {
      setPasswordError('');
    }

    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

  
    if (username.trim() === '') {
      alert('Please enter a username.');
      return;
    }

    setLoading(true); 

    try {
      
      const response = await axios.post('https://api.example.com/login', {
        username,
        password
      });

      setLoading(false); 

      console.log('API Response:', response.data);
    } catch (error) {
      setLoading(false); 
      setError('Failed to authenticate. Please check your credentials.'); // Set error message
      console.error('API Error:', error);
    }
  };

  return (
    <div className="login">
      <h4>Sign In</h4>
      <form onSubmit={handleSubmit}>
        <div className="text_area">
          <input
            type="text"
            id="username"
            name="username"
            defaultValue={username}
            onChange={handleInputChange}
            onFocus={setEmptyValue}
            className="text_input"
          />
        </div>
        <div className="text_area">
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            onFocus={setEmptyValue}
            className="text_input"
          />
          {passwordError && <div className="error">{passwordError}</div>}
        </div>
        {error && <div className="error">{error}</div>} 
        <input
          type="submit"
          value={loading ? 'Signing In...' : 'SIGN IN'}
          className="btn"
          disabled={loading}
        />
      </form>
      <a className="link" href="/signup">Sign Up</a>
    </div>
  );
};

export default Signin;

