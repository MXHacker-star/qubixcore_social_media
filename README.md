# QubixCore Social Media & Content Manager

Premium dashboard for managing multi-client social media operations, content planning, approvals, and analytics.

## Quick Start

```bash
npm install
npm run db:push
npm run db:seed
npm run dev
```

Open `http://localhost:3000`.

## Demo Login

- Email: `admin@qubixcore.com`
- Password: `Qubixcore2026!`

## Environment

Copy `.env.example` to `.env` and set:

- `DATABASE_URL`
- `AUTH_SECRET`

If using Supabase, use the **Transaction pooler** connection string for `DATABASE_URL`.

## Vercel Deployment Checklist

1. Go to Vercel → Project → Settings → Environment Variables
2. Add `DATABASE_URL` and `AUTH_SECRET`
3. Redeploy

## Scripts

- `npm run db:push` — create/update SQLite schema
- `npm run db:seed` — seed demo data
