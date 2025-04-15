"use client";

import Link from "next/link";

interface MoreModalProps {
  id?: number | null;
  visible: boolean;
  onClose?: () => void;
  access?: string;
}

export default function MoreModal({
  visible,
  onClose,
  id,
  access,
}: MoreModalProps) {
  const handleClickRemove = async () => {
    const confirmed = confirm("정말 삭제하시겠습니까?");

    if (confirmed) {
      const res = await fetch(`/api/post/${id}`, {
        method: "DELETE",
        body: JSON.stringify({
          id: id,
          access: access,
        }),
      });

      const resData = await res.json();

      onClose;

      location.reload();
    } else {
      onClose;
    }

    // alert(resData.message);
  };

  //   console.log(id, access);

  return visible ? (
    <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center z-[999]">
      <button
        onClick={onClose}
        className=" w-full h-full bg-[black] opacity-50 "
      />

      <div className="absolute w-[300px] h-auto bg-[white] rounded-[8px]">
        <Link
          href={`/write?id=${id}`}
          className="w-full h-[50px] flex justify-center items-center bg-[white] hover:bg-[#eaeaea] rounded-t-[8px]"
        >
          <span>수정</span>
        </Link>

        <button
          onClick={handleClickRemove}
          className="w-full h-[50px] flex justify-center items-center bg-[white] hover:bg-[#eaeaea] rounded-b-[8px]"
        >
          <span>삭제</span>
        </button>
      </div>
    </div>
  ) : null;
}
