"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bars3Icon, ChatBubbleLeftEllipsisIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import { useAuthSession } from "~~/hooks/useAuthSession";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Admin",
    href: "/admin",
    icon: <LockClosedIcon className="h-4 w-4" />,
  },
  {
    label: "Join Telegram",
    href: "https://t.me/+jgKFHjb9B_cyNmMx",
    icon: <ChatBubbleLeftEllipsisIcon className="h-4 w-4" />,
  },
];

export const HeaderMenuLinks = () => {
  const { isAdmin } = useAuthSession();

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        if (label === "Admin" && !isAdmin) {
          return null;
        }

        return (
          <li key={href}>
            {href.startsWith("http") ? (
              <a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="hover:underline flex items-center align-center active:!text-neutral py-1.5 px-3 text-lg gap-2"
              >
                {icon}
                <span>{label}</span>
              </a>
            ) : (
              <Link
                href={href}
                passHref
                className="hover:underline flex items-center align-center active:!text-neutral py-1.5 px-3 text-lg gap-2"
              >
                {icon}
                <span>{label}</span>
              </Link>
            )}
          </li>
        );
      })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  return (
    <div className="sticky md:static top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 sm:px-6 py-6">
      <div className="navbar-start w-auto md:w-1/2">
        <div className="md:hidden dropdown" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
            onClick={() => {
              setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
            }}
          >
            <Bars3Icon className="h-1/2" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              <HeaderMenuLinks />
            </ul>
          )}
        </div>
        <Link
          href="/"
          passHref
          className="max-w-[160px] md:max-w-none md:flex items-center gap-2 ml-1 md:ml-4 mr-6 shrink-0"
        >
          <Image alt="SE2 logo" className="cursor-pointer" width={205} height={54} src="/logo.svg" />
        </Link>
      </div>
      <div className="navbar-end flex-grow mr-4">
        <ul className="hidden md:flex md:flex-nowrap px-1 gap-2 pr-4">
          <HeaderMenuLinks />
        </ul>
        <RainbowKitCustomConnectButton />
      </div>
    </div>
  );
};
