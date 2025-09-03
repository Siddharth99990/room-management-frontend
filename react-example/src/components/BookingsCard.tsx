import React, { useState } from "react";
import {Calendar,Building,Users, User, Clock } from "lucide-react";

export interface Booking{
    id:number;
    starttime:Date;
    endtime:Date;
    roomno:number;
    host:{
        hostid:number,
        hostname:string
    };
    status:'confirmed'|'cancelled',
    attendees:{
        attendeeid:number,
        attendeename:string,
        invitestatus:'invited'|'confirmed'|'rejected'
    }[];
};

export const allBookings: Booking[] = [
        {
            id: 1,
            starttime: new Date('2025-09-05T09:00:00'), // Future booking
            endtime: new Date('2025-09-05T10:30:00'),
            roomno: 1,
            host: { hostid: 1, hostname: "Sarah Johnson" },
            status: 'confirmed',
            attendees: [
                { attendeeid: 2, attendeename: "Sam Porter", invitestatus: 'confirmed' },
                { attendeeid: 3, attendeename: "John Doe", invitestatus: 'invited' }
            ]
        },
        {
            id: 2,
            starttime: new Date('2025-09-04T14:00:00'), // Future booking
            endtime: new Date('2025-09-04T15:30:00'),
            roomno: 2,
            host: { hostid: 2, hostname: "Sam Porter" },
            status: 'confirmed',
            attendees: [
                { attendeeid: 1, attendeename: "Sarah Johnson", invitestatus: 'confirmed' },
                { attendeeid: 4, attendeename: "Mike Wilson", invitestatus: 'rejected' }
            ]
        },
        {
            id: 3,
            starttime: new Date('2025-09-06T11:00:00'), // Future booking
            endtime: new Date('2025-09-06T12:00:00'),
            roomno: 3,
            host: { hostid: 1, hostname: "Sarah Johnson" },
            status: 'confirmed',
            attendees: [
                { attendeeid: 2, attendeename: "Sam Porter", invitestatus: 'confirmed' }
            ]
        },
        {
            id: 4,
            starttime: new Date('2025-09-01T10:00:00'), // Past booking
            endtime: new Date('2025-09-01T11:30:00'),
            roomno: 1,
            host: { hostid: 1, hostname: "Sarah Johnson" },
            status: 'confirmed',
            attendees: [
                { attendeeid: 2, attendeename: "Sam Porter", invitestatus: 'confirmed' }
            ]
        },
        {
            id: 5,
            starttime: new Date('2025-09-02T13:00:00'), // Past booking
            endtime: new Date('2025-09-02T14:00:00'),
            roomno: 2,
            host: { hostid: 2, hostname: "Sam Porter" },
            status: 'cancelled',
            attendees: [
                { attendeeid: 1, attendeename: "Sarah Johnson", invitestatus: 'invited' }
            ]
        }
    ];

interface BookingCardProps {
    booking: Booking;
    isActive?: boolean;
    showCancelButton?: boolean; // New prop to control cancel button visibility
    // onCancel?: (bookingId: number) => void; // Optional cancel handler
}

const BookingCard: React.FC<BookingCardProps> = ({ 
    booking, 
    isActive = true, 
    // showCancelButton = false,
    // onCancel 
}) => {
    const getStatusColor = (status: string) => {
        switch(status){
            case 'confirmed': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300';
            case 'cancelled': return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300';
            default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-IN', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    }

    const getInviteStatusColor = (status: string) => {
        switch(status){
            case 'confirmed': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300';
            case 'invited': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300';
            case 'rejected': return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300';
            default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
        }
    };

    // const handleCancel = () => {
    //     if (onCancel) {
    //         onCancel(booking.id);
    //     }
    // };

    return(
        <div className={`bg-gradient-to-br from-red-500 to-pink-500 dark:bg-gradient-to-br dark:from-gray-800 dark:to-red-800 backdrop-blur-xl rounded-xl shadow-lg border border-red-500 dark:border-gray-700 p-6 w-80 transition-all duration-300 ${
            isActive ? 'hover:shadow-xl hover:-translate-y-1' : ''
        }`}>
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-white dark:text-white bg-red-300 dark:bg-gray-700 px-2 py-1 rounded transition-colors duration-300">
                            ID: {booking.id}
                        </span>
                    </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${getStatusColor(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </div>
            </div>

            <div className="space-y-3 mb-4">
                <div className="flex items-center text-white dark:text-gray-400 transition-colors duration-300">
                    <Building className="w-4 h-4 mr-2 flex-shrink-0"/>
                    <span className="text-sm">Room {booking.roomno}</span>
                </div>

                <div className="flex items-center text-white dark:text-gray-400 transition-colors duration-300">
                    <User className="w-4 h-4 mr-2 flex-shrink-0"/>
                    <span className="text-sm">Host: {booking.host.hostname}</span>
                </div>

                <div className="flex items-center text-white dark:text-gray-400 transition-colors duration-300">
                    <Calendar className="w-4 h-4 mr-2 flex-shrink-0"/>
                    <span className="text-sm">Date: {formatDate(booking.starttime)}</span>
                </div>

                <div className="flex items-center text-white dark:text-gray-400 transition-colors duration-300">
                    <Clock className="w-4 h-4 mr-2 flex-shrink-0"/>
                    <span className="text-sm">Time: {formatTime(booking.starttime)} - {formatTime(booking.endtime)}</span>
                </div>

                <div className="flex items-center text-white dark:text-gray-400 transition-colors duration-300">
                    <Users className="w-4 h-4 mr-2 flex-shrink-0"/>
                    <span className="text-sm">{booking.attendees.length} attendee{booking.attendees.length !== 1 ? 's' : ''}</span>
                </div>
            </div>

            {booking.attendees.length > 0 && (
                <div className="mb-4">
                    <h4 className="font-semibold text-white dark:text-gray-300 mb-2 transition-colors duration-300">
                        Attendees ({booking.attendees.length})
                    </h4>
                    <div className="space-y-2 max-h-24 overflow-y-auto">
                        {booking.attendees.map((attendee) => (
                            <div key={attendee.attendeeid} className="flex items-center justify-between text-sm">
                                <span className="text-white dark:text-gray-400 transition-colors duration-300">
                                    {attendee.attendeename}
                                </span>
                                <span className={`px-2 py-1 rounded-md text-xs transition-all duration-300 ${getInviteStatusColor(attendee.invitestatus)}`}>
                                    {attendee.invitestatus.charAt(0).toUpperCase() + attendee.invitestatus.slice(1)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
                {booking.status === 'confirmed' ? (
                    <>
                        <button className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:from-red-700 hover:to-pink-800 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                            View Details
                        </button>
                        {showCancelButton && (
                            <button 
                                onClick={handleCancel}
                                className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-all duration-300 hover:scale-105 font-medium"
                            >
                                Cancel
                            </button>
                        )}
                    </>
                ) : (
                    <div className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 py-2 px-4 rounded-lg text-center font-medium cursor-not-allowed">
                        Cancelled
                    </div>
                )}
            </div> */}
        </div>
    );
};

export default BookingCard;