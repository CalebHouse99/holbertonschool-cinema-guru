import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import Login from './Login';
import Register from './Register';
import './auth.css';

const Authentication = ({ setIsLoggedIn, setUserUsername }) => {
  const [_switch, setSwitch] = useState(true);
  const [headerText, setHeaderText] = useState("Sign in with your account");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Use useNavigate to get the navigation function
  const navigate = useNavigate();

  const handleSignInClick = () => {
    setSwitch(true);
    setHeaderText("Sign in with your account");
  };

  const handleSignUpClick = () => {
    setSwitch(false);
    setHeaderText("Create a new account");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = _switch ? '/api/auth/login' : '/api/auth/register';
    try {
      const response = await axios.post(`http://localhost:8000${url}`, { username, password });
      localStorage.setItem('accessToken', response.data.accessToken);
      setUserUsername(username);
      setIsLoggedIn(true);
      navigate('/dashboard'); // Use navigate to redirect
    } catch (error) {
      console.error('An error occurred during the auth process:', error);
    }
  };

  return (
    <div className="auth-container">
      <button className={`auth-header-btn ${_switch ? 'active' : ''}`} onClick={handleSignInClick}>Sign In</button>
      <button className={`auth-header-btn ${!_switch ? 'active' : ''}`} onClick={handleSignUpClick}>Sign Up</button>
      <h3>{headerText}</h3>
      <form onSubmit={handleSubmit}>
        {_switch ? (
          <Login 
            username={username} 
            password={password} 
            setUsername={setUsername} 
            setPassword={setPassword} 
          />
        ) : (
          <Register 
            username={username} 
            password={password} 
            setUsername={setUsername} 
            setPassword={setPassword} 
          />
        )}
      </form>
    </div>
  );
};

export default Authentication;
