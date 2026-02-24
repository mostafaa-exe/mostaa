import Link from 'next/link';
import {prisma} from '@/lib/prisma';

export default async function TrendingPage({params}: {params: {locale: string}}) {
  const tools = await prisma.tool.findMany({orderBy: {usageScore: 'desc'}, take: 20});
  return <main className="container-page"><h1 className="mb-4 text-2xl font-bold">الترند</h1><div className="space-y-2">{tools.map((t, i)=><Link key={t.id} href={`/${params.locale}/tools/${t.slug}`} className="block rounded border bg-white p-3">#{i+1} {t.name}</Link>)}</div></main>;
}
