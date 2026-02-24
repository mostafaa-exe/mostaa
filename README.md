# دليل أدوات الذكاء الاصطناعي (MVP)

MVP مبني بـ:
- Next.js App Router + TypeScript
- TailwindCSS
- next-intl (عربي/إنجليزي + RTL/LTR)
- Prisma + PostgreSQL
- Zod
- lucide-react

## تشغيل محليًا
```bash
npm install
cp .env.example .env
# ضع DATABASE_URL داخل .env
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

## متغيرات البيئة
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ai_tools?schema=public"
```

## الصفحات
- `/[locale]`
- `/[locale]/fields`
- `/[locale]/fields/[slug]`
- `/[locale]/goals`
- `/[locale]/goals/[slug]`
- `/[locale]/tools`
- `/[locale]/tools/[slug]`
- `/[locale]/ranking/trending`
- `/[locale]/ranking/most-used`
- `/[locale]/ranking/most-saved`
- `/[locale]/prompts`
- `/[locale]/prompts/[slug]`
- `/[locale]/guides`
- `/[locale]/guides/[slug]`
- `/[locale]/submit`
- `/[locale]/privacy`
- `/[locale]/terms`

## ملاحظات
- Seed ينشئ: 12 مجال + 15 هدف + 50 أداة + 100 برومبت + Workflow steps.
- يوجد Prompt Translator rule-based داخل صفحة الهدف.
- يوجد Sitemap + Robots + OpenGraph Metadata.
