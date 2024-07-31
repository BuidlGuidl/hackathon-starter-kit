"use client";

import { useFormStatus } from "react-dom";
import { useAccount } from "wagmi";

// To use useFormStatus we need to make sure button is child of form
const SubmitButton = () => {
  const { pending } = useFormStatus();
  const { isConnected } = useAccount();
  const isSubmitDisabled = !isConnected || pending;

  return (
    <div
      className={`flex ${!isConnected && "tooltip tooltip-bottom"}`}
      data-tip={`${!isConnected ? "Please connect your wallet" : ""}`}
    >
      <button className="btn btn-primary w-full" disabled={isSubmitDisabled} aria-disabled={isSubmitDisabled}>
        Submit
      </button>
    </div>
  );
};

export default SubmitButton;
