import React from 'react';

import './Profile.css';
import { Navigate, Outlet } from 'react-router-dom';

export const Profile = () => {
  return (
    <div id="profile-container">
      <Outlet />
    </div>
  );
};
