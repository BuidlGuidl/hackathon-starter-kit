"use client";

import { useFormStatus } from "react-dom";
import { useAccount } from "wagmi";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import scaffoldConfig from "~~/scaffold.config";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  const { isConnected } = useAccount();
  const { submissionsEnabled } = scaffoldConfig;

  return (
    <div
      className={`items-center flex flex-col ${!isConnected && submissionsEnabled && "tooltip tooltip-bottom"}`}
      data-tip={`${!isConnected && submissionsEnabled ? "Please connect your wallet" : ""}`}
    >
      {!submissionsEnabled ? (
        <button className="btn border border-black px-6 text-lg h-10 min-h-10 font-medium" disabled>
          Submissions Closed
        </button>
      ) : isConnected ? (
        <button
          className="btn border border-black px-6 text-lg h-10 min-h-10 font-medium"
          disabled={pending}
          aria-disabled={pending}
        >
          Submit <span className="text-accent">✦</span>
        </button>
      ) : (
        <RainbowKitCustomConnectButton />
      )}
    </div>
  );
};

export default SubmitButton;
