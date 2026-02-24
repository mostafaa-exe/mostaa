'use client';

import {useState, useEffect} from 'react';

export default function PromptDetailClient({params}: {params: {slug: string}}) {
  const [data, setData] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`/api/prompt/${params.slug}`).then((res) => res.json()).then(setData);
  }, [params.slug]);

  if (!data) return <main className="container-page">Loading...</main>;
  return (
    <main className="container-page space-y-4">
      <h1 className="text-2xl font-bold">{data.titleAr}</h1>
      <pre className="rounded bg-white p-4">{data.contentAr}</pre>
      <pre className="rounded bg-white p-4">{data.contentEn}</pre>
      <button
        className="rounded bg-slate-900 px-4 py-2 text-white"
        onClick={async () => {
          await navigator.clipboard.writeText(data.contentAr);
          setCopied(true);
        }}
      >
        {copied ? 'تم النسخ' : 'نسخ'}
      </button>
      <p className="text-sm">Tags: {data.tags.map((t: any) => t.name).join(', ')}</p>
    </main>
  );
}
