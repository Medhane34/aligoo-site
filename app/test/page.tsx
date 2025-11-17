// app/test/page.tsx
import { fetchServiceSection } from "@/lib/homepage";

export default async function TestServicePage() {
  const dataEn = await fetchServiceSection('en');
  const dataAm = await fetchServiceSection('am');

  return (
    <div className="min-h-screen p-8 space-y-16 font-mono text-sm bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8">Service Section Test</h1>

      <div className="space-y-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">English</h2>
          <pre className="bg-white p-6 rounded-lg shadow overflow-auto text-xs">
            {JSON.stringify(dataEn, null, 2)}
          </pre>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-green-600">Amharic</h2>
          <pre className="bg-white p-6 rounded-lg shadow overflow-auto text-xs">
            {JSON.stringify(dataAm, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}