import React from 'react';
import styles from './Filters.module.css';
import Button from '../../../components/Button/Button';

export default function Filters({ brands, filters, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
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
      <div className={styles.group}>
        <label className={styles.label}>Car brand</label>
        <div className={styles.selectWrap}>
          <select
            name="brand"
            value={filters.brand}
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
            value={filters.rentalPrice}
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
            value={filters.minMileage}
            onChange={handleChange}
            className={styles.rangeInput}
            min="0"
          />
          <span className={styles.divider}>|</span>
          <input
            type="number"
            name="maxMileage"
            placeholder="To"
            value={filters.maxMileage}
            onChange={handleChange}
            className={styles.rangeInput}
            min="0"
          />
        </div>
      </div>

      {/* Reset */}
      <div className={styles.actions}>
        <Button variant="secondary" onClick={handleReset}>Reset</Button>
      </div>
    </div>
  );
}
