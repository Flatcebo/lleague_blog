"use client";

import BackButton from "@/components/BackButton";
import Link from "next/link";

interface ContentHeaderProps {
  title: string;
  id?: string;
  edit?: boolean;
}

export default function ContentHeader({title, id, edit}: ContentHeaderProps) {
  return (
    <div
      className="sticky top-0 w-full h-[50px] flex flex-row justify-between items-center bg-[white] z-[999]
                      lg:px-[20px] px-[12px]"
    >
      <div
        className="flex flex-row items-center
                          md:gap-[12px] gap-[4px]
                           "
      >
        <BackButton />

        <h4
          className="font-bold truncate block
                      md:text-[24px] text-[20px]
                      sm:w-[300px] w-[200px]"
        >
          {title}
        </h4>
      </div>

      {edit && (
        <Link href={`/write?id=${id}`} className="cursor-pointer">
          <span
            className="font-semibold hover:text-[#9a9a9a]
                                md:text-[20px] text-[18px]"
          >
            수정
          </span>
        </Link>
      )}
    </div>
  );
}
