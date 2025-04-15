import {NextResponse} from "next/server";

export async function POST(req: Request) {
  const {category, title, main_image, sub_image, content, access} =
    await req.json();

  // console.log(category, title, main_image, sub_image, content, access);

  try {
    // 블로그 생성
    const res = await fetch(
      "https://api.interview.l-league.co.kr/api/v1/blog",
      {
        method: "POST",
        body: JSON.stringify({
          category,
          title,
          main_image,
          sub_image,
          content,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
      }
    );

    const data = await res.json();
    console.log("서버 응답:", data);

    return NextResponse.json({message: "블로그 등록이 성공했어요!", data});
  } catch (error) {
    return NextResponse.json({error});
  }
}
