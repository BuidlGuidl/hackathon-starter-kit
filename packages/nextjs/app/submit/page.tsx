import Form from "./_component/Form";
import { NextPage } from "next";

const Submit: NextPage = () => {
  return (
    <div className="flex bg-base-100 items-center flex-col flex-grow text-center pt-10 md:pt-4 px-6">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">Submit Extension</h1>
      <p className="text-md mb-0 max-w-xl">Submit your SE-2 extension.</p>
      <Form />
    </div>
  );
};

export default Submit;
