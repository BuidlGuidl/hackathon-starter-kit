"use client";

import { useRouter } from "next/navigation";
import { SubmissionCard } from "../submissions/_components/SubmissionCard";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import scaffoldConfig from "~~/scaffold.config";
import { SubmissionWithWinnerTag } from "~~/services/database/repositories/submissions";

const MySubmissions = () => {
  const { address: connectedAddress, isConnecting } = useAccount();
  const router = useRouter();
  const { submissionsEnabled } = scaffoldConfig;

  const {
    isPending,
    error,
    data: submissions,
  } = useQuery({
    queryKey: ["my-submissions", connectedAddress],
    queryFn: () => fetch(`/api/users/${connectedAddress}/submissions`).then(res => res.json()),
  });

  if (isConnecting || isPending) {
    return <div className="max-w-7xl container mx-auto px-6 mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="max-w-7xl container mx-auto px-6 mt-10">Error loading submissions.</div>;
  }

  return (
    <div className="max-w-7xl container mx-auto px-6 mt-10">
      {!connectedAddress ? (
        <div className="max-w-7xl container mx-auto px-6 mt-10">
          <span className="mr-4">Connect Wallet to see your submissions</span>
          <RainbowKitCustomConnectButton />
        </div>
      ) : (
        <div>
          <h1 className="text-4xl font-bold mb-6">My Submissions</h1>
          {submissions.length === 0 ? (
            <div className="flex flex-col items-center">
              {submissionsEnabled ? (
                <>
                  <p className="mb-4">You haven&apos;t made any submissions yet.</p>
                  <button onClick={() => router.push("/submit")} className="btn btn-primary">
                    Submit an Extension
                  </button>
                </>
              ) : (
                <>
                  <p className="mb-4">You haven&apos;t made any submissions.</p>
                  <button className="btn btn-disabled" disabled>
                    Submissions Closed
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {submissions.map((submission: SubmissionWithWinnerTag) => (
                <SubmissionCard key={submission.id} submission={submission} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MySubmissions;
