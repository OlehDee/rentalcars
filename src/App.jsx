import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import VehicleDetails from './pages/VehicleDetails';


function App() {
  return (
    <Router>
      <header style={{ padding: '10px 20px', backgroundColor: '#f5f5f5', display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
        <Link to="/catalog" style={{ textDecoration: 'none' }}>Catalog</Link>
      </header>

      <main style={{ padding: '20px' }}>
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
