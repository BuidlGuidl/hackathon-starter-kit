import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { db } from "~~/services/database/config/postgresClient";
import { comments, submissions } from "~~/services/database/config/schema";

export type SubmissionInsert = InferInsertModel<typeof submissions>;
type Comment = InferInsertModel<typeof comments>;
export type Submission = InferSelectModel<typeof submissions> & { comments: Comment[] };

export async function getAllSubmissions() {
  return await db.query.submissions.findMany({ with: { comments: true } });
}

export async function createSubmission(submission: SubmissionInsert) {
  return await db.insert(submissions).values(submission);
}
