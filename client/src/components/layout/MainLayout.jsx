import React from 'react';
import Navbar from '../Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
