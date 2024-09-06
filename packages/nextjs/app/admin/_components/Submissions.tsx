import { SubmissionTabs } from "./SubmissionTabs";
import scaffoldConfig from "~~/scaffold.config";
import { getAllSubmissions } from "~~/services/database/repositories/submissions";

export const Submissions = async () => {
  const submissions = await getAllSubmissions();
  const { votingEnabled } = scaffoldConfig;
  return (
    <>
      {!votingEnabled && (
        <div className="max-w-7xl container mx-auto px-6 mb-6">
          <div className="alert alert-warning">Voting period ended</div>
        </div>
      )}
      <SubmissionTabs submissions={submissions} />
    </>
  );
};
