import Link from "next/link";
import styles from "./Pagination.module.css";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string>;
};

function buildHref(
  basePath: string,
  page: number,
  searchParams?: Record<string, string>
): string {
  const params = new URLSearchParams({ ...(searchParams ?? {}), page: String(page) });
  return `${basePath}?${params.toString()}`;
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [];

  const addPage = (p: number) => {
    if (!pages.includes(p)) pages.push(p);
  };

  addPage(1);

  if (current - 1 > 2) {
    pages.push("...");
  } else if (current - 1 === 2) {
    addPage(2);
  }

  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) {
    addPage(p);
  }

  if (current + 1 < total - 1) {
    pages.push("...");
  } else if (current + 1 === total - 1) {
    addPage(total - 1);
  }

  addPage(total);

  return pages;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  searchParams,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={`ellipsis-${idx}`} className={styles.ellipsis}>
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={buildHref(basePath, page, searchParams)}
            className={`${styles.page} ${page === currentPage ? styles.active : ""}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </Link>
        )
      )}
      {currentPage < totalPages && (
        <Link
          href={buildHref(basePath, currentPage + 1, searchParams)}
          className={styles.page}
          aria-label="Next page"
        >
          →
        </Link>
      )}
    </nav>
  );
}
