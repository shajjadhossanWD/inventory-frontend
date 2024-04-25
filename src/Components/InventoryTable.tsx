import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';

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
  const [globalFilter, setGlobalFilter] = useState('');
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable>(null);

  
  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const { data } = await axios.get<{ data: InventoryItem[] }>('http://localhost:3000/inventory/get/all');
        setInventoryData(data.data);
      } catch (error) {
        console.error('Error fetching inventory data:', error);
        toast.current?.show({ severity: 'error', summary: 'Fetching Error', detail: 'Error fetching inventory data', life: 3000 });
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
    try {
      await axios.delete(`http://localhost:3000/inventory/delete/${id}`);
      const updatedInventoryData = inventoryData.filter(item => item._id !== id);
      setInventoryData(updatedInventoryData);
      toast.current?.show({ severity: 'success', summary: 'Deletion Successful', detail: 'Item has been deleted', life: 3000 });
    } catch (error) {
      console.error('Error deleting inventory item:', error);
      toast.current?.show({ severity: 'error', summary: 'Deletion Error', detail: 'Error deleting inventory item', life: 3000 });
    }
  };

  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  const actionBodyTemplate = (rowData: InventoryItem) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => handleEdit(rowData._id)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => handleDelete(rowData._id)} />
      </React.Fragment>
    );
  };

  const header = (
    <div className=''>
      <Button label="Add Inventory" icon="pi pi-plus" onClick={handleAddInventory} className="p-button-success mb-4" />
      <div className="flex justify-between items-center">
        <span className="p-input-icon-left">
          <InputText value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Keyword Search" />
        </span>
        <Button label="Export to CSV" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />

      </div>
    </div>
  );

  return (
    <div className='p-6'>
       <h3 className='text-white text-xl text-center'>INVENTORY DATA TABLE</h3>
      <Toast ref={toast} />
      <DataTable ref={dt} value={inventoryData} globalFilter={globalFilter} header={header}
        paginator rows={10} rowsPerPageOptions={[5,10,20]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown">
        <Column field="name" header="Name"></Column>
        <Column field="price" header="Price"></Column>
        <Column field="quantityInStock" header="Quantity"></Column>
        <Column field="expirationDate" header="Expiration Date"></Column>
        <Column body={actionBodyTemplate} header="Actions"></Column>
      </DataTable>
    </div>
  );
};

export default InventoryTable;