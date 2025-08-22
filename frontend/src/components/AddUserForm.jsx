import React, { useState } from 'react';
import adminService from '../services/adminService';

const AddUserForm = ({ onUserAdded }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('Normal User');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminService.addUser({ name, email, password, address, role });
      onUserAdded();
      // Reset form
      setName('');
      setEmail('');
      setPassword('');
      setAddress('');
      setRole('Normal User');
    } catch (error) {
      console.error('Failed to add user', error);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-4">Add New User</h3>
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
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                <option>Normal User</option>
                <option>Store Owner</option>
                <option>System Administrator</option>
                </select>
            </div>
            <button
                type="submit"
                className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Add User
            </button>
        </form>
    </div>
  );
};

export default AddUserForm;
