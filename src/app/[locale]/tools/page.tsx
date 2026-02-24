import Link from 'next/link';
import {prisma} from '@/lib/prisma';
import {Pagination} from '@/components/Pagination';
import {PlatformType, PricingType, Prisma} from '@prisma/client';

const pageSize = 12;

export default async function ToolsPage({params, searchParams}: {params: {locale: string}; searchParams: Record<string, string | undefined>}) {
  const page = Number(searchParams.page ?? 1);
  const q = searchParams.q ?? '';
  const pricing = searchParams.pricing as PricingType | undefined;
  const platform = searchParams.platform as PlatformType | undefined;
  const arabic = searchParams.arabic === '1';
  const sort = searchParams.sort ?? 'trending';

  const where: Prisma.ToolWhereInput = {
    AND: [
      q ? {OR: [{name: {contains: q, mode: 'insensitive'}}, {descriptionAr: {contains: q, mode: 'insensitive'}}]} : {},
      pricing ? {pricing} : {},
      platform ? {platform} : {},
      arabic ? {supportsArabic: true} : {}
    ]
  };

  const orderBy = sort === 'new' ? {createdAt: 'desc' as const} : {usageScore: 'desc' as const};

  const tools = await prisma.tool.findMany({where, orderBy, skip: (page - 1) * pageSize, take: pageSize});
  const total = await prisma.tool.count({where});

  return (
    <main className="container-page">
      <h1 className="mb-4 text-2xl font-bold">الأدوات</h1>
      <form className="mb-4 grid gap-2 rounded-lg bg-white p-4 md:grid-cols-5">
        <input name="q" placeholder="بحث" defaultValue={q} className="rounded border px-3 py-2" />
        <select name="pricing" defaultValue={pricing} className="rounded border px-3 py-2"><option value="">التسعير</option><option>FREE</option><option>FREEMIUM</option><option>PAID</option></select>
        <select name="platform" defaultValue={platform} className="rounded border px-3 py-2"><option value="">المنصة</option><option>WEB</option><option>CHROME</option><option>DISCORD</option><option>API</option></select>
        <select name="sort" defaultValue={sort} className="rounded border px-3 py-2"><option value="trending">Trending</option><option value="most-used">Most used</option><option value="new">New</option></select>
        <label className="flex items-center gap-2"><input type="checkbox" name="arabic" value="1" defaultChecked={arabic} /> يدعم العربية</label>
        <button className="rounded bg-slate-900 px-4 py-2 text-white md:col-span-5">تطبيق</button>
      </form>
      <div className="grid gap-3 md:grid-cols-3">
        {tools.map((tool) => (
          <Link key={tool.id} href={`/${params.locale}/tools/${tool.slug}`} className="rounded border bg-white p-4">
            <h2 className="font-semibold">{tool.name}</h2>
            <p className="text-sm text-slate-600">{tool.descriptionAr}</p>
          </Link>
        ))}
      </div>
      <Pagination locale={params.locale} basePath="tools" page={page} hasMore={page * pageSize < total} />
    </main>
  );
}
