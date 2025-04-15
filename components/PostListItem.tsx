"use client";

import Image from "next/image";
import Link from "next/link";
import Img from "./Img";
import {format} from "date-fns";
import {useState} from "react";
import MoreModal from "@/components/MoreModal";

interface PostListItemProps {
  data: PostProps[];
  responsive: boolean;
  access?: string;
}

export default function PostListItem({
  data,
  responsive,
  access,
}: PostListItemProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [id, setId] = useState<number | null>(null);

  const handleClickMore = (id: number) => {
    setId(id);
    setVisible(true);
  };

  return (
    <ul
      className={`${
        responsive
          ? "grid gap-[20px] xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1"
          : "flex flex-col gap-[12px]"
      }`}
    >
      {/* <MoreModal
        visible={visible}
        onClose={() => setVisible(false)}
        id={id}
        access={access}
      /> */}

      {data &&
        data.map((i, idx) => {
          return responsive ? (
            <li key={i.id} className="">
              <div
                className="sm:block flex items-start
                    lg:gap-[0px] gap-[8px]"
              >
                <Link
                  href={`/post/${i.id}`}
                  className="sm:w-auto w-[40%] aspect-[1/1]"
                >
                  <Img
                    src={i.main_image}
                    alt={i.main_image}
                    className="sm:w-auto w-full aspect-[1/1] object-cover rounded-[8px] hover:opacity-80"
                  />
                </Link>

                <div
                  className="flex flex-col gap-[4px] pl-[4px] justify-between
                      sm:h-auto h-auto
                      sm:py-[0px] py-[2px]
                      sm:w-auto w-[60%] 
                      sm:aspect-auto aspect-[2/1.4]"
                >
                  <div className="sm:pt-[4px] pt-[0px]">
                    <div className="flex justify-between items-center">
                      <Link href={`/post/${i.id}`}>
                        <span
                          className="font-bold truncate block hover:opacity-80
                                    md:text-[18px] sm:text-[18px] text-[16px] 
                                    lg:w-[320px] sm:w-[270px] w-[160px]"
                        >
                          {i.title}
                        </span>
                      </Link>

                      <button
                        onClick={() => handleClickMore(i.id)}
                        className="p-[0px] cursor-pointer hover:bg-[#eaeaea] rounded-full z-[999]
                                  sm:w-[20px] w-[16px]
                                  sm:h-[20px] h-[16px]"
                      >
                        <Img
                          src={`/icons/icon_more.svg`}
                          alt="ICON_MORE"
                          draggable={false}
                          className="w-full h-full"
                        />
                      </button>
                    </div>

                    <p
                      className="text-[#9a9a9a] line-clamp-4
                        sm:hidden! flex
                        md:text-[14px] text-[12px]
                        md:leading-[18px] leading-[14px]
                        sm:w-auto w-[100%]"
                    >
                      {i.content}
                    </p>
                  </div>

                  <div>
                    <span className="sm:text-[16px] text-[12px] text-[#9a9a9a]">
                      작성일시 : {format(i.created_at, "yyyy.MM.dd HH:mm")}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ) : (
            // false
            <li key={i.id} className="w-full">
              <div
                className="w-full flex 
                            md:gap-[8px] gap-[4px]"
              >
                <div className="w-[40%]">
                  <Link
                    href={`/post/${i.id}`}
                    className="sm:w-auto w-[40%] aspect-[1/1]"
                  >
                    <Img
                      src={i.main_image}
                      alt={i.main_image}
                      className="w-full aspect-[1/1] object-cover rounded-[8px] hover:opacity-80"
                    />
                  </Link>
                </div>

                <div className="w-[60%] flex flex-col justify-between gap-[4px] pl-[4px]">
                  <div className="pt-[0px] sm:pt-[4px] space-y-[4px]">
                    <div className="flex justify-between items-start">
                      <Link href={`/post/${i.id}`}>
                        <span className="font-bold md:text-[20px] sm:text-[18px] text-[16px] hover:opacity-80">
                          {i.title}
                        </span>
                      </Link>

                      <button
                        onClick={() => handleClickMore(i.id)}
                        className="p-0 cursor-pointer hover:bg-[#eaeaea] rounded-full sm:w-[20px] w-[16px] sm:h-[20px] h-[16px]"
                      >
                        <Img
                          src={`/icons/icon_more.svg`}
                          alt="ICON_MORE"
                          draggable={false}
                          className="w-full h-full"
                        />
                      </button>
                    </div>

                    <p className="text-[#9a9a9a] line-clamp-4 md:text-[16px] text-[12px] md:leading-[20px] leading-[14px]">
                      {i.content}
                    </p>
                  </div>

                  <div>
                    <span className="sm:text-[16px] text-[12px] text-[#9a9a9a]">
                      작성일시 : {format(i.created_at, "yyyy.MM.dd HH:mm")}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
    </ul>
  );
}
