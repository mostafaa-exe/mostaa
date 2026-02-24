import {notFound} from 'next/navigation';
import Link from 'next/link';
import {getToolBySlug, getTools} from '@/lib/data';

export default async function ToolPage({params}: {params: {locale: string; slug: string}}) {
  const tool = await getToolBySlug(params.slug);
  if (!tool) return notFound();
  const alternatives = (await getTools()).filter((t) => t.id !== tool.id).slice(0, 4);

  return (
    <main className="container-page space-y-5">
      <h1 className="text-3xl font-bold">{tool.name}</h1>
      <p>{tool.descriptionAr}</p>
      <ul className="rounded bg-white p-4 text-sm">
        <li>التسعير: {tool.pricing}</li>
        <li>يدعم العربية: {tool.supportsArabic ? 'نعم' : 'لا'}</li>
        <li>المنصة: {tool.platform}</li>
        <li><a className="text-blue-600" href={tool.websiteUrl}>الرابط الرسمي</a></li>
      </ul>
      <section><h2 className="font-semibold">بدائل</h2><div className="grid gap-2 md:grid-cols-2">{alternatives.map((a)=><Link key={a.id} href={`/${params.locale}/tools/${a.slug}`} className="rounded border bg-white p-3">{a.name}</Link>)}</div></section>
      <section><h2 className="font-semibold">برومبتات مرتبطة</h2><div className="grid gap-2 md:grid-cols-2">{tool.prompts.slice(0,6).map((p)=><Link key={p.id} href={`/${params.locale}/prompts/${p.slug}`} className="rounded border bg-white p-3">{p.titleAr}</Link>)}</div></section>
    </main>
  );
}
