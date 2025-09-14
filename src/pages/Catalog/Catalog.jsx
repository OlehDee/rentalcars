
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchVehicles,
  fetchBrands,
  resetVehicles,
} from '../../features/vehicles/vehiclesSlice';

import Filters from '../../features/vehicles/Filters/Filters';
import VehiclesList from '../../features/vehicles/VehiclesList/VehiclesList';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';

import styles from './Catalog.module.css';

export default function Catalog() {
  const dispatch = useDispatch();
  const { items, page, totalPages, isLoading, error, brands } = useSelector(
    (state) => state.vehicles
  );

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

  useEffect(() => {
    dispatch(resetVehicles());
    setReachedEnd(false);
    dispatch(fetchVehicles({ ...filters, page: 1, limit: 12, append: false }));
  }, [dispatch, filters]);

  const handleFilterChange = (newFilters) => setFilters(newFilters);

  const handleLoadMore = () => {
    if (!isLoading && page < totalPages) {
      dispatch(
        fetchVehicles({ ...filters, page: page + 1, limit: 6, append: true })
      );
    } else if (page >= totalPages) {
      setReachedEnd(true);
    }
  };

  return (
    <div className={styles.wrap}>
      <div className="container">
        <div className={styles.catalogPage}>

          <Filters brands={brands} filters={filters} onChange={handleFilterChange} />

          {isLoading && items.length === 0 ? (
            <Loader />
          ) : items.length === 0 ? (
            <p className={styles.empty}>No cars found matching your criteria.</p>
          ) : (
            <>
              <VehiclesList vehicles={items} />

              {error && <p className={styles.error}>Error: {String(error)}</p>}

              {page < totalPages && (
                <div className={styles.actions}>
                  <Button
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    variant="transparent"
                  >
                    {isLoading ? 'Loading...' : 'Load More'}
                  </Button>
                </div>
              )}

              {reachedEnd && (
                <p className={styles.endMessage}>
                  You have reached the end of the list.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
