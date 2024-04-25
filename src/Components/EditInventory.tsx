// EditInventory.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export const EditInventory: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<'id'>(); 
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantityInStock: '',
    expirationDate: '',
  });

  useEffect(() => {
    const fetchInventoryItem = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/inventory/get/${id}`);
        if (response.data) {
          setFormData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching inventory item:', error);
      }
    };
    if (id) {
      fetchInventoryItem();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/inventory/update/${id}`, formData);
      navigate('/');
    } catch (error) {
      console.error('Error updating inventory item:', error);
    }
  };

  return (
    <div className="w-full p-6">
      <h2 className='text-slate-400 text-xl text-center p-5'>UPDATE INVENTORY</h2>
      <form onSubmit={handleSubmit} className='bg-slate-800 shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        
        <div className='mb-4'>
          <label className='block text-slate-200 text-sm font-bold mb-2'>Name:</label>
          <input 
            type="text" 
            name="name" 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className='mb-4'>
          <label className='block text-slate-200 text-sm font-bold mb-2'>Price:</label>
          <input 
             type="number" 
             name="price" 
             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
             value={formData.price} 
             onChange={handleChange} 
             required 
          />
        </div>

        <div className='mb-4'>
          <label className='block text-slate-200 text-sm font-bold mb-2'>Quantity in Stock:</label>
          <input 
             type="number" 
             name="quantityInStock" 
             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
             value={formData.quantityInStock} 
             onChange={handleChange} 
             required 
          />
        </div>

        <div className='mb-4'>
          <label className='block text-slate-200 text-sm font-bold mb-2'>Expiration Date:</label>
          <input 
            type="date" 
            name="expirationDate" 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            value={formData.expirationDate} 
            onChange={handleChange} 
            required 
          />
        </div>

        <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' type="submit">Save Changes</button>
        <button onClick={() => navigate("/")} className='bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded m-4' type="button">Cancel</button>
    
      </form>
    </div>
  );
};

export default EditInventory;
