import React, { useState } from "react";
import BookingCard, { type Booking } from "../components/BookingsCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const bookingsData: Booking[] = [
    {
        id: 1,
        starttime: new Date('2025-09-02T10:30:00'),
        endtime: new Date('2025-09-02T12:00:00'),
        roomno: 101,
        host: {
            hostid: 501,
            hostname: 'Dr. Meera Nair'
        },
        status: 'confirmed',
        attendees: [
            {
                attendeeid: 1001,
                attendeename: 'Siddharth Rao',
                invitestatus: 'confirmed'
            },
            {
                attendeeid: 1002,
                attendeename: 'Anjali Menon',
                invitestatus: 'invited'
            },
            {
                attendeeid: 1003,
                attendeename: 'Ravi Kumar',
                invitestatus: 'rejected'
            }
        ]
    },
    {
        id: 2,
        starttime: new Date('2025-09-03T14:00:00'),
        endtime: new Date('2025-09-03T15:30:00'),
        roomno: 204,
        host: {
            hostid: 502,
            hostname: 'Mr. Arvind Desai'
        },
        status: 'cancelled',
        attendees: [
            {
                attendeeid: 2001,
                attendeename: 'Neha Sharma',
                invitestatus: 'invited'
            },
            {
                attendeeid: 2002,
                attendeename: 'Karan Patel',
                invitestatus: 'confirmed'
            },
            {
                attendeeid: 2003,
                attendeename: 'Priya Verma',
                invitestatus: 'confirmed'
            },
            {
                attendeeid: 2004,
                attendeename: 'Amit Joshi',
                invitestatus: 'rejected'
            }
        ]
    },
    {
        id: 3,
        starttime: new Date('2025-09-04T09:00:00'),
        endtime: new Date('2025-09-04T10:30:00'),
        roomno: 105,
        host: {
            hostid: 503,
            hostname: 'Ms. Priya Singh'
        },
        status: 'confirmed',
        attendees: [
            {
                attendeeid: 3001,
                attendeename: 'Rohit Sharma',
                invitestatus: 'confirmed'
            },
            {
                attendeeid: 3002,
                attendeename: 'Kavya Reddy',
                invitestatus: 'confirmed'
            }
        ]
    },
    {
        id: 4,
        starttime: new Date('2025-09-05T16:00:00'),
        endtime: new Date('2025-09-05T17:30:00'),
        roomno: 301,
        host: {
            hostid: 504,
            hostname: 'Dr. Rajesh Kumar'
        },
        status: 'confirmed',
        attendees: [
            {
                attendeeid: 4001,
                attendeename: 'Sneha Patel',
                invitestatus: 'invited'
            },
            {
                attendeeid: 4002,
                attendeename: 'Arjun Gupta',
                invitestatus: 'confirmed'
            },
            {
                attendeeid: 4003,
                attendeename: 'Deepika Jain',
                invitestatus: 'confirmed'
            }
        ]
    },
    {
        id: 5,
        starttime: new Date('2025-09-06T11:00:00'),
        endtime: new Date('2025-09-06T12:30:00'),
        roomno: 202,
        host: {
            hostid: 505,
            hostname: 'Mr. Vikram Mehta'
        },
        status: 'cancelled',
        attendees: [
            {
                attendeeid: 5001,
                attendeename: 'Isha Agarwal',
                invitestatus: 'invited'
            }
        ]
    },
    {
        id: 6,
        starttime: new Date('2025-09-07T13:00:00'),
        endtime: new Date('2025-09-07T14:30:00'),
        roomno: 103,
        host: {
            hostid: 506,
            hostname: 'Ms. Anita Iyer'
        },
        status: 'confirmed',
        attendees: [
            {
                attendeeid: 6001,
                attendeename: 'Rahul Mishra',
                invitestatus: 'confirmed'
            },
            {
                attendeeid: 6002,
                attendeename: 'Pooja Nair',
                invitestatus: 'confirmed'
            },
            {
                attendeeid: 6003,
                attendeename: 'Suresh Pillai',
                invitestatus: 'rejected'
            }
        ]
    },
    {
        id: 7,
        starttime: new Date('2025-09-08T15:30:00'),
        endtime: new Date('2025-09-08T17:00:00'),
        roomno: 304,
        host: {
            hostid: 507,
            hostname: 'Dr. Sunita Rao'
        },
        status: 'confirmed',
        attendees: [
            {
                attendeeid: 7001,
                attendeename: 'Manoj Tiwari',
                invitestatus: 'confirmed'
            },
            {
                attendeeid: 7002,
                attendeename: 'Ritu Chopra',
                invitestatus: 'invited'
            }
        ]
    },
    {
        id: 8,
        starttime: new Date('2025-09-09T10:00:00'),
        endtime: new Date('2025-09-09T11:30:00'),
        roomno: 106,
        host: {
            hostid: 508,
            hostname: 'Mr. Arun Krishnan'
        },
        status: 'confirmed',
        attendees: [
            {
                attendeeid: 8001,
                attendeename: 'Nisha Bansal',
                invitestatus: 'confirmed'
            },
            {
                attendeeid: 8002,
                attendeename: 'Gaurav Sinha',
                invitestatus: 'confirmed'
            },
            {
                attendeeid: 8003,
                attendeename: 'Meera Joshi',
                invitestatus: 'invited'
            }
        ]
    }
];

const BookingPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const bookingsPerPage = 6;

    // Calculate pagination
    const totalPages = Math.ceil(bookingsData.length / bookingsPerPage);
    const startIndex = (currentPage - 1) * bookingsPerPage;
    const endIndex = startIndex + bookingsPerPage;
    const currentBookings = bookingsData.slice(startIndex, endIndex);

    const handlePreviousPage = () => {
        setCurrentPage(prev => Math.max(1, prev - 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(totalPages, prev + 1));
    };

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-red-900 transition-all duration-500">
            <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <div className="text-center mb-12">
                    <div className="space-y-4 sm:space-y-6">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                            Current
                            <span className="block bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                                Bookings
                            </span>
                        </h1>
                        
                        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
                            Manage your meeting schedules and track booking status with ease
                        </p>
                    </div>
                </div>

                {/* Pagination Info */}
                <div className="flex justify-between items-center mb-8">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        Showing {startIndex + 1}-{Math.min(endIndex, bookingsData.length)} of {bookingsData.length} bookings
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        Page {currentPage} of {totalPages}
                    </div>
                </div>

                {/* Bookings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {currentBookings.map((booking) => (
                        <div key={booking.id} className="flex justify-center">
                            <BookingCard 
                                booking={booking} 
                                isActive={true} 
                                showCancelButton={false}
                            />
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {currentBookings.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-500 dark:text-gray-400">
                            <p className="text-lg mb-2">No bookings found</p>
                            <p className="text-sm">There are no bookings to display on this page.</p>
                        </div>
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-2">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className={`p-2 rounded-lg transition-all duration-300 ${
                                currentPage === 1
                                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                    : 'bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 border border-gray-200 dark:border-gray-700 hover:scale-105 hover:shadow-lg'
                            }`}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="flex space-x-1">
                            {getPageNumbers().map((page, index) => (
                                <button
                                    key={index}
                                    onClick={() => typeof page === 'number' && handlePageClick(page)}
                                    disabled={page === '...'}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                        page === currentPage
                                            ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg'
                                            : page === '...'
                                            ? 'text-gray-400 dark:text-gray-500 cursor-default'
                                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-600 dark:hover:text-red-400 hover:scale-105'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className={`p-2 rounded-lg transition-all duration-300 ${
                                currentPage === totalPages
                                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                    : 'bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 border border-gray-200 dark:border-gray-700 hover:scale-105 hover:shadow-lg'
                            }`}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingPage;