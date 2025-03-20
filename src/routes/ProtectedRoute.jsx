import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import PropTypes from 'prop-types';
import { ACCESS_TOKEN } from '@/constants/endpoints';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  const isAuthenticated = user && localStorage.getItem(ACCESS_TOKEN);

  if (!isAuthenticated) {
    return <Navigate 
      to="/jobs"
      state={{ from: location }}
      replace
    />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;