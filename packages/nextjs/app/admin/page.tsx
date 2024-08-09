import { Submissions } from "./_components/Submissions";
import type { NextPage } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "~~/utils/auth";

const Admin: NextPage = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "admin") {
    return <div className="flex items-center text-xl flex-col flex-grow pt-10 space-y-4">Access denied</div>;
  }

  return <Submissions />;
};

export default Admin;
