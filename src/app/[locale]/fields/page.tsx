import Link from 'next/link';
import {getFields} from '@/lib/data';

export default async function FieldsPage({params}: {params: {locale: string}}) {
  const fields = await getFields();
  return <main className="container-page"><h1 className="mb-4 text-2xl font-bold">المجالات</h1><div className="grid gap-3 md:grid-cols-3">{fields.map((f)=><Link className="rounded border bg-white p-4" key={f.id} href={`/${params.locale}/fields/${f.slug}`}>{f.titleAr}<p className="text-sm text-slate-500">{f.description}</p></Link>)}</div></main>;
}
