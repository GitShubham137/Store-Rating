import React from 'react';
import UpdatePasswordForm from '../components/UpdatePasswordForm';

const ProfilePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <UpdatePasswordForm />
    </div>
  );
};

export default ProfilePage;