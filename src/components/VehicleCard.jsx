import React from 'react';
import { Link } from 'react-router-dom';

export default function VehicleCard({ car }) {
  return (
    <div
      className="vehicle-card"
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <img
        src={car.img}
        alt={car.model}
        style={{ width: '100%', borderRadius: '8px' }}
      />
      <h3>{car.brand} {car.model}</h3>
      <p>Mileage: {car.mileage.toLocaleString()} km</p>
      <p>Price: ${car.rentalPrice} / day</p>

      <Link
        to={`/catalog/${car.id}`}
        style={{
          textDecoration: 'none',
          color: 'white',
          background: '#007bff',
          padding: '8px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: 'auto',
          display: 'inline-block',
          textAlign: 'center',
        }}
      >
        Read More
      </Link>
    </div>
  );
}
