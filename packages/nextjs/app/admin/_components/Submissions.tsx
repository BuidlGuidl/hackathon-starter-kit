import { SubmissionCard } from "./SubmissionCard";
import { getAllSubmissions } from "~~/services/database/repositories/submissions";

export const Submissions = async () => {
  const submissions = await getAllSubmissions();

  return (
    <div className="px-6">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {submissions?.map(submission => {
          return <SubmissionCard key={submission.id} submission={submission} />;
        })}
      </div>
    </div>
  );
};
