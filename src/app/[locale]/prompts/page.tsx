import Link from 'next/link';
import {getPrompts} from '@/lib/data';

export default async function PromptsPage({params}: {params: {locale: string}}) {
  const prompts = await getPrompts();
  return <main className="container-page"><h1 className="mb-4 text-2xl font-bold">مكتبة البرومبتات</h1><div className="grid gap-3 md:grid-cols-3">{prompts.slice(0,120).map((p)=><Link key={p.id} href={`/${params.locale}/prompts/${p.slug}`} className="rounded border bg-white p-4">{p.titleAr}</Link>)}</div></main>;
}
