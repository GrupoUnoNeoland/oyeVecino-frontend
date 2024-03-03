import { Navigate } from 'react-router-dom';

import { useAuth } from '../../context/authContext';

export const ProtectedRequestChildren = ({ children }) => {
  const { user } = useAuth();
  
  if (user?.request.length > 0) {
    return <Navigate to="/dashboard" />;
  }
  if (user == null && allUser.data.confirmationCode === '') {
    return <Navigate to="/login" />;
  }
  return children;
};