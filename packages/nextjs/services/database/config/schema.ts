import { relations, sql } from "drizzle-orm";
import { integer, pgTable, primaryKey, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const builders = pgTable("builders", {
  id: varchar("id", { length: 256 }).primaryKey(),
  role: varchar("role", { length: 256 }).notNull(),
});

export const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  title: varchar("name", { length: 256 }).notNull(),
  description: text("description").notNull(),
  linkToRepository: varchar("link_to_repository", { length: 256 }).notNull(),
  submissionTimestamp: timestamp("submission_timestamp")
    .default(sql`now()`)
    .notNull(),
  builder: varchar("builder_id", { length: 256 })
    .references(() => builders.id)
    .notNull(),
});

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  submission: integer("submission_id")
    .references(() => submissions.id)
    .notNull(),
  builder: varchar("builder_id", { length: 256 })
    .references(() => builders.id)
    .notNull(),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`now()`)
    .notNull(),
});

export const votes = pgTable(
  "votes",
  {
    submission: integer("submission_id")
      .references(() => submissions.id)
      .notNull(),
    builder: varchar("builder_id", { length: 256 })
      .references(() => builders.id)
      .notNull(),
    score: integer("score").notNull(),
    createdAt: timestamp("created_at")
      .default(sql`now()`)
      .notNull(),
  },
  table => {
    return {
      pk: primaryKey({ columns: [table.submission, table.builder] }),
    };
  },
);

export const submissionsRelations = relations(submissions, ({ many }) => ({
  comments: many(comments),
  votes: many(votes),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  submission: one(submissions, { fields: [comments.submission], references: [submissions.id] }),
}));

export const votesRelations = relations(votes, ({ one }) => ({
  submission: one(submissions, { fields: [votes.submission], references: [submissions.id] }),
  builder: one(builders, { fields: [votes.builder], references: [builders.id] }),
}));
