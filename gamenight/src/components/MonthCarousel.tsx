import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import clsx from 'clsx';

interface MonthCarouselProps {
  currentDate: Date;
  onMonthChange: (newDate: Date) => void;
  onTodayClick: () => void;
}

export default function MonthCarousel({ currentDate, onMonthChange, onTodayClick }: MonthCarouselProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right' | null>(null);

  const shouldShowYear = (date: Date) => {
    const month = date.getMonth();
    return month === 11 || month === 0; // December or January
  };

  const getPrevMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() - 1);
  const getNextMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1);

  const handleNavigation = (direction: 'prev' | 'next') => {
    if (isAnimating) return;

    setIsAnimating(true);
    setAnimationDirection(direction === 'next' ? 'left' : 'right');
    
    setTimeout(() => {
      const newDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + (direction === 'prev' ? -1 : 1)
      );
      onMonthChange(newDate);
      setIsAnimating(false);
      setAnimationDirection(null);
    }, 400);
  };

  // Create month labels with their data
  const prevMonth = getPrevMonth(currentDate);
  const nextMonth = getNextMonth(currentDate);
  const afterNextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2);
  const beforePrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 2);

  const MonthDisplay = ({ 
    date, 
    basePosition, 
    isCenter,
    onClick
  }: { 
    date: Date; 
    basePosition: 'left' | 'center' | 'right';
    isCenter: boolean;
    onClick?: () => void;
  }) => (
    <div 
      className={clsx(
        'absolute text-center transition-all duration-400 ease-in-out',
        onClick && 'cursor-pointer',
        // Base positions (no animation)
        !isAnimating && basePosition === 'left' && 'left-0',
        !isAnimating && basePosition === 'center' && 'left-1/2 transform -translate-x-1/2', 
        !isAnimating && basePosition === 'right' && 'right-0',
        
        // Animation positions when sliding left (next month)
        isAnimating && animationDirection === 'left' && basePosition === 'left' && '-left-20 opacity-0',
        isAnimating && animationDirection === 'left' && basePosition === 'center' && 'left-0',
        isAnimating && animationDirection === 'left' && basePosition === 'right' && 'left-1/2 transform -translate-x-1/2',
        
        // Animation positions when sliding right (prev month)  
        isAnimating && animationDirection === 'right' && basePosition === 'left' && 'left-1/2 transform -translate-x-1/2',
        isAnimating && animationDirection === 'right' && basePosition === 'center' && 'right-0', 
        isAnimating && animationDirection === 'right' && basePosition === 'right' && '-right-20 opacity-0',
        
        // Text colors
        isCenter ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
      )}
      onClick={onClick}
    >
      {shouldShowYear(date) && (
        <div className={clsx(
          'text-gray-400 font-medium transition-all duration-400',
          isCenter ? 'text-sm' : 'text-xs'
        )}>
          {format(date, 'yyyy')}
        </div>
      )}
      <div className={clsx(
        'font-bold transition-all duration-400',
        isCenter ? 'text-2xl' : 'text-sm'
      )}>
        {format(date, 'MMMM')}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Today Button */}
      <button
        onClick={onTodayClick}
        disabled={isAnimating}
        className="px-4 py-2 text-sm text-indigo-600 hover:text-indigo-700 border border-indigo-200 rounded-md hover:bg-indigo-50 transition-colors disabled:opacity-50"
      >
        Today
      </button>

      {/* Month Carousel */}
      <div className="flex items-center space-x-8">
        {/* Previous Button */}
        <button
          onClick={() => handleNavigation('prev')}
          disabled={isAnimating}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>

        {/* Months Container */}
        <div className="relative w-80 h-16 flex items-center overflow-hidden">
          {/* Main visible months */}
          <MonthDisplay 
            date={prevMonth}
            basePosition="left"
            isCenter={isAnimating && animationDirection === 'right'}
            onClick={() => handleNavigation('prev')}
          />
          <MonthDisplay 
            date={currentDate}
            basePosition="center"
            isCenter={!isAnimating}
          />
          <MonthDisplay 
            date={nextMonth}
            basePosition="right"
            isCenter={isAnimating && animationDirection === 'left'}
            onClick={() => handleNavigation('next')}
          />
          
          {/* Incoming month from right during left slide */}
          {isAnimating && animationDirection === 'left' && (
            <div className="absolute right-0 transform translate-x-full transition-all duration-400 ease-in-out translate-x-0">
              <MonthDisplay 
                date={afterNextMonth}
                basePosition="right"
                isCenter={false}
              />
            </div>
          )}
          
          {/* Incoming month from left during right slide */}
          {isAnimating && animationDirection === 'right' && (
            <div className="absolute left-0 transform -translate-x-full transition-all duration-400 ease-in-out translate-x-0">
              <MonthDisplay 
                date={beforePrevMonth}
                basePosition="left"
                isCenter={false}
              />
            </div>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handleNavigation('next')}
          disabled={isAnimating}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}