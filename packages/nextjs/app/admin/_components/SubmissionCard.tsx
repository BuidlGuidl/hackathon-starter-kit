"use client";

import { useRouter } from "next/navigation";
import { SubmissionComments } from "./SubmissionComments";
import { SubmissionEligible } from "./SubmissionEligible";
import "./submission-rating.css";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { Submission } from "~~/services/database/repositories/submissions";
import { postMutationFetcher } from "~~/utils/react-query";
import { notification } from "~~/utils/scaffold-eth";

export const SubmissionCard = ({ submission }: { submission: Submission }) => {
  const { address: connectedAddress } = useAccount();

  const { mutateAsync: postNewVote, isPending: isVotePending } = useMutation({
    mutationFn: (newVote: { score: number }) =>
      postMutationFetcher(`/api/submissions/${submission.id}/votes`, { body: newVote }),
  });
  const { refresh } = useRouter();

  const vote = async (newScore: number) => {
    try {
      if (newScore < 0 || newScore > 10) {
        notification.error("Wrong score");
        return;
      }

      const result = await postNewVote({ score: newScore });

      notification.success(result.message);
      refresh();
    } catch (error: any) {
      if (error instanceof Error) {
        notification.error(error.message);
        return;
      }
      notification.error("Something went wrong");
    }
  };

  const scoreAvg =
    submission.votes.length > 0
      ? (submission.votes.map(vote => vote.score).reduce((a, b) => a + b, 0) / submission.votes.length).toFixed(2)
      : "-";
  const currentVote = submission.votes.find(vote => vote.builder === connectedAddress);
  const score = currentVote ? currentVote.score : 0;

  const telegramUser = submission.telegram?.replace("@", "");

  return (
    <div key={submission.id} className="card bg-base-200 text-secondary-content border border-gray-300 rounded-none">
      <SubmissionEligible submission={submission} />
      <div className="card-body p-4 pt-6">
        <h2 className="card-title mb-3 xl:text-2xl">{submission.title}</h2>
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="mt-1 flex shrink-0 gap-3">
            {submission.linkToRepository && (
              <a href={submission.linkToRepository} className="inline-block" target="_blank">
                <img alt="github icon" className="w-6 h-6" src="/icon-github.svg" />
              </a>
            )}

            <a href={submission.linkToVideo} className="inline-block" target="_blank">
              <img alt="youtube icon" className="w-6 h-6" src="/icon-youtube.svg" />
            </a>

            {submission.telegram && (
              <a href={`https://t.me/${telegramUser}`} className="inline-block" target="_blank">
                <img alt="telegram icon" className="w-6 h-6" src="/icon-telegram.svg" />
              </a>
            )}
          </div>

          {submission.builder && <Address address={submission.builder} />}
        </div>

        <p>{submission.description}</p>
        {submission.feedback && <p>Extensions Feedback: {submission.feedback}</p>}

        <div className="divider my-0" />

        <div className="flex items-center justify-between">
          <div className="rating flex items-center">
            <input
              type="radio"
              id={`rating_${submission.id}_0`}
              name={`rating_${submission.id}`}
              className="rating-hidden"
              checked={score === 0}
              onChange={() => vote(0)}
            />
            {[...Array(10)].map((_e, i) => (
              <input
                type="radio"
                name={`rating_${submission.id}`}
                className="mask mask-star-2 star bg-amber-500 peer peer-hover:bg-amber-400"
                title={(i + 1).toString()}
                checked={score === i + 1}
                key={i}
                onChange={() => vote(i + 1)}
              />
            ))}
          </div>
          {score > 0 && (
            <div className="flex items-center">
              {isVotePending && <span className="loading loading-xs"></span>}
              <label
                className={clsx("cursor-pointer underline text-sm ml-2 hover:no-underline", {
                  "text-gray-400 cursor-not-allowed": isVotePending,
                })}
                htmlFor={`rating_${submission.id}_0`}
              >
                Clear
              </label>
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="badge badge-accent flex flex-col shrink-0 p-8 border border-accent-content">
            <div className="text-2xl font-bold">{scoreAvg}</div>
            <div>{submission.votes.length} votes</div>
          </div>
          <SubmissionComments submission={submission} />
        </div>
      </div>
    </div>
  );
};
