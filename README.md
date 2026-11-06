# Crea Fitness Platform

This repository contains the Crea Fitness website, its Express API, and the PostgreSQL database schema in an npm workspaces monorepo.

## Project structure

```text
apps/
  web/       Next.js fitness website
  api/       Express API for authentication, memberships, classes, bookings, and contact messages
packages/
  database/
    prisma/  PostgreSQL schema, migrations, and seed data
scripts/
  dev.mjs    Starts the fitness website and API
```

## Requirements

- Node.js 20.9 or newer
- npm 10 or newer
- Docker Desktop, or a PostgreSQL 16 server

## Local setup

1. Copy `apps/api/.env.example` to `apps/api/.env` and `apps/web/.env.example` to `apps/web/.env.local`.
2. Start PostgreSQL with `docker compose up -d postgres`.
3. Install dependencies with `npm install`.
4. Generate the Prisma client with `npm run db:generate`.
5. Apply the schema migration with `npm run db:migrate`.
6. Load the starter fitness data with `npm run db:seed`.
7. Start the website and API with `npm run dev`.

The fitness website runs at http://localhost:3000 and the API at http://localhost:4000. API health check: http://localhost:4000/api/health.

Run `npm run build` to build the website and type-check the API.

## Integrations

Environment examples contain local development values only. Keep real secrets in private `.env` files. Payment, OAuth, email, media storage, and production deployment credentials are left for the owner to configure.

## API foundation

- Member registration and login with password hashing and an HTTP-only JWT cookie.
- PostgreSQL models for users and roles, trainers, memberships, programs, classes, schedules, bookings, attendance, workouts, progress, payments, invoices, reviews, coupons, notifications, gallery, contact messages, and admin logs.
- Public read endpoints for memberships, programs, trainers, and schedules, plus authenticated booking and contact endpoints.
- Seed data for local development.

Docker is optional if you already have PostgreSQL.
