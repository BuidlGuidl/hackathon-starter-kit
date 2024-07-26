import { InferInsertModel } from "drizzle-orm";
import { db } from "~~/services/database/config/postgresClient";
import { submissions } from "~~/services/database/config/schema";

export type SubmissionInsert = InferInsertModel<typeof submissions>;

export async function getAllSubmissions() {
  return await db.select().from(submissions);
}

export async function createSubmission(submission: SubmissionInsert) {
  return await db.insert(submissions).values(submission);
}
