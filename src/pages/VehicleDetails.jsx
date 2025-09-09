import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVehicleById, clearCurrentCar } from '../features/vehicles/vehiclesSlice';
import Loader from '../components/Loader';

export default function VehicleDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const car = useSelector((state) => state.vehicles.currentCar);
  const isLoading = useSelector((state) => state.vehicles.isLoading);
  const error = useSelector((state) => state.vehicles.error);

  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = car && favorites.some((fav) => fav.id === car.id);

  const [rentalForm, setRentalForm] = useState({
    name: '',
    email: '',
    phone: '',
    rentalDays: 1,
  });

  useEffect(() => {
    dispatch(fetchVehicleById(id));
    return () => dispatch(clearCurrentCar());
  }, [dispatch, id]);

  const handleChange = (e) => {
    setRentalForm({ ...rentalForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (car) {
      alert(`Successfully rented ${car.brand} ${car.model} for ${rentalForm.rentalDays} days!`);
      setRentalForm({ name: '', email: '', phone: '', rentalDays: 1 });
    }
  };


  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  if (!car) return null;

  return (
    <div className="vehicle-details" style={{ padding: '20px' }}>
      <h1>{car.brand} {car.model} ({car.year})</h1>
      <img src={car.img} alt={car.model} style={{ width: '400px', marginBottom: '20px' }} />


      <p>{car.description}</p>
      <ul>
        <li>Fuel Consumption: {car.fuelConsumption} L/100km</li>
        <li>Engine: {car.engineSize}</li>
        <li>Mileage: {car.mileage.toLocaleString()} km</li>
      </ul>

      <h3>Accessories:</h3>
      <ul>{car.accessories.map((acc) => <li key={acc}>{acc}</li>)}</ul>

      <h3>Functionalities:</h3>
      <ul>{car.functionalities.map((func) => <li key={func}>{func}</li>)}</ul>

      <h3>Rental Price: ${car.rentalPrice} / day</h3>

      <h3>Rental Conditions:</h3>
      <ul>{car.rentalConditions.map((cond) => <li key={cond}>{cond}</li>)}</ul>

      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <h2>Rent this car</h2>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={rentalForm.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={rentalForm.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={rentalForm.phone}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="rentalDays"
          placeholder="Number of days"
          min="1"
          value={rentalForm.rentalDays}
          onChange={handleChange}
          required
        />
        <button type="submit">Rent Now</button>
      </form>
    </div>
  );
}
