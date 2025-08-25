import { useState } from 'react';
import { CalendarDaysIcon, UsersIcon, ClockIcon } from '@heroicons/react/24/outline';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, isToday } from 'date-fns';
import { useRequireAuth } from '../hooks/useRequireAuth';
import clsx from 'clsx';

// Mock data for demonstration
const mockEvents = [
  {
    id: '1',
    title: 'Settlers of Catan Night',
    dateTime: '2025-08-25T19:00:00',
    game: { name: 'Settlers of Catan', minPlayers: 3, maxPlayers: 4 },
    creator: { name: 'John Doe' },
    commitments: [
      { user: { name: 'John Doe' }, status: 'COMMITTED' },
      { user: { name: 'Jane Smith' }, status: 'COMMITTED' },
    ],
    status: 'OPEN',
  },
  {
    id: '2',
    title: 'Wingspan Tournament',
    dateTime: '2025-08-27T18:30:00',
    game: { name: 'Wingspan', minPlayers: 2, maxPlayers: 5 },
    creator: { name: 'Alice Johnson' },
    commitments: [
      { user: { name: 'Alice Johnson' }, status: 'COMMITTED' },
      { user: { name: 'Bob Wilson' }, status: 'COMMITTED' },
      { user: { name: 'Carol Davis' }, status: 'COMMITTED' },
    ],
    status: 'OPEN',
  },
];

export default function GameNightCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { withAuth } = useRequireAuth();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEventsForDay = (day: Date) => {
    return mockEvents.filter(event => 
      isSameDay(new Date(event.dateTime), day)
    );
  };

  const handleScheduleGameNight = () => {
    withAuth(() => {
      alert('Opening game night scheduler...');
    }, {
      message: 'You need to sign in to schedule a game night. Would you like to sign in now?'
    });
  };

  const handleJoinEvent = (eventId: string) => {
    withAuth(() => {
      alert(`Joining event ${eventId}...`);
    }, {
      message: 'You need to sign in to join a game night. Would you like to sign in now?'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 sm:items-center">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Game Night Calendar</h1>
          <p className="text-gray-600 mt-2">Schedule and join board game nights with friends</p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <button
            onClick={handleScheduleGameNight}
            className="inline-flex items-center px-3 py-2 sm:px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Plan a Game Night
          </button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-700"
          >
            Today
          </button>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
          >
            Next
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="bg-gray-50 py-2 px-3 text-center text-xs font-semibold text-gray-700">
              {day}
            </div>
          ))}
          
          {calendarDays.map((day) => {
            const dayEvents = getEventsForDay(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isDayToday = isToday(day);

            return (
              <div
                key={day.toString()}
                className={clsx(
                  'min-h-[100px] bg-white p-2',
                  !isCurrentMonth && 'bg-gray-50 text-gray-400'
                )}
              >
                <div className={clsx(
                  'text-sm font-medium mb-1',
                  isDayToday && 'text-indigo-600'
                )}>
                  {format(day, 'd')}
                </div>
                
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="mb-1 p-1 bg-indigo-100 rounded text-xs hover:bg-indigo-200 cursor-pointer transition-colors"
                    onClick={() => alert(`Event details for: ${event.title}`)}
                  >
                    <div className="font-medium text-indigo-900 truncate">
                      {event.title || event.game.name}
                    </div>
                    <div className="text-indigo-700">
                      {format(new Date(event.dateTime), 'HH:mm')}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events List */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Game Nights</h3>
        <div className="space-y-4">
          {mockEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-gray-900">
                    {event.title || event.game.name}
                  </h4>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <CalendarDaysIcon className="h-4 w-4 mr-1" />
                      {format(new Date(event.dateTime), 'MMM d, yyyy')}
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {format(new Date(event.dateTime), 'h:mm a')}
                    </div>
                    <div className="flex items-center">
                      <UsersIcon className="h-4 w-4 mr-1" />
                      {event.commitments.length}/{event.game.maxPlayers} players
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Hosted by {event.creator.name}
                  </p>
                </div>
                <div className="ml-6 flex flex-col space-y-2">
                  <button
                    onClick={() => handleJoinEvent(event.id)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Join Game
                  </button>
                  <span className={clsx(
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    event.status === 'OPEN' && 'bg-green-100 text-green-800',
                    event.status === 'FULL' && 'bg-red-100 text-red-800'
                  )}>
                    {event.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}