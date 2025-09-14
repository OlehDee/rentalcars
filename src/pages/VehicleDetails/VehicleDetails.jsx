import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchVehicleById, clearCurrentCar } from '../../features/vehicles/vehiclesSlice';
import Loader from '../../components/Loader/Loader';
import styles from './VehicleDetails.module.css';
import Button from '../../components/Button/Button';

import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCarSide,
  FaGasPump,
  FaCogs,
} from 'react-icons/fa';
 import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
export default function VehicleDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentCar, isLoading, error } = useSelector((state) => state.vehicles);

  // ---- Форма бронювання ----
  const [rentalForm, setRentalForm] = useState({
    name: '',
    email: '',
    date: '',
    comment: '',
  });

  useEffect(() => {
    dispatch(fetchVehicleById(id));
    return () => dispatch(clearCurrentCar());
  }, [dispatch, id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setRentalForm((prev) => ({ ...prev, [name]: value }));
  };

  const openNativeDatePicker = () => {
    const el = document.getElementById('hiddenDateInput');
    if (el) el.showPicker ? el.showPicker() : el.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Successfully booked ${currentCar.brand} ${currentCar.model} on ${rentalForm.date || 'selected date'}!`);
    setRentalForm({ name: '', email: '', date: '', comment: '' });
  };

  if (isLoading) return <Loader />;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!currentCar) return null;

  // Дістати місто та країну з адреси (останні 2 частини)
  let city = '', country = '';
  if (currentCar.address) {
    const parts = currentCar.address.split(',').map(s => s.trim());
    [city, country] = parts.slice(-2);
  }

  const accessoriesAndFuncs = [
    ...(currentCar.accessories || []),
    ...(currentCar.functionalities || []),
  ];

  return (
    <div className={styles.details}>
      {/* Ліва колонка: фото + форма */}
      <div className={styles.left}>
        <img
          src={currentCar.img}
          alt={currentCar.model}
          className={styles.image}
        />

        <form className={styles.form} onSubmit={handleSubmit}>
          <h3 className={styles.formTitle}>Book your car now</h3>
          <p className={styles.formSubtitle}>
            Stay connected! We are always ready to help you.
          </p>

          <input
            type="text"
            name="name"
            placeholder="Name*"
            required
            value={rentalForm.name}
            onChange={handleFormChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email*"
            required
            value={rentalForm.email}
            onChange={handleFormChange}
          />

          {/* Кастомне поле дати */}
          <div className={styles.dateWrapper}>
            <input
              type="text"
              name="dateText"
              placeholder="Booking date"
              readOnly
              value={rentalForm.date || ''}
              onClick={openNativeDatePicker}
            />
            <input
              id="hiddenDateInput"
              type="date"
              onChange={(e) =>
                setRentalForm((prev) => ({ ...prev, date: e.target.value }))
              }
            />
          </div>

          <textarea
            name="comment"
            placeholder="Comment"
            rows="3"
            value={rentalForm.comment}
            onChange={handleFormChange}
          />

          <Button type="submit">Send</Button>
        </form>
      </div>

      {/* Права колонка */}
      <div className={styles.right}>
        {/* Верхній блок з назвою, роком і Id*/}
        <div className={styles.headerRow}>
         <div className={styles.titleWrap}> 
          <h2 className={styles.title}>
            {currentCar.brand} {currentCar.model}, {currentCar.year}
          </h2>
          <div className={styles.carId}>Id: {currentCar.id}</div>
          </div>
        </div>

        {/* Рядок: ліворуч локація, праворуч пробіг */}
        <div className={styles.metaRow}>
          <div className={styles.location}>
            <FaMapMarkerAlt className={styles.locIcon} />
            <span>{city}{city && country ? ', ' : ''}{country}</span>
            <span>Mileage:&nbsp;</span>
            <strong>{Number(currentCar.mileage).toLocaleString()} km</strong>
          </div>
        </div>

        <div className={styles.priceRow}>
          <span className={styles.priceValue}>
            ${currentCar.rentalPrice} 
          </span>
        </div>

        <div className={styles.description}>
          <span className={styles.description}>
            {currentCar.description} 
          </span>
        </div>


        
        <div className={styles.bottomSection}>

        {/* Rental Conditions */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Rental Conditions</h3>
          <ul className={styles.bulletList}>
            {(currentCar.rentalConditions || []).map((cond, i) => (
              <li key={i} className={styles.bulletItem}>
                <IoIosCheckmarkCircleOutline  className={styles.checkIcon} /> {cond}
              </li>
            ))}
          </ul>
        </div>

        {/* Car Specifications */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Car Specifications</h3>
          <ul className={styles.specList}>
            <li className={styles.specItem}>
              <FaCalendarAlt /> Year: {currentCar.year}
            </li>
            <li className={styles.specItem}>
              <FaCarSide /> Type: {currentCar.type}
            </li>
            <li className={styles.specItem}>
              <FaGasPump /> Fuel consumption: {currentCar.fuelConsumption} L/100km
            </li>
            <li className={styles.specItem}>
              <FaCogs /> Engine: {currentCar.engineSize}
            </li>
          </ul>
        </div>

        {/* Accessories and functionalities */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Accessories and functionalities</h3>
          <ul className={styles.bulletList}>
            {accessoriesAndFuncs.map((item, i) => (
              <li key={i} className={styles.bulletItem}>
                <IoIosCheckmarkCircleOutline  className={styles.checkIcon} /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
    </div>
  );
}
