'use client';
import React from 'react';
import '../stylesheet/sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">MyApp</h2>

      <nav className="nav-links">
        <a href="/home">🏠 Home</a>
        <a href="/profile">👤 Profile</a>
        <a href="/settings">⚙️ Settings</a>
      </nav>

      <a href="/logout" className="logout">🚪 Logout</a>
    </div>
  );
};

export default Sidebar;
