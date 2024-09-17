"use client";

import { useFormStatus } from "react-dom";
import { useAccount } from "wagmi";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

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
