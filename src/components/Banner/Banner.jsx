import React from 'react';
import styles from './Banner.module.css';

export default function Banner() {
  return (
    <div className={styles.banner}>
      <h1 className={styles.title}>Find your perfect rental car</h1>
      <p className={styles.subtitle}>
        Reliable and budget-friendly rentals for any journey
      </p>
    </div>
  );
}
