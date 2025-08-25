# Game Night Scheduler - AI-Assisted Development Plan

## Project Context

Building a board game scheduling app using AI code generation to solve the commitment problem in game nights. Focus on architectural dependencies and technical build order for optimal AI-assisted development workflow.

## Core Problem & Solution

**Problem**: Board games require specific player counts, but traditional "open invites" lead to wrong group sizes
**Solution**: Commitment-based scheduling where players commit to specific game/date combinations with enforced player limits

## Technical Architecture

### Stack Decision: Modern Web App

- **Frontend**: React with TypeScript for type safety and component reusability
- **Backend**: Node.js + Express with TypeScript
- **Database**: SQLite with Prisma ORM for schema management and type generation
- **Styling**: Tailwind CSS + Headless UI components
- **Build**: Vite for fast development
- **Deployment**: PM2 on /var/apps/gamenight.benloe.com

**Rationale**: AI tools work best with TypeScript for code generation, Prisma generates types from schema, modern React patterns are well-represented in training data.

### Database Schema

```prisma
model User {
  id          String   @id @default(cuid())
  name        String
  email       String?  @unique
  createdAt   DateTime @default(now())

  createdEvents Event[] @relation("EventCreator")
  commitments   Commitment[]
}

model Game {
  id          String @id @default(cuid())
  name        String
  minPlayers  Int
  maxPlayers  Int
  duration    Int?   // minutes
  complexity  Float? // 1-5 BGG weight
  bggId       Int?   @unique
  imageUrl    String?

  events Event[]
}

model Event {
  id          String   @id @default(cuid())
  title       String?
  dateTime    DateTime
  location    String?
  description String?
  status      EventStatus @default(OPEN)
  createdAt   DateTime @default(now())

  game        Game   @relation(fields: [gameId], references: [id])
  gameId      String
  creator     User   @relation("EventCreator", fields: [creatorId], references: [id])
  creatorId   String

  commitments Commitment[]
}

model Commitment {
  id       String @id @default(cuid())
  status   CommitmentStatus @default(COMMITTED)
  joinedAt DateTime @default(now())

  event   Event  @relation(fields: [eventId], references: [id], onDelete: Cascade)
  eventId String
  user    User   @relation(fields: [userId], references: [id])
  userId  String

  @@unique([eventId, userId])
}

enum EventStatus {
  OPEN
  FULL
  CANCELLED
  COMPLETED
}

enum CommitmentStatus {
  COMMITTED
  WAITLISTED
  DECLINED
}
```

## Build Order Dependencies

### Foundation Layer (No Dependencies)

1. **Database Schema & Migrations**: Prisma schema, migrations, seed data
2. **Type Definitions**: Generated Prisma types + custom app types
3. **Basic API Routes**: CRUD operations for games, events, users

### Data Layer (Requires Foundation)

4. **Game Data Integration**: BoardGameGeek API client, game seeding
5. **User Session Management**: Simple session-based auth (no OAuth complexity initially)
6. **Event Logic**: Business rules for player count validation, commitment handling

### API Layer (Requires Data Layer)

7. **REST Endpoints**:
   - `/api/events` - CRUD + join/leave actions
   - `/api/games` - Search and game details
   - `/api/users` - Profile management
8. **Real-time Updates**: WebSocket connections for live commitment updates

### Frontend Foundation (Can Start in Parallel)

9. **Component System**: Base components (Button, Card, Modal) with Tailwind + HeadlessUI
10. **State Management**: Zustand store for events, games, user state
11. **API Client**: Axios/fetch wrapper with TypeScript interfaces

### Core Features (Requires API + Frontend Foundation)

12. **Event Feed**: List view with filtering, search, infinite scroll
13. **Event Creation**: Multi-step form with game search, date picker
14. **Event Details**: Join/leave actions, participant list, real-time updates
15. **User Profile**: Created events, joined events, commitment history

### Polish Layer (Requires Core Features)

16. **Mobile Optimization**: Touch interactions, responsive layout
17. **Error Handling**: Toast notifications, loading states, error boundaries
18. **Performance**: Lazy loading, caching, optimistic updates

## AI Code Generation Strategy

### High-Value AI Tasks

- **Prisma Schema Generation**: From requirements to complete schema
- **API Route Boilerplate**: CRUD operations with proper error handling
- **React Component Generation**: From mockups to TypeScript components
- **Type Safety**: Generate types from API responses
- **Form Validation**: Zod schemas for form validation
- **Test Generation**: Unit tests for business logic

### Domain-Specific Considerations

- **Board Game Data**: Use BGG XML API for authoritative game data
- **Date/Time Handling**: Account for timezone complexity in scheduling
- **Concurrency**: Handle simultaneous commitment attempts
- **Validation**: Enforce player count constraints at database level

## Development Workflow for AI Assistance

### Iterative Build Approach

1. **Schema First**: Generate database schema, then build API to match
2. **API First**: Create endpoints with mock data, then build frontend
3. **Component Library**: Build reusable components before page assembly
4. **Type-Driven**: Use TypeScript errors to guide AI completions

### Code Generation Prompts Structure

- Include full context of existing code structure
- Specify exact TypeScript interfaces expected
- Reference existing patterns in codebase
- Include business rules and validation requirements

## Technical Debt Prevention

### AI-Assisted Refactoring Checkpoints

- After database schema stabilizes: Generate comprehensive types
- After API routes complete: Consolidate error handling patterns
- After core components built: Extract common patterns to shared utilities
- Before polish phase: Performance audit and optimization

### Maintainability Patterns

- Consistent file naming and folder structure
- Centralized configuration management
- Proper error boundaries and fallback states
- Comprehensive TypeScript coverage

## Deployment Architecture

```
/var/apps/gamenight.benloe.com/
├── server/          # Express API
├── client/          # React app (built to dist/)
├── prisma/          # Database schema and migrations
├── shared/          # Shared types and utilities
└── package.json     # Monorepo with workspaces
```

### Caddy Configuration

```
gamenight.benloe.com {
  reverse_proxy /api/* localhost:3001
  reverse_proxy /* localhost:3000
}
```

## Ready to Build

**Next Decision Point**: Start with database schema and API foundation, or begin with frontend mockups to clarify UX requirements?

**Recommended First Step**: Generate Prisma schema and initial API routes - this establishes the data model that everything else depends on.

---

_Architecture optimized for AI-assisted development with clear dependency chains and type safety throughout._
