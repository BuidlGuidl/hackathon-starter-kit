import { Address } from "~~/components/scaffold-eth";
import { SubmissionWithWinnerTag } from "~~/services/database/repositories/submissions";

export const SubmissionCard = ({ submission }: { submission: SubmissionWithWinnerTag }) => {
  return (
    <div key={submission.id} className="card bg-base-200 text-secondary-content border border-gray-300 rounded-none">
      <div className="card-body p-4 pt-6">
        {submission.winnerTag && (
          <div className={`badge p-4 ${submission.winnerTag === "Winner" ? "badge-success" : "badge-warning"}`}>
            {submission.winnerTag}
          </div>
        )}
        <h2 className="card-title mb-3 xl:text-2xl">{submission.title}</h2>
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="mt-1 flex shrink-0 gap-3">
            {submission.linkToRepository && (
              <a href={submission.linkToRepository} className="inline-block" target="_blank">
                <img alt="github icon" className="w-6 h-6" src="/icon-github.svg" />
              </a>
            )}

            <a href={submission.linkToVideo} className="inline-block" target="_blank">
              <img alt="youtube icon" className="w-6 h-6" src="/icon-youtube.svg" />
            </a>
          </div>

          {submission.builder && <Address address={submission.builder} disableAddressLink />}
        </div>

        <p style={{ wordBreak: "break-word" }}>{submission.description}</p>
      </div>
    </div>
  );
};
