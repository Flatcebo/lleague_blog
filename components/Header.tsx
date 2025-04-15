"use client";

import LinkListItem from "@/components/LinkListItem";
import Image from "next/image";
import Link from "next/link";
import {IoIosSearch} from "react-icons/io";
import {PiUser} from "react-icons/pi";
import {GoBell} from "react-icons/go";
import {useSignOut} from "@/hooks/useSignOut";
import {useEffect, useState} from "react";
import useUserStore from "@/stores/useUserStore";

export default function Header() {
  const navData = [
    {
      href: `/`,
      title: `홈`,
    },
    {
      href: `/`,
      title: `채팅`,
    },
    {
      href: `/`,
      title: `순위`,
    },
  ];

  const {user} = useUserStore();

  const {logout, isLoading} = useSignOut();

  const handleClickSignOut = async () => {
    const result = await logout();

    if (result.success) {
      alert(result.message);
      location.reload();
    }

    if (result.message === "로그인 정보가 없습니다.") {
      location.href = `/my`;
    }
  };

  return (
    <div className="sticky top-0 w-full h-[70px] z-[999] bg-[white]">
      <div
        className="w-full h-full flex justify-between items-center py-4
                      lg:px-12 sm:px-12 px-[12px] "
      >
        {/* LOGO */}
        <Link href={`/`} className="">
          <span className="text-[24px] text-[#fa7407] font-bold">BLOG</span>
        </Link>

        {/* CENTER NAV */}
        <div className="sm:flex hidden">
          <nav>
            <ul className="flex gap-12 font-bold">
              {navData.map((i, idx) => {
                return (
                  <LinkListItem key={idx} href={i.href} underline>
                    <span className="text-[#333]">{i.title}</span>
                  </LinkListItem>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* ICONS */}
        <div className="flex gap-[12px]">
          <Link href={`/search`}>
            <IoIosSearch className="w-auto h-[26px] hover:text-[#9a9a9a]" />
          </Link>

          <GoBell className="w-auto h-[26px] hover:text-[#9a9a9a]" />

          <button
            onClick={handleClickSignOut}
            disabled={isLoading}
            className="cursor-pointer w-auto h-[26px]
                        sm:flex hidden"
          >
            {user?.access ? (
              <div className="w-[26px] h-full bg-[#555] hover:opacity-80 rounded-full" />
            ) : (
              <PiUser className="w-full h-full hover:text-[#9a9a9a]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
