import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../features/favorites/favoritesSlice';
import { selectFavorites } from '../../features/vehicles/selectors';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; // контур і заповнене сердечко
import styles from './VehicleCard.module.css';
import Button from '../Button/Button';

export default function VehicleCard({ car }) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  const isFav = favorites.some((fav) => fav.id === car.id);

  const toggleFavorite = () => {
    if (isFav) {
      dispatch(removeFavorite(car.id));
    } else {
      dispatch(addFavorite(car));
    }
  };

  return (
    <div className={styles.card}>
      {/* Сердечко у правому верхньому куті */}
      <div className={styles.favorite} onClick={toggleFavorite}>
        {isFav ? (
          <AiFillHeart className={styles.heartFilled} />
        ) : (
          <AiOutlineHeart className={styles.heartOutline} />
        )}
      </div>

      <img src={car.img} alt={car.model} className={styles.image} />

      <h3>{car.brand} {car.model}</h3>
      <p>Mileage: {car.mileage.toLocaleString()} km</p>
      <p>Price: ${car.rentalPrice} / day</p>

      <Button to={`/catalog/${car.id}`}>Read More</Button>

    </div>
  );
}
