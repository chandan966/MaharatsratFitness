# Crea Maharatsrat Fitness

Full-stack gym platform starter: Next.js frontend, Express REST API, Prisma ORM, and PostgreSQL.

## Requirements

- Node.js 20.9 or newer
- npm 10 or newer
- Docker Desktop, or a PostgreSQL 16 server

## Local setup

1. Copy apps/api/.env.example to apps/api/.env and apps/web/.env.example to apps/web/.env.local.
2. Start PostgreSQL with docker compose up -d postgres.
3. Install the web and API packages with npm run install:all.
4. Generate Prisma client with npm run db:generate.
5. Apply the checked-in schema migration with npm run db:migrate.
6. Load starter plans, programs, trainers, classes, and upcoming times with npm run db:seed.
7. Start both services with npm run dev.

The website runs at http://localhost:3000 and the API at http://localhost:4000. API health check: http://localhost:4000/api/health.

## Integrations

Environment examples contain local development values only. Keep real secrets in private .env files. Razorpay, Google OAuth, email, media storage, and production deployment credentials are left for the owner to configure.

## Foundation included

- Public pages for the gym, programs, trainers, memberships, class schedule, and contact.
- Member registration/login with password hashing and an HTTP-only JWT cookie.
- PostgreSQL models for users/roles, trainers, plans/subscriptions, programs/classes/schedules/bookings, attendance, workouts, progress, payments/invoices, reviews, coupons, notifications, gallery, contact, and admin logs.
- Public read endpoints for plans, programs, trainers, and schedules, plus authenticated booking and contact endpoints.
- Seed data for local development.

Local seed admin: admin@creafitness.local / CreaDev!2026. This password is for local development only; change it before sharing the database. Docker is optional if you already have PostgreSQL.
