import React,{ useState } from 'react';
import {useAuth}from '../context/AuthContext';
import { employeesData } from './EmployeePage';
import { Clock,Users,Building2,Calendar,ChevronLeft,ChevronRight,Settings,Plus,User,MapPin,Eye, Cog, CalendarX } from 'lucide-react';
import { roomsData } from './RoomsPage';
import { Link } from 'react-router-dom';
import SmoothCarousel from '../components/Carousel';
import BookingCard,{allBookings,type Booking} from '../components/BookingsCard';
const HomePage=()=>{
    const [currentTime,setCurrentTime]=useState(new Date());
    const [bookingIndex,setBookingIndex]=useState(0);
    const [showPreviousBookings,setShowPreviousBookings]=useState(false);
    const {user}=useAuth();

    const getCurrentUserBookings = () => {
        if (!user) return [];
        
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        
        return allBookings.filter(booking => {
            const bookingDate = new Date(booking.starttime);
            bookingDate.setHours(0, 0, 0, 0);
            
            const isHost = booking.host.hostid === user.id || booking.host.hostname === user.name;
            const isAttendee = booking.attendees.some((attendee:any) => 
                attendee.attendeeid === user.id || attendee.attendeename === user.name
            );
            
            const userRelated = isHost || isAttendee;
            
            const dateCondition = showPreviousBookings 
                ? bookingDate < currentDate 
                : bookingDate >= currentDate;
            
            return userRelated && dateCondition;
        });
    };

    const userBookings=getCurrentUserBookings();

    React.useEffect(()=>{
        const timer=setInterval(()=> setCurrentTime(new Date()),1000);
        return ()=> clearInterval(timer);
    },[]);

    const handlePreviousBooking = () => {
        setBookingIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }

    const handleNextBooking = () => {
        setBookingIndex((prev) => (prev < employeesData.length - 1 ? prev + 1 : prev))
    }
    
    const formatTime = (date:any) => {
        return date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
        });
    };

    const formatDate = (date:any) => {
        return date.toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
        });
    };

    const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Team Collaboration',
      description: 'See who’s attending and keep everyone in sync.',
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: 'Smart Room Management',
      description: 'Easily browse available rooms with real-time updates.',
    },
  ];

    return(
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-red-900 transition-all duration-500">
            <div className="container mx-auto px-4 sm:px-6 py-8 sm:pu-12">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
                    <div className="space-y-6 sm:space-y-8 ">
                        <div className="space-y-4 sm:space-y-6 mb-10">
                            <h1 className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white leading-tight'>
                                Welcome,
                                <span className=" block bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                                    {user?.name}
                                </span>
                            </h1>
                        </div>
                    </div>
                    <div className='hidden md:flex flex-col items-end text-right space-y-6 sm:space-y-8 '>
                        <div className='space-y-4 sm:space-y-6'>
                            <div className='flex flex-col items-end space-y-2'>
                                <div className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white leading-tight '>
                                    {currentTime.toLocaleTimeString('en-IN',{
                                        hour:'2-digit',
                                        minute:'2-digit',
                                        second:'2-digit'
                                    })}
                                </div>
                                <div className='text-lg text-xl leading-relaxed block bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent'>
                                    {currentTime.toLocaleDateString('en-IN',{
                                        weekday:'short',
                                        year:'numeric',
                                        month:'short',
                                        day:'numeric'
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {user?.role==='admin' &&(
                    <div className='grid md:grid-cols-2 gap-6 mb-8'>
                        <div className='bg-gradient-to-r from-red-50 to-pink-50 dark:bg-gradient-to-br dark:from-gray-800 dark:to-red-800 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300'>
                            <div className='flex items-center justify-between mb-4'>
                                <div className='flex items-center space-x-3'>
                                    <div className='w-12 h-12 bg-gradient-to-br from-red-600 to-pink-600 rounded-xl flex items-center justify-center'>
                                        <Users className='w-6 h-6 text-white'/>
                                    </div>
                                    <div>
                                        <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>Manage Users</h3>
                                        <p className='text-sm text-gray-600 dark:text-gray-400'></p>
                                    </div>
                                </div>
                                <Link to='/users'>
                                    <ChevronRight className='w-5 h-5 text-gray-400'/>
                                </Link>
                            </div>
                            <div className='flex items-center justify-between'>
                                <span className='text-2xl font-bold text-gray-900 dark:text-white'>Currently active employees: {employeesData.length}</span>
                                <Link to='/users' className='bg-red-100 dark:bg-red-500 dark:text-white p-2 rounded-lg hover:bg-red-300 dark:hover:bg-red-800 transition-colors'>
                                    <Plus className='w-4 h-4'/>
                                </Link>
                            </div>
                        </div>
                       <div className='bg-gradient-to-r from-red-50 to-pink-50 dark:bg-gradient-to-br dark:from-gray-800 dark:to-red-800 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300'>
                            <div className='flex items-center justify-between mb-4'>
                                <div className='flex items-center space-x-3'>
                                    <div className='w-12 h-12 bg-gradient-to-br from-red-600 to-pink-600 rounded-xl flex items-center justify-center'>
                                        <Building2 className='w-6 h-6 text-white'/>
                                    </div>
                                    <div>
                                        <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>Manage Rooms</h3>
                                        <p className='text-sm text-gray-600 dark:text-gray-400'></p>
                                    </div>
                                </div>
                                <Link to='/rooms'>
                                    <ChevronRight className='w-5 h-5 text-gray-400'/>
                                </Link>
                            </div>
                            <div className='flex items-center justify-between'>
                                <span className='text-2xl font-bold text-gray-900 dark:text-white'>Currently active rooms: {roomsData.length}</span>
                                <Link to='/rooms' className='bg-red-100 dark:bg-red-500 dark:text-white p-2 rounded-lg hover:bg-red-300 dark:hover:bg-red-800 transition-colors'>
                                    <Cog className='w-4 h-4'/>
                                </Link>
                            </div>
                        </div> 
                    </div>
                )}

                <div className='grid lg:grid-cols-2 lg:gap-16'>
                    <div className='order-1 lg:order-1'>
                        <div className='flex items-center justify-between mb-6'>
                            <h2 className='text-2xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 dark:text-white leading-tight'>
                                {showPreviousBookings?'Previous ':'Upcoming'}
                                <span className=" block bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                                    Bookings
                                </span>
                            </h2>
                            <div className='flex items-center space-x-2'>
                                <button
                                    onClick={()=> setShowPreviousBookings(!showPreviousBookings)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                        showPreviousBookings
                                        ? 'inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold shadow-md hover:from-red-700 hover:to-pink-700 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                                        : 'inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold shadow-md hover:from-red-700 hover:to-pink-700 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                                    }`}
                                >
                                    <div className='flex items-center space-x-2'>
                                        <CalendarX className='w-4 h-4'/>
                                        <span>
                                            {showPreviousBookings ? 'View Upcoming':'View Previous'}
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </div>
                        {userBookings.length > 0 ? (
                            <SmoothCarousel
                                title=""
                                items={userBookings}
                                currentIndex={bookingIndex}
                                onPrevious={handlePreviousBooking}
                                onNext={handleNextBooking}
                                renderCard={(item, index, currentIndex) => (
                                    <BookingCard
                                        booking={item as Booking}
                                        isActive={index === currentIndex}
                                        showCancelButton={!showPreviousBookings && (item as Booking).status === 'confirmed'}
                                    />
                                )}
                            />
                        ) : (
                        <div className='text-center py-8'>
                            <Calendar className='w-16 h-16 text-gray-400 mx-auto mb-4' />
                            <p className='text-lg text-gray-600 dark:text-gray-400 mb-2'>
                                {showPreviousBookings ? 'No previous bookings found' : 'No upcoming bookings'}
                            </p>
                            <p className='text-gray-500 dark:text-gray-500 mb-4'>
                                {showPreviousBookings 
                                    ? 'You haven\'t had any bookings yet'
                                        : 'Book a room to see your upcoming meetings'
                                }
                            </p>
                            {!showPreviousBookings && (
                                <Link 
                                    to='/bookroom'
                                    className='inline-flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-300'
                                >
                                    <Plus className='w-4 h-4' />
                                    <span>Book a Room</span>
                                </Link>
                            )}
                        </div>
                        )}
                    </div>
                    <div className='order-2 lg:order-2 space-y-6 sm:space-y-8'>
                        <div className='space-y-4 sm:space-y-6 '>
                            <h1 className="text-xl sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                                View Your
                                <span className="block bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                                    Meetings 
                                </span>
                            </h1>
                            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                                Quickly view your upcoming and past room bookings.
                            </p>
                        </div> 
                        <div className="space-y-4 sm:space-y-6">
                            {features.map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                                >
                                    <div className="flex-shrink-0 w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center text-white">
                                        {feature.icon}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm sm:text-base">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                         <Link 
                            to='/bookroom'
                            className='inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold shadow-md hover:from-red-700 hover:to-pink-700 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                        >
                            <Plus className='w-5 h-5 mr-2'/>
                            Book a Room now
                        </Link>    
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;