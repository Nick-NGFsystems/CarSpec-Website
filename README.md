# CarSpec Search

A specs-first car search engine where users filter vehicles by performance metrics (horsepower, torque, 0-60 time, drivetrain, etc.) rather than browsing by brand or model.

## Tech Stack

- **Framework:** Next.js 15 + TypeScript
- **Styling:** Tailwind CSS 3
- **Database:** Neon (PostgreSQL) + Prisma 5
- **Hosting:** Vercel

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd carspec-search
npm install
```

### 2. Set up the database

Create a [Neon](https://neon.tech) database (free tier works), then copy `.env.example` to `.env` and fill in your connection string:

```bash
cp .env.example .env
```

```
DATABASE_URL="postgresql://user:password@host/carspec?sslmode=require"
```

### 3. Push schema and seed data

```bash
npx prisma db push
npm run db:seed
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

- **Filter/Search UI** — HP range, cylinders, drivetrain, fuel type, body style, 0-60, price
- **Car Detail Pages** — Full specs for each vehicle
- **Comparison Tool** — Side-by-side spec comparison of 2-3 cars with "best" highlighting
- **Affiliate Links** — CarGurus, AutoTrader, TrueCar, Cars.com links on every detail page

## Project Structure

```
src/
  app/
    page.tsx            # Homepage with search & filters
    layout.tsx          # Root layout with nav/footer
    api/cars/route.ts   # Search API endpoint
    car/[id]/page.tsx   # Individual car detail page
    compare/page.tsx    # Side-by-side comparison
  components/
    FilterPanel.tsx     # Filter sidebar
    CarCard.tsx         # Car result card
    SortBar.tsx         # Sort controls
  lib/
    prisma.ts           # Prisma client singleton
    types.ts            # TypeScript interfaces
    affiliates.ts       # Affiliate link generator
prisma/
  schema.prisma         # Database schema
  seed.ts               # Seed data (50 cars)
```

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Set `DATABASE_URL` in your Vercel environment variables.

## Monetization (TODO)

- Replace affiliate link URLs in `src/lib/affiliates.ts` with your actual partner tracking URLs
- Add display ads once traffic scales
- Optional premium "garage" feature (saved searches, alerts)
