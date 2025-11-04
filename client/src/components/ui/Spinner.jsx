import React from 'react';
import { CgSpinner } from 'react-icons/cg';

const Spinner = ({ size = '1.5rem' }) => {
  return (
    <div className="flex justify-center items-center">
      <CgSpinner className="animate-spin" style={{ fontSize: size }} />
    </div>
  );
};

export const PageLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner size="3rem" />
    </div>
  );
};

export default Spinner;
