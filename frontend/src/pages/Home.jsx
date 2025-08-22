import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Store Rating</h1>
      <p className="text-lg text-gray-700 mb-8">
        Your one-stop platform to rate and review stores.
      </p>
      <div className="space-x-4">
        <Link
          to="/login"
          className="px-6 py-3 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
