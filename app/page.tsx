// SSR

import Carousel from "@/components/Carousel";
import CarouselLayout from "@/components/CarouselLayout";
import Img from "@/components/Img";
import LinkListItem from "@/components/LinkListItem";
import Pagination from "@/components/Pagination";
import PostListItem from "@/components/PostListItem";
import {cookies} from "next/headers";
import Image from "next/image";
import Link from "next/link";
import {FaAngleRight} from "react-icons/fa6";

type CategoryMapType = {
  [key: string]: number;
};

export default async function Home({searchParams}: Props) {
  const categoryMap: CategoryMapType = {
    전체: 99,
    일상생활: 1,
    맛집소개: 2,
    제품후기: 3,
    IT정보: 4,
  };

  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");

  const {page, category_id} = await searchParams;

  let access = "";

  if (token?.value) {
    try {
      const parsed = JSON.parse(token.value);
      access = parsed.access;
    } catch (e) {
      console.error("쿠키 파싱 에러", e);
    }
  }

  // console.log(access);

  let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/post/r?page=${
    page ? page : 1
  }&access=${access}`;

  if (category_id) apiUrl += `&category_id=${category_id}`;

  const res = await fetch(apiUrl, {
    method: "GET",
    cache: "no-store",
  });

  // console.log(res);

  // if (!res.ok) {
  //   return console.log("데이터 수신 실패");
  // }

  const resData = await res.json();

  const pageData = resData.data;

  const currentPage = pageData.curPage;
  const totalCount = pageData.totalCnt;
  const itemsPerPage = 10;

  const data: PostProps[] = pageData.data;

  const selectedCategory = (await searchParams).category_id || "";

  return (
    <section className="w-full h-auto pb-[300px]">
      {/* VIEWS SECTION */}
      <article className="w-full h-auto flex flex-col justify-center items-center">
        <div
          className="w-full h-auto pt-[12px]
                        lg:px-[40px] sm:px-[40px] px-[12px] "
        >
          <Link href={``} className="flex justify-start items-center gap-[0px]">
            <Image
              src={`/icons/icon_rank.svg`}
              alt={`ICON_RANK`}
              width={1000}
              height={1000}
              className="h-auto mr-[6px]
                          lg:w-[26px] sm:w-[26px] w-[24px]"
              priority={true}
              quality={75}
            />

            <h4
              className="font-bold
                          lg:text-[20px] sm:text-[20px] text-[18px] "
            >
              조회수 TOP 10
            </h4>

            <FaAngleRight
              className="h-auto
                          lg:w-[22px] sm:w-[22px] w-[20px]"
            />
          </Link>
        </div>

        <div className="">
          <CarouselLayout>
            <Carousel />
          </CarouselLayout>
        </div>
      </article>

      {/* CONTENTS SECTION */}
      <article className="w-full h-auto">
        <div
          className="w-full h-auto
                        sm:px-[40px] px-[12px]"
        >
          <ul
            className="w-full flex items-center border-b-[0px] border-[#eaeaea] py-[20px]
                          lg:justify-evenly justify-between"
          >
            {Object.keys(categoryMap).map((category, idx) => {
              const categoryId = categoryMap[category];
              const isAllCategory = category === "전체";
              const selectedCategoryId = Number(selectedCategory);

              const isActive = isAllCategory
                ? selectedCategory === "" || selectedCategoryId === 99
                : selectedCategoryId === categoryId;

              return (
                <LinkListItem
                  key={idx}
                  href={`/?category_id=${isAllCategory ? "" : categoryId}`}
                  isActive={isActive}
                  underline
                >
                  <span className="font-bold text-[#555]">{category}</span>
                </LinkListItem>
              );
            })}
          </ul>
        </div>

        <div
          className="w-full h-auto py-[0px]
                        sm:px-[40px] px-[12px]"
        >
          <PostListItem data={data} responsive={true} access={access} />
        </div>

        <Pagination
          totalItems={totalCount}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          category={selectedCategory}
        />
      </article>
    </section>
  );
}
