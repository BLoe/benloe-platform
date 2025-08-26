-- Insert popular board games
INSERT INTO games (id, name, minPlayers, maxPlayers, duration, complexity, imageUrl, description, bestWith, createdAt, updatedAt) VALUES
('cuid1_game_catan', 'Settlers of Catan', 3, 4, 90, 2.3, 'https://cf.geekdo-images.com/W3Bsga_uLP9kO91gZ7H8yw__original/img/M_3Ee8bZ9XEZrpr7TyIMoq_Oecw=/0x0/filters:format(jpeg)/pic2419375.jpg', 'A strategic board game about building settlements and trading resources on the island of Catan.', '3-4 players', datetime('now'), datetime('now')),
('cuid2_game_wingspan', 'Wingspan', 1, 5, 70, 2.4, 'https://cf.geekdo-images.com/yLZJCVLlIx4c7eJEWUNJ7w__original/img/Vhyb-xchWwc_976A97HKBKBpNvk=/0x0/filters:format(jpeg)/pic4458123.jpg', 'A competitive bird-collection, engine-building game with stunning artwork.', '2-4 players', datetime('now'), datetime('now')),
('cuid3_game_azul', 'Azul', 2, 4, 45, 1.8, 'https://cf.geekdo-images.com/aPSHJO0d0XOpQR5X-wJonw__original/img/-dDXub8LWGBZQ85OdvmTW2myxg4=/0x0/filters:format(jpeg)/pic3718275.jpg', 'A tile-placement game about decorating the walls of the Royal Palace of Evora.', '2-3 players', datetime('now'), datetime('now')),
('cuid4_game_ticket', 'Ticket to Ride', 2, 5, 60, 1.8, 'https://cf.geekdo-images.com/ZWJg0dCdrWHxVnc0eFXK8w__original/img/qb3tcj-HLGvzR4NBBSYVE50eJDo=/0x0/filters:format(jpeg)/pic38668.jpg', 'A railway-themed board game about connecting cities across the country by rail.', '3-4 players', datetime('now'), datetime('now')),
('cuid5_game_7wonders', '7 Wonders', 2, 7, 30, 2.3, 'https://cf.geekdo-images.com/RvFVTEpnbb4NM7k0IF8V7A__original/img/zruHYU-Nw6pWIUHy-ue9dKbFPwQ=/0x0/filters:format(jpeg)/pic860217.jpg', 'Build one of the seven great cities of the Ancient World.', '4-7 players', datetime('now'), datetime('now')),
('cuid6_game_splendor', 'Splendor', 2, 4, 30, 1.8, 'https://cf.geekdo-images.com/rwOMxx4q5yuujIjfpXB-wg__original/img/S7aI3Qp5SfGj1-uyKc1KuEGo-8c=/0x0/filters:format(jpeg)/pic1904079.jpg', 'A game of chip-collecting and card development set during the Renaissance.', '3-4 players', datetime('now'), datetime('now'));

-- Insert some sample events
INSERT INTO events (id, title, gameId, dateTime, location, description, status, creatorId, createdAt, updatedAt) VALUES
('cuid1_event_catan', 'Settlers of Catan Night', 'cuid1_game_catan', datetime('2025-08-26', '+2 hours'), 'Game Room', 'Weekly Catan session - bring your trading skills!', 'OPEN', 'demo-user-1', datetime('now'), datetime('now')),
('cuid2_event_wingspan', 'Wingspan Tournament', 'cuid2_game_wingspan', datetime('2025-08-28', '+1 hour'), 'Community Center', 'Monthly Wingspan tournament with prizes!', 'OPEN', 'demo-user-2', datetime('now'), datetime('now')),
('cuid3_event_azul', 'Azul Championships', 'cuid3_game_azul', datetime('2025-08-30', '+3 hours'), 'Library', 'Compete in the beautiful tile-laying game', 'OPEN', 'demo-user-1', datetime('now'), datetime('now'));

-- Insert some sample commitments
INSERT INTO commitments (id, eventId, userId, status, joinedAt, notes) VALUES
('cuid1_commit_1', 'cuid1_event_catan', 'demo-user-1', 'COMMITTED', datetime('now'), 'Ready to trade!'),
('cuid1_commit_2', 'cuid1_event_catan', 'demo-user-2', 'COMMITTED', datetime('now'), null),
('cuid2_commit_1', 'cuid2_event_wingspan', 'demo-user-2', 'COMMITTED', datetime('now'), 'Bringing my expansion'),
('cuid2_commit_2', 'cuid2_event_wingspan', 'demo-user-3', 'COMMITTED', datetime('now'), null),
('cuid2_commit_3', 'cuid2_event_wingspan', 'demo-user-1', 'WAITLISTED', datetime('now'), null);