"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SubmissionCard } from "../submissions/_components/SubmissionCard";
import { useAccount } from "wagmi";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import scaffoldConfig from "~~/scaffold.config";
import { SubmissionWithWinnerTag } from "~~/services/database/repositories/submissions";
import { notification } from "~~/utils/scaffold-eth";

const MySubmissions = () => {
  const [submissions, setSubmissions] = useState<SubmissionWithWinnerTag[]>([]);
  const { address: connectedAddress, isConnecting } = useAccount();
  const router = useRouter();
  const { submissionsEnabled } = scaffoldConfig;

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (isConnecting || !connectedAddress) {
        return;
      }

      try {
        const response = await fetch(`/api/users/${connectedAddress}/submissions`);
        if (!response.ok) {
          throw new Error("Failed to fetch submissions");
        }
        const data = await response.json();
        setSubmissions(data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
        notification.error("Failed to fetch submissions");
      }
    };

    fetchSubmissions();
  }, [connectedAddress, isConnecting]);

  if (isConnecting) {
    return <div className="max-w-7xl container mx-auto px-6 mt-10">Loading...</div>;
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
              {submissions.map(submission => (
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
