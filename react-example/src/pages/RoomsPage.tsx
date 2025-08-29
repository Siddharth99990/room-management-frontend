import React, { useState } from "react";
import RoomCard, { type Room } from "../components/RoomCard";
import SmoothCarousel from "../components/Carousel";

export const roomsData: Room[] = [
  {
    id: 1,
    name: "Innovation Hub Delta",
    capacity: 10,
    equipment: ["Whiteboard", "AC", "WiFi", "Smart TV"],
    location: "1st Floor, North Wing",
    available: true,
  },
  {
    id: 2,
    name: "Strategy Room Echo",
    capacity: 16,
    equipment: ["Projector", "Video Conference", "WiFi", "Lighting"],
    location: "4th Floor, South Wing",
    available: false,
  },
  {
    id: 3,
    name: "Design Lab Gamma",
    capacity: 6,
    equipment: ["Sound System", "Smart TV", "AC"],
    location: "2nd Floor, Creative Block",
    available: true,
  },
  {
    id: 4,
    name: "Tech Pod Zeta",
    capacity: 14,
    equipment: ["WiFi", "Whiteboard", "Lighting", "AC"],
    location: "3rd Floor, East Annex",
    available: false,
  },
  {
    id: 5,
    name: "Executive Lounge Theta",
    capacity: 18,
    equipment: ["Projector", "Video Conference", "AC", "WiFi"],
    location: "6th Floor, Central Tower",
    available: true,
  },
  {
    id: 6,
    name: "Collab Space Sigma",
    capacity: 9,
    equipment: ["Smart TV", "Whiteboard", "WiFi"],
    location: "Ground Floor, West Pavilion",
    available: true,
  },
  {
    id: 7,
    name: "Focus Room Omega",
    capacity: 4,
    equipment: ["AC", "WiFi"],
    location: "2nd Floor, Quiet Zone",
    available: false,
  },
  {
    id: 8,
    name: "Boardroom Nova",
    capacity: 22,
    equipment: ["Video Conference", "Projector", "AC", "WiFi"],
    location: "5th Floor, Executive Wing",
    available: true,
  },
  {
    id: 9,
    name: "Creative Den Orion",
    capacity: 7,
    equipment: ["Smart TV", "Lighting", "Sound System"],
    location: "3rd Floor, West Studio",
    available: false,
  },
  {
    id: 10,
    name: "Think Tank Vega",
    capacity: 12,
    equipment: ["Whiteboard", "AC", "WiFi", "Projector"],
    location: "1st Floor, East Wing",
    available: true,
  },
];

const RoomsPage: React.FC = () => {
  const [roomIndex, setRoomIndex] = useState(0);

  const handlePreviousRoom = () => {
    setRoomIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }

  const handleNextRoom = () => {
    setRoomIndex((prev) => (prev < roomsData.length - 1 ? prev + 1 : prev))
  }

  const handleOnJumpTo = (index: number) => {
    setRoomIndex(index);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4 transition-colors duration-300">
            Rooms
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 transition-colors duration-300">
            Browse and book available rooms
          </p>
        </div>

        <SmoothCarousel
          title="Room Cards"
          items={roomsData}
          currentIndex={roomIndex}
          onPrevious={handlePreviousRoom}
          onNext={handleNextRoom}
          onJumpTo={handleOnJumpTo}
          renderCard={(item, index, currentIndex) => (
            <RoomCard
              room={item as Room}
              isActive={index === currentIndex}
            />
          )}
        />
      </div>
    </div>
  )
};

export default RoomsPage;