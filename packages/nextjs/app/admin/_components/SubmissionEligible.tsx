"use client";

import { useRouter } from "next/navigation";
import "./submission-rating.css";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { Submission } from "~~/services/database/repositories/submissions";
import { getFormattedDateTime } from "~~/utils/date";
import { postMutationFetcher } from "~~/utils/react-query";
import { notification } from "~~/utils/scaffold-eth";

const eligibleLabelStyles = "label cursor-pointer text-sm justify-start gap-2";

export const SubmissionEligible = ({ submission }: { submission: Submission }) => {
  const { mutateAsync: postNewEligible } = useMutation({
    mutationFn: (newEligible: { eligible: boolean; clear: boolean }) =>
      postMutationFetcher(`/api/submissions/${submission.id}/eligible`, { body: newEligible }),
  });
  const { refresh } = useRouter();

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

  let buttonLabel = "Eligibility";
  if (submission.eligible === false) {
    buttonLabel = "Not Eligible";
  }
  if (submission.eligible === true) {
    buttonLabel = "Eligible";
  }

  return (
    <details className="dropdown dropdown-end">
      <summary
        className={clsx("absolute top-0 right-0 btn btn-xs border-0 font-medium text-gray-200 tracking-tighter", {
          "text-gray-600 bg-gray-300 hover:bg-gray-400": submission.eligible === null,
          "bg-red-800 hover:bg-red-700": submission.eligible === false,
          "bg-green-800 hover:bg-green-700": submission.eligible === true,
        })}
      >
        {buttonLabel}
      </summary>
      <div
        tabIndex={0}
        className="dropdown-content bg-base-100 z-[1] w-auto py-2 px-3 top-7 border border-gray-200 shadow"
      >
        <div className="flex flex-col">
          <div className="form-control">
            <label className={eligibleLabelStyles} htmlFor={`eligible_${submission.id}_false`}>
              <input
                type="radio"
                id={`eligible_${submission.id}_false`}
                name={`eligible_${submission.id}`}
                className="radio checked:bg-opacity-60"
                checked={submission.eligible === false}
                onChange={() => setEligible(false)}
              />
              <span className="label-text tracking-tight">Not Eligible</span>
            </label>
          </div>
          <div className="form-control">
            <label className={eligibleLabelStyles} htmlFor={`eligible_${submission.id}_true`}>
              <input
                type="radio"
                id={`eligible_${submission.id}_true`}
                name={`eligible_${submission.id}`}
                className="radio checked:bg-opacity-60"
                checked={submission.eligible === true}
                onChange={() => setEligible(true)}
              />
              <span className="label-text tracking-tight">Eligible</span>
            </label>
          </div>
          <div className="flex items-center justify-between gap-3 p-2">
            {submission.eligible !== undefined && (
              <button className="cursor-pointer underline text-sm hover:no-underline" onClick={clearEligible}>
                Clear
              </button>
            )}

            {submission.eligible === false && (
              <div
                className="tooltip before:w-96"
                data-tip={`Set by ${submission.eligibleAdmin} on ${submission.eligibleTimestamp ? getFormattedDateTime(new Date(submission.eligibleTimestamp)) : ""}`}
              >
                <QuestionMarkCircleIcon className="w-4 h-4" />
              </div>
            )}

            {submission.eligible === true && (
              <div
                className="tooltip"
                data-tip={`Set by ${submission.eligibleAdmin} on ${submission.eligibleTimestamp ? getFormattedDateTime(new Date(submission.eligibleTimestamp)) : ""}`}
              >
                <QuestionMarkCircleIcon className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>
      </div>
    </details>
  );
};
