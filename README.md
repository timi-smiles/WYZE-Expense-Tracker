# WYZE Expense Manager

A full-stack personal expense tracker built as a technical assessment submission. The application provides a clean dashboard for recording expenses, viewing summaries, and managing spending by category.

## Technology Stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js 15 (App Router), React, TypeScript, Tailwind CSS, shadcn/ui |
| Backend | Next.js Route Handlers (REST API), Auth.js |
| Database | PostgreSQL with Prisma ORM |
| Charts | Recharts |
| Icons | Lucide React |

## Architecture Overview

The project follows a simple layered structure:

- **App Router pages** render the dashboard UI.
- **Route handlers** under `app/api` expose REST endpoints.
- **Server actions/services** in `lib/actions` centralize database access.
- **Validators and utilities** keep request handling consistent.
- **Client components** communicate with the API using reusable fetch helpers.

Data flows from the browser to route handlers, through validation and Prisma, and back as normalized JSON responses.

## Folder Structure

```text
app/
  api/
    expenses/
    summary/
  layout.tsx
  page.tsx
components/
  dashboard/
  forms/
  layout/
  ui/
lib/
  actions/
  constants/
  db/
  utils/
  validators/
prisma/
  migrations/
  schema.prisma
public/
styles/
types/
```

## Features

- Marketing landing page with hero, features, and how-it-works sections
- User registration, sign in, and sign out with secure password hashing
- Private multi-user workspaces (each user sees only their own data)
- Create, read, update, and delete expenses
- Dashboard with summary cards, category chart, and insights panel
- Monthly total and spending-by-category visualization
- Category filtering and expense search
- Currency formatting (USD)
- Expense editing via modal
- Loading, empty, and error states
- Responsive layout with customized shadcn/ui components

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/expenses` | List all expenses (optional `?category=Food`) |
| `POST` | `/api/expenses` | Create a new expense |
| `GET` | `/api/expenses/:id` | Get a single expense |
| `PUT` | `/api/expenses/:id` | Update an expense |
| `DELETE` | `/api/expenses/:id` | Delete an expense |
| `GET` | `/api/summary` | Get total and category summaries |
| `GET` | `/api/dashboard` | Dashboard data, insights, and filtered expenses |
| `POST` | `/api/auth/register` | Create a new user account |

All expense, summary, and dashboard routes require authentication.

### Example Request

```json
POST /api/expenses
{
  "amount": 24.50,
  "category": "Food",
  "description": "Lunch",
  "date": "2025-06-27"
}
```

### Example Summary Response

```json
{
  "data": {
    "total": 124.50,
    "monthlyTotal": 48.00,
    "byCategory": [
      { "category": "Food", "total": 48.00 },
      { "category": "Transport", "total": 76.50 }
    ]
  }
}
```

## Database Schema

### User

| Field | Type | Notes |
| --- | --- | --- |
| `id` | String | Primary key (cuid) |
| `name` | String | Display name |
| `email` | String | Unique login email |
| `passwordHash` | String | Bcrypt hashed password |
| `createdAt` | DateTime | Auto-generated |
| `updatedAt` | DateTime | Auto-updated |

### Expense

| Field | Type | Notes |
| --- | --- | --- |
| `id` | String | Primary key (cuid) |
| `amount` | Decimal(10,2) | Must be greater than 0 |
| `category` | Enum | Food, Transport, Bills, Shopping, Entertainment, Healthcare, Other |
| `description` | String | Optional text, max 500 chars |
| `date` | Date | Expense date |
| `userId` | String | Foreign key to User |
| `createdAt` | DateTime | Auto-generated |
| `updatedAt` | DateTime | Auto-updated |

## Installation

```bash
git clone <repository-url>
cd WYZE-Expense-Tracker
npm install
```

## Environment Variables

Copy the example file and update values for your environment:

```bash
cp .env.example .env
```

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXT_PUBLIC_APP_URL` | Public app URL (e.g. `http://localhost:3000`) |
| `AUTH_SECRET` | Secret used to sign Auth.js session tokens |

## Prisma Setup

Generate the Prisma client:

```bash
npm run db:generate
```

### When to use each command

| Command | Use when |
| --- | --- |
| `npm run db:generate` | After changing `schema.prisma` or on fresh install |
| `npm run db:migrate` | Local development with tracked migrations |
| `npm run db:push` | Quick schema sync without migration history (prototyping) |

Apply migrations locally:

```bash
npm run db:migrate
```

For Vercel Postgres, set `DATABASE_URL` in the Vercel project settings and run migrations during deployment or via CI.

## Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Development Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Generate Prisma client and build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:studio` | Open Prisma Studio |

## Deployment (Vercel)

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Add `DATABASE_URL` from Vercel Postgres (or another PostgreSQL provider).
4. Set `NEXT_PUBLIC_APP_URL` to your production URL.
5. Deploy.

The `build` script runs `prisma generate` automatically.

## Assumptions

- Single-user expense tracking with no authentication
- USD currency formatting
- Categories are fixed and defined in code
- Dates are stored and displayed in `YYYY-MM-DD` format
- PostgreSQL is available locally and in production

## Optional Features Implemented

- Expense editing
- Category filtering
- Currency formatting
- Monthly total

## Future Improvements

- User authentication and multi-user support
- Pagination for large expense lists
- Export to CSV
- Budget targets per category
- Dark mode theme toggle

## Time Spent

Approximate time: **[Add your time here]**

## AI Usage Disclosure

AI assistance was used for scaffolding, documentation drafting, and iterative implementation support. All architectural decisions, code structure, and final implementation were reviewed and refined for clarity and maintainability.

## Troubleshooting

### Database connection errors

- Confirm PostgreSQL is running.
- Verify `DATABASE_URL` in `.env`.
- Run `npm run db:migrate` after changing the schema.

### Prisma client not found

```bash
npm run db:generate
```

### API returns 500 errors

- Check server logs in the terminal.
- Ensure migrations have been applied.
- Confirm the database is reachable from your machine.

### Empty dashboard with errors

- Open browser dev tools and inspect network requests.
- Verify `/api/expenses` and `/api/summary` return `200` responses.
