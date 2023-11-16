import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Authentication from './routes/auth/Authentication';
import Dashboard from './routes/dashboard/Dashboard';

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
        if (data.username) {
          setIsLoggedIn(true);
          setUserUsername(data.username);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard userUsername={userUsername} /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Authentication setIsLoggedIn={setIsLoggedIn} setUserUsername={setUserUsername} />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
