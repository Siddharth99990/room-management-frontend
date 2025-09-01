import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Users, Building2, Sun, Moon, Menu, X , LogOut, UserCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const NavBarLayout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const { user, logout, isAuthenticated } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path: string) => {
        if (path === '/' && location.pathname === '/') return true;
        return location.pathname.startsWith(path) && path !== '/';
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
        closeMobileMenu();
    };

    const navLinks = isAuthenticated ? [
        { path: '/home', label: 'Home', icon: Home },
        { path: '/rooms', label: 'Rooms', icon: Building2 },
        ...(user?.role==='admin'?[{path:'/registeruser',label:'Register',icon:UserCheck},
        { path: '/users', label: 'Users', icon: Users },]:[])
    ] : [];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 transition-colors duration-300 relative z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Link to={isAuthenticated ? '/home' : '/login'} className="flex items-center space-x-2" onClick={closeMobileMenu}>
                                <Building2 className="h-6 sm:h-8 w-6 sm:w-8 text-red-600 dark:text-red-400" />
                                <span className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 transition-colors duration-300 hidden sm:block">
                                    Rooms & Bookings
                                </span>
                                <span className="text-lg font-bold text-gray-800 dark:text-gray-200 transition-colors duration-300 sm:hidden">
                                    R&B
                                </span>
                            </Link>
                        </div>

                        <div className="hidden md:flex items-center space-x-6">
                            {navLinks.map(({ path, label, icon: Icon }) => (
                                <Link key={path} to={path}
                                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                                        isActive(path) 
                                            ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' 
                                            : 'text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700'
                                    }`}>
                                    <Icon className="h-4 w-4" />
                                    <span>{label}</span>
                                </Link>
                            ))}
                            
                            {isAuthenticated && user && (
                                <div className="flex items-center space-x-4 border-l border-gray-200 dark:border-gray-700 pl-4">
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 transition-all duration-200"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                            
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

                        <div className="md:hidden flex items-center space-x-2">
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
                            
                            {isAuthenticated && (
                                <button
                                    onClick={toggleMobileMenu}
                                    className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                                    aria-label="Toggle mobile menu"
                                >
                                    {isMobileMenuOpen ? (
                                        <X className="h-6 w-6" />
                                    ) : (
                                        <Menu className="h-6 w-6" />
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {isAuthenticated && (
                    <div className={`md:hidden transition-all duration-300 ease-in-out ${
                        isMobileMenuOpen 
                            ? 'max-h-96 opacity-100 visible' 
                            : 'max-h-0 opacity-0 invisible overflow-hidden'
                    }`}>
                        <div className="px-4 pt-2 pb-4 space-y-2 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                            {navLinks.map(({ path, label, icon: Icon }) => (
                                <Link key={path} to={path}
                                    onClick={closeMobileMenu}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                                        isActive(path) 
                                            ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' 
                                            : 'text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700'
                                    }`}>
                                    <Icon className="h-5 w-5" />
                                    <span>{label}</span>
                                </Link>
                            ))}

                            {user && (
                                <>
                                    <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 mt-2 pt-4">
                                        Welcome, {user.name}
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 w-full text-left"
                                    >
                                        <LogOut className="h-5 w-5" />
                                        <span>Logout</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            <main className="transition-colors duration-300">
                <Outlet />
            </main>
        </div>
    );
};

export default NavBarLayout;