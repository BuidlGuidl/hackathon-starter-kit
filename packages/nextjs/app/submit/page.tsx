import Form from "./_component/Form";
import { NextPage } from "next";

const Submit: NextPage = () => {
  return (
    <div className="flex flex-col md:flex-row m-6 md:m-10 border border-black">
      <div className="w-[100%] md:w-5/12 border-r border-black p-4 md:p-12">
        <h2 className="text-2xl md:text-3xl mb-8">Before submitting</h2>
        <h3 className="text-xl underline">What makes a good extension</h3>
        <p className="text-lg mb-8">
          A good extension is a useful tool that helps developers to build better apps. It should be well-documented,
          easy to use, and solve a real problem.
        </p>
        <h3 className="text-xl underline">Please pay attention to the following before submitting</h3>
        <ul className="list-disc pl-5 text-lg mt-4">
          <li>Follow extension guidelines to ensure compatibility with Scaffold-ETH 2 CLI.</li>
          <li>Submit only your original work, disclose any pre-existing work used.</li>
          <li>Be respectful to all participants.</li>
          <li>Focus on quality, including documentation and demo video.</li>
          <li>Limit of 5 submissions per person.</li>
        </ul>
      </div>
      <div className="w-[100%] md:w-7/12 p-4 md:p-12 bg-accent">
        <div className="flex items-center flex-col flex-grow">
          <h1 className="text-2xl md:text-3xl mb-8">Submit your extension</h1>
          <Form />
        </div>
      </div>
    </div>
  );
};

export default Submit;
