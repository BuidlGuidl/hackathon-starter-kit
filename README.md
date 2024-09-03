## Extensions Hackathon Website

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)
- [Docker Engine](https://docs.docker.com/engine/install/)

## Development Quickstart

### 0. Set up environment variables

For local development, in your `.env.local` add the following:

```
NEXT_PUBLIC_SUBMISSION_DEADLINE=YYYY-MM-DDTHH:MM:SS
```

Replace `YYYY-MM-DDTHH:MM:SS` with the actual deadline (e.g., "2024-03-31T23:59:59", deadline must be in UTC).
This variable controls the visibility of the apply button and form submissions.

> Note: For a PROD environment, you can set the deadline in the .env file or set the environment variable in your hosting provider.

### 1. Install dependencies

```
yarn install
```

### 2. Spin up the Postgres database service + create database + seed

```
docker-compose up -d
yarn drizzle-kit push
yarn seed
```

See more info about the database in the section below

### 3. Start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`.

## Database (dev info)

We are using Drizzle with Postgres. You can run `drizzle-kit` from the root with `yarn drizzle-kit`

- To sync your database run `yarn drizzle-kit migrate`
- Tweak `seed.js` if needed + run `yarn seed` (will delete existing data)

To iterate on the database:

- Tweak the schema in `schema.ts`
- `yarn drizzle-kit generate` to create migration files (or use `yarn drizzle-kit push` if you are just tinkering)

You can explore the database with `yarn drizzle-kit studio`
