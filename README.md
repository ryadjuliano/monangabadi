## Monang Abadi

Next.js (App Router) + Supabase fullstack app for company profile, admin panel, and client tracking.

### Features

- Public website: landing, services, blog/news, contact, tracking page
- Supabase Auth email/password with roles: `admin`, `staff`, `client`
- Admin: dashboard stats, services CRUD example, order management, tracking timeline
- Client: view own orders, track status
- Database tables: `users`, `services`, `orders`, `tracking_logs`
- Server Actions for mutations

### Setup

1. Copy env:

```bash
cp .env.example .env.local
```

2. Fill Supabase keys in `.env.local`
3. Run SQL from `supabase/schema.sql` in Supabase SQL Editor
4. Start dev server:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.
