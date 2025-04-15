"use client";

import Link from "next/link";

interface LinkListItemProps {
  href: string;
  children?: React.ReactNode;
  classNameLi?: string;
  classNameLink?: string;
  isActive?: boolean;
  underline?: boolean;
}

export default function LinkListItem({
  href,
  children,
  classNameLi,
  classNameLink,
  isActive,
  underline,
}: LinkListItemProps) {
  return (
    <li className={classNameLi}>
      <Link
        href={href}
        className={`${classNameLink} relative inline-block group`}
      >
        {children}
        {underline && (
          <span
            className={`absolute bottom-[-4px] left-0 w-full h-[4px] bg-[#fa7407] rounded-full 
                        transform transition-transform duration-300 
                            ${
                              isActive
                                ? "scale-x-100"
                                : "scale-x-0 group-hover:scale-x-100"
                            } origin-left`}
          ></span>
        )}
      </Link>
    </li>
  );
}
