
import React from 'react';
import styles from './Filters.module.css';
import Button from '../../../components/Button/Button';

export default function Filters({ brands, filters, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    // minMileage та maxMileage конвертуємо у числа, решта лишаються рядками
    const numericFields = ['minMileage', 'maxMileage'];
    const next = {
      ...filters,
      [name]: numericFields.includes(name)
        ? (value === '' ? '' : Number(value))
        : value,
    };

    onChange(next);
  };

  const handleReset = () => {
    onChange({ brand: '', rentalPrice: '', minMileage: '', maxMileage: '' });
  };

  return (
    <div className={styles.filters}>
      {/* Brand */}
      <select
        name="brand"
        value={filters.brand}
        onChange={handleChange}
        className={styles.select}
      >
        <option value="">All Brands</option>
        {brands.map((brand) => (
          <option key={brand} value={brand}>{brand}</option>
        ))}
      </select>

      {/* Rental Price */}
      <select
        name="rentalPrice"
        value={filters.rentalPrice}
        onChange={handleChange}
        className={styles.select}
      >
        <option value="">Any Price</option>
        <option value="30">30 $ / hour</option>
        <option value="40">40 $ / hour</option>
        <option value="50">50 $ / hour</option>
        <option value="60">60 $ / hour</option>
        <option value="70">70 $ / hour</option>
        <option value="80">80 $ / hour</option>
      </select>

      {/* Mileage from */}
      <input
        type="number"
        name="minMileage"
        placeholder="Mileage from"
        value={filters.minMileage}
        onChange={handleChange}
        className={styles.input}
        min="0"
      />

      {/* Mileage to */}
      <input
        type="number"
        name="maxMileage"
        placeholder="Mileage to"
        value={filters.maxMileage}
        onChange={handleChange}
        className={styles.input}
        min="0"
      />

      <Button variant="secondary" onClick={handleReset}>Reset</Button>

    </div>
  );
}
