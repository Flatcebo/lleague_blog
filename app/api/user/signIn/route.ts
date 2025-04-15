import {NextResponse} from "next/server";

export async function POST(req: Request) {
  const {email, password} = await req.json();

  try {
    const res = await fetch(
      `https://api.interview.l-league.co.kr/api/v1/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
      }
    );

    const user = await res.json();

    // console.log(user);

    if (!res) {
      return NextResponse.json(
        {message: "이메일 또는 비밀번호를 확인해주세요!"},
        {status: 400}
      );
    } else {
      const res = NextResponse.json({
        message: "로그인이 성공하였습니다.",
      });

      if (user.access) {
        res.cookies.set(
          "authToken",
          JSON.stringify({access: user.access, refresh: user.refresh}),
          {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            maxAge: 8 * 60 * 60,
            path: "/",
            sameSite: "lax",
          }
        );
      }

      return res;
    }
  } catch (error) {
    return NextResponse.json(
      {message: "이메일 또는 비밀번호를 확인해주세요!", error},
      {status: 500}
    );
  }
}
