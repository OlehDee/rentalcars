import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../features/favorites/favoritesSlice';
import { selectFavorites } from '../../features/vehicles/selectors';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import styles from './VehicleCard.module.css';

export default function VehicleCard({ car }) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFav = favorites.some((fav) => fav.id === car.id);

  const toggleFavorite = () => {
    if (isFav) dispatch(removeFavorite(car.id));
    else dispatch(addFavorite(car));
  };

  // Дістаємо місто та країну з адреси (останні 2 частини)
  let city = '', country = '';
  if (car.address) {
    const parts = car.address.split(',').map(s => s.trim());
    const last = parts.slice(-2);
    city = last[0] || '';
    country = last[1] || '';
  }

  return (
    <div className={styles.card}>
      {/* Сердечко */}
      <button
        type="button"
        className={styles.favorite}
        onClick={toggleFavorite}
        aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFav ? (
          <AiFillHeart className={styles.heartFilled} />
        ) : (
          <AiOutlineHeart className={styles.heartOutline} />
        )}
      </button>

      {/* Фото */}
      <img src={car.img} alt={car.model} className={styles.image} />

      {/* Текстова частина */}
      <div className={styles.body}>
        <div className={styles.headerRow}>
          <h3 className={styles.title}>
            {car.brand}{' '}
            <Link to={`/catalog/${car.id}`} className={styles.modelLink}>
              {car.model}
            </Link>
            , <span className={styles.year}>{car.year}</span>
          </h3>

          <div className={styles.price}>${car.rentalPrice}</div>
        </div>

        <div className={styles.metaRow}>
          {city && <span className={styles.metaItem}>{city}</span>}
          {country && (
            <>
              <span className={styles.separator} />
              <span className={styles.metaItem}>{country}</span>
            </>
          )}
          {car.rentalCompany && (
            <>
              <span className={styles.separator} />
              <span className={styles.metaItem}>{car.rentalCompany}</span>
            </>
          )}
        </div>

        <div className={styles.metaRow}>
          {car.type && <span className={styles.metaItem}>{car.type}</span>}
          <span className={styles.separator} />
          <span className={styles.metaItem}>
            {Number(car.mileage).toLocaleString('uk-UA')} km
          </span>
        </div>

        <Link to={`/catalog/${car.id}`} className={styles.cta}>
          Read more
        </Link>
      </div>
    </div>
  );
}
