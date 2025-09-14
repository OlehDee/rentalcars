import React from 'react';
import styles from './Home.module.css';
import Button from '../../components/Button/Button';
import '../../main.css';

export default function Home() {
  return (
    <section className={styles.home}>
      <div className={styles.content}>
      <h1>Find your perfect rental car</h1>
      <p>Reliable and budget-friendly rentals for any journey</p>
      
        <Button to={`/catalog`}>View Catalog</Button>
        </div>
    </section>
  );
}
