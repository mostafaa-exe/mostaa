import Link from 'next/link';

const guides = [
  {slug: 'start-with-ai-tools', title: 'كيف تبدأ مع أدوات الذكاء الاصطناعي؟'},
  {slug: 'prompting-best-practices', title: 'أفضل ممارسات كتابة البرومبت'}
];

export default function GuidesPage({params}: {params: {locale: string}}) {
  return <main className="container-page"><h1 className="mb-4 text-2xl font-bold">الأدلة</h1><div className="space-y-2">{guides.map((g)=><Link key={g.slug} href={`/${params.locale}/guides/${g.slug}`} className="block rounded border bg-white p-3">{g.title}</Link>)}</div></main>;
}
