"use client";

import Img from "@/components/Img";
import {FiPlus} from "react-icons/fi";

interface FileSelectorProps {
  children?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  idx?: number;
}

export default function FileSelector({
  children,
  onChange,
  idx,
}: FileSelectorProps) {
  return (
    <label
      htmlFor={`fileUpload${idx}`}
      className="w-full aspect-[1/1] bg-[#eaeaea] flex justify-center items-center rounded-[12px]"
    >
      <FiPlus className="w-[36px] h-auto text-[#9a9a9a]" />

      {children}

      <input
        id={`fileUpload${idx}`}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />
    </label>
  );
}
