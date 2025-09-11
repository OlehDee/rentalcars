import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          {/* Логотип */}
          <div className={styles.logo}>
            <Link to="/" className={styles.logoLink}>
              <span className={styles.logoRental}>Rental</span>
              <span className={styles.logoCar}>Car</span>
            </Link>
          </div>

          {/* Навігація */}
          <nav className={styles.nav}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/catalog"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Catalog
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
