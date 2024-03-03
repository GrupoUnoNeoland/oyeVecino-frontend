import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';



export const Protected = ({ children }) => {
  const { user, deleteUser } = useAuth();
  console.log(user)
  if (deleteUser) {
    return <Navigate to="/register" />;
  }
  if (user == null || user?.check == false) {
    return <Navigate to="/login" />;
  }
  if (user?.request.length == 0) {
    return <Navigate to="/request" />;
  }

  return children;
};
