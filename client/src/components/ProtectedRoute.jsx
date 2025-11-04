import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PageLoader } from './ui/Spinner';

const ProtectedRoute = () => {
  const { user, token, status } = useSelector((state) => state.auth);

  if (status === 'loading' || (token && status === 'idle')) {
    return <PageLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;