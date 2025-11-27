// app/test-timeline/page.tsx
import { getProposalByCode } from '@/lib/proposal'

import { CheckCircle2, Clock, Calendar } from 'lucide-react'

export default async function TestTimelinePage() {
  const proposal = await getProposalByCode('nova-9xk2p')

  if (!proposal?.template.timeline?.enabled) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 p-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl font-bold mb-8">Timeline Test</h1>
          <p className="text-2xl">Timeline is disabled or not set in template</p>
        </div>
      </div>
    )
  }

  const timeline = proposal.template.timeline

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-12">
          Timeline Section Test — Live from Sanity
        </h1>

        <div className="bg-white/10 backdrop-blur-xl border-white/20 p-10">
          <h2 className="text-4xl font-bold text-cyan-400 mb-8 text-center">
            {timeline.sectionTitle || 'Project Timeline'}
          </h2>

          <div className="space-y-12">
            {timeline.items.map((item, i) => (
              <div
                key={i}
                className="flex gap-6 items-start group hover:bg-white/5 p-6 rounded-xl transition-all"
              >
                {/* Timeline Dot + Line */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {i + 1}
                  </div>
                  {i < timeline.items.length - 1 && (
                    <div className="w-1 h-32 bg-blue-500/30 mt-4"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-2xl font-bold text-white">{item.week}</h3>
                  </div>
                  <h4 className="text-xl font-semibold text-blue-300 mb-3">{item.title}</h4>
                  {item.description && (
                    <p className="text-gray-300 leading-relaxed">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-green-400 text-xl flex items-center justify-center gap-2">
              <CheckCircle2 className="w-6 h-6" />
              Data loaded successfully from Sanity!
            </p>
          </div>
        </div>

        <div className="text-center mt-10">
          <code className="bg-white/20 px-8 py-4 rounded-full text-2xl text-white">
            Route: /test-timeline
          </code>
        </div>
      </div>
    </div>
  )
}