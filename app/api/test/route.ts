export async function POST(req: Request) {
  const {name} = await req.json();

  try {
    const res = await fetch(
      "https://api.interview.l-league.co.kr/api/v1/aws/upload",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: "Bearer afs",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file_name: name,
        }),
      }
    );

    console.log(await res.json());

    return new Response(JSON.stringify(res));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
}
