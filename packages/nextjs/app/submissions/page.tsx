import { SubmissionCard } from "./_components/SubmissionCard";
import type { NextPage } from "next";
import { getAllSubmissions } from "~~/services/database/repositories/submissions";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Submissions",
  description: "Check all the submissions for the SE-2 extensions hackathon.",
});

const Submissions: NextPage = async () => {
  const submissions = await getAllSubmissions();

  return (
    <div className="max-w-7xl container mx-auto px-6">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {submissions.length === 0 && (
          <div role="alert" className="alert col-span-2">
            <span>No submissions yet.</span>
          </div>
        )}
        {submissions.map(submission => {
          return <SubmissionCard key={submission.id} submission={submission} />;
        })}
      </div>
    </div>
  );
};

export default Submissions;
