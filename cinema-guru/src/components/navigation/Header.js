import React from 'react';
import './navigation.css';

const Header = ({ userUsername, setIsLoggedIn }) => {
  const logout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };

  return (
    <nav className="header-nav">
      <img src="https://picsum.photos/100/100" alt="User Avatar" />
      <p>Welcome, {userUsername}</p>
      <span className="logout-span" onClick={logout}>
        {/* Icon would go here if you have one */} Logout
      </span>
    </nav>
  );
};

export default Header;
