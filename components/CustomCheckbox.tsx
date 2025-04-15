"use client";

interface CustomCheckboxProps {
  title: string;
  children?: React.ReactNode;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CustomCheckbox({
  title,
  children,
  checked,
  onChange,
}: CustomCheckboxProps) {
  return (
    <label className="flex items-center cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer hidden"
      />
      <div
        className="w-[20px] h-[20px] flex items-center justify-center bg-[#aaa] rounded-[4px]
                    peer-checked:border-blue-500 peer-checked:bg-[#fa7407] transition-colors duration-200"
      >
        <svg
          className="w-[12px] h-[12px] text-white transition-opacity duration-200"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <span
        className="ml-[8px] 
                    md:text-[16px] text-[14px]"
      >
        {title}
      </span>

      {children}
    </label>
  );
}
