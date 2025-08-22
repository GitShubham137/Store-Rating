import React, { useEffect, useState } from 'react';

import userService from '../../services/userService';

import StoreCard from '../../components/StoreCard';

import Filter from '../../components/Filter';



const UserDashboard = () => {

  const [stores, setStores] = useState([]);

  const [filter, setFilter] = useState('');



  const fetchStores = async () => {

    try {

      const storesRes = await userService.getStores({ name: filter, address: filter });

      console.log('Fetched stores:', storesRes.data.map(s => s.owner.name));

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

      <h1 className="text-2xl font-bold mb-4">Stores</h1>

      <Filter onFilter={setFilter} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

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