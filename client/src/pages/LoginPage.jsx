import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { FiMail, FiLock, FiLogIn, FiEye, FiEyeOff } from 'react-icons/fi';
import Spinner from '../components/ui/Spinner';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, status, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome Back!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Login to track your DSA progress.
          </p>
        </div>

        {status === 'failed' && error && (
          <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-300 rounded-lg">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FiMail className="absolute w-5 h-5 text-gray-400 top-3 left-3" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="w-full py-2.5 pl-10 pr-3 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <FiLock className="absolute w-5 h-5 text-gray-400 top-3 left-3" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="w-full py-2.5 pl-10 pr-10 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent" // Increased pr-10
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute text-gray-400 top-3 right-3"
            >
              {showPassword ? (
                <FiEyeOff className="w-5 h-5" />
              ) : (
                <FiEye className="w-5 h-5" />
              )}
            </button>
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full flex justify-center items-center gap-2 px-4 py-2.5 font-semibold text-white bg-cyan-600 rounded-lg shadow-lg hover:bg-cyan-700 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <Spinner size="1.25rem" />
            ) : (
              <FiLogIn className="w-5 h-5" />
            )}
            <span>{status === 'loading' ? 'Logging in...' : 'Login'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;