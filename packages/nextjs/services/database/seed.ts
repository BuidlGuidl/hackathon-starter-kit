import { builders, submissions } from "./config/schema";
import * as schema from "./config/schema";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import * as path from "path";
import { Client } from "pg";

dotenv.config({ path: path.resolve(__dirname, "../../.env.development") });

// TODO: protect, only for dev.
async function seed() {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL,
  });

  await client.connect();
  const db = drizzle(client, { schema });

  await db.delete(builders).execute();
  db.insert(builders)
    .values([
      { id: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", role: "admin" },
      { id: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", role: "user" },
    ])
    .execute();

  await db.delete(submissions).execute();
  await db
    .insert(submissions)
    .values([
      {
        title: "First submission",
        description: "This is the first submission",
        builder: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      },
      {
        title: "Second submission",
        description: "This is the second submission",
        builder: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      },
    ])
    .execute();

  console.log("Database seeded successfully");
}

seed()
  .catch(error => {
    console.error("Error seeding database:", error);
  })
  .finally(() => {
    process.exit();
  });
