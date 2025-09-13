import React, { useState } from 'react';
import styles from './Filters.module.css';
import Button from '../../../components/Button/Button';

export default function Filters({ brands, onChange }) {
  // локальний стан для полів
  const [localFilters, setLocalFilters] = useState({
    brand: '',
    rentalPrice: '',
    minMileage: '',
    maxMileage: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ['minMileage', 'maxMileage'];
    setLocalFilters((prev) => ({
      ...prev,
      [name]: numericFields.includes(name)
        ? (value === '' ? '' : Number(value))
        : value,
    }));
  };

  const handleSearch = () => {
    // передаємо наверх дані
    onChange(localFilters);

    // скидаємо поля після пошуку
    setLocalFilters({
      brand: '',
      rentalPrice: '',
      minMileage: '',
      maxMileage: '',
    });
  };

  return (
    <div className={styles.filters}>
      {/* Brand */}
      <div className={styles.group}>
        <label className={styles.label}>Car brand</label>
        <div className={styles.selectWrap}>
          <select
            name="brand"
            value={localFilters.brand}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">All Brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <span className={styles.caret} />
        </div>
      </div>

      {/* Price */}
      <div className={styles.group}>
        <label className={styles.label}>Price / hour</label>
        <div className={styles.selectWrap}>
          <select
            name="rentalPrice"
            value={localFilters.rentalPrice}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">Any Price</option>
            {[30, 40, 50, 60, 70, 80].map((p) => (
              <option key={p} value={p}>{p} $ / hour</option>
            ))}
          </select>
          <span className={styles.caret} />
        </div>
      </div>

      {/* Mileage */}
      <div className={styles.group}>
        <label className={styles.label}>Mileage (km)</label>
        <div className={styles.range}>
          <input
            type="number"
            name="minMileage"
            placeholder="From"
            value={localFilters.minMileage}
            onChange={handleChange}
            className={styles.rangeInput}
            min="0"
          />
          <span className={styles.divider}>|</span>
          <input
            type="number"
            name="maxMileage"
            placeholder="To"
            value={localFilters.maxMileage}
            onChange={handleChange}
            className={styles.rangeInput}
            min="0"
          />
        </div>
      </div>

      {/* Only Search button */}
      <div className={styles.actions}>
        <Button variant="primary" onClick={handleSearch}>Search</Button>
      </div>
    </div>
  );
}
