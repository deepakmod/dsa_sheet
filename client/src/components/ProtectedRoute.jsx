import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'; // 1. Import Outlet
import { useSelector } from 'react-redux';
import { PageLoader } from './ui/Spinner';

// 2. No more "children" prop
const ProtectedRoute = () => {
  const { user, token, status } = useSelector((state) => state.auth);

  // While checking token or loading user, show loading
  // This logic is perfect and remains unchanged.
  if (status === 'loading' || (token && status === 'idle')) {
    return <PageLoader />;
  }

  // If no user and not loading, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. If user is loaded, render the nested route
  return <Outlet />;
};

export default ProtectedRoute;