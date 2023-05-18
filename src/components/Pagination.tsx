import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type PaginationButtonProps = {
  children: ReactNode;
  page: number;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const PaginationButton = ({
  children,
  page,
  className,
  ...props
}: PaginationButtonProps) => (
  <Link href={`/page/${page}`} className="hover:no-underline">
    <button
      className={`font-bold text-lg btn btn-blue disabled:opacity-40 disabled:cursor-not-allowed ${
        className ?? ""
      }`}
      {...props}
    >
      {children}
    </button>
  </Link>
);

type Props = {
  currentPage: number;
  totalPages: number;
};

const Pagination = ({ currentPage, totalPages }: Props) => {
  return (
    <div className="flex items-center self-center mt-6 space-x-4">
      {/* Beginning */}
      <PaginationButton page={1} disabled={currentPage === 1} className="px-2">
        &lt;&lt;
      </PaginationButton>
      {/* Previous */}
      <PaginationButton page={currentPage - 1} disabled={currentPage === 1}>
        &lt;
      </PaginationButton>
      <p>
        Page <span className="font-semibold">{currentPage}</span> of{" "}
        <span className="font-semibold">{totalPages ? totalPages : 1}</span>
      </p>
      {/* Next */}
      <PaginationButton page={currentPage + 1} disabled={currentPage === totalPages}>
        &gt;
      </PaginationButton>
      {/* End */}
      <PaginationButton
        page={totalPages}
        disabled={currentPage === totalPages}
        className="px-2"
      >
        &gt;&gt;
      </PaginationButton>
    </div>
  );
};

export default Pagination;
