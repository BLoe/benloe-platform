import { useState, useMemo, memo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface MonthCarouselProps {
  onMonthChange: (newDate: Date) => void;
  onTodayClick: () => void;
}

function MonthCarousel({ onMonthChange, onTodayClick }: MonthCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(2);
  const [baseDate] = useState(new Date()); // Never changes - just the starting point
  const [isAnimating, setIsAnimating] = useState(false);

  // Static slots that never change
  const MONTH_SLOTS = useMemo(
    () => [
      { id: 'slot-0', position: -2 },
      { id: 'slot-1', position: -1 },
      { id: 'slot-2', position: 0 },
      { id: 'slot-3', position: 1 },
      { id: 'slot-4', position: 2 },
    ],
    []
  );

  // Calculate date for each slot based on activeIndex navigation
  const getSlotDate = (slotPosition: number) => {
    const monthsFromBase = activeIndex - 2 + slotPosition; // activeIndex 2 = center = baseDate
    return new Date(baseDate.getFullYear(), baseDate.getMonth() + monthsFromBase);
  };

  // Get the currently active date (center slot)
  const getCurrentActiveDate = () => {
    return getSlotDate(0); // Position 0 is always the center slot
  };

  // Notify parent when active month changes
  useEffect(() => {
    const activeDate = getCurrentActiveDate();
    onMonthChange(activeDate);
  }, [activeIndex]);

  const shouldShowYear = (date: Date) => {
    const month = date.getMonth();
    return month === 11 || month === 0; // December or January
  };

  const handleNext = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % MONTH_SLOTS.length);

    setTimeout(() => setIsAnimating(false), 400);
  };

  const handlePrev = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + MONTH_SLOTS.length) % MONTH_SLOTS.length);

    setTimeout(() => setIsAnimating(false), 400);
  };

  const handleMonthClick = (clickedIndex: number) => {
    if (isAnimating) return;

    const distance = clickedIndex - activeIndex;
    const wrappedDistance =
      distance > 2
        ? distance - MONTH_SLOTS.length
        : distance < -2
          ? distance + MONTH_SLOTS.length
          : distance;

    if (wrappedDistance === 1) {
      handleNext();
    } else if (wrappedDistance === -1) {
      handlePrev();
    }
  };

  const handleTodayClick = () => {
    if (isAnimating) return;

    // Reset to initial state (today is baseDate, activeIndex 2 is center)
    setActiveIndex(2);
    onTodayClick();
  };

  const getSlotPosition = (slotIndex: number, activeIndex: number) => {
    const distance = slotIndex - activeIndex;
    const wrappedDistance =
      distance > 2
        ? distance - MONTH_SLOTS.length
        : distance < -2
          ? distance + MONTH_SLOTS.length
          : distance;
    return wrappedDistance * 80;
  };

  const getSlotScale = (slotIndex: number, activeIndex: number) => {
    return slotIndex === activeIndex ? 1 : 0.85;
  };

  const getSlotFontSize = (slotIndex: number, activeIndex: number) => {
    return slotIndex === activeIndex ? '1.125rem' : '0.875rem';
  };

  return (
    <div className="flex flex-col items-center space-y-6 max-w-full">
      {/* Today Button */}
      <button
        onClick={handleTodayClick}
        className="px-4 py-2 text-sm text-indigo-600 hover:text-indigo-700 border border-indigo-200 rounded-md hover:bg-indigo-50 transition-colors"
      >
        Today
      </button>

      {/* Month Carousel */}
      <div className="relative w-64 h-20 flex items-center justify-center overflow-hidden">
        {MONTH_SLOTS.map((slot, index) => {
          const slotDate = getSlotDate(slot.position);
          const x = getSlotPosition(index, activeIndex);
          const scale = getSlotScale(index, activeIndex);
          const fontSize = getSlotFontSize(index, activeIndex);
          const isActive = index === activeIndex;

          const distance = Math.abs(index - activeIndex);
          const wrappedDistance = Math.min(distance, MONTH_SLOTS.length - distance);
          const isVisible = wrappedDistance <= 1;

          return (
            <motion.div
              key={slot.id}
              className={`absolute text-center cursor-pointer select-none ${
                isActive ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
              initial={{ fontSize, scale, x }}
              animate={{ fontSize, scale, x }}
              transition={
                isVisible
                  ? {
                      type: 'spring',
                      stiffness: 400,
                      damping: 35,
                      duration: 0.4,
                    }
                  : {
                      duration: 0,
                    }
              }
              onClick={(e) => {
                e.stopPropagation();
                handleMonthClick(index);
              }}
              whileHover={!isActive && isVisible ? { scale: scale * 1.05 } : {}}
              whileTap={isVisible ? { scale: scale * 0.95 } : {}}
            >
              {shouldShowYear(slotDate) && (
                <div className="text-gray-400 font-medium text-xs">{format(slotDate, 'yyyy')}</div>
              )}
              <div className="font-bold">{format(slotDate, 'MMM')}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(MonthCarousel);
