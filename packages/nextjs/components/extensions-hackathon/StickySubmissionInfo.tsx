import { useState } from "react";
import Link from "next/link";

export const StickySubmissionInfo = () => {
  const [isVisible, setIsVisible] = useState(true);
  const isSubmissionClosed = true;

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-6 bg-white p-2 shadow-lg border border-1 border-black 2xl:p-3 2xl:bottom-6 2xl:right-8"
        aria-label="Open submission info"
      >
        <span className="text-base 2xl:text-xl">✨</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 mx-6 left-0 right-0 md:bottom-4 md:right-6 md:left-auto bg-white p-4 md:p-6 shadow-lg border border-1 border-black md:max-w-[calc(100%-3rem)] 2xl:p-8 2xl:bottom-6 2xl:right-8">
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 2xl:top-4 2xl:right-6 2xl:text-xl"
        aria-label="Close"
      >
        ✕
      </button>
      <h2 className="text-2xl underline mb-0 md:mb-4 2xl:text-3xl 2xl:mb-6">
        {isSubmissionClosed ? "Submissions closed" : "Submissions open"}
      </h2>
      <p className="md:mb-10 mt-2 2xl:text-xl 2xl:mb-12 2xl:mt-4">AUG 20 - SEP 2</p>
      <div className="flex md:block space-x-2 2xl:space-x-4">
        {!isSubmissionClosed && (
          <Link
            href="/submit"
            className="bg-[#B7EBEC] py-2 px-2 sm:px-4 border border-1 border-black text-center flex-1 2xl:py-3 2xl:px-6 text-sm sm:text-base 2xl:text-xl"
          >
            Apply
          </Link>
        )}
        <a
          href="https://t.me/+jgKFHjb9B_cyNmMx"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-accent py-2 px-2 sm:px-4 border border-1 border-black text-center flex-1 2xl:py-3 2xl:px-6 text-sm sm:text-base 2xl:text-xl"
        >
          Join Telegram
        </a>
      </div>
    </div>
  );
};
