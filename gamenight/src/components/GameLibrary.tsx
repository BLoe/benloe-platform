import { useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon, UsersIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useRequireAuth } from '../hooks/useRequireAuth';
import clsx from 'clsx';

// Mock game data
const mockGames = [
  {
    id: '1',
    name: 'Settlers of Catan',
    minPlayers: 3,
    maxPlayers: 4,
    duration: 90,
    complexity: 2.3,
    imageUrl: 'https://via.placeholder.com/200x300?text=Catan',
    description: 'A strategic board game about building settlements and trading resources.',
    bestWith: '3-4 players',
  },
  {
    id: '2',
    name: 'Wingspan',
    minPlayers: 1,
    maxPlayers: 5,
    duration: 70,
    complexity: 2.4,
    imageUrl: 'https://via.placeholder.com/200x300?text=Wingspan',
    description: 'A competitive bird-collection, engine-building game.',
    bestWith: '2-4 players',
  },
  {
    id: '3',
    name: 'Azul',
    minPlayers: 2,
    maxPlayers: 4,
    duration: 45,
    complexity: 1.8,
    imageUrl: 'https://via.placeholder.com/200x300?text=Azul',
    description: 'A tile-placement game about decorating the walls of the Royal Palace.',
    bestWith: '2-3 players',
  },
  {
    id: '4',
    name: 'Ticket to Ride',
    minPlayers: 2,
    maxPlayers: 5,
    duration: 60,
    complexity: 1.8,
    imageUrl: 'https://via.placeholder.com/200x300?text=Ticket',
    description: 'A railway-themed board game about connecting cities across the country.',
    bestWith: '3-4 players',
  },
];

export default function GameLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComplexity, setSelectedComplexity] = useState<number | null>(null);
  const [selectedPlayerCount, setSelectedPlayerCount] = useState<number | null>(null);
  const { withAuth } = useRequireAuth();

  const filteredGames = mockGames.filter((game) => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesComplexity =
      selectedComplexity === null ||
      (game.complexity && Math.floor(game.complexity) === selectedComplexity);
    const matchesPlayerCount =
      selectedPlayerCount === null ||
      (selectedPlayerCount >= game.minPlayers && selectedPlayerCount <= game.maxPlayers);

    return matchesSearch && matchesComplexity && matchesPlayerCount;
  });

  const handleAddGame = () => {
    withAuth(
      () => {
        alert('Opening add game form...');
      },
      {
        message: 'You need to sign in to add games to the library. Would you like to sign in now?',
      }
    );
  };

  const handleScheduleWithGame = (_gameId: string, gameName: string) => {
    withAuth(
      () => {
        alert(`Scheduling game night with ${gameName}...`);
      },
      {
        message: 'You need to sign in to schedule a game night. Would you like to sign in now?',
      }
    );
  };

  const getComplexityLabel = (complexity: number) => {
    if (complexity <= 1.5) return 'Light';
    if (complexity <= 2.5) return 'Medium';
    if (complexity <= 3.5) return 'Heavy';
    return 'Very Heavy';
  };

  const getComplexityColor = (complexity: number) => {
    if (complexity <= 1.5) return 'bg-green-100 text-green-800';
    if (complexity <= 2.5) return 'bg-yellow-100 text-yellow-800';
    if (complexity <= 3.5) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Game Library</h1>
          <p className="text-gray-600 mt-2">
            Browse and discover board games for your next game night
          </p>
        </div>
        <button
          onClick={handleAddGame}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          Add Game
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Games
            </label>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                id="search"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Complexity Filter */}
          <div>
            <label htmlFor="complexity" className="block text-sm font-medium text-gray-700 mb-2">
              Complexity
            </label>
            <select
              id="complexity"
              value={selectedComplexity || ''}
              onChange={(e) =>
                setSelectedComplexity(e.target.value ? Number(e.target.value) : null)
              }
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">All Complexities</option>
              <option value="1">Light (1-1.5)</option>
              <option value="2">Medium (1.5-2.5)</option>
              <option value="3">Heavy (2.5-3.5)</option>
              <option value="4">Very Heavy (3.5+)</option>
            </select>
          </div>

          {/* Player Count Filter */}
          <div>
            <label htmlFor="players" className="block text-sm font-medium text-gray-700 mb-2">
              Player Count
            </label>
            <select
              id="players"
              value={selectedPlayerCount || ''}
              onChange={(e) =>
                setSelectedPlayerCount(e.target.value ? Number(e.target.value) : null)
              }
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Any Player Count</option>
              <option value="2">2 Players</option>
              <option value="3">3 Players</option>
              <option value="4">4 Players</option>
              <option value="5">5+ Players</option>
            </select>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <img
              src={game.imageUrl}
              alt={game.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{game.name}</h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <UsersIcon className="h-4 w-4 mr-1" />
                  {game.minPlayers === game.maxPlayers
                    ? `${game.minPlayers} players`
                    : `${game.minPlayers}-${game.maxPlayers} players`}
                  {game.bestWith && (
                    <span className="ml-2 text-indigo-600 font-medium">
                      (Best: {game.bestWith})
                    </span>
                  )}
                </div>

                {game.duration && (
                  <div className="flex items-center text-sm text-gray-600">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {game.duration} minutes
                  </div>
                )}

                {game.complexity && (
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">Complexity:</span>
                    <span
                      className={clsx(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        getComplexityColor(game.complexity)
                      )}
                    >
                      {getComplexityLabel(game.complexity)} ({game.complexity})
                    </span>
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{game.description}</p>

              <button
                onClick={() => handleScheduleWithGame(game.id, game.name)}
                className="w-full inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Schedule Game Night
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No games found matching your criteria.</p>
          <button
            onClick={handleAddGame}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Add the first game
          </button>
        </div>
      )}
    </div>
  );
}
