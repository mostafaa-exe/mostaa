import {notFound} from 'next/navigation';

const content: Record<string, string> = {
  'start-with-ai-tools': 'ابدأ بتحديد المجال ثم الهدف، وبعدها جرّب Workflow جاهز وعدّل عليه.',
  'prompting-best-practices': 'اكتب الهدف بوضوح، حدّد القيود، واطلب شكل مخرجات محدد.'
};

export default function GuidePage({params}: {params: {slug: string}}) {
  if (!content[params.slug]) return notFound();
  return <main className="container-page"><h1 className="text-2xl font-bold">{params.slug}</h1><p className="mt-4 rounded bg-white p-4">{content[params.slug]}</p></main>;
}
