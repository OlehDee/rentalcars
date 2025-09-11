import React from 'react';
import VehicleCard from '../../../components/VehicleCard/VehicleCard';
import styles from './VehiclesList.module.css';

export default function VehiclesList({ vehicles }) {
  return (
    <div className={styles.vehiclesList}>
      {vehicles.map((car) => (
        <VehicleCard key={car.id} car={car} />
      ))}
    </div>
  );
}
