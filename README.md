# CarSpec Search

A specs-first car search engine — filter vehicles by performance metrics.

## Stack: Next.js 15 + TypeScript + Tailwind CSS + Neon (PostgreSQL) + Prisma 5

## Getting Started

```bash
npm install
cp .env.example .env   # add your Neon DATABASE_URL
npx prisma db push
npm run db:seed
npm run dev
```

## Features
- Filter by HP, torque, 0-60, drivetrain, fuel type, body style, transmission, price
- Car detail pages with full spec sheets
- Side-by-side comparison tool (2-3 cars) with best-value highlighting
- Affiliate links (CarGurus, AutoTrader, TrueCar, Cars.com) on every detail page

## Deploy
Set `DATABASE_URL` in Vercel environment variables and deploy from GitHub.