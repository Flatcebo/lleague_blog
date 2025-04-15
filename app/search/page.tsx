"use client";

import PostListItem from "@/components/PostListItem";
import useUserStore from "@/stores/useUserStore";
import {useEffect, useState} from "react";

export default function Page() {
  const [data, setData] = useState<PostProps[]>([]);
  const [filterData, setFilterData] = useState<PostProps[]>([]);
  const [keyword, setKeyword] = useState<string>("");

  const {user} = useUserStore();

  useEffect(() => {
    const fetchData = async () => {
      if (user?.access) {
        const res = await fetch(
          `/api/post/r?page=1&access=${user && user.access}`,
          {
            method: "GET",
          }
        );

        const resData = await res.json();
        const data = resData.data.data;

        // console.log(resData);
        setData(data);
      }
    };

    fetchData();
  }, [user?.access]);

  useEffect(() => {
    if (keyword !== "") {
      setFilterData(
        data.filter((i) =>
          i.title.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }
  }, [keyword, data]);

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
  };

  return (
    <section
      className="w-full h-auto flex flex-col justify-center items-center gap-[20px] 
                        md:py-[40px] py-[20px]"
    >
      <article
        className="md:w-[768px] w-[100%]
                    md:h-[70px] h-[50px]
                    md:px-[0px] px-[12px]"
      >
        <input
          type="text"
          value={keyword}
          onChange={handleChangeKeyword}
          placeholder="블로그명을 입력해 주세요."
          className="w-full h-full p-4 border-[1px] border-[#333]
                  md:text-[18px] text-[16px]"
        />
      </article>

      <article
        className="h-auto
                          md:w-[768px] w-[100%]
                          md:px-[0px] px-[12px]"
      >
        {filterData && <PostListItem data={filterData} responsive={false} />}
      </article>
    </section>
  );
}
