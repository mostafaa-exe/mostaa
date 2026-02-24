'use client';

import {usePathname} from 'next/navigation';
import Link from 'next/link';

export function LocaleSwitcher({locale}: {locale: string}) {
  const pathname = usePathname();
  const target = locale === 'ar' ? 'en' : 'ar';
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] === 'ar' || segments[0] === 'en') segments[0] = target;

  return (
    <Link href={`/${segments.join('/')}`} className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white">
      {target.toUpperCase()}
    </Link>
  );
}
