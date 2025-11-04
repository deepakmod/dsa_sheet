import React, { useEffect } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import MainLayout from './components/layout/MainLayout';
import { loadUser } from './features/auth/authSlice';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const dispatch = useDispatch();
  const { token, status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && status === 'idle') {
      dispatch(loadUser());
    }
  }, [token, status, dispatch]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>

      <Route path="*" element={<h1>404: Page Not Found</h1>} />
    </Routes>
  );
}

export default App;