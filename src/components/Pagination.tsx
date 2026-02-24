import Link from 'next/link';

export function Pagination({locale, basePath, page, hasMore}: {locale: string; basePath: string; page: number; hasMore: boolean}) {
  return (
    <div className="mt-6 flex gap-3">
      {page > 1 && <Link href={`/${locale}/${basePath}?page=${page - 1}`} className="rounded border px-3 py-2">Prev</Link>}
      {hasMore && <Link href={`/${locale}/${basePath}?page=${page + 1}`} className="rounded border px-3 py-2">Next</Link>}
    </div>
  );
}
