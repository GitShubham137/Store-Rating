import React, { useState } from 'react';

const Filter = ({ onFilter }) => {
  const [filter, setFilter] = useState('');

  const handleInputChange = (e) => {
    setFilter(e.target.value);
  };

  const handleFilter = () => {
    onFilter(filter);
  };

  return (
    <div className="flex items-center mb-4">
      <input
        type="text"
        value={filter}
        onChange={handleInputChange}
        placeholder="Filter by name, email, or address"
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
      <button
        onClick={handleFilter}
        className="ml-2 px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Filter
      </button>
    </div>
  );
};

export default Filter;
