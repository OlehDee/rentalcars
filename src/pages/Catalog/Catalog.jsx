// src/pages/Catalog.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVehicles, fetchBrands, resetVehicles } from '../../features/vehicles/vehiclesSlice';
import Filters from '../../features/vehicles/Filters/Filters';
import VehiclesList from '../../features/vehicles/VehiclesList/VehiclesList';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';

export default function Catalog() {
  const dispatch = useDispatch();
  const { items, page, totalPages, isLoading, error, brands } = useSelector((state) => state.vehicles);

  const [filters, setFilters] = useState({
    brand: '',
    rentalPrice: '',
    minMileage: '',
    maxMileage: '',
  });

  const [reachedEnd, setReachedEnd] = useState(false);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  // Кожна зміна фільтрів → новий запит з page=1
  useEffect(() => {
    dispatch(resetVehicles());
    setReachedEnd(false);
    dispatch(fetchVehicles({ ...filters, page: 1, limit: 5, append: false }));
  }, [dispatch, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleLoadMore = () => {
    if (!isLoading && page < totalPages) {
      dispatch(fetchVehicles({ ...filters, page: page + 1, limit: 5, append: true }));
    } else if (page >= totalPages) {
      setReachedEnd(true);
    }
  };

  return (
    <div className="catalog-page" style={{ padding: '20px' }}>
      <h1>Catalog of Cars</h1>

      <Filters brands={brands} filters={filters} onChange={handleFilterChange} />

      {items.length === 0 && isLoading ? (
        <Loader />
      ) : (
        <>
          <VehiclesList vehicles={items} />
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}

          {page < totalPages && (
            <Button
  onClick={handleLoadMore}
  disabled={isLoading}
  variant="transparent"
>
  {isLoading ? 'Loading...' : 'Load More'}
</Button>
          )}

          {reachedEnd && (
            <p style={{ marginTop: '20px', textAlign: 'center' }}>
              You have reached the end of the list.
            </p>
          )}
        </>
      )}
    </div>
  );
}
