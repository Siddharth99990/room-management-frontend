import React from "react";
import { Outlet,Link,useLocation } from "react-router-dom";
import {Home,Users,Building2}from 'lucide-react';

const NavBarLayout:React.FC=()=>{
    const location=useLocation();

    const isActive=(path:string)=>{
        if(path==='/' && location.pathname==='/')return true;
        return location.pathname.startsWith(path)&& path!=='/';
    };

    return(
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-lg border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex-items-center">
                            <Link to='/' className="h-8 w-8 text-blue-600">
                                <Building2 className="h-8 w-8 text-blue-600"/>
                                <span className="text-xl font-bold text-gray-800">Rooms & Bookings</span>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-8">
                            <Link to="/"
                            className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive('/')?'bg-blue-100 text-blue-700':'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}>
                                <Home className="h-4 w-4"/>
                                <span>Home</span>
                            </Link>
                            <Link to="/rooms"
                            className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive('/')?'bg-blue-100 text-blue-700':'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}>
                                <Building2 className="h-4 w-4"/>
                                <span>Rooms</span>
                            </Link>
                            <Link to="/users"
                            className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive('/')?'bg-blue-100 text-blue-700':'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}>
                                <Users className="h-4 w-4"/>
                                <span>Users</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main>
                <Outlet/>
            </main>
        </div>
    );
};

export default NavBarLayout;