import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding game night database...');

  // Seed some popular board games
  const games = [
    {
      name: 'Settlers of Catan',
      minPlayers: 3,
      maxPlayers: 4,
      duration: 90,
      complexity: 2.3,
      imageUrl:
        'https://cf.geekdo-images.com/W3Bsga_uLP9kO91gZ7H8yw__original/img/M_3Ee8bZ9XEZrpr7TyIMoq_Oecw=/0x0/filters:format(jpeg)/pic2419375.jpg',
      description:
        'A strategic board game about building settlements and trading resources on the island of Catan.',
      bestWith: '3-4 players',
      bggId: 13,
    },
    {
      name: 'Wingspan',
      minPlayers: 1,
      maxPlayers: 5,
      duration: 70,
      complexity: 2.4,
      imageUrl:
        'https://cf.geekdo-images.com/yLZJCVLlIx4c7eJEWUNJ7w__original/img/Vhyb-xchWwc_976A97HKBKBpNvk=/0x0/filters:format(jpeg)/pic4458123.jpg',
      description: 'A competitive bird-collection, engine-building game with stunning artwork.',
      bestWith: '2-4 players',
      bggId: 266192,
    },
    {
      name: 'Azul',
      minPlayers: 2,
      maxPlayers: 4,
      duration: 45,
      complexity: 1.8,
      imageUrl:
        'https://cf.geekdo-images.com/aPSHJO0d0XOpQR5X-wJonw__original/img/-dDXub8LWGBZQ85OdvmTW2myxg4=/0x0/filters:format(jpeg)/pic3718275.jpg',
      description: 'A tile-placement game about decorating the walls of the Royal Palace of Evora.',
      bestWith: '2-3 players',
      bggId: 230802,
    },
    {
      name: 'Ticket to Ride',
      minPlayers: 2,
      maxPlayers: 5,
      duration: 60,
      complexity: 1.8,
      imageUrl:
        'https://cf.geekdo-images.com/ZWJg0dCdrWHxVnc0eFXK8w__original/img/qb3tcj-HLGvzR4NBBSYVE50eJDo=/0x0/filters:format(jpeg)/pic38668.jpg',
      description:
        'A railway-themed board game about connecting cities across the country by rail.',
      bestWith: '3-4 players',
      bggId: 9209,
    },
    {
      name: '7 Wonders',
      minPlayers: 2,
      maxPlayers: 7,
      duration: 30,
      complexity: 2.3,
      imageUrl:
        'https://cf.geekdo-images.com/RvFVTEpnbb4NM7k0IF8V7A__original/img/zruHYU-Nw6pWIUHy-ue9dKbFPwQ=/0x0/filters:format(jpeg)/pic860217.jpg',
      description: 'Build one of the seven great cities of the Ancient World.',
      bestWith: '4-7 players',
      bggId: 68448,
    },
    {
      name: 'Splendor',
      minPlayers: 2,
      maxPlayers: 4,
      duration: 30,
      complexity: 1.8,
      imageUrl:
        'https://cf.geekdo-images.com/rwOMxx4q5yuujIjfpXB-wg__original/img/S7aI3Qp5SfGj1-uyKc1KuEGo-8c=/0x0/filters:format(jpeg)/pic1904079.jpg',
      description: 'A game of chip-collecting and card development set during the Renaissance.',
      bestWith: '3-4 players',
      bggId: 148228,
    },
  ];

  for (const gameData of games) {
    await prisma.game.create({
      data: gameData,
    });
  }

  console.log('Seeded', games.length, 'games successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
