"use client";

import {InputHTMLAttributes} from "react";

interface LabelInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  require?: boolean;
}

export default function LabelInput({
  title,
  require,
  ...inputProps
}: LabelInputProps) {
  return (
    <div className="flex flex-col gap-[8px]">
      <label className="font-semibold">
        <span>{title}</span>

        {require && <span className="main-text">*</span>}
      </label>

      <input
        className="h-[50px] p-4 bg-[#eaeaea] rounded-[8px]"
        {...inputProps}
      />
    </div>
  );
}
