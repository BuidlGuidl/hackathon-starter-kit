"use client";

import type { NextPage } from "next";
import { Faq, Hero, PrizeInfo } from "~~/components/extensions-hackathon/";
import { Timeline } from "~~/components/extensions-hackathon/Timeline";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center mx-6">
      <Hero />
      <PrizeInfo />
      <Timeline />
      <Faq />
    </div>
  );
};

export default Home;
