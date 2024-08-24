"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
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

export const SubmissionComments = ({ submission }: { submission: Submission }) => {
  const [newComment, setNewComment] = useState("");
  const { mutateAsync: postNewComment } = useMutation({
    mutationFn: (newComment: { comment: string }) =>
      postMutationFetcher(`/api/submissions/${submission.id}/comments`, { body: newComment }),
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

  return (
    <div className="drawer drawer-end">
      <input id={`comments_drawer_${submission.id}`} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor={`comments_drawer_${submission.id}`}
          className="drawer-button btn btn-sm btn-ghost font-semibold text-slate-700"
        >
          {submission.comments.length} Comments
        </label>
      </div>
      <div className="drawer-side z-20">
        <label
          htmlFor={`comments_drawer_${submission.id}`}
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="bg-base-200 text-base-content min-h-full w-96 py-4 px-5">
          <h3 className="font-bold text-lg">{submission.title}</h3>
          {submission.comments?.map(comment => (
            <div
              key={comment.id}
              className="card rounded-md bg-base-100 border border-slate-400 text-base-content mt-4"
            >
              <div className="card-body py-2 px-3 text-sm">
                <p className="m-0">{comment.comment}</p>
                <div className="flex justify-between text-slate-500">
                  <p className="m-0 text-xs">
                    {comment.createdAt ? getFormattedDateTime(new Date(comment.createdAt)) : "-"}
                  </p>
                  <Address size="xs" address={comment.builder} />
                </div>
              </div>
            </div>
          ))}

          <form className="mt-6" action={clientFormAction}>
            <label className="form-control">
              <textarea
                className="textarea textarea-bordered px-3 h-24 text-sm"
                placeholder="Enter Comment"
                value={newComment}
                name="comment"
                onChange={field => {
                  setNewComment(field.target.value);
                }}
              />
            </label>
            <button className="mt-4 btn btn-sm btn-accent">Add Comment</button>
          </form>
        </div>
      </div>
    </div>
  );
};
