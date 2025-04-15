"use client";

import Img from "@/components/Img";
import Link from "next/link";

export default function FloatingButton() {
  return (
    <Link
      href={`/write`}
      className="fixed flex justify-center items-center main-bg rounded-full cursor-pointer hover:opacity-90 z-[999]
                        sm:w-[80px] w-[60px]
                        sm:h-[80px] h-[60px]
                        sm:bottom-[20px] bottom-[60px]
                        sm:right-[20px] right-[12px]"
    >
      <Img
        src={`/icons/icon_create.svg`}
        alt="icon_create"
        draggable={false}
        className="sm:w-[32px] w-[24px] h-auto"
      />
    </Link>
  );
}
