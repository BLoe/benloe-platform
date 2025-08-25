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
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

  const shouldShowYear = (date: Date) => {
    const month = date.getMonth();
    return month === 11 || month === 0; // December or January
  };

  const getPrevMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() - 1);
  const getNextMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1);

  const handleNavigation = (direction: 'prev' | 'next') => {
    if (isAnimating) return;

    setIsAnimating(true);
    setSlideDirection(direction === 'prev' ? 'right' : 'left');

    setTimeout(() => {
      const newDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + (direction === 'prev' ? -1 : 1)
      );
      onMonthChange(newDate);
      setSlideDirection(null);
      setIsAnimating(false);
    }, 300);
  };

  const MonthLabel = ({ date, isCenter, className }: { date: Date; isCenter: boolean; className?: string }) => (
    <div className={clsx('text-center flex-shrink-0', className)}>
      {shouldShowYear(date) && (
        <div className={clsx(
          'text-gray-400 font-medium',
          isCenter ? 'text-sm' : 'text-xs'
        )}>
          {format(date, 'yyyy')}
        </div>
      )}
      <div className={clsx(
        'font-bold text-gray-900',
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
      <div className="relative flex items-center space-x-8">
        {/* Previous Button */}
        <button
          onClick={() => handleNavigation('prev')}
          disabled={isAnimating}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>

        {/* Months Container */}
        <div className="relative overflow-hidden w-80 h-16">
          {/* Current View */}
          <div
            className={clsx(
              'absolute inset-0 flex items-center justify-between px-8 transition-transform duration-300 ease-in-out',
              slideDirection === 'left' && 'transform -translate-x-full',
              slideDirection === 'right' && 'transform translate-x-full'
            )}
          >
            <MonthLabel 
              date={getPrevMonth(currentDate)} 
              isCenter={false}
              className="text-gray-500 cursor-pointer hover:text-gray-700"
            />
            <MonthLabel 
              date={currentDate} 
              isCenter={true}
            />
            <MonthLabel 
              date={getNextMonth(currentDate)} 
              isCenter={false}
              className="text-gray-500 cursor-pointer hover:text-gray-700"
            />
          </div>

          {/* Next View (sliding in from right) */}
          {slideDirection === 'left' && (
            <div className="absolute inset-0 flex items-center justify-between px-8 transform translate-x-full transition-transform duration-300 ease-in-out -translate-x-0">
              <MonthLabel 
                date={currentDate} 
                isCenter={false}
                className="text-gray-500"
              />
              <MonthLabel 
                date={getNextMonth(currentDate)} 
                isCenter={true}
              />
              <MonthLabel 
                date={new Date(currentDate.getFullYear(), currentDate.getMonth() + 2)} 
                isCenter={false}
                className="text-gray-500"
              />
            </div>
          )}

          {/* Previous View (sliding in from left) */}
          {slideDirection === 'right' && (
            <div className="absolute inset-0 flex items-center justify-between px-8 transform -translate-x-full transition-transform duration-300 ease-in-out translate-x-0">
              <MonthLabel 
                date={new Date(currentDate.getFullYear(), currentDate.getMonth() - 2)} 
                isCenter={false}
                className="text-gray-500"
              />
              <MonthLabel 
                date={getPrevMonth(currentDate)} 
                isCenter={true}
              />
              <MonthLabel 
                date={currentDate} 
                isCenter={false}
                className="text-gray-500"
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