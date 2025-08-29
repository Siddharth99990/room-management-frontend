import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Home, Users, Building2, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext'; // Adjust import path as needed

const NavBarLayout: React.FC = () => {
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();

    const isActive = (path: string) => {
        if (path === '/' && location.pathname === '/') return true;
        return location.pathname.startsWith(path) && path !== '/';
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link to='/' className="flex items-center space-x-2">
                                <Building2 className="h-8 w-8 text-red-600 dark:text-red-400" />
                                <span className="text-xl font-bold text-gray-800 dark:text-gray-200 transition-colors duration-300">
                                    Rooms & Bookings
                                </span>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-8">
                            <Link to="/"
                                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                                    isActive('/') 
                                        ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' 
                                        : 'text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700'
                                }`}>
                                <Home className="h-4 w-4" />
                                <span>Home</span>
                            </Link>
                            <Link to="/rooms"
                                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                                    isActive('/rooms') 
                                        ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' 
                                        : 'text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700'
                                }`}>
                                <Building2 className="h-4 w-4" />
                                <span>Rooms</span>
                            </Link>
                            <Link to="/users"
                                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                                    isActive('/users') 
                                        ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' 
                                        : 'text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700'
                                }`}>
                                <Users className="h-4 w-4" />
                                <span>Users</span>
                            </Link>
                            
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110"
                                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                            >
                                {theme === 'light' ? (
                                    <Moon className="h-5 w-5" />
                                ) : (
                                    <Sun className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="transition-colors duration-300">
                <Outlet />
            </main>
        </div>
    );
};

export default NavBarLayout;