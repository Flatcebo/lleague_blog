"use client";

import {formatKRW} from "@/libs/format";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import {GoSearch} from "react-icons/go";
import {IoCloseOutline} from "react-icons/io5";

export default function SearchButton({main = false}: any) {
  const [searchMode, setSearchMode] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState<ClothesProps[]>([]);
  const [filterData, setFilterData] = useState<ClothesProps[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/clothes/read/total", {
        method: "GET",
      });

      const resData: ClothesProps[] = await res.json();
      setData(resData);
    };

    load();
  }, []);

  useEffect(() => {
    const filter = data.filter((i, idx) => i.title.includes(keyword));

    if (keyword !== "") {
      setFilterData(filter);
    } else {
      setFilterData([]);
    }

    // console.log(filterData);
  }, [keyword]);

  const handleClickSearchMode = () => {
    setSearchMode((any) => !any);
  };

  const handleClickClose = () => {
    setSearchMode(false);
  };

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setKeyword(value);
  };

  return main ? (
    <>
      {searchMode ? (
        <div className="relative w-[600px] rounded-md animate-search">
          <input
            type="text"
            placeholder="제품을 입력해주세요."
            autoFocus
            value={keyword}
            onChange={handleChangeKeyword}
            onBlur={() => {
              setSearchMode(false);
              setKeyword("");
            }}
            className="w-[600px] h-[40px] bg-transparent backdrop-blur-2xl backdrop-brightness-150 animate-search focus:ring-0 focus:border-none focus:shadow-none focus:outline-none
                         p-4 pl-[48px] rounded-sm text-[14px] text-[#000] placeholder:text-[#000000ac] z-[998]"
          />

          <GoSearch
            size={18}
            className="absolute left-4 top-[50%] translate-y-[-50%] text-[#000]
                        "
          />

          <IoCloseOutline
            size={24}
            onClick={handleClickClose}
            className="absolute right-4 top-[50%] translate-y-[-50%] cursor-pointer text-[#000] hover:text-[#000000a9] z-[999]"
          />

          {filterData.length > 0 && (
            <div
              className="absolute top-[48px] w-full h-[600px] py-4 flex flex-col gap-[0px] font-sans
                        bg-transparent backdrop-blur-xl backdrop-brightness-150 rounded-sm text-[#000] overflow-y-scroll scrollbar-hide"
            >
              {filterData.map((i, idx) => {
                return (
                  <Link
                    key={idx}
                    href={`/product/${i.title}/${i.productNumber}?color=${i.colors[0].color}`}
                    className="w-full flex gap-[10px] hover:bg-[#ffffff20] px-4 py-2"
                  >
                    <Image
                      src={i.colors[0]?.images[0]}
                      alt={i.colors[0]?.images[0]}
                      width={4000}
                      height={4000}
                      className="w-[120px] h-auto"
                    />
                    <div className="w-full flex flex-col justify-between py-[4px]">
                      <div className="flex flex-col">
                        <div className="h-[14px] flex justify-between items-center">
                          <span className="text-[13px] text-[#222]">
                            {i.category}
                          </span>

                          <div className="text-right text-[15px] pt-[4px] pr-[4px]">
                            <span>{`₩ ${formatKRW(i.price)}`}</span>
                          </div>
                        </div>

                        <span className="text-[15px]">{i.title}</span>
                      </div>

                      <div className="flex gap-[4px]">
                        {i.colors.map((colors, colorsIdx) => {
                          return (
                            <div
                              key={colorsIdx}
                              className="w-[13px] h-[13px] rounded-full"
                              style={{backgroundColor: colors.color}}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={handleClickSearchMode}
          className="flex hover:text-[#ffffffa9]
                      sm:gap-[6px] xxs:gap-[4px]"
        >
          <GoSearch className="sm:text-[20px] xxs:text-[16px]" />
          검색
        </button>
      )}
    </>
  ) : (
    <>
      {searchMode ? (
        <div className="relative w-[600px] rounded-md animate-search">
          <input
            type="text"
            placeholder="제품을 입력해주세요."
            autoFocus
            value={keyword}
            onChange={handleChangeKeyword}
            onBlur={() => {
              setSearchMode(false);
              setKeyword("");
            }}
            className="w-[600px] h-[40px] bg-transparent backdrop-blur-2xl backdrop-brightness-200 animate-search border-[2px] focus:outline-[1px] focus:outline-none
                      p-4 pl-[48px] rounded-sm text-[14px] text-[#000] placeholder:text-[#000000ac] z-[998]"
          />

          <GoSearch
            size={18}
            className="absolute left-4 top-[50%] translate-y-[-50%] text-[#000]"
          />

          <IoCloseOutline
            size={24}
            onClick={handleClickClose}
            className="absolute right-4 top-[50%] translate-y-[-50%] cursor-pointer text-[#000] hover:text-[#000000a9] z-[999]"
          />

          {filterData.length > 0 && (
            <div
              className="absolute top-[48px] w-full h-[600px] py-4 flex flex-col gap-[0px] font-sans
                        bg-[#fff] rounded-sm text-[#000] overflow-y-scroll scrollbar-hide"
            >
              {filterData.map((i, idx) => {
                return (
                  <Link
                    key={idx}
                    href={`/product/${i.title}/${i.productNumber}?color=${i.colors[0].color}`}
                    className="w-full flex gap-[10px] hover:bg-[#eaeaea] px-4 py-2"
                  >
                    <Image
                      src={i.colors[0]?.images[0]}
                      alt={i.colors[0]?.images[0]}
                      width={4000}
                      height={4000}
                      className="w-[120px] h-auto"
                    />
                    <div className="w-full flex flex-col justify-between py-[4px]">
                      <div className="flex flex-col">
                        <div className="h-[14px] flex justify-between items-center">
                          <span className="text-[13px] text-[#222]">
                            {i.category}
                          </span>

                          <div className="text-right text-[15px] pt-[4px] pr-[4px]">
                            <span>{`₩ ${formatKRW(i.price)}`}</span>
                          </div>
                        </div>

                        <span className="text-[15px]">{i.title}</span>
                      </div>

                      <div className="flex gap-[4px]">
                        {i.colors.map((colors, colorsIdx) => {
                          return (
                            <div
                              key={colorsIdx}
                              className="w-[13px] h-[13px] rounded-full"
                              style={{backgroundColor: colors.color}}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={handleClickSearchMode}
          className="hover:text-[#000000a9] font-thin"
        >
          <GoSearch className="sm:text-[24px] xxs:text-[20px]" />
        </button>
      )}
    </>
  );
}
