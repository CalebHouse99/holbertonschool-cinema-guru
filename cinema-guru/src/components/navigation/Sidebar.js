import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './navigation.css';
import Activity from '../Activity';

const SideBar = () => {
  const [selected, setSelected] = useState('home');
  const [small, setSmall] = useState(true);
  const [activities, setActivities] = useState([]);
  const [showActivities, setShowActivities] = useState(false);
  const navigate = useNavigate();

  const setPage = (pageName) => {
    setSelected(pageName);
    navigate(`/${pageName}`);
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('/api/activity');
        setActivities(response.data);
      } catch (error) {
        console.error('Error fetching activities', error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <nav className="sidebar-container">
      <ul className="navigation-list">
        <li className={selected === 'home' ? 'selected' : ''} onClick={() => setPage('home')}>Home</li>
        <li className={selected === 'favorites' ? 'selected' : ''} onClick={() => setPage('favorites')}>Favorites</li>
        <li className={selected === 'watchlater' ? 'selected' : ''} onClick={() => setPage('watchlater')}>Watch Later</li>
      </ul>
      {showActivities && (
        <ul className="activity-list">
          {activities.slice(0, 10).map((activity, index) => (
            <Activity key={index} activity={activity} />
          ))}
        </ul>
      )}
    </nav>
  );
};

export default SideBar;
