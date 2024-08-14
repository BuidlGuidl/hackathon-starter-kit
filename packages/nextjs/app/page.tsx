import type { NextPage } from "next";
import { Faq } from "~~/components/extensions-hackathon/Faq";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <Faq />
      </div>
    </>
  );
};

export default Home;
