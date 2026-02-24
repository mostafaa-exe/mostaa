import {notFound} from 'next/navigation';
import Link from 'next/link';
import {getFieldBySlug} from '@/lib/data';

export default async function FieldDetails({params}: {params: {locale: string; slug: string}}) {
  const field = await getFieldBySlug(params.slug);
  if (!field) return notFound();
  return (
    <main className="container-page space-y-6">
      <h1 className="text-2xl font-bold">{field.titleAr}</h1>
      <p>{field.description}</p>
      <section><h2 className="text-xl font-semibold">أفضل الأدوات</h2><div className="grid gap-3 md:grid-cols-3">{field.tools.map((t)=><Link key={t.id} href={`/${params.locale}/tools/${t.slug}`} className="rounded border bg-white p-3">{t.name}</Link>)}</div></section>
      <section><h2 className="text-xl font-semibold">برومبتات المجال</h2><div className="grid gap-3 md:grid-cols-2">{field.prompts.slice(0,8).map((p)=><Link key={p.id} href={`/${params.locale}/prompts/${p.slug}`} className="rounded border bg-white p-3">{p.titleAr}</Link>)}</div></section>
      <section><h2 className="text-xl font-semibold">Workflows مرتبطة</h2><div className="grid gap-3">{field.goals.map((g)=><Link key={g.id} href={`/${params.locale}/goals/${g.slug}`} className="rounded border bg-white p-3">{g.titleAr}</Link>)}</div></section>
    </main>
  );
}
