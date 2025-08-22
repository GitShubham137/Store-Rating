import React, { useEffect, useState } from 'react';
import storeOwnerService from '../../services/storeOwnerService';

const StoreOwnerDashboard = () => {
  const [dashboardData, setDashboardData] = useState({ averageRating: 0, userRatings: [] });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await storeOwnerService.getDashboard();
        setDashboardData(res.data);
      } catch (error) {
        console.error('Failed to fetch store owner dashboard data', error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Store Owner Dashboard</h1>
      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <h3 className="text-lg font-semibold">Average Rating</h3>
        <p className="text-2xl">{dashboardData.averageRating.toFixed(1)}</p>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">User Ratings</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  User Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.userRatings.map((rating, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    {rating.userName}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    {rating.rating}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StoreOwnerDashboard;
