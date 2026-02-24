import Link from 'next/link';

export function Footer({locale}: {locale: string}) {
  return (
    <footer className="mt-10 border-t bg-white">
      <div className="container-page flex gap-6 text-sm text-slate-600">
        <Link href={`/${locale}/privacy`}>الخصوصية</Link>
        <Link href={`/${locale}/terms`}>الشروط</Link>
      </div>
    </footer>
  );
}
