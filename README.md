This is a [Next.js](https://nextjs.org) to-do app with [Turso](https://turso.tech) database, [Drizzle ORM](https://orm.drizzle.team), and [shadcn/ui](https://ui.shadcn.com).

## Getting Started

### 1. Set up environment variables

Create a `.env.local` file in the root directory:

```bash
TURSO_DATABASE_URL=libsql://your-database-name.turso.io
TURSO_AUTH_TOKEN=your-auth-token-here
```

Get your Turso credentials from the [Turso dashboard](https://turso.tech).

### 2. Push database schema

```bash
bun run db:push
```

### 3. Run the development server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Commands

- `bun run db:generate` - Generate migration files
- `bun run db:push` - Push schema changes to Turso

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
