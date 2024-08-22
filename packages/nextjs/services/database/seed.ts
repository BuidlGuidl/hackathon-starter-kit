import { builders, comments, submissions, votes } from "./config/schema";
import * as schema from "./config/schema";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import * as path from "path";
import { Client } from "pg";

dotenv.config({ path: path.resolve(__dirname, "../../.env.development") });

const VERCEL_DB_STRING = "verceldb";
const MAX_SUBMISSIONS_BEFORE_FORCE = 20;

const client = new Client({
  connectionString: process.env.POSTGRES_URL,
});

// TODO: protect, only for dev.
async function seed() {
  if (process.env.POSTGRES_URL?.includes(VERCEL_DB_STRING)) {
    console.error("Cannot seed production database");
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const flags = args.filter(arg => arg.startsWith("--"));
  const isForce = flags.includes("--force");

  await client.connect();
  const db = drizzle(client, { schema });

  const submissionsCount = await db.query.submissions.findMany({
    columns: {
      id: true,
    },
    limit: 21,
  });

  if (submissionsCount.length > MAX_SUBMISSIONS_BEFORE_FORCE && !isForce) {
    console.error("Database has more than 20 submission, use --force flag to reseed");
    process.exit(1);
  }

  await db.delete(comments).execute();
  await db.delete(votes).execute();
  await db.delete(submissions).execute();
  await db.delete(builders).execute();

  db.insert(builders)
    .values([
      { id: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", role: "admin" },
      { id: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", role: "user" },
    ])
    .execute();

  const newSubmissions = await db
    .insert(submissions)
    .values([
      {
        title: "First submission",
        description: "This is the first submission",
        linkToRepository: "https://github.com/BuidlGuidl/grants.buidlguidl.com",
        builder: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        linkToVideo: "https://www.youtube.com/watch?v=4hl61AmEGwU",
        telegram: "@buidlguidl",
        feedback: "This is the feedback",
      },
      {
        title: "Second submission",
        description: "This is the second submission",
        linkToRepository: "https://github.com/BuidlGuidl/extensions-hackathon",
        builder: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        linkToVideo: "https://www.youtube.com/watch?v=4hl61AmEGwU",
      },
    ])
    .returning({ insertedId: submissions.id })
    .execute();

  await db.insert(comments).values([
    {
      builder: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      comment: "This is a comment",
      submission: newSubmissions[0].insertedId,
    },
    {
      builder: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      comment: "This is another comment",
      submission: newSubmissions[0].insertedId,
    },
  ]);

  await db.insert(votes).values([
    {
      builder: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      submission: newSubmissions[0].insertedId,
      score: 9,
    },
    {
      builder: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      submission: newSubmissions[1].insertedId,
      score: 7,
    },
  ]);

  console.log("Database seeded successfully");
}

seed()
  .catch(error => {
    console.error("Error seeding database:", error);
  })
  .finally(async () => {
    await client.end();
    process.exit();
  });
