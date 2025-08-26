import { gameService, eventService, commitmentService } from '../services/database';

function seed() {
  console.log('Seeding database with initial data...');

  // Create sample games
  const games = [
    {
      name: 'Settlers of Catan',
      minPlayers: 3,
      maxPlayers: 4,
      duration: 90,
      complexity: 2.3,
      bggId: 13,
      imageUrl:
        'https://cf.geekdo-images.com/W3Bsga_uLP9kO91gZ7H8yw__original/img/M_3Ee8bZ9XEZrpr7TyIMoq_Oecw=/0x0/filters:format(jpeg)/pic2419375.jpg',
      description:
        'A strategic board game about building settlements and trading resources on the island of Catan.',
      bestWith: '3-4 players',
    },
    {
      name: 'Wingspan',
      minPlayers: 1,
      maxPlayers: 5,
      duration: 70,
      complexity: 2.4,
      bggId: 266192,
      imageUrl:
        'https://cf.geekdo-images.com/yLZJCVLlIx4c7eJEWUNJ7w__original/img/Vhyb-xchWwc_976A97HKBKBpNvk=/0x0/filters:format(jpeg)/pic4458123.jpg',
      description: 'A competitive bird-collection, engine-building game with stunning artwork.',
      bestWith: '2-4 players',
    },
    {
      name: 'Azul',
      minPlayers: 2,
      maxPlayers: 4,
      duration: 45,
      complexity: 1.8,
      bggId: 230802,
      imageUrl:
        'https://cf.geekdo-images.com/aPSHJO0d0XOpQR5X-wJonw__original/img/-dDXub8LWGBZQ85OdvmTW2myxg4=/0x0/filters:format(jpeg)/pic3718275.jpg',
      description: 'A tile-placement game about decorating the walls of the Royal Palace of Evora.',
      bestWith: '2-3 players',
    },
    {
      name: 'Ticket to Ride',
      minPlayers: 2,
      maxPlayers: 5,
      duration: 60,
      complexity: 1.8,
      bggId: 9209,
      imageUrl:
        'https://cf.geekdo-images.com/ZWJg0dCdrWHxVnc0eFXK8w__original/img/qb3tcj-HLGvzR4NBBSYVE50eJDo=/0x0/filters:format(jpeg)/pic38668.jpg',
      description:
        'A railway-themed board game about connecting cities across the country by rail.',
      bestWith: '3-4 players',
    },
    {
      name: '7 Wonders',
      minPlayers: 2,
      maxPlayers: 7,
      duration: 30,
      complexity: 2.3,
      bggId: 68448,
      imageUrl:
        'https://cf.geekdo-images.com/RvFVTEpnbb4NM7k0IF8V7A__original/img/zruHYU-Nw6pWIUHy-ue9dKbFPwQ=/0x0/filters:format(jpeg)/pic860217.jpg',
      description: 'Build one of the seven great cities of the Ancient World.',
      bestWith: '4-7 players',
    },
    {
      name: 'Splendor',
      minPlayers: 2,
      maxPlayers: 4,
      duration: 30,
      complexity: 1.8,
      bggId: 148228,
      imageUrl:
        'https://cf.geekdo-images.com/rwOMxx4q5yuujIjfpXB-wg__original/img/S7aI3Qp5SfGj1-uyKc1KuEGo-8c=/0x0/filters:format(jpeg)/pic1904079.jpg',
      description: 'A game of chip-collecting and card development set during the Renaissance.',
      bestWith: '3-4 players',
    },
  ];

  const createdGames = games.map((gameData) => gameService.create(gameData));
  console.log(`Created ${createdGames.length} games`);

  // Create sample events
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(19, 0, 0, 0);

  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  nextWeek.setHours(18, 30, 0, 0);

  const events = [
    {
      title: 'Settlers of Catan Night',
      gameId: createdGames[0].id,
      dateTime: tomorrow.toISOString(),
      location: 'Community Center - Main Room',
      description:
        'Weekly Catan session! Bring your trading skills and prepare for some strategic gameplay.',
      status: 'OPEN' as const,
      creatorId: 'demo-user-1',
    },
    {
      title: 'Wingspan Tournament',
      gameId: createdGames[1].id,
      dateTime: nextWeek.toISOString(),
      location: 'Local Library - Meeting Room B',
      description:
        'Monthly Wingspan tournament with prizes for the winner! All skill levels welcome.',
      status: 'OPEN' as const,
      creatorId: 'demo-user-2',
    },
  ];

  const createdEvents = events.map((eventData) => eventService.create(eventData));
  console.log(`Created ${createdEvents.length} events`);

  // Create some sample commitments
  if (createdEvents[0]) {
    commitmentService.create({
      eventId: createdEvents[0].id,
      userId: 'demo-user-1',
      status: 'COMMITTED',
      notes: 'Looking forward to this!',
    });

    commitmentService.create({
      eventId: createdEvents[0].id,
      userId: 'demo-user-2',
      status: 'COMMITTED',
    });
  }

  if (createdEvents[1]) {
    commitmentService.create({
      eventId: createdEvents[1].id,
      userId: 'demo-user-2',
      status: 'COMMITTED',
      notes: 'Bringing my expansion pack!',
    });

    commitmentService.create({
      eventId: createdEvents[1].id,
      userId: 'demo-user-3',
      status: 'WAITLISTED',
    });
  }

  console.log('Database seeded successfully!');
}

// Run if called directly
if (require.main === module) {
  seed();
}

export { seed };
