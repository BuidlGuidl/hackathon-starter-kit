import { SubmissionCard } from "./SubmissionCard";
import { getAllSubmissions } from "~~/services/database/repositories/submissions";

export const Submissions = async () => {
  const submissions = await getAllSubmissions();
  const submissionsWithVotes = submissions.filter(submission => submission.votes.length > 0);
  const submissionsWithoutVotes = submissions.filter(submission => submission.votes.length === 0);

  return (
    <div className="px-6">
      <div role="tablist" className="tabs tabs-bordered tabs-lg bg-white">
        <input
          type="radio"
          name="submission_tabs"
          role="tab"
          className="tab whitespace-nowrap"
          aria-label="Not Voted"
          defaultChecked
        />
        <div role="tabpanel" className="tab-content py-6">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {submissionsWithoutVotes?.map(submission => {
              return <SubmissionCard key={submission.id} submission={submission} />;
            })}
          </div>
        </div>

        <input type="radio" name="submission_tabs" role="tab" className="tab whitespace-nowrap" aria-label="Voted" />
        <div role="tabpanel" className="tab-content py-6">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {submissionsWithVotes?.map(submission => {
              return <SubmissionCard key={submission.id} submission={submission} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
