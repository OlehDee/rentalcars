import React from 'react';

export default function Filters({ brands, filters, onChange }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  const handleReset = () => {
    onChange({ brand: '', price: '', mileage_from: '', mileage_to: '' });
  };

  return (
    <div className="filters" style={{ marginBottom: '20px' }}>
      <select
        name="brand"
        value={filters.brand}
        onChange={handleInputChange}
        style={{ marginRight: '10px' }}
      >
        <option value="">All Brands</option>
        {brands.map((b) => (
          <option key={b} value={b}>{b}</option>
        ))}
      </select>

      <input
        type="number"
        name="price"
        placeholder="Max price"
        value={filters.price}
        onChange={handleInputChange}
        style={{ marginRight: '10px' }}
      />

      <input
        type="number"
        name="mileage_from"
        placeholder="Mileage from"
        value={filters.mileage_from}
        onChange={handleInputChange}
        style={{ marginRight: '10px' }}
      />

      <input
        type="number"
        name="mileage_to"
        placeholder="Mileage to"
        value={filters.mileage_to}
        onChange={handleInputChange}
        style={{ marginRight: '10px' }}
      />

      <button onClick={handleReset} style={{ cursor: 'pointer' }}>
        Reset
      </button>
    </div>
  );
}
