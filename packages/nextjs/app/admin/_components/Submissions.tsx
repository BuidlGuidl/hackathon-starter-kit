import { SubmissionCard } from "./SubmissionCard";
import { Submission, getAllSubmissions } from "~~/services/database/repositories/submissions";

export const Submissions = async () => {
  const submissions = await getAllSubmissions();

  const { votes, noVotes } = submissions.reduce(
    (acc, submission) => {
      if (submission.votes.length > 0) {
        acc.votes.push(submission);
      } else {
        acc.noVotes.push(submission);
      }

      return acc;
    },
    {
      votes: [] as Submission[],
      noVotes: [] as Submission[],
    },
  );

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div role="tablist" className="tabs tabs-bordered tabs-lg bg-white">
        <input
          type="radio"
          name="submission_tabs"
          role="tab"
          className="tab whitespace-nowrap"
          aria-label="No Votes"
          defaultChecked
        />
        <div role="tabpanel" className="tab-content py-6">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {noVotes.map(submission => {
              return <SubmissionCard key={submission.id} submission={submission} />;
            })}
          </div>
        </div>

        <input
          type="radio"
          name="submission_tabs"
          role="tab"
          className="tab whitespace-nowrap"
          aria-label="Has Votes"
        />
        <div role="tabpanel" className="tab-content py-6">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {votes.map(submission => {
              return <SubmissionCard key={submission.id} submission={submission} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
