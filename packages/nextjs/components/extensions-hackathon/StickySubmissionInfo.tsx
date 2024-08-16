import { useState } from "react";
import Link from "next/link";

export const StickySubmissionInfo = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-white p-2 shadow-lg border border-1 border-black"
        aria-label="Open submission info"
      >
        <span>✨</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 md:bottom-4 md:right-4 md:left-auto bg-white p-4 md:p-6 shadow-lg border border-1 border-black md:w-80">
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
        aria-label="Close"
      >
        ✕
      </button>
      <h2 className="text-2xl underline mb-0 md:mb-4">
        Submissions <br className="hidden md:inline" /> open
      </h2>
      <p className="md:mb-10 mt-2">August 21-30</p>
      <div className="flex md:block space-x-2">
        <Link href="/submit" className="bg-[#B7EBEC] py-2 px-4 border border-1 border-black text-center flex-1">
          Apply
        </Link>
        <a
          href="https://t.me/ToDo"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-accent py-2 px-4 border border-1 border-black text-center flex-1"
        >
          Join Telegram
        </a>
      </div>
    </div>
  );
};
