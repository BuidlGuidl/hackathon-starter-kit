"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useAuthSession } from "~~/hooks/useAuthSession";
import { useHandleLogin } from "~~/hooks/useHandleLogin";

export default function Siwe() {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { handleLogin } = useHandleLogin();
  const { isAuthenticated } = useAuthSession();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin");
    }
  }, [router, isAuthenticated]);

  return (
    <button
      className="btn btn-primary my-10 self-center"
      onClick={e => {
        e.preventDefault();
        if (!isConnected) {
          openConnectModal?.();
        } else {
          handleLogin();
        }
      }}
    >
      Sign in with Ethereum
    </button>
  );
}
