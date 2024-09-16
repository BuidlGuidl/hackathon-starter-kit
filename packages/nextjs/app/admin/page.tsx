import { SignInBtn } from "./_components/SignInBtn";
import { Submissions } from "./_components/Submissions";
import type { NextPage } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "~~/utils/auth";

const Admin: NextPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center">
        <SignInBtn />
      </div>
    );
  }

  if (session?.user?.role !== "admin" && session?.user?.role !== "voter") {
    return <div className="flex items-center text-xl flex-col flex-grow pt-10 space-y-4">Access denied</div>;
  }

  return <Submissions />;
};

export default Admin;
