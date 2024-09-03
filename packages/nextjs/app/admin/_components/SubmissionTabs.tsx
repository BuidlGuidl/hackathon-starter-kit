"use client";

import { SubmissionCard } from "./SubmissionCard";
import { useAccount } from "wagmi";
import { Submission, SubmissionWithAvg } from "~~/services/database/repositories/submissions";

const skeletonClasses = "animate-pulse bg-gray-200 rounded-none w-full h-96";

export const SubmissionTabs = ({ submissions }: { submissions: Submission[] }) => {
  const { address: connectedAddress } = useAccount();

  const { voted, notVoted } = submissions.reduce(
    (acc, submission) => {
      // Connected address has voted
      const currentVote = submission.votes.find(vote => vote.builder === connectedAddress);

      const avgScore =
        submission.votes.length > 0
          ? submission.votes.map(vote => vote.score).reduce((a, b) => a + b, 0) / submission.votes.length
          : 0;

      const submissionWithAvg = { ...submission, avgScore };

      if (currentVote) {
        acc.voted.push(submissionWithAvg);
      } else {
        acc.notVoted.push(submissionWithAvg);
      }

      return acc;
    },
    {
      voted: [] as SubmissionWithAvg[],
      notVoted: [] as SubmissionWithAvg[],
    },
  );

  const votedLabel = connectedAddress ? `Voted (${voted.length})` : "Voted (-)";
  const notVotedLabel = connectedAddress ? `Not Voted (${notVoted.length})` : "Not Voted (-)";

  return (
    <div className="max-w-7xl container mx-auto px-6">
      <div role="tablist" className="tabs tabs-bordered tabs-lg">
        <input
          type="radio"
          name="submission_tabs"
          role="tab"
          className="tab whitespace-nowrap"
          aria-label={notVotedLabel}
          defaultChecked
        />
        <div role="tabpanel" className="tab-content py-6">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {!connectedAddress ? (
              <>
                <div className={skeletonClasses}></div>
                <div className={skeletonClasses}></div>
                <div className={skeletonClasses}></div>
              </>
            ) : (
              notVoted.map(submission => {
                return <SubmissionCard key={submission.id} submission={submission} />;
              })
            )}
            {notVoted.length === 0 && (
              <div role="alert" className="alert col-span-2">
                <span>There are no submissions to vote on.</span>
              </div>
            )}
          </div>
        </div>

        <input
          type="radio"
          name="submission_tabs"
          role="tab"
          className="tab whitespace-nowrap"
          aria-label={votedLabel}
        />
        <div role="tabpanel" className="tab-content py-6">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {voted.length === 0 && (
              <div role="alert" className="alert col-span-2">
                <span>You have not voted on any submissions yet.</span>
              </div>
            )}
            {voted
              .sort((a, b) => b.avgScore - a.avgScore)
              .map(submission => {
                return <SubmissionCard key={submission.id} submission={submission} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
