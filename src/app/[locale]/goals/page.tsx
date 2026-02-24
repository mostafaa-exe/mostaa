import Link from 'next/link';
import {getGoals} from '@/lib/data';

export default async function GoalsPage({params}: {params: {locale: string}}) {
  const goals = await getGoals();
  return <main className="container-page"><h1 className="mb-4 text-2xl font-bold">الأهداف</h1><div className="grid gap-3 md:grid-cols-2">{goals.map((g)=><Link key={g.id} href={`/${params.locale}/goals/${g.slug}`} className="rounded border bg-white p-4">{g.titleAr}<p className="text-sm text-slate-500">{g.summary}</p></Link>)}</div></main>;
}
