import Link from "next/link";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  category: string;
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  category,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 py-8">
      {pages.map((page) => (
        <Link
          key={page}
          href={`/${
            category ? `?category=${category}&page=${page}` : `?page=${page}`
          }`}
          className={`flex justify-center items-center w-10 h-10 rounded-full ${
            currentPage === page
              ? "bg-[#fa7407] text-white font-bold"
              : "bg-[#eaeaea] hover:bg-[#ddd]"
          }`}
        >
          {page}
        </Link>
      ))}
    </div>
  );
}
