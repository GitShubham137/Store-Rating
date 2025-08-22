import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/user/UserDashboard';
import StoreOwnerDashboard from './pages/storeowner/StoreOwnerDashboard';
import ProfilePage from './pages/user/ProfilePage'; // <-- 1. IMPORT THE NEW PAGE
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* 2. ADD A NEW PRIVATE ROUTE FOR THE PROFILE PAGE */}
        <Route element={<PrivateRoute roles={['System Administrator', 'Normal User', 'Store Owner']} />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route element={<PrivateRoute roles={['System Administrator']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
        <Route element={<PrivateRoute roles={['Normal User']} />}>
          <Route path="/dashboard" element={<UserDashboard />} />
        </Route>
        <Route element={<PrivateRoute roles={['Store Owner']} />}>
          <Route path="/store-owner" element={<StoreOwnerDashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;