import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ACCESS_TOKEN } from '@/constants/endpoints';
import { useAuth } from '@/routes/AuthContext';

const OAuth2RedirectHandler = () => {
  const location = useLocation();
  const { setUser } = useAuth();

  const getUrlParameter = (name) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  const token = getUrlParameter('token');
  const error = getUrlParameter('error');

  if (token) {
    localStorage.setItem(ACCESS_TOKEN, token);
    setUser(token);
    return <Navigate to="/jobs" replace />;
  }

  return <Navigate to="/login" state={{ error: error }} replace />;
};

export default OAuth2RedirectHandler; 