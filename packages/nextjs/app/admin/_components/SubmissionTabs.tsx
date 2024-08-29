"use client";

import { SubmissionCard } from "./SubmissionCard";
import { useAccount } from "wagmi";
import { Submission } from "~~/services/database/repositories/submissions";

const skeletonClasses = "animate-pulse bg-gray-200 rounded-none w-full h-96";

export const SubmissionTabs = ({ submissions }: { submissions: Submission[] }) => {
  const { address: connectedAddress } = useAccount();

  const { voted, notVoted } = submissions.reduce(
    (acc, submission) => {
      // Connected address has voted
      const currentVote = submission.votes.find(vote => vote.builder === connectedAddress);

      if (currentVote) {
        acc.voted.push(submission);
      } else {
        acc.notVoted.push(submission);
      }

      return acc;
    },
    {
      voted: [] as Submission[],
      notVoted: [] as Submission[],
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
            {voted.map(submission => {
              return <SubmissionCard key={submission.id} submission={submission} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
