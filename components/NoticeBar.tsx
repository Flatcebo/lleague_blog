"use client";

import Image from "next/image";

interface NoticeBarProps {
  className: string;
  type?: string;
  content: string;
}

export default function NoticeBar({className, type, content}: NoticeBarProps) {
  return (
    <div
      className={`w-full h-auto flex justify-center items-center py-[6px]
                    lg:bg-[#fa74072a] xs:bg-[white]
                    sm:px-[0px] px-[12px]
                    ${className}`}
    >
      <div
        className="h-auto flex flex-row items-center gap-[8px]
                    lg:w-full sm:w-full w-full
                    sm:justify-center justify-start
                    lg:bg-[transparent] bg-[#fa74072a]
                    lg:py-[0px] sm:py-[6px] py-[0px]
                    lg:rounded-[0px] sm:rounded-[0px] rounded-full"
      >
        <div
          className={`flex justify-center items-center gap-[2px] font-bold border-[1px] border-[#fa7407] rounded-full bg-[white]
                      ${type ? "px-[8px] py-[2px]" : "p-[6px]"}`}
        >
          <Image
            src={`/icons/icon_tip.svg`}
            alt="ICON_TIP"
            width={1000}
            height={1000}
            className="w-[13px] h-[13px]"
          />

          {type && (
            <span className="text-[13px] text-[#fa7407] pt-[2px] tracking-[1px]">
              {type}
            </span>
          )}
        </div>

        <button className="text-start cursor-pointer">
          <span className="text-[13px] font-bold pt-[0px]">{content}</span>
        </button>
      </div>
    </div>
  );
}
