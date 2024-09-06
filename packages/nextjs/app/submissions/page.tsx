import { SubmissionCard } from "./_components/SubmissionCard";
import type { NextPage } from "next";
import scaffoldConfig from "~~/scaffold.config";
import { SubmissionWithWinnerTag, getAllSubmissions } from "~~/services/database/repositories/submissions";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Submissions",
  description: "Check all the submissions for the SE-2 extensions hackathon.",
});

const Submissions: NextPage = async () => {
  const submissions = await getAllSubmissions();
  const { winnersThreshold, runnersUpThreshold } = scaffoldConfig;

  const submissionsWithAvgScore: SubmissionWithWinnerTag[] = submissions
    .map(submission => {
      const avgScore =
        submission.votes.length > 0
          ? submission.votes.map(vote => vote.score).reduce((a, b) => a + b, 0) / submission.votes.length
          : 0;

      const winnerTag = avgScore >= winnersThreshold ? "Winner" : avgScore >= runnersUpThreshold ? "Finalist" : null;

      return { ...submission, avgScore, winnerTag };
    })
    .sort((a, b) => b.avgScore - a.avgScore);

  return (
    <div className="max-w-7xl container mx-auto px-6 mt-10">
      <h2 className="text-2xl font-bold mb-4">🏆 Prize Distribution</h2>
      <ul className="list-disc list-inside ml-3">
        <li className="text-lg">
          <span className="font-bold">Winner:</span> $1000
        </li>
        <li className="text-lg">
          <span className="font-bold">Finalist:</span> $500
        </li>
      </ul>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mt-6">
        {submissions.length === 0 && (
          <div role="alert" className="alert col-span-2">
            <span>No submissions yet.</span>
          </div>
        )}
        {submissionsWithAvgScore.map((submission: SubmissionWithWinnerTag) => {
          return <SubmissionCard key={submission.id} submission={submission} />;
        })}
      </div>
    </div>
  );
};

export default Submissions;
