import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          StoreRating
        </Link>
        <div className="space-x-4">
          {user ? (
            <>
              {user.role === 'System Administrator' && (
                <Link to="/admin" className="text-gray-300 hover:text-white">
                  Admin Dashboard
                </Link>
              )}
              {user.role === 'Normal User' && (
                <Link to="/dashboard" className="text-gray-300 hover:text-white">
                  Dashboard
                </Link>
              )}
              {user.role === 'Store Owner' && (
                <Link to="/store-owner" className="text-gray-300 hover:text-white">
                  Store Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white">
                Login
              </Link>
              <Link to="/register" className="text-gray-300 hover:text-white">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
