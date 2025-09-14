
import React from 'react';
import VehicleCard from '../../../components/VehicleCard/VehicleCard';
import styles from './VehiclesList.module.css';

export default function VehiclesList({ vehicles = [] }) {
  return (
    <div className={styles.list}>
      {vehicles.map((car) => (
        <div key={car.id} className={styles.item}>
          <VehicleCard car={car} />
        </div>
      ))}
    </div>
  );
}
