import {unstable_cache} from 'next/cache';
import {prisma} from './prisma';

export const getFields = unstable_cache(async () => prisma.field.findMany({orderBy: {usageScore: 'desc'}}), ['fields'], {revalidate: 300});
export const getGoals = unstable_cache(async () => prisma.goal.findMany({orderBy: {usageScore: 'desc'}}), ['goals'], {revalidate: 300});

export const getTools = unstable_cache(async () => prisma.tool.findMany({include: {fields: true, tags: true}, orderBy: {usageScore: 'desc'}}), ['tools'], {revalidate: 300});

export const getPrompts = unstable_cache(async () => prisma.prompt.findMany({include: {tags: true}, orderBy: {usageScore: 'desc'}}), ['prompts'], {revalidate: 300});

export async function getToolBySlug(slug: string) {
  return prisma.tool.findUnique({where: {slug}, include: {fields: true, goals: true, prompts: true, tags: true}});
}

export async function getGoalBySlug(slug: string) {
  return prisma.goal.findUnique({
    where: {slug},
    include: {tools: true, prompts: true, workflow: {include: {tool: true, prompt: true}, orderBy: {stepOrder: 'asc'}}}
  });
}

export async function getFieldBySlug(slug: string) {
  return prisma.field.findUnique({where: {slug}, include: {tools: true, prompts: true, goals: true}});
}

export async function getPromptBySlug(slug: string) {
  return prisma.prompt.findUnique({where: {slug}, include: {tags: true, tools: true, goals: true, fields: true}});
}
