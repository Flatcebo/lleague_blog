import Img from "@/components/Img";
import {cookies} from "next/headers";
import Link from "next/link";

export default async function Carousel() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");

  let access = "";

  if (token?.value) {
    try {
      const parsed = JSON.parse(token.value);
      access = parsed.access;
    } catch (e) {
      console.error("쿠키 파싱 에러", e);
    }
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/post/r?page=1&access=${access}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.log("데이터 수신 실패");
  }

  const resData = await res.json();

  const pageData = resData.data;

  // const currentPage = pageData.curPage;
  // const totalCount = pageData.totalCnt;
  // const itemsPerPage = 10;

  const data: PostProps[] = pageData.data;

  return data.map((item: any, idx: any) => {
    const truncateTitle =
      item.title.length > 10 ? `${item.title.slice(0, 10)}...` : item.title;

    return (
      <li
        key={idx}
        className={`bg-white relative snap-center flex-shrink-0 list-none
            `}
      >
        <Link href={`/post/${item.id}`} className="flex flex-col text-[14px]">
          <Img
            src={item.main_image}
            alt={item.main_image}
            draggable={false}
            className="aspect-[8/11] object-cover rounded-[14px]
                      lg:w-[320px] sm:w-[200px] w-[140px]"
          />

          <div
            className=" px-[4px]
                        lg:mt-[12px] sm:mt-[12px] mt-[8px]"
          >
            <span
              className="lg:text-[20px] sm:text-[20px] text-[16px] w-full
                           "
            >
              {truncateTitle}
            </span>
          </div>
        </Link>
      </li>
    );
  });
}
