import Link from 'next/link';
import {getFields, getGoals, getTools} from '@/lib/data';

export default async function HomePage({params}: {params: {locale: string}}) {
  const [fields, goals, tools] = await Promise.all([getFields(), getGoals(), getTools()]);

  return (
    <main className="container-page space-y-8">
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold">دليل أدوات الذكاء الاصطناعي</h1>
        <p className="mt-2 text-slate-600">نظّم رحلتك حسب المجال والهدف مع برومبتات جاهزة.</p>
      </section>
      <section>
        <h2 className="mb-3 text-xl font-semibold">أهم المجالات</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {fields.slice(0, 6).map((field) => <Link key={field.id} href={`/${params.locale}/fields/${field.slug}`} className="rounded-lg border bg-white p-4">{field.titleAr}</Link>)}
        </div>
      </section>
      <section>
        <h2 className="mb-3 text-xl font-semibold">أهداف شائعة</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {goals.slice(0, 6).map((goal) => <Link key={goal.id} href={`/${params.locale}/goals/${goal.slug}`} className="rounded-lg border bg-white p-4">{goal.titleAr}</Link>)}
        </div>
      </section>
      <section>
        <h2 className="mb-3 text-xl font-semibold">أدوات مميزة</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {tools.slice(0, 6).map((tool) => <Link key={tool.id} href={`/${params.locale}/tools/${tool.slug}`} className="rounded-lg border bg-white p-4"><p className="font-medium">{tool.name}</p><p className="text-sm text-slate-500">{tool.descriptionAr}</p></Link>)}
        </div>
      </section>
    </main>
  );
}
