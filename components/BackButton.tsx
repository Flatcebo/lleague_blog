"use client";

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {IoChevronBack} from "react-icons/io5";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const isEditMode = !!id;

  const handleClickBack = () => {
    if (pathname.includes("/write")) {
      const confirmed = confirm("작성중인 내용이 삭제됩니다.");

      if (isEditMode) {
        confirmed ? router.back() : null;
      } else {
        confirmed ? router.back() : null;
      }
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleClickBack}
      className="text-left cursor-pointer hover:text-[#9a9a9a]"
    >
      <IoChevronBack className="w-[28px] h-auto" />
    </button>
  );
}
