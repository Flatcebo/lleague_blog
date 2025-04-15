import {NextResponse} from "next/server";

export async function GET(req: Request) {
  // const {searchParams} = new URL(req.url);

  // const refresh = searchParams.get("refresh");

  try {
    const res = await fetch(
      `https://api.interview.l-league.co.kr/api/v1/auth/logout`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const resData = await res.json();

    if (resData.detail) {
      const res = NextResponse.json({message: "로그아웃 성공"}, {status: 200});

      res.cookies.set("authToken", "", {
        maxAge: 0,
        path: "/",
      });

      return res;
    } else {
      return NextResponse.json({message: "로그아웃 실패"}, {status: 400});
    }
  } catch (error) {
    return NextResponse.json({error: error}, {status: 500});
  }
}
