import React from "react";
import {Phone,Mail}from 'lucide-react';

export interface Employee{
    id:number;
    name:string;
    email:string,
    phone:string,
    role:'admin'|'employee',
    avatar?:string,
    status:'Active'|'Deactivated'
};



const EmployeeCard:React.FC<{employee:Employee,isActive?:boolean}>=({employee})=>{
    const getStatusColor=(status:string)=>{
        switch(status){
            case 'Active':return 'bg-green-100 text-green-800';
            case 'Deactivated':return 'bg-red-100 text-red-800';
            default:return 'bg-gray-100 text-white-800'
        }
    };

    return(
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md mx-auto border border-gray-100 dark:border-gray-700 transition-all duration-300">
            <div className="flex items-center mb-4">
                    <img
                        src={employee.avatar}
                        alt={employee.name}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 transition-colors duration-300">
                        {employee.name}
                    </h3>
                    <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 transition-colors duration-300 ${getStatusColor(employee.status)}`}>
                        {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                    </div>
                </div>
            </div>

            <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-600 dark:text-gray-400 transition-colors duration-300">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="text-sm">{employee.email}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400 transition-colors duration-300">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="text-sm">{employee.phone}</span>
                </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-gray-700 transition-colors duration-300">
                <button className="flex-1 bg-blue-600 dark:bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300">
                    View Profile
                </button>
            </div>
        </div>
    );
};

export default EmployeeCard;