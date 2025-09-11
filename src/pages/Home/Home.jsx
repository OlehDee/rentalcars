import React from 'react';
import styles from './Home.module.css';
import Button from '../../components/Button/Button';

export default function Home() {
  return (
    <div className={styles.home}>
      <h1>Find your perfect rental car</h1>
      <p>Reliable and budget-friendly rentals for any journey</p>
      
      <Button to={`/catalog`}>Go to Catalog</Button>
    </div>
  );
}
