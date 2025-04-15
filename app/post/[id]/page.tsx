// SSR

import ContentHeader from "@/components/ContentHeader";
import Img from "@/components/Img";
import {cookies} from "next/headers";
import {format} from "date-fns";

export default async function Page({params, searchParams}: Props) {
  const {id} = await params;

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
    `${process.env.NEXT_PUBLIC_API_URL}/api/post/${id}?access=${access}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const resData = await res.json();

  // console.log(resData);

  const {category, content, title, main_image, sub_image, created_at} =
    resData.data;

  return (
    <div className="w-full h-auto pb-[400px]">
      <ContentHeader title={title} id={id} edit />

      <section className="w-full h-auto flex flex-col items-center">
        <div
          className="h-auto flex flex-col
                      md:w-[768px] w-[100%]
                      lg:px-[0px] px-[12px]
                      md:gap-[20px] gap-[8px]"
        >
          {main_image && (
            <Img src={main_image} alt={main_image} className="w-full h-auto" />
          )}

          {sub_image && (
            <Img src={sub_image} alt={sub_image} className="w-full h-auto" />
          )}

          <span
            className="text-[#555]
                            md:text-[14px] text-[12px]"
          >
            작성일시 : {format(created_at, "yyyy.MM.dd HH:mm")}
          </span>

          <p
            className="text-[#555]
                          md:text-[16px] text-[14px]"
          >
            {content}
          </p>
        </div>
      </section>
    </div>
  );
}
