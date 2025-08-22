import React, { useEffect, useState } from 'react';
import adminService from '../../services/adminService';
import SortableTable from '../../components/SortableTable';
import Filter from '../../components/Filter';
import AddUserForm from '../../components/AddUserForm';
import AddStoreForm from '../../components/AddStoreForm';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [userFilter, setUserFilter] = useState('');
  const [storeFilter, setStoreFilter] = useState('');

  const fetchUsers = async () => {
    try {
      const usersRes = await adminService.getUsers({ name: userFilter });
      setUsers(usersRes.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  const fetchStores = async () => {
    try {
      const storesRes = await adminService.getStores({ name: storeFilter });
      setStores(storesRes.data);
    } catch (error) {
      console.error('Failed to fetch stores', error);
    }
  };

  const fetchStats = async () => {
    try {
        const statsRes = await adminService.getDashboardStats();
        setStats(statsRes.data);
    } catch (error) {
        console.error('Failed to fetch stats', error);
    }
  }

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchStores();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [userFilter]);

  useEffect(() => {
    fetchStores();
  }, [storeFilter]);

  const handleUserAdded = () => {
    fetchUsers();
    fetchStats();
  };

  const handleStoreAdded = () => {
    fetchStores();
    fetchStats();
  };

  const userColumns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'address', label: 'Address' },
    { key: 'role', label: 'Role' },
  ];

  const storeColumns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'address', label: 'Address' },
    { key: 'rating', label: 'Rating' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Stores</h3>
          <p className="text-2xl">{stats.totalStores}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Ratings</h3>
          <p className="text-2xl">{stats.totalRatings}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
            <AddUserForm onUserAdded={handleUserAdded} />
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Users</h2>
                <Filter onFilter={setUserFilter} />
                <SortableTable data={users} columns={userColumns} />
            </div>
        </div>
        <div>
            <AddStoreForm onStoreAdded={handleStoreAdded} />
            <div>
                <h2 className="text-xl font-bold mb-4">Stores</h2>
                <Filter onFilter={setStoreFilter} />
                <SortableTable data={stores} columns={storeColumns} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
