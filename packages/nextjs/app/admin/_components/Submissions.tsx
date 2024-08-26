import { SubmissionTabs } from "./SubmissionTabs";
import { getAllSubmissions } from "~~/services/database/repositories/submissions";

export const Submissions = async () => {
  const submissions = await getAllSubmissions();
  return <SubmissionTabs submissions={submissions} />;
};
