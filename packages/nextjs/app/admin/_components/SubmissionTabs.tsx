"use client";

import { SubmissionCard } from "./SubmissionCard";
import { useSession } from "next-auth/react";
import { useAccount } from "wagmi";
import { Submission, SubmissionWithAvg } from "~~/services/database/repositories/submissions";

const skeletonClasses = "animate-pulse bg-gray-200 rounded-none w-full h-96";

export const SubmissionTabs = ({ submissions }: { submissions: Submission[] }) => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  const { address: connectedAddress } = useAccount();

  const { voted, notVoted, all } = submissions.reduce(
    (acc, submission) => {
      const currentVote = submission.votes.find(vote => vote.builder === connectedAddress);

      const avgScore =
        submission.votes.length > 0
          ? submission.votes.map(vote => vote.score).reduce((a, b) => a + b, 0) / submission.votes.length
          : 0;

      const submissionWithAvg = { ...submission, avgScore };

      acc.all.push(submissionWithAvg);

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
      all: [] as SubmissionWithAvg[],
    },
  );

  const votedLabel = connectedAddress ? `Voted (${voted.length})` : "Voted (-)";
  const notVotedLabel = connectedAddress ? `Not Voted (${notVoted.length})` : "Not Voted (-)";
  const allLabel = `All Submissions (${all.length})`;

  return (
    <div className="max-w-7xl container mx-auto px-6">
      <div role="tablist" className="tabs tabs-bordered tabs-lg">
        {/* Not Voted Tab */}
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
            ) : notVoted.length === 0 ? (
              <div role="alert" className="alert col-span-2">
                <span>There are no submissions to vote on.</span>
              </div>
            ) : (
              notVoted.map(submission => (
                <SubmissionCard key={submission.id} submission={submission} tabName="notVoted" />
              ))
            )}
          </div>
        </div>

        {/* Voted Tab */}
        <input
          type="radio"
          name="submission_tabs"
          role="tab"
          className="tab whitespace-nowrap"
          aria-label={votedLabel}
        />
        <div role="tabpanel" className="tab-content py-6">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {voted.length === 0 ? (
              <div role="alert" className="alert col-span-2">
                <span>You have not voted on any submissions yet.</span>
              </div>
            ) : (
              voted
                .sort((a, b) => b.avgScore - a.avgScore)
                .map(submission => <SubmissionCard key={submission.id} submission={submission} tabName="voted" />)
            )}
          </div>
        </div>

        {/* All Submissions Tab (only for admins) */}
        {isAdmin && (
          <>
            <input
              type="radio"
              name="submission_tabs"
              role="tab"
              className="tab whitespace-nowrap"
              aria-label={allLabel}
            />
            <div role="tabpanel" className="tab-content py-6">
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {all.length === 0 ? (
                  <div role="alert" className="alert col-span-2">
                    <span>There are no submissions yet.</span>
                  </div>
                ) : (
                  all
                    .sort((a, b) => b.avgScore - a.avgScore)
                    .map(submission => <SubmissionCard key={submission.id} submission={submission} tabName="all" />)
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
