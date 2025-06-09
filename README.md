# 2ndhand Kleinanzeigen

A classifieds marketplace built with Next.js, TypeScript, Prisma, and Tailwind CSS.

## Features
- User authentication with GitHub (NextAuth)
- Post, browse, delete, and favorite ads
- Category and location filters
- Responsive UI with Tailwind CSS
- Modern component structure (React Server/Client Components)
- Database access via Prisma ORM

## Tech Stack
- **Next.js** (App Router, SSR/SSG, API routes)
- **TypeScript**
- **Prisma** (with SQLite/PostgreSQL)
- **Tailwind CSS**
- **ShadCN UI** (Dialog, Form, etc.)
- **next-auth** (GitHub OAuth)

## Project Structure
```
app/           # Pages, layouts, API routes
components/    # UI components
lib/           # Helpers, Prisma client, types
prisma/        # Prisma schema & migrations
public/        # Static assets
```

## Setup & Development
1. **Clone the repository**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Create a .env file** (see `.env.example` if available)
   - `DATABASE_URL` for Prisma
   - `GITHUB_ID` and `GITHUB_SECRET` for OAuth
   - `NEXT_PUBLIC_BASE_URL` for API requests
4. **Apply Prisma migrations**
   ```bash
   npx prisma migrate dev
   ```
5. **Start the development server**
   ```bash
   npm run dev
   ```

## Important Scripts
- `npm run dev` – Starts the development server
- `npx prisma studio` – Opens Prisma Studio (DB UI)
- `npm run lint` – Linting
- `npm run test` – Tests (if available)

## Notes
- GitHub OAuth app is required for authentication.
- The database can be run locally (Postgres) or remotely.
- The project uses modern Next.js features (App Router, Server Actions, etc.).

## License
MIT
