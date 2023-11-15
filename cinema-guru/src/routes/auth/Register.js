import React from 'react';
import './auth.css';

const Register = ({ username, password, setUsername, setPassword }) => {
  return (
    <form className="auth-form">
      <input 
        className="auth-input" 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Username" 
      />
      <input 
        className="auth-input" 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
      />
      <button className="auth-button" type="submit">Register</button>
    </form>
  );
};

export default Register;