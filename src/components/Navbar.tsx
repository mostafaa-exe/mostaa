import Link from 'next/link';
import {Search} from 'lucide-react';
import {getTranslations} from 'next-intl/server';
import {LocaleSwitcher} from './LocaleSwitcher';

export async function Navbar({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'nav'});
  const links = [
    ['fields', t('fields')],
    ['goals', t('goals')],
    ['tools', t('tools')],
    ['ranking/trending', t('trending')],
    ['prompts', t('prompts')],
    ['guides', t('guides')]
  ];

  return (
    <header className="border-b bg-white">
      <div className="container-page flex items-center gap-4 py-4">
        <Link href={`/${locale}`} className="text-xl font-bold">دليل أدوات الذكاء الاصطناعي</Link>
        <nav className="hidden flex-1 gap-4 md:flex">
          {links.map(([href, label]) => (
            <Link key={href} href={`/${locale}/${href}`} className="text-sm text-slate-700 hover:text-slate-950">
              {label}
            </Link>
          ))}
        </nav>
        <button className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm">
          <Search size={16} /> {t('search')}
        </button>
        <LocaleSwitcher locale={locale} />
      </div>
    </header>
  );
}
