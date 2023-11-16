import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from '../../components/navigation/Header';
import SideBar from '../../components/navigation/Sidebar';
import './dashboard.css';

const HomePage = () => <div>Home Page</div>;
const Favorites = () => <div>Favorites</div>;
const WatchLater = () => <div>Watch Later</div>;

const Dashboard = ({ userUsername, setIsLoggedIn }) => {
  return (
    <BrowserRouter>
      <div className="dashboard-container">
        <Header userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
        <SideBar />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/watchlater" element={<WatchLater />} />
          <Route path="*" element={<Navigate replace to="/home" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Dashboard;
