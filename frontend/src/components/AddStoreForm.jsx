import React, { useState } from 'react';
import adminService from '../services/adminService';

const AddStoreForm = ({ onStoreAdded }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [ownerId, setOwnerId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminService.addStore({ name, email, address, ownerId });
      onStoreAdded();
      // Reset form
      setName('');
      setEmail('');
      setAddress('');
      setOwnerId('');
    } catch (error) {
      console.error('Failed to add store', error);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-4">Add New Store</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Owner ID</label>
                <input
                type="text"
                value={ownerId}
                onChange={(e) => setOwnerId(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <button
                type="submit"
                className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Add Store
            </button>
        </form>
    </div>
  );
};

export default AddStoreForm;
