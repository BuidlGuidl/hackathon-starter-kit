"use client";

import type { NextPage } from "next";
import {
  Faq,
  HackathonInfo,
  Hero,
  PrizeInfo,
  StickySubmissionInfo,
  Timeline,
} from "~~/components/extensions-hackathon/";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center mx-6">
      <Hero />
      <PrizeInfo />
      <HackathonInfo />
      <Timeline />
      <Faq />
      <StickySubmissionInfo />
    </div>
  );
};

export default Home;
