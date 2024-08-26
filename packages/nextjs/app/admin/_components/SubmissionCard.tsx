"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { Submission } from "~~/services/database/repositories/submissions";
import { postMutationFetcher } from "~~/utils/react-query";
import { notification } from "~~/utils/scaffold-eth";

function getFormattedDateTime(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${month}/${day}/${year} ${hours}:${minutes}`;
}

export const SubmissionCard = ({ submission }: { submission: Submission }) => {
  const { address: connectedAddress } = useAccount();

  const [newComment, setNewComment] = useState("");
  const { mutateAsync: postNewComment } = useMutation({
    mutationFn: (newComment: { comment: string }) =>
      postMutationFetcher(`/api/submissions/${submission.id}/comments`, { body: newComment }),
  });
  const { mutateAsync: postNewVote } = useMutation({
    mutationFn: (newVote: { score: number }) =>
      postMutationFetcher(`/api/submissions/${submission.id}/votes`, { body: newVote }),
  });
  const { mutateAsync: postNewEligible } = useMutation({
    mutationFn: (newEligible: { eligible: boolean; clear: boolean }) =>
      postMutationFetcher(`/api/submissions/${submission.id}/eligible`, { body: newEligible }),
  });
  const { refresh } = useRouter();

  const clientFormAction = async (formData: FormData) => {
    try {
      const comment = formData.get("comment") as string;
      if (!comment) {
        notification.error("Please fill the comment");
        return;
      }

      if (comment.length > 255) {
        notification.error("Comment is too long");
        return;
      }

      await postNewComment({ comment });

      notification.success("Comment submitted successfully!");
      setNewComment("");
      refresh();
    } catch (error: any) {
      if (error instanceof Error) {
        notification.error(error.message);
        return;
      }
      notification.error("Something went wrong");
    }
  };

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

  const setEligible = async (newEligible: boolean) => {
    try {
      const result = await postNewEligible({ eligible: newEligible, clear: false });

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

  const clearEligible = async () => {
    try {
      const result = await postNewEligible({ eligible: false, clear: true });

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
    <div key={submission.id} className="card bg-secondary text-secondary-content border border-primary rounded-none">
      <div className="card-body p-4">
        <h2 className="card-title mb-3 xl:text-2xl">{submission.title}</h2>
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id={`eligible_${submission.id}_false`}
              name={`eligible_${submission.id}`}
              className="radio"
              checked={submission.eligible === false}
              onChange={() => setEligible(false)}
            />
            {submission.eligible === false ? (
              <div
                className="tooltip"
                data-tip={`Set by ${submission.eligibleAdmin} on ${submission.eligibleTimestamp ? getFormattedDateTime(new Date(submission.eligibleTimestamp)) : ""}`}
              >
                <label className="mr-4 ml-1" htmlFor={`eligible_${submission.id}_false`}>
                  Not eligible
                </label>
              </div>
            ) : (
              <label className="mr-4 ml-1" htmlFor={`eligible_${submission.id}_false`}>
                Not eligible
              </label>
            )}
            <input
              type="radio"
              id={`eligible_${submission.id}_true`}
              name={`eligible_${submission.id}`}
              className="radio"
              checked={submission.eligible === true}
              onChange={() => setEligible(true)}
            />
            {submission.eligible === true ? (
              <div
                className="tooltip"
                data-tip={`Set by ${submission.eligibleAdmin} on ${submission.eligibleTimestamp ? getFormattedDateTime(new Date(submission.eligibleTimestamp)) : ""}`}
              >
                <label className="mr-4 ml-1" htmlFor={`eligible_${submission.id}_true`}>
                  Eligible
                </label>
              </div>
            ) : (
              <label className="mr-4 ml-1" htmlFor={`eligible_${submission.id}_true`}>
                Eligible
              </label>
            )}
            {submission.eligible !== undefined && (
              <button className="cursor-pointer underline text-sm ml-3" onClick={clearEligible}>
                Clear
              </button>
            )}
          </div>
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
        {submission.feedback && <p>Extensions feedback: {submission.feedback}</p>}

        <div className="flex items-center">
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
                className="mask mask-star"
                title={(i + 1).toString()}
                checked={score === i + 1}
                key={i}
                onChange={() => vote(i + 1)}
              />
            ))}
            {score > 0 && (
              <label className="cursor-pointer underline text-sm ml-3" htmlFor={`rating_${submission.id}_0`}>
                Clear
              </label>
            )}
          </div>
        </div>

        <div className="collapse">
          <input type="checkbox" />
          <div className="collapse-title text-lg font-medium">{submission.comments.length} comments</div>
          <div className="collapse-content">
            {submission.comments?.map(comment => (
              <div key={comment.id} className="card bg-base-200 text-base-content mb-4">
                <div className="card-body">
                  <Address address={comment.builder} />
                  <p className="m-1">{comment.comment}</p>
                  <p>{comment.createdAt ? getFormattedDateTime(new Date(comment.createdAt)) : "-"}</p>
                </div>
              </div>
            ))}
            <div className="card bg-base-200 text-base-content mb-4">
              <div className="card-body">
                <form action={clientFormAction} className="card-body space-y-3 p-0">
                  <textarea
                    className="p-2 h-32"
                    value={newComment}
                    name="comment"
                    onChange={field => {
                      setNewComment(field.target.value);
                    }}
                  />
                  <button className="btn btn-primary">Add Comment</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="badge badge-accent flex flex-col p-7 px-5 border border-accent-content">
          <div className="text-xl font-bold leading-tight">{scoreAvg}</div>
          <div>{submission.votes.length} votes</div>
        </div>
      </div>
    </div>
  );
};
