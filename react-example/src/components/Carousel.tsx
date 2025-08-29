import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import type { Room } from "./RoomCard";
import type { Employee } from "./EmployeeCard";

const SmoothCarousel: React.FC<{
    title: string;
    items: (Room | Employee)[];
    currentIndex: number;
    onPrevious: () => void;
    onNext: () => void;
    onJumpTo: (index: number) => void;
    renderCard: (item: Room | Employee, index: number, currentIndex: number) => React.ReactNode;
}> = ({ title, items, currentIndex, onPrevious, onNext, onJumpTo, renderCard }) => {
    const handleDotClick = (index: number) => {
        if (index !== currentIndex) {
            onJumpTo(index);
        }
    }

    return (
        <div className="mb-16" style={{ marginBottom: '400px' }}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 transition-colors duration-300">
                    {title}
                </h2>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                        {currentIndex + 1}-{Math.min(currentIndex + 2, items.length)} of {items.length}
                    </span>
                    <button onClick={onPrevious}
                        disabled={currentIndex === 0}
                        className={`p-2 rounded-full transition-all duration-300 ${
                            currentIndex === 0 
                                ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                                : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:scale-110'
                        }`}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={onNext}
                        disabled={currentIndex >= items.length - 1}
                        className={`p-2 rounded-full transition-all duration-300 ${
                            currentIndex >= items.length - 1 
                                ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                                : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:scale-110'
                        }`}
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="relative h-[400px] flex justify-center items-start pt-8 overflow-hidden">
                <div className="relative w-full max-w-6xl">
                    {items.map((item, index) => {
                        const offset = index - currentIndex;
                        const isVisible = Math.abs(offset) <= 1;
                        const isForeground = index === currentIndex;
                        const isNextBackground = index === currentIndex + 1;
                        const isPrevBackground = index === currentIndex - 1;
                        const isBackground = isNextBackground || isPrevBackground;

                        return (
                            <div key={item.id}
                                className={`absolute transition-all duration-500 ease-in-out left-1/2 ${
                                    isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                } ${
                                    isBackground ? 'pointer-events-none' : ''
                                }`}
                                style={{
                                    transform: `translateX(calc(-50% + ${offset * 200}px)) scale(${isForeground ? 1 : isBackground ? 0.90 : 1})`,
                                    zIndex: isForeground ? 20 : isBackground ? 10 : 0,
                                    opacity: isForeground ? 1 : isBackground ? 0.7 : 0,
                                    filter: isBackground ? 'blur(1px)' : 'none'
                                }}>
                                {renderCard(item, index, currentIndex)}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex justify-center mt-4 space-x-2">
                {items.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                            index === currentIndex 
                                ? 'bg-blue-600 dark:bg-blue-500 scale-125' 
                                : 'bg-gray-300 dark:bg-gray-600 hover:bg-blue-400 dark:hover:bg-blue-500'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default SmoothCarousel;