import React, { useEffect, useState } from 'react';
import userService from '../../services/userService';
import StoreCard from '../../components/StoreCard';
import Filter from '../../components/Filter';
import UpdatePasswordForm from '../../components/UpdatePasswordForm'; // Import the new component

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [filter, setFilter] = useState('');

  // ... (fetchStores, useEffect, and handleRatingSubmitted functions remain the same)
  const fetchStores = async () => {
     try {
       const storesRes = await userService.getStores({ name: filter, address: filter });
       setStores(storesRes.data);
     } catch (error) {
       console.error('Failed to fetch stores', error);
     }
  };

  useEffect(() => {
     fetchStores();
  }, [filter]);
  
  const handleRatingSubmitted = () => {
     fetchStores();
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      
      {/* Add the password update form here */}
      <UpdatePasswordForm />

      <hr className="my-8" />
      
      <h2 className="text-2xl font-bold mb-4">Stores</h2>
      <Filter onFilter={setFilter} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {stores.map((store) => (
          <StoreCard
            key={store._id}
            store={store}
            onRatingSubmitted={handleRatingSubmitted}
          />
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;