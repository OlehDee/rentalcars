// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../components/Banner';

export default function Home() {
  const navigate = useNavigate();

  const handleViewCatalog = () => {
    navigate('/catalog');
  };

  return (
    <div className="home-page" style={{ padding: '20px', textAlign: 'center' }}>
      {/* Банер */}
      <Banner
        title="Welcome to Our Car Rental Service"
        subtitle="Find your perfect car and rent it with ease!"
        imgUrl="https://ac.goit.global/car-rental-task/9582-ai.jpg"
      />

      {/* Кнопка для переходу до каталогу */}
      <button
        onClick={handleViewCatalog}
        style={{
          marginTop: '30px',
          padding: '12px 24px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '6px'
        }}
      >
        View Catalog
      </button>
    </div>
  );
}
