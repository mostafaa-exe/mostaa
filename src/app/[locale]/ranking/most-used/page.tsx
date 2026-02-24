import Link from 'next/link';
import {prisma} from '@/lib/prisma';

export default async function MostUsedPage({params}: {params: {locale: string}}) {
  const tools = await prisma.tool.findMany({orderBy: {views: 'desc'}, take: 20});
  return <main className="container-page"><h1 className="mb-4 text-2xl font-bold">الأكثر استخدامًا</h1><div className="space-y-2">{tools.map((t)=><Link key={t.id} href={`/${params.locale}/tools/${t.slug}`} className="block rounded border bg-white p-3">{t.name} - {t.views}</Link>)}</div></main>;
}
