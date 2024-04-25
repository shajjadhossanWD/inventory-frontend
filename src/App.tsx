import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditInventory from './Components/EditInventory';
import InventoryTable from './Components/InventoryTable';
import CreateInventory from './Components/CreateInventory';
import './App.css'

const App: React.FC = () => {
  return (
    <div className='divBackground'>
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<InventoryTable />} />
          <Route path="/create-inventory" element={<CreateInventory />} />
          <Route path="/edit-inventory/:id" element={<EditInventory />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
};

export default App;