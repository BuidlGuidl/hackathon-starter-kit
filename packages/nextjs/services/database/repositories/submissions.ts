import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { db } from "~~/services/database/config/postgresClient";
import { comments, submissions, votes } from "~~/services/database/config/schema";

export type SubmissionInsert = InferInsertModel<typeof submissions>;
type Comment = InferInsertModel<typeof comments>;
type Vote = InferInsertModel<typeof votes>;
export type Submission = InferSelectModel<typeof submissions> & { comments: Comment[]; votes: Vote[] };

export async function getAllSubmissions() {
  return await db.query.submissions.findMany({ with: { comments: true, votes: true } });
}

export async function createSubmission(submission: SubmissionInsert) {
  return await db.insert(submissions).values(submission);
}
