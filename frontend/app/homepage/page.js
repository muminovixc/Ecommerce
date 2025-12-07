'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar';
import '../../stylesheet/Homepage.css';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:5000/user', {
          method: 'GET',
          credentials: 'include', // šalje cookie!!!
        });

        if (!res.ok) {
          setUser(null);
        } else {
            console.log(res);
          const data = await res.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Greška kod fetcha usera:", error);
        setUser(null);
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  // Loading
  if (loading) {
    return <div className="home-container">Loading...</div>;
  }

  // Ako nema usera → nema tokena
  if (!user) {
    return <div className="home-container">ne mozeeee</div>;
  }

  // Ako postoji user → prikaži home
  return (
    <div className="home-container">
      <Sidebar />

      <div className="content">
        <h1>Welcome, {user.name || "User"}!</h1>
        <p>This is your homepage dashboard.</p>

        <div className="cards">
          <div className="card">
            <h3>Card 1</h3>
            <p>Dashboard information goes here.</p>
          </div>

          <div className="card">
            <h3>Card 2</h3>
            <p>More content can be added here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
