"use client";

import {AiOutlineLoading} from "react-icons/ai";

export default function Loading() {
  return (
    <div className="absolute top-0 left-0 w-full h-screen bg-[#00000090] z-[999]">
      <AiOutlineLoading size={40} className="animate-spin" />
    </div>
  );
}
