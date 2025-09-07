import React,{useEffect, useState} from "react";
import {Clock,Users,Building2,Search,Filter,X,Check}from 'lucide-react';
import { useAuth } from "../context/AuthContext";
import { roomService, type Room } from "../api/room.service";

interface BookingForm{
    roomid:number|null;
    date:string;
    starttime:string;
    endtime:string;
    title:string;
    description:string;
    attendees:any[];
}

interface AttendeeOption{
    id:number;
    name:string;
}

const availableAttendees: AttendeeOption[] = [
  { id: 1, name: "Siddharth Rao" },
  { id: 2, name: "Anjali Menon" },
  { id: 3, name: "Ravi Kumar" },
  { id: 4, name: "Neha Sharma" },
  { id: 5, name: "Karan Patel" },
  { id: 6, name: "Priya Verma" },
  { id: 7, name: "Amit Joshi" },
  { id: 8, name: "Rohit Sharma" },
  { id: 9, name: "Kavya Reddy" },
  { id: 10, name: "Sneha Patel" }
];

const existingBookings = [
    {
        id: 1,
        roomId: 1,
        date: "2025-09-03",
        starttime: "09:00",
        endtime: "10:30",
        title: "Team Standup"
    },
    {
        id: 2,
        roomId: 1,
        date: "2025-09-03",
        starttime: "14:00",
        endtime: "15:30",
        title: "Client Presentation"
    },
    {
        id: 3,
        roomId: 2,
        date: "2025-09-03",
        starttime: "10:00",
        endtime: "12:00",
        title: "Design Review"
    },
    {
        id: 4,
        roomId: 3,
        date: "2025-09-04",
        starttime: "13:00",
        endtime: "14:00",
        title: "HR Meeting"
    }
];

