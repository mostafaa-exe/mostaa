import {notFound} from 'next/navigation';
import {getGoalBySlug} from '@/lib/data';
import {toGeminiClaudePrompt, toGptPrompt} from '@/lib/promptTranslator';

export default async function GoalPage({params}: {params: {slug: string}}) {
  const goal = await getGoalBySlug(params.slug);
  if (!goal) return notFound();

  return (
    <main className="container-page space-y-6">
      <h1 className="text-3xl font-bold">{goal.titleAr}</h1>
      <p>{goal.summary}</p>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Workflow Stack</h2>
        {goal.workflow.map((step) => (
          <article key={step.id} className="rounded-lg border bg-white p-4">
            <p className="font-semibold">{step.stepOrder}. {step.titleAr}</p>
            <p className="text-sm text-slate-600">{step.instructions}</p>
            <p className="mt-2 text-sm">الأداة المقترحة: <b>{step.tool.name}</b></p>
            <p className="text-sm">بدائل: {step.alternatives.join('، ')}</p>
            <pre className="mt-2 overflow-x-auto rounded bg-slate-100 p-2 text-xs">{step.prompt.contentAr}</pre>
          </article>
        ))}
      </section>
      <section className="rounded-lg border bg-white p-4">
        <h2 className="text-xl font-semibold">Prompt Translator</h2>
        <p className="text-sm">حوّل أي طلب لصيغة مناسبة للنماذج المختلفة.</p>
        <pre className="mt-2 rounded bg-slate-100 p-3 text-xs">{toGptPrompt('اكتب خطة محتوى أسبوعية لمتجر إلكتروني')}</pre>
        <pre className="mt-2 rounded bg-slate-100 p-3 text-xs">{toGeminiClaudePrompt('اكتب خطة محتوى أسبوعية لمتجر إلكتروني')}</pre>
      </section>
    </main>
  );
}
