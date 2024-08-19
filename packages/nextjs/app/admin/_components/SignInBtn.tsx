"use client";

import { useConnectModal } from "@rainbow-me/rainbowkit";

export const SignInBtn = () => {
  const { openConnectModal } = useConnectModal();
  return (
    <button className="btn btn-outline text-lg font-normal" onClick={openConnectModal} type="button">
      Sign in with Ethereum
    </button>
  );
};
