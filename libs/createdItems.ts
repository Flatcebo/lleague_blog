export interface CreatedItemsProps {
  category: string;
  type: string;
  body: BodyInit | null | undefined;
}

export async function createdItems({category, type, body}: CreatedItemsProps) {
  const res = await fetch(`/api/${category}/${type}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });

  if (!res.ok) {
    throw new Error("게시글 등록이 실패했어요.");
  }

  const resData = await res.json();

  return resData;
}
