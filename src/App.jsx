import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages//Home/Home';
import Catalog from './pages/Catalog/Catalog';
import VehicleDetails from './pages/VehicleDetails/VehicleDetails';
import Header from './components/Header/Header';

function App() {
  return (
    <Router>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<VehicleDetails />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
