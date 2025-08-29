import React from "react";
import {Wifi,Volume2,MapPin,Users,Monitor,Lightbulb,Snowflake,Video} from 'lucide-react';

export interface Room{
    id:number;
    name:string;
    capacity:number;
    equipment:string[];
    location:string;
    available:boolean;
}

const getEquipmentIcon=(equipment:string)=>{
    switch(equipment.toLowerCase()){
        case 'wifi':
            return <Wifi className="w-3 h-3 mr-1"/>;
        case 'projector':
            return <Monitor className="w-3 h-3 mr-1"/>;
        case 'smart tv':
            return <Monitor className="w-3 h-3 mr-1"/>;
        case 'sound system':
            return <Volume2 className="w-3 h-3 mr-1"/>;
        case 'ac':
            return <Snowflake className="w-3 h-3 mr-1"/>;
        case 'video conference':
            return <Video className="w-3 h-3 mr-1"/>;
        case 'lighting':
            return <Lightbulb className="w-3 h-3 mr-1"/>;
        case 'whiteboard':
            return<Monitor className="w-3 h-3 mr-1"/>;
        default:
            return null;
    }
};

const RoomCard:React.FC<{room:Room;isActive?:boolean}>=({room,isActive=true})=>{
    return(
        <div className={`bg-white rounded-xl shadow-lg p-6 w-80 border border-gray-100 transition-all duration-300 ${
        isActive ? 'hover:shadow-xl hover:-translate-y-2' : ''}`}>
        
        <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        ID:{room.id}
                    </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{room.name}</h3>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                room.available 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
                {room.available ?'Available':'Occupied'}
            </div>
        </div>

        <div className="space-y-3 mb-4">
            <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0"/>
                <span className="text-sm">{room.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-2 flex-shrink-0"/>
                <span className="text-sm">Capacity:{room.capacity} people</span>
            </div>
        </div>

        <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-2">Equipment ({room.equipment.length})</h4>
            <div className="flex flex-wrap gap-2">
                {room.equipment.map((equipment,index)=>(
                    <span key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md flex items-center transition-all duration-300 hover:bg-blue-200">
                        {getEquipmentIcon(equipment)}
                        {equipment}
                    </span>
                ))}
            </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <button className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${room.available ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105': 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            disabled={!room.available}>
                {room.available ?'Book Room':'Unavailable'}
            </button>
        </div>
    </div>
    );
};

export default RoomCard;