import { sql } from "drizzle-orm";
import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

// TODO: Define the right schema.
export const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  title: varchar("name", { length: 256 }),
  description: text("description"),
  submissionTimestamp: timestamp("submission_timestamp").default(sql`now()`),
  builder: varchar("builder_id", { length: 256 }).references(() => builders.id),
});

export const builders = pgTable("builders", {
  id: varchar("id", { length: 256 }).primaryKey(),
  role: varchar("role", { length: 256 }),
});
