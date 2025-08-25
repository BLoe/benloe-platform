import { useState } from 'react';
import { motion } from 'framer-motion';
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

  const shouldShowYear = (date: Date) => {
    const month = date.getMonth();
    return month === 11 || month === 0; // December or January
  };

  const getPrevMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() - 1);
  const getNextMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1);

  const handleNavigation = (direction: 'prev' | 'next') => {
    if (isAnimating) return;

    setIsAnimating(true);
    
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + (direction === 'prev' ? -1 : 1)
    );
    
    onMonthChange(newDate);
    
    // Reset animation state after transition
    setTimeout(() => setIsAnimating(false), 500);
  };

  const MonthLabel = ({ 
    date, 
    position,
    onClick
  }: { 
    date: Date; 
    position: 'prev' | 'current' | 'next';
    onClick?: () => void;
  }) => {
    const isCenter = position === 'current';
    
    return (
      <motion.div
        layout
        className={clsx(
          'text-center cursor-pointer select-none',
          isCenter ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
        )}
        onClick={onClick}
        whileHover={!isCenter ? { scale: 1.05 } : {}}
        whileTap={{ scale: 0.95 }}
        transition={{ 
          layout: { duration: 0.4, ease: "easeInOut" },
          scale: { duration: 0.15 }
        }}
      >
        {shouldShowYear(date) && (
          <motion.div 
            layout
            className={clsx(
              'text-gray-400 font-medium',
              isCenter ? 'text-sm' : 'text-xs'
            )}
            transition={{ layout: { duration: 0.4, ease: "easeInOut" } }}
          >
            {format(date, 'yyyy')}
          </motion.div>
        )}
        <motion.div 
          layout
          className={clsx(
            'font-bold',
            isCenter ? 'text-2xl' : 'text-sm'
          )}
          transition={{ layout: { duration: 0.4, ease: "easeInOut" } }}
        >
          {format(date, 'MMMM')}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col items-center space-y-6 max-w-full">
      {/* Today Button */}
      <motion.button
        onClick={onTodayClick}
        disabled={isAnimating}
        className="px-4 py-2 text-sm text-indigo-600 hover:text-indigo-700 border border-indigo-200 rounded-md hover:bg-indigo-50 transition-colors disabled:opacity-50"
        whileTap={{ scale: 0.95 }}
      >
        Today
      </motion.button>

      {/* Month Carousel - Mobile Friendly Layout */}
      <div className="flex items-center justify-center w-full max-w-sm px-4">
        {/* Previous Button */}
        <motion.button
          onClick={() => handleNavigation('prev')}
          disabled={isAnimating}
          className="flex-shrink-0 p-2 mr-4 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </motion.button>

        {/* Months Container - Fixed width, responsive */}
        <div className="flex-1 min-w-0">
          <motion.div 
            className="flex justify-between items-center px-2"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <MonthLabel 
              date={getPrevMonth(currentDate)}
              position="prev"
              onClick={() => handleNavigation('prev')}
            />
            <MonthLabel 
              date={currentDate}
              position="current"
            />
            <MonthLabel 
              date={getNextMonth(currentDate)}
              position="next"
              onClick={() => handleNavigation('next')}
            />
          </motion.div>
        </div>

        {/* Next Button */}
        <motion.button
          onClick={() => handleNavigation('next')}
          disabled={isAnimating}
          className="flex-shrink-0 p-2 ml-4 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </motion.button>
      </div>
    </div>
  );
}