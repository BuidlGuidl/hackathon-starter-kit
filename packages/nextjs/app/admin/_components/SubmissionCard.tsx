"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Address } from "~~/components/scaffold-eth";
import { Submission } from "~~/services/database/repositories/submissions";
import { postMutationFetcher } from "~~/utils/react-query";
import { notification } from "~~/utils/scaffold-eth";

export const SubmissionCard = ({ submission, refetch }: { submission: Submission; refetch: any }) => {
  const [newComment, setNewComment] = useState("");
  const { mutateAsync: postNewComment } = useMutation({
    mutationFn: (newComment: { comment: string }) =>
      postMutationFetcher(`/api/submissions/${submission.id}/comments`, { body: newComment }),
  });

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
      refetch();
    } catch (error: any) {
      if (error instanceof Error) {
        notification.error(error.message);
        return;
      }
      notification.error("Something went wrong");
    }
  };

  return (
    <div key={submission.id} className="card bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title">{submission.title}</h2>
        {submission.linkToRepository && (
          <a href={submission.linkToRepository} className="link" target="_blank">
            {submission.linkToRepository}
          </a>
        )}
        <p>{submission.description}</p>
        {submission.builder && <Address address={submission.builder} />}
        <div className="collapse">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">{submission.comments.length} comments</div>
          <div className="collapse-content">
            {submission.comments &&
              submission.comments.map(comment => (
                <div key={comment.id} className="card bg-base-200 text-base-content mb-4">
                  <div className="card-body">
                    <Address address={comment.builder} />
                    <p className="m-1">{comment.comment}</p>
                    <p>{comment.createdAt?.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            <div className="card bg-base-200 text-base-content mb-4">
              <div className="card-body">
                <form action={clientFormAction} className="card-body space-y-3">
                  <textarea
                    className="p-2"
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
      </div>
    </div>
  );
};
