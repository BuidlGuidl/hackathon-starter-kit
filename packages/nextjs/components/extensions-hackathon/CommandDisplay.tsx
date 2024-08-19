"use client";

import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";

export const CommandDisplay = ({ command }: { command: string }) => {
  const [commandCopied, setCommandCopied] = useState(false);

  return (
    <div className="my-8 flex">
      <div className="bg-base-300 px-4 py-2 flex items-center justify-between border border-1 border-black">
        <pre className="text-sm md:text-base flex-grow text-wrap">
          <code>{command}</code>
        </pre>
        {commandCopied ? (
          <CheckCircleIcon className="ml-2 text-xl font-normal text-sky-600 h-5 w-5" aria-hidden="true" />
        ) : (
          <CopyToClipboard
            text={command}
            onCopy={() => {
              setCommandCopied(true);
              setTimeout(() => {
                setCommandCopied(false);
              }, 800);
            }}
          >
            <DocumentDuplicateIcon
              className="ml-2 text-xl font-normal text-sky-600 h-5 w-5 cursor-pointer"
              aria-hidden="true"
            />
          </CopyToClipboard>
        )}
      </div>
    </div>
  );
};