const BookRoomPage:React.FC=()=>{
    const {user}=useAuth();
    const [selectedRoom,setSelectedRoom]=useState<Room|null>(null);
    const [searchTerm,setSearchTerm]=useState("");
    const [capacityFilter,setCapacityFilter]=useState<string>("");
    const [dateFilter, setDateFilter] = useState<string>("");
    const [startTimeFilter, setStartTimeFilter] = useState<string>("");
    const [endTimeFilter,setEndTimeFilter]=useState<string>("");
    const [equipmentFilter,setEquipmentFilter]=useState<string>("");
    const [showAvailableOnly,setShowAvailableOnly]=useState(false);
    const [isBookingFormOpen,setIsBookingFormOpen]=useState(false);
    const [attendeeSearch,setAttendeeSearch]=useState("");
    const [showAttendeeDropdown,setShowAttendeeDropdown]=useState(false);
    const [isSubmitting,setIsSubmitting]=useState(false);
    const [success,setSuccess]=useState(false);
    const [error,setError]=useState('');
    const [isLoadingRooms,setIsLoadingRooms]=useState(false);
    const [roomsData, setRoomsData] = useState<Room[]>([]);

   useEffect(()=>{
           const fetchRooms=async()=>{
               try{
                   const response=await roomService.getAllRooms();
                   setRoomsData(response.rooms);
               }catch(err:any){
                   console.error("Error fetching rooms:",err);
                   setRoomsData([]);
               }finally{
                   setIsLoadingRooms(false);
               }
           };
           fetchRooms();
       },[]);

    const [bookingForm,setBookingForm]=useState<BookingForm>({
        roomid: null,
        date: "",
        starttime: "",
        endtime: "",
        title: "",
        description: "",
        attendees: []
    });

    const getTomorrowDate=()=>{
        const tomorrow=new Date();
        tomorrow.setTime(tomorrow.getDate()+1);
        return tomorrow.toLocaleDateString().split('T')[0];
    };

    const isRoomAvailable=(roomid:number,date:string,starttime:string,endtime:string):boolean=>{
        if(!date||!starttime||!endtime)return true;

        const conflictingBookings=existingBookings.filter(booking=>{
            booking.roomId===roomid && booking.date===date
        });

        for(const booking of conflictingBookings){
            if((starttime >= booking.starttime && starttime < booking.endtime) ||
                (endtime > booking.starttime && endtime <= booking.endtime) ||
                (starttime <= booking.starttime && endtime >= booking.endtime)){
                    return false;
            }
        }
        return true;
    };

    const filteredRooms = roomsData.filter(room => {
        const matchesSearch = room.roomname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            room.roomlocation.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCapacity = !capacityFilter || 
            (capacityFilter === "small" && room.capacity <= 6) ||
            (capacityFilter === "medium" && room.capacity > 6 && room.capacity <= 12) ||
            (capacityFilter === "large" && room.capacity > 12);
        
        const matchesEquipment = !equipmentFilter || 
            room.equipment.some(eq => eq.toLowerCase().includes(equipmentFilter.toLowerCase()));
        
        let matchesAvailability = true;
        if (showAvailableOnly && dateFilter && startTimeFilter && endTimeFilter) {
            matchesAvailability = isRoomAvailable(room.roomid, dateFilter, startTimeFilter,endTimeFilter);
        }
        
        return matchesSearch && matchesCapacity && matchesEquipment && matchesAvailability;
    });

    const handleRoomSelect=(room:Room)=>{
        const isAvailable=!showAvailableOnly||!dateFilter||!startTimeFilter||!endTimeFilter||
            isRoomAvailable(room.roomid,dateFilter,startTimeFilter,endTimeFilter);
        
        if(!isAvailable)return;

        setSelectedRoom(room);
        setBookingForm(prev=>({
            ...prev,
            roomid:room.roomid,
            date:dateFilter||prev.date,
            starttime:startTimeFilter||prev.starttime,
            endtime:endTimeFilter||prev.endtime
        }));
        setIsBookingFormOpen(true);
    };

    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
        setBookingForm(prev=>({
            ...prev,
            [e.target.name]:e.target.value
        }));
        if(error)setError('');
    }

    const addAttendee=(attendee:AttendeeOption)=>{
        if(!bookingForm.attendees.includes(attendee.id)){
            setBookingForm(prev=>({
                ...prev,
                attendees:[...prev.attendees,attendee.id]
            }));
        }
        setAttendeeSearch("");
        setShowAttendeeDropdown(false);
    };

    const removeAttendee=(attendeeId:number)=>{
        setBookingForm(prev=>({
            ...prev,
            attendees:prev.attendees.filter(id=>id!==attendeeId)
        }));
    };

    const filteredAttendees=availableAttendees.filter(attendee=>(
        attendee.name.toLowerCase().includes(attendeeSearch.toLowerCase())
    ));

    const validateForm=():boolean=>{
        if(!bookingForm.title.trim()){
            setError("Meeting title is required");
            return false;
        }

        if(!bookingForm.date){
            setError("Date is required");
            return false;
        }

        if(!bookingForm.starttime||!bookingForm.endtime){
            setError("Start and end times are required");
            return false;
        }

        if(bookingForm.starttime>=bookingForm.endtime){
            setError("End time must be after start time");
            return false;
        }

        return true;
    }

    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault();
        setError("");

        if(!validateForm())return;

        setIsSubmitting(true);

        try{
            await new Promise(resolve=>setTimeout(resolve,2000));
            console.log("Room Booked:",{
                ...bookingForm,
                roomName:selectedRoom?.roomname,
                hostid:user?.userid,
                hostname:user?.name
            });

            setSuccess(true);
            setBookingForm({
                roomid: null,
                date: "",
                starttime: "",
                endtime: "",
                title: "",
                description: "",
                attendees: []
            });
            setSelectedRoom(null);

            setTimeout(()=>{
                setSuccess(false);
                setIsBookingFormOpen(false);
            },3000);
        }catch(err:any){
            setError("Failed to book room. Please try again");
        }finally{
            setIsSubmitting(false);
        }
    };

    const resetForm=()=>{
        setIsBookingFormOpen(false);
        setSelectedRoom(null);
        setBookingForm({
            roomid: null,
            date: "",
            starttime: "",
            endtime: "",
            title: "",
            description: "",
            attendees: []
        });
        setError("");
        setSuccess(false)
    };

    return(
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 dark:from-gray-800 dark:via-gray-800 dark:to-red-900 transition-all duration-500">
            <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                        Book a
                        <span className="block bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                            Room
                        </span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-e-2xl mx-auto mt-4">
                        Find and Book rooms for your meetings
                    </p>
                </div>

                {success && (
                    <div className="mb-8 max-w-md mx-auto">
                        <div className="bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-lg p-4">
                            <div className="flex items-center">
                                <Check className="w-5 h-5 text-green-600 dark:text-green-300 mr-2"/>
                                <p className="text-green-700 dark:text-green-300 font-medium">
                                    Room booked successfully
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mb-8 bg-gradient-to-br from-red-600 to-pink-500 dark:bg-gradient-to-br dark:from-gray-800 dark:to-red-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:gid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        <div className="relative lg:col-span-3">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"/>
                            <input
                                type="text"
                                placeholder="Search rooms."
                                value={searchTerm}
                                onChange={(e)=>setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <select
                            value={capacityFilter}
                            onChange={(e)=>setCapacityFilter(e.target.value)}
                            className="w-full px-5 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus-border-transparent dark:bg-gray-700 dark:text-white">
                                <option value="">Any capacity</option>
                                <option value="Small">Small (1-6 people)</option>
                                <option value="Medium">Medium (7-12 people)</option>
                                <option value="Large">Large (12+ people)</option>
                        </select>

                        <select 
                            value={equipmentFilter}
                            onChange={(e)=>setEquipmentFilter(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                                <option value="">Any Equipment</option>
                                <option value="projector">Projector</option>
                                <option value="video conference">Video Conference</option>
                                <option value="wifi">WiFi</option>
                                <option value="whiteboard">Whiteboard</option>
                                <option value="smart tv">Smart TV</option>
                        </select>

                        <label className="flex items-center space-x-2 px-4 py-2">
                            <input
                                type="checkbox"
                                checked={showAvailableOnly}
                                onChange={(e) => setShowAvailableOnly(e.target.checked)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-300 dark:text-gray-300">Check availability</span>
                        </label>
                    </div>

                    {showAvailableOnly &&(
                        <div className="gird grid-cols-1 md:grid-cols-3 gap-4 mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Date
                                </label>
                                <input 
                                    type='date'
                                    value={dateFilter}
                                    onChange={(e)=>setDateFilter(e.target.value)}
                                    min={getTomorrowDate()}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Start Time
                                </label>
                                <input
                                    type='time'
                                    value={startTimeFilter}
                                    onChange={(e)=>setStartTimeFilter(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    End Time
                                </label>
                                <input
                                    type='time'
                                    value={endTimeFilter}
                                    onChange={(e)=>setEndTimeFilter(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                        </div>
                    )}
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                        Showing {filteredRooms.length} of {roomsData.length} rooms
                        {showAvailableOnly && dateFilter && startTimeFilter && endTimeFilter &&(
                            <span className="ml-2 text-red-600 dark:text-red-400">
                                • Available on {new Date(dateFilter).toLocaleDateString()} from {startTimeFilter} to {endTimeFilter}
                            </span>
                        )}
                    </div>
                </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {filteredRooms.map((room) => {
                        // Check availability for display
                        const isAvailable = !showAvailableOnly || !dateFilter || !startTimeFilter || !endTimeFilter || 
                            isRoomAvailable(room.roomid, dateFilter, startTimeFilter, endTimeFilter);
                        
                        return (
                            <div key={room.roomid} 
                                 className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border p-6 transition-all duration-300 cursor-pointer ${
                                     isAvailable
                                         ? 'border-gray-200 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 hover:border-red-300 dark:hover:border-red-600'
                                         : 'border-red-200 dark:border-red-700 opacity-75'
                                 }`}
                                 onClick={() => handleRoomSelect(room)}>
                                
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                                        {room.roomname}
                                    </h3>
                                    {showAvailableOnly && dateFilter && startTimeFilter && endTimeFilter && (
                                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            isAvailable
                                                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300'
                                                : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
                                        }`}>
                                            {isAvailable ? 'Available' : 'Occupied'}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                                        <Building2 className="w-4 h-4 mr-2" />
                                        <span className="text-sm">{room.roomlocation}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                                        <Users className="w-4 h-4 mr-2" />
                                        <span className="text-sm">Capacity: {room.capacity} people</span>
                                    </div>
                                    {showAvailableOnly && dateFilter && startTimeFilter && endTimeFilter && !isAvailable && (
                                        <div className="flex items-center text-red-600 dark:text-red-400">
                                            <Clock className="w-4 h-4 mr-2" />
                                            <span className="text-sm">Conflict at requested time</span>
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <div className="flex flex-wrap gap-1">
                                        {room.equipment.slice(0, 3).map((equipment, index) => (
                                            <span key={index}
                                                  className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 text-xs rounded-md">
                                                {equipment}
                                            </span>
                                        ))}
                                        {room.equipment.length > 3 && (
                                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-md">
                                                +{room.equipment.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <button className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                                    isAvailable
                                        ? 'bg-red-600 text-white hover:bg-red-700 hover:scale-105'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                                        disabled={!isAvailable}>
                                    {isAvailable ? 'Select Room' : 'Unavailable'}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* No results */}
                {filteredRooms.length === 0 && (
                    <div className="text-center py-12">
                        <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">No rooms match your criteria</p>
                        <p className="text-gray-500 dark:text-gray-500">Try adjusting your search filters</p>
                    </div>
                )}

                {isBookingFormOpen && selectedRoom && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                                    Book {selectedRoom.roomname}
                                </h2>
                                <button
                                    onClick={resetForm}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                {error && (
                                    <div className="bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-lg p-4">
                                        <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                                    </div>
                                )}

                                {/* Meeting Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Meeting Title *
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={bookingForm.title}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        placeholder="Enter meeting title"
                                        required
                                    />
                                </div>

                                <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Description (optional)
                                        </label>
                                        <textarea
                                            name="description"
                                            value={bookingForm.description}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="Enter meeting description"
                                            rows={3}
                                        />
                                        </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Date *
                                        </label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={bookingForm.date}
                                            onChange={handleInputChange}
                                            min={getTomorrowDate()}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="Search and add attendees..."
                                        />

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Start Time *
                                            </label>
                                            <input
                                            type="time"
                                            name="starttime"
                                            value={bookingForm.starttime}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            End Time *
                                            </label>
                                            <input
                                            type="time"
                                            name="endtime"
                                            value={bookingForm.endtime}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                    

                                        {/* Attendees */}
                                        <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Attendees
                                        </label>
                                        <input
                                            type="text"
                                            value={attendeeSearch}
                                            onChange={(e) => {
                                            setAttendeeSearch(e.target.value);
                                            setShowAttendeeDropdown(true);
                                            }}
                                            placeholder="Search and add attendees..."
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                        />

                                        <div className="flex flex-wrap gap-2 mt-2">
                                        {bookingForm.attendees.map((attendeeId) => {
                                            const attendee = availableAttendees.find((a) => a.id === attendeeId);
                                            return (
                                            <div
                                                key={attendeeId}
                                                className="flex items-center bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 px-2 py-1 rounded-full text-sm"
                                            >
                                                {attendee?.name}
                                                <button
                                                type="button"
                                                onClick={() => removeAttendee(attendeeId)}
                                                className="ml-2 text-red-500 hover:text-red-700 dark:hover:text-red-400"
                                                >
                                                ✕
                                                </button>
                                            </div>
                                            );
                                        })}
                                        </div>

                                        {showAttendeeDropdown && attendeeSearch && (
                                            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                                                {filteredAttendees.length > 0 ? (
                                                    filteredAttendees.map((attendee) => (
                                                        <button
                                                            key={attendee.id}
                                                            type="button"
                                                            onClick={() => addAttendee(attendee)}
                                                            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-sm border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                                                            disabled={bookingForm.attendees.includes(attendee.id)}
                                                        >
                                                            <div className="font-medium text-gray-800 dark:text-gray-200">
                                                                {attendee.name}
                                                            </div>
                                                        </button>
                                                    ))
                                                ) : (
                                                    <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                                                        No attendees found
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-700 hover:to-pink-700 focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                Booking...
                                            </div>
                                        ) : (
                                            'Book Room'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookRoomPage

