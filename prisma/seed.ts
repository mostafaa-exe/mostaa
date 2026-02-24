import {PrismaClient, PlatformType, PricingType} from '@prisma/client';

const prisma = new PrismaClient();

const fields = [
  ['marketing', 'التسويق'], ['design', 'التصميم'], ['web', 'تطوير الويب'], ['coding', 'البرمجة'],
  ['video', 'الفيديو'], ['image', 'الصور'], ['audio', 'الصوت'], ['business', 'الأعمال'],
  ['study', 'الدراسة'], ['automation', 'الأتمتة'], ['support', 'خدمة العملاء'], ['data', 'تحليل البيانات']
];

const goals = [
  'إنشاء Landing Page', 'إنشاء متجر بسيط', 'تصميم لوجو', 'كتابة إعلان', 'تحويل مقال إلى فيديو ريل',
  'إنشاء Chatbot لخدمة العملاء', 'تلخيص PDF', 'إنشاء محتوى سوشيال أسبوعي', 'تحسين SEO لمقال',
  'إعداد حملة بريدية', 'تصميم عرض تقديمي', 'تحليل منافسين', 'بناء صفحة هبوط للمنتج', 'كتابة سكربت فيديو', 'خطة إطلاق منتج'
];

async function main() {
  await prisma.goalWorkflowStep.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.prompt.deleteMany();
  await prisma.tool.deleteMany();
  await prisma.goal.deleteMany();
  await prisma.field.deleteMany();
  await prisma.tag.deleteMany();

  const tags = await Promise.all(['seo','copywriting','social','startup','coding','automation','video','design'].map((name) => prisma.tag.create({data: {name}})));

  const createdFields = await Promise.all(fields.map(([slug, titleAr], idx) => prisma.field.create({
    data: {slug, titleAr, titleEn: slug.toUpperCase(), description: `مجال ${titleAr} لاكتشاف أدوات مناسبة`, usageScore: 100 - idx}
  })));

  const createdGoals = await Promise.all(goals.map((titleAr, idx) => prisma.goal.create({
    data: {
      slug: `goal-${idx + 1}`,
      titleAr,
      titleEn: `Goal ${idx + 1}`,
      summary: `Workflow عملي لتحقيق هدف: ${titleAr}`,
      usageScore: 200 - idx,
      fields: {connect: [{id: createdFields[idx % createdFields.length].id}]}
    }
  })));

  const tools = [];
  for (let i = 1; i <= 50; i++) {
    const tool = await prisma.tool.create({
      data: {
        slug: `tool-${i}`,
        name: `AI Tool ${i}`,
        descriptionAr: `أداة رقم ${i} للإنتاجية وصناعة المحتوى.`,
        descriptionEn: `Tool ${i} for productivity and AI workflows.`,
        pricing: i % 3 === 0 ? PricingType.PAID : i % 2 === 0 ? PricingType.FREEMIUM : PricingType.FREE,
        supportsArabic: i % 2 === 0,
        platform: [PlatformType.WEB, PlatformType.CHROME, PlatformType.DISCORD, PlatformType.API][i % 4],
        websiteUrl: `https://example.com/tool-${i}`,
        usageScore: Math.random() * 100,
        views: 200 - i,
        saves: 100 - (i % 40),
        fields: {connect: [{id: createdFields[i % createdFields.length].id}]},
        goals: {connect: [{id: createdGoals[i % createdGoals.length].id}]},
        tags: {connect: [{id: tags[i % tags.length].id}]}
      }
    });
    tools.push(tool);
  }

  const prompts = [];
  for (let i = 1; i <= 100; i++) {
    const prompt = await prisma.prompt.create({
      data: {
        slug: `prompt-${i}`,
        titleAr: `برومبت ${i}`,
        titleEn: `Prompt ${i}`,
        contentAr: `اكتب لي مخرجات احترافية للهدف رقم ${i} مع خطوات واضحة ومثال عربي.`,
        contentEn: `Generate professional output for objective ${i} with clear steps and an English example.`,
        usageScore: Math.random() * 100,
        tools: {connect: [{id: tools[i % tools.length].id}]},
        goals: {connect: [{id: createdGoals[i % createdGoals.length].id}]},
        fields: {connect: [{id: createdFields[i % createdFields.length].id}]},
        tags: {connect: [{id: tags[i % tags.length].id}]}
      }
    });
    prompts.push(prompt);
  }

  for (let i = 0; i < createdGoals.length; i++) {
    for (let step = 1; step <= 3; step++) {
      await prisma.goalWorkflowStep.create({
        data: {
          goalId: createdGoals[i].id,
          stepOrder: step,
          titleAr: `خطوة ${step}`,
          titleEn: `Step ${step}`,
          instructions: `نفّذ الخطوة ${step} باستخدام الأداة المقترحة ثم راجع المخرجات.`,
          toolId: tools[(i * 3 + step) % tools.length].id,
          promptId: prompts[(i * 4 + step) % prompts.length].id,
          alternatives: [tools[(i + step + 1) % tools.length].name, tools[(i + step + 2) % tools.length].name]
        }
      });
    }
  }

  console.log('Seeded successfully');
}

main().finally(() => prisma.$disconnect());
