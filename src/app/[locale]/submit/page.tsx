export default function SubmitPage() {
  return (
    <main className="container-page max-w-2xl">
      <h1 className="mb-4 text-2xl font-bold">إضافة أداة/برومبت/Workflow</h1>
      <form action="/api/submit" method="post" className="space-y-3 rounded bg-white p-4">
        <select name="type" className="w-full rounded border px-3 py-2">
          <option value="tool">Tool</option><option value="prompt">Prompt</option><option value="workflow">Workflow</option>
        </select>
        <input name="title" className="w-full rounded border px-3 py-2" placeholder="العنوان" required />
        <textarea name="description" className="w-full rounded border px-3 py-2" placeholder="الوصف" required />
        <input name="url" className="w-full rounded border px-3 py-2" placeholder="URL (اختياري)" />
        <input name="email" className="w-full rounded border px-3 py-2" placeholder="Email (اختياري)" />
        <button className="rounded bg-slate-900 px-4 py-2 text-white">إرسال</button>
      </form>
    </main>
  );
}
