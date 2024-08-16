"use client";

import { useFormStatus } from "react-dom";
import { useAccount } from "wagmi";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

// To use useFormStatus we need to make sure button is child of form
const SubmitButton = () => {
  const { pending } = useFormStatus();
  const { isConnected } = useAccount();

  return (
    <div
      className={`items-center flex flex-col ${!isConnected && "tooltip tooltip-bottom"}`}
      data-tip={`${!isConnected ? "Please connect your wallet" : ""}`}
    >
      {isConnected ? (
        <button
          className="btn border-2 border-gray-300 px-6 text-m h-8 min-h-8 font-medium"
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
