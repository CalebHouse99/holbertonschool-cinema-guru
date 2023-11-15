import React, { useState, useEffect } from 'react';
import './App.css';
import Authentication from './routes/auth/Authentication';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUsername, setUserUsername] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      fetch('/api/auth/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      .then(response => response.json())
      .then(data => {
        setIsLoggedIn(true);
        setUserUsername(data.username);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }, []);

  if (isLoggedIn) {
    return <div>Dashboard: {userUsername} is logged in</div>;
  } else {
    return <Authentication setIsLoggedIn={setIsLoggedIn} setUserUsername={setUserUsername} />;
  }
}

export default App;
