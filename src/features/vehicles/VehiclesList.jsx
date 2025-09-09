import React from 'react';
import VehicleCard from '../../components/VehicleCard';

export default function VehiclesList({ vehicles }) {
  if (!vehicles || vehicles.length === 0) return <p>No cars found.</p>;

  return (
    <div className="vehicles-list" style={{ display: 'grid', gap: '20px' }}>
      {vehicles.map((car) => (
        <VehicleCard key={car.id} car={car} />
      ))}
    </div>
  );
}
