import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import './auth.css';

const Authentication = ({ setIsLoggedIn, setUserUsername }) => {
  const [_switch, setSwitch] = useState(true);
  const [headerText, setHeaderText] = useState("Sign in with your account"); // New state for header text
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignInClick = () => {
    setSwitch(true);
    setHeaderText("Sign in with your account");
  };

  const handleSignUpClick = () => {
    setSwitch(false);
    setHeaderText("Create a new account");
  };

  return (
    <div className="auth-container">
      <button className={`auth-header-btn ${_switch ? 'active' : ''}`} onClick={handleSignInClick}>Sign In</button>
      <button className={`auth-header-btn ${!_switch ? 'active' : ''}`} onClick={handleSignUpClick}>Sign Up</button>
      <h3>{headerText}</h3>
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
    </div>
  );
};

export default Authentication;
