import Form from "./_component/Form";
import { NextPage } from "next";

const Submit: NextPage = () => {
  return (
    <div className="flex flex-col md:flex-row m-6 md:m-10 border-2">
      <div className="w-[100%] md:w-5/12 border-r-2 p-4 md:p-12">
        <h2 className="text-2xl md:text-3xl mb-16">Before submitting</h2>
        <h3 className="text-xl underline">What makes a good extension</h3>
        <p className="text-lg">
          A good extension is a useful tool that helps developers to build better apps. It should be well-documented,
          easy to use, and solve a real problem.
        </p>
        <h3 className="text-xl underline">Please pay attention to the following before submitting</h3>
        <p className="text-lg">
          A good extension is a useful tool that helps developers to build better apps. It should be well-documented,
          easy to use, and solve a real problem.
        </p>
      </div>
      <div className="w-[100%] md:w-7/12 p-4 md:p-12 bg-accent">
        <div className="flex items-center flex-col flex-grow">
          <h1 className="text-2xl md:text-3xl mb-12">Submit your project</h1>
          <Form />
        </div>
      </div>
    </div>
  );
};

export default Submit;
