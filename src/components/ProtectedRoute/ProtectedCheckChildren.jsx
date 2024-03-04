import { Navigate } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../../context/authContext';

export const ProtectedCheckChildren = ({ children }) => {
  const { allUser, user } = useAuth();
  /**
   * aqui me traigo el allUser para los usuarios que vienen del register
   * aqui me traigo el user para los usuarios que viene de login
   */
  if (allUser?.data?.user?.check == true || user?.confirmationCodeChecked == true) {
    return <Navigate to="/request" />;
  }
  if (user == null && allUser.data.confirmationCode === '') {
    return <Navigate to="/login" />;
  }
  return children;
};
