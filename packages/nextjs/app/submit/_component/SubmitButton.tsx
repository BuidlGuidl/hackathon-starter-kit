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
      className={`flex ${!isConnected && "tooltip tooltip-bottom"}`}
      data-tip={`${!isConnected ? "Please connect your wallet" : ""}`}
    >
      {isConnected ? (
        <button className="btn btn-primary w-full" disabled={pending} aria-disabled={pending}>
          Submit
        </button>
      ) : (
        <RainbowKitCustomConnectButton fullWidth={true} />
      )}
    </div>
  );
};

export default SubmitButton;
