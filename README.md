## Extensions Hackathon Platform

Hackathon Platform used by the BuidlGuidl to host the Extension Hackathon on AUG 20th - SEP 2nd, 2024.

https://extensions.buidlguidl.com/

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)
- [Docker Engine](https://docs.docker.com/engine/install/)

## Development Quickstart

1. Install dependencies

```
yarn install
```

2. Spin up the Postgres database service + create database + seed

```
docker-compose up -d
yarn drizzle-kit push
yarn seed
```

See more info about the database in the section below

3. Start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`.

## Enabling Submissions and Voting

Submission and Voting processes are disabled by default.

To enable the features, you need to set the following environment variables:

- `NEXT_PUBLIC_SUBMISSIONS_ENABLED`: Set to `true` to enable submissions
- `NEXT_PUBLIC_VOTING_ENABLED`: Set to `true` to enable voting

You can set these variables in your `.env.local` file for local development:

```
NEXT_PUBLIC_SUBMISSIONS_ENABLED=true
NEXT_PUBLIC_VOTING_ENABLED=true
```

For production, set these variables in your hosting provider's environment configuration.

If you want to change this default behavior, you can modify the logic in your scaffold config file located at `packages/nextjs/scaffold.config.ts`. Look for the `submissionsEnabled` and `votingEnabled` properties in the `scaffoldConfig` object.

## Database (dev info)

We are using Drizzle with Postgres. You can run `drizzle-kit` from the root with `yarn drizzle-kit`

- To sync your database run `yarn drizzle-kit migrate`
- Tweak `seed.js` if needed + run `yarn seed` (will delete existing data)

To iterate on the database:

- Tweak the schema in `schema.ts`
- `yarn drizzle-kit generate` to create migration files (or use `yarn drizzle-kit push` if you are just tinkering)

You can explore the database with `yarn drizzle-kit studio`
