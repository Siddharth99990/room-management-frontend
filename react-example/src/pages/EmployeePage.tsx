import React, { useState } from 'react';
import EmployeeCard, { type Employee } from "../components/EmployeeCard";
import SmoothCarousel from "../components/Carousel";

export const employeesData: Employee[] = [
    {
        id: 1,
        name: "Sarah",
        email: "sarah@gmail.com",
        phone: "1234567890",
        role: "admin",
        status: 'Active'
    },
    {
        id: 2,
        name: "Bob",
        email: "bob@gmail.com",
        phone: "0987654321",
        role: "employee",
        avatar: 'src/assets/professional-headshot-with-dark-gray-background-blue-suit.jpg',
        status: 'Active'
    },
    {
        id: 3,
        name: "Sam",
        email: "sam@gmail.com",
        phone: "1357908642",
        role: "employee",
        status: 'Deactivated'
    },
];

const EmployeesPage: React.FC = () => {
    const [employeeIndex, setEmployeeIndex] = useState(0);

    const handlePreviousEmployee = () => {
        setEmployeeIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }

    const handleNextEmployee = () => {
        setEmployeeIndex((prev) => (prev < employeesData.length - 1 ? prev + 1 : prev))
    }

    const handleOnJumpToEmployee = (index: number) => {
        setEmployeeIndex(index);
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4 transition-colors duration-300">
                        Users
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 transition-colors duration-300">
                        Browse through users
                    </p>
                </div>

                <SmoothCarousel
                    title="User Cards"
                    items={employeesData}
                    currentIndex={employeeIndex}
                    onPrevious={handlePreviousEmployee}
                    onNext={handleNextEmployee}
                    onJumpTo={handleOnJumpToEmployee}
                    renderCard={(item, index, currentIndex) => (
                        <EmployeeCard
                            employee={item as Employee}
                            isActive={index === currentIndex}
                        />
                    )}
                />
            </div>
        </div>
    );
};

export default EmployeesPage;