import React, { useEffect } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';

// Layout & Protection
import MainLayout from './components/layout/MainLayout';
import { loadUser } from './features/auth/authSlice';
import ProtectedRoute from './components/ProtectedRoute';


/**
 * 2. App Component
 * The main App component is now much cleaner.
 */
function App() {
  const dispatch = useDispatch();
  const { token, status } = useSelector((state) => state.auth);

  useEffect(() => {
    // This logic is correct and remains unchanged.
    // On app load, if we have a token, try to load the user.
    if (token && status === 'idle') {
      dispatch(loadUser());
    }
  }, [token, status, dispatch]);

  return (
    <Routes>
      {/* 1. Public Routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* 2. Protected Routes */}
      {/* All routes inside here are first checked by <ProtectedRoute /> */}
      <Route element={<ProtectedRoute />}>
        {/* If auth is successful, they are then wrapped by <MainLayout /> */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>

      {/* 3. Catch-all 404 Not Found Route */}
      <Route path="*" element={<h1>404: Page Not Found</h1>} />
    </Routes>
  );
}

export default App;