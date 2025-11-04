import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { FiLogOut, FiBarChart2, FiUser } from 'react-icons/fi';

function Navbar() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className="flex items-center justify-between p-4 bg-white shadow-lg sticky top-0 z-50">
            <Link
                to="/"
                className="flex items-center gap-2 text-xl font-bold text-cyan-600"
            >
                <FiBarChart2 className="w-6 h-6" />
                <span>DSA Sheet</span>
            </Link>

            {user && (
                <div className="flex items-center gap-4">

                    <Link
                        to="/profile"
                        className="flex items-center gap-2 p-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                        title="View Profile"
                    >
                        <span className="font-medium hidden sm:block">
                            Welcome, {user.name}
                        </span>

                        <FiUser className="w-5 h-5" />
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg shadow-md hover:bg-cyan-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                    >
                        <FiLogOut />
                        <span className="hidden sm:block">Logout</span>
                    </button>
                </div>
            )}
        </nav>
    );
}

export default Navbar;