import {NextResponse} from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const page = url.searchParams.get("page");
  const access = url.searchParams.get("access");
  const title = url.searchParams.get("title");
  const category_id = url.searchParams.get("category_id");

  try {
    let apiUrl = `https://api.interview.l-league.co.kr/api/v1/blog?page=${
      page ? page : 1
    }&page_size=10`;

    if (title) apiUrl += `&title=${encodeURIComponent(title)}`;
    if (category_id) apiUrl += `&category_id=${category_id}`;

    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json({message: "API ERROR"}, {status: 400});
    }

    const data = await res.json();

    return NextResponse.json(
      {message: "블로그 조회 성공", data},
      {status: 200}
    );
  } catch (error) {
    return NextResponse.json(
      {message: "블로그 조회 실패", error},
      {status: 500}
    );
  }
}
