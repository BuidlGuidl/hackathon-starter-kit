"use client";

import type { NextPage } from "next";
import { Faq, Hero } from "~~/components/extensions-hackathon/";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center mx-10">
      <Hero />
      <Faq />
    </div>
  );
};

export default Home;
