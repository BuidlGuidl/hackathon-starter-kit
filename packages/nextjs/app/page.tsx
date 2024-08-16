"use client";

import type { NextPage } from "next";
import { Faq, Hero, PrizeInfo, StickySubmissionInfo, Timeline } from "~~/components/extensions-hackathon/";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center mx-6">
      <Hero />
      <PrizeInfo />
      <Timeline />
      <Faq />
      <StickySubmissionInfo />
    </div>
  );
};

export default Home;
