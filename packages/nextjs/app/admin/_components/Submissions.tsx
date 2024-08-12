import { SubmissionCard } from "./SubmissionCard";
import { getAllSubmissions } from "~~/services/database/repositories/submissions";

export const Submissions = async () => {
  const submissions = await getAllSubmissions();

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10 space-y-4">
        {submissions?.map(submission => {
          return <SubmissionCard key={submission.id} submission={submission} />;
        })}
      </div>
    </>
  );
};
