import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type InventoryItem = {
  _id: string;
  name: string;
  price: number;
  quantityInStock: number;
  expirationDate?: string;
};

export const InventoryTable: React.FC = () => {
  const navigate = useNavigate();
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const { data } = await axios.get<{ data: InventoryItem[] }>('http://localhost:3000/inventory/get/all');
        setInventoryData(data.data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      }
    };
    fetchInventoryData();
  }, []);

  const handleAddInventory = () => {
    navigate('/create-inventory'); 
  };

  const handleEdit = (id: string) => {
    navigate(`/edit-inventory/${id}`);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this inventory item?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/inventory/delete/${id}`);
        const updatedInventoryData = inventoryData.filter(item => item._id !== id);
        setInventoryData(updatedInventoryData);
      } catch (error) {
        console.error('Error deleting inventory item:', error);
      }
    }
  };

  return (
    <div>
      <button onClick={handleAddInventory} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mb-2">
        Add Inventory
      </button>
      <table className="min-w-full border-separate border border-slate-500">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity in Stock</th>
            <th>Expiration Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.map((item) => (
            <tr key={item._id}>
              <td className='text-dark'>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantityInStock}</td>
              <td>{item.expirationDate}</td>
              <td>
                <button onClick={() => handleEdit(item._id)} className="text-blue-500 hover:text-blue-700 mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;