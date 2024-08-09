"use client";

import { SubmissionCard } from "./SubmissionCard";
import { useQuery } from "@tanstack/react-query";
import { Submission } from "~~/services/database/repositories/submissions";
import { fetcher } from "~~/utils/react-query";

export const Submissions = () => {
  const {
    data: submissions,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["submissions"],
    queryFn: () => fetcher("/api/submissions"),
  });

  if (isPending) {
    return (
      <div className="flex items-center flex-col flex-grow pt-10">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return <div>Error loading submissions</div>;
  }

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10 space-y-4">
        {submissions?.map((submission: Submission) => {
          return <SubmissionCard key={submission.id} submission={submission} refetch={refetch} />;
        })}
      </div>
    </>
  );
};
