import React, { useState } from 'react';
import userService from '../services/userService';

const UpdatePasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    // As per your schema, password validation can also be checked here
    // For simplicity, we rely on the backend validation for now

    try {
      const response = await userService.updatePassword(password);
      setMessage(response.data.message);
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password.');
    }
  };

  return (
    <div className="p-6 my-8 bg-white border rounded-lg shadow-md max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4">Update Password</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Update Password
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default UpdatePasswordForm;