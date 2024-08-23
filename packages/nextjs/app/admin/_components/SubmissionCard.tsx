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

  const scoreAvg =
    submission.votes.length > 0
      ? (submission.votes.map(vote => vote.score).reduce((a, b) => a + b, 0) / submission.votes.length).toFixed(2)
      : "-";
  const currentVote = submission.votes.find(vote => vote.builder === connectedAddress);
  const score = currentVote ? currentVote.score : 0;

  const telegramUser = submission.telegram?.replace("@", "");

  return (
    <div key={submission.id} className="card bg-secondary text-secondary-content border border-primary rounded-none">
      <div className="card-body p-5 xl:p-6">
        <h2 className="card-title mb-4 text-2xl xl:text-3xl">{submission.title}</h2>
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="mt-1 flex shrink-0 gap-3">
            {submission.linkToRepository && (
              <a href={submission.linkToRepository} className="inline-block" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
            )}

            <a href={submission.linkToVideo} className="inline-block" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15 5-3-5-3z" />
              </svg>
            </a>

            {submission.telegram && (
              <a href={`https://t.me/${telegramUser}`} className="inline-block" target="_blank">
                <img alt="telegram logo" className="w-6 h-6" src="/logo-telegram.svg" />
              </a>
            )}
          </div>

          {submission.builder && <Address address={submission.builder} />}
        </div>

        <p>{submission.description}</p>
        {submission.feedback && <p>Extensions feedback: {submission.feedback}</p>}

        <div className="flex mb-4 items-center">
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
          <div className="collapse-title text-xl font-medium">{submission.comments.length} comments</div>
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
        <div className="badge badge-accent flex flex-col p-8 border border-accent-content">
          <div className="text-2xl font-bold">{scoreAvg}</div>
          <div>{submission.votes.length} votes</div>
        </div>
      </div>
    </div>
  );
};
