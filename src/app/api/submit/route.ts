import {NextResponse} from 'next/server';
import {submitSchema} from '@/lib/validators';
import {prisma} from '@/lib/prisma';

export async function POST(req: Request) {
  const form = await req.formData();
  const parsed = submitSchema.safeParse({
    type: form.get('type'),
    title: form.get('title'),
    description: form.get('description'),
    url: form.get('url'),
    email: form.get('email')
  });

  if (!parsed.success) {
    return NextResponse.json({error: parsed.error.flatten()}, {status: 400});
  }

  await prisma.submission.create({data: parsed.data});
  return NextResponse.redirect(new URL('/ar/submit?success=1', req.url));
}
