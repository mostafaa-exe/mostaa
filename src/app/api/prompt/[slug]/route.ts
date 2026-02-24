import {NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';

export async function GET(_: Request, {params}: {params: {slug: string}}) {
  const prompt = await prisma.prompt.findUnique({where: {slug: params.slug}, include: {tags: true}});
  return NextResponse.json(prompt);
}
