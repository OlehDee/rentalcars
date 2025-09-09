// src/components/Banner.jsx
import React from 'react';

export default function Banner() {
  return (
    <div
      style={{
        backgroundImage: 'url(https://ac.goit.global/car-rental-task/banner.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        textShadow: '1px 1px 5px rgba(0,0,0,0.7)',
        borderRadius: '8px',
      }}
    >
      <h1 style={{ fontSize: '48px', margin: 0 }}>Welcome to RentalCar</h1>
      <p style={{ fontSize: '20px', marginTop: '10px' }}>
        Find your perfect car for any journey
      </p>
    </div>
  );
}
