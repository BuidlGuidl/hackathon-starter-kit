import type { NextPage } from "next";
import { getServerSession } from "next-auth";
import { Address } from "~~/components/scaffold-eth";
import { getAllSubmissions } from "~~/services/database/repositories/submissions";
import { authOptions } from "~~/utils/auth";

const Admin: NextPage = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "admin") {
    return <div className="flex items-center text-xl flex-col flex-grow pt-10 space-y-4">Access denied</div>;
  }

  const submissions = await getAllSubmissions();
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10 space-y-4">
        {submissions.map(submission => {
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
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Admin;
