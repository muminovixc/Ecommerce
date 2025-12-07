"use client";

import React, { useState, useEffect } from 'react';

const About = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const provjeriBazu = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Sada koristite /baza rutu
      const response = await fetch('http://localhost:5000/provjera/baza');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || `HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError('Greška: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    provjeriBazu();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Provjera baze podataka</h2>
      
      <button 
        onClick={provjeriBazu} 
        disabled={loading}
        style={{ marginBottom: '20px', padding: '10px' }}
      >
        {loading ? 'Provjeravam...' : 'Provjeri bazu'}
      </button>
      
      {loading && <p>Učitavanje...</p>}
      
      {error && (
        <div style={{ color: 'red' }}>
          <p><strong>Greška:</strong> {error}</p>
        </div>
      )}
      
      {data && (
        <div style={{ color: 'green' }}>
          <p><strong>Status:</strong> {data.status}</p>
          <p><strong>Verzija baze:</strong> {data.version}</p>
          <p><strong>Poruka:</strong> {data.message}</p>
        </div>
      )}
    </div>
  );
};

export default About;