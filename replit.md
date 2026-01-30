# Rivo - Google-Style App Launcher

## Overview

Rivo is a Google-inspired web application that serves as a unified app launcher and search portal. It features a clean, colorful design with a central search bar and a grid of app icons (AI, Search, Docs, Drive, Sites, Settings). The project follows a full-stack TypeScript architecture with a React frontend and Express backend, using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Animations**: Framer Motion for smooth transitions
- **Build Tool**: Vite with HMR support

The frontend lives in `client/src/` with:
- `pages/` - Route components (Home, SignIn, Placeholder pages)
- `components/` - Reusable components including shadcn/ui in `components/ui/`
- `hooks/` - Custom hooks for data fetching and utilities
- `lib/` - Utility functions and query client configuration

### Backend Architecture
- **Framework**: Express 5 on Node.js
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful endpoints defined in `shared/routes.ts`
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Build**: esbuild for production bundling

The backend lives in `server/` with:
- `index.ts` - Express app setup and middleware
- `routes.ts` - API route handlers
- `storage.ts` - Database abstraction layer
- `db.ts` - Database connection using pg Pool
- `vite.ts` - Vite dev server integration

### Shared Code
The `shared/` directory contains code used by both frontend and backend:
- `schema.ts` - Drizzle database schema definitions
- `routes.ts` - API route contracts with Zod validation

### Data Flow
1. Frontend uses React Query to fetch data from Express API
2. Express routes call storage methods
3. Storage layer uses Drizzle ORM to query PostgreSQL
4. Schema validation via Zod and drizzle-zod

### Authentication
- Simple localStorage-based username storage (demo implementation)
- No password authentication - just username entry
- User state persisted in browser localStorage

## External Dependencies

### Database
- **PostgreSQL**: Primary database via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries and migrations
- **Drizzle Kit**: Database push/migrations via `npm run db:push`

### Frontend Libraries
- **@tanstack/react-query**: Server state management
- **Radix UI**: Accessible UI primitives (dialog, dropdown, tooltip, etc.)
- **Framer Motion**: Animation library
- **Lucide React**: Icon library
- **Wouter**: Client-side routing

### Build & Development
- **Vite**: Development server and production bundler
- **esbuild**: Server-side bundling for production
- **TypeScript**: Type checking across entire codebase
- **Tailwind CSS**: Utility-first styling

### Fonts
- Google Fonts: Outfit (display), Inter (body), DM Sans, Fira Code, Geist Mono