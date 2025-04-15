import {NextResponse} from "next/server";

export async function GET(req: Request, {params}: Props) {
  const {id} = await params;
  const url = new URL(req.url);

  const access = url.searchParams.get("access");

  // console.log(access);

  try {
    const res = await fetch(
      `https://api.interview.l-league.co.kr/api/v1/blog/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
      }
    );

    const data = await res.json();

    return NextResponse.json({message: "성공", data}, {status: 200});
  } catch (error) {
    return NextResponse.json({message: "에러", error}, {status: 500});
  }
}

export async function PUT(req: Request) {
  const {id, access, category, title, main_image, sub_image, content} =
    await req.json();

  try {
    const res = await fetch(
      `https://api.interview.l-league.co.kr/api/v1/blog/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },

        body: JSON.stringify({
          category,
          title,
          main_image,
          sub_image,
          content,
        }),
      }
    );

    const data = await res.json();

    return NextResponse.json(
      {message: "등록 글이 수정되었습니다.", data},
      {status: 200}
    );
  } catch (error) {
    return NextResponse.json(
      {message: "등록 글 수정이 실패하였습니다.", error},
      {status: 500}
    );
  }
}

export async function DELETE(req: Request) {
  const {id, access} = await req.json();

  // console.log(id, access);

  try {
    const res = await fetch(
      `https://api.interview.l-league.co.kr/api/v1/blog/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
      }
    );

    const data = await res.json();

    console.log(data);

    return NextResponse.json(
      {message: "게시글이 삭제되었습니다."},
      {status: 200}
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {message: "게시글이 삭제되지 못했습니다.", error},
      {status: 500}
    );
  }
}
