// app/test-values/page.tsx
import { fetchValuesSection } from '@/lib/about'
import { Button } from '@/components/atoms/button'

export default async function TestValuesSection() {
  const en = await fetchValuesSection('en')
  const am = await fetchValuesSection('am')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-10">
      <h1 className="text-5xl font-bold text-center text-white mb-16 font-amharicHeading">
        Values Section — Test
      </h1>

      <div className="max-w-7xl mx-auto space-y-20">
        {/* English */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20">
          <h2 className="text-4xl font-bold text-green-400 mb-6">English</h2>
          {en ? (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-5xl font-bold text-white">{en.sectionHeading}</h3>
                <p className="text-2xl text-yellow-300 mt-4">{en.accentText}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mt-12">
                {en.values.map((v, i) => (
                  <div
                    key={i}
                    className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20"
                  >
                    <div className="text-6xl mb-4">{v.emoji}</div>
                    <h4 className="text-2xl font-bold mb-3">{v.title}</h4>
                    <p className="text-base leading-relaxed opacity-90">{v.description}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button size="lg" className="bg-white text-black hover:bg-gray-200">
                  {en.buttonText}
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-red-400 text-2xl">English content missing</p>
          )}
        </div>

        {/* Amharic */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20">
          <h2 className="text-4xl font-bold text-yellow-400 mb-6 font-amharicHeading">አማርኛ</h2>
          {am ? (
            <div className="space-y-8 font-amharicBody text-xl">
              <div className="text-center">
                <h3 className="text-5xl font-bold text-white font-amharicHeading">{am.sectionHeading}</h3>
                <p className="text-3xl text-pink-300 mt-6">{am.accentText}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mt-12">
                {am.values.map((v, i) => (
                  <div
                    key={i}
                    className={`${v.bgColor} ${v.textColor || 'text-gray-900'} p-10 rounded-2xl shadow-2xl hover:scale-105 transition-all`}
                  >
                    <div className="text-7xl mb-6 text-center">{v.emoji}</div>
                    <h4 className="text-3xl font-bold mb-4 text-center font-amharicHeading">{v.title}</h4>
                    <p className="text-lg leading-loose text-center opacity-90">{v.description}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button size="lg" className="bg-white text-black hover:bg-gray-200 text-xl px-12 py-6">
                  {am.buttonText}
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-red-400 text-3xl font-amharicBody">የአማርኛ ይዘት ጎደል</p>
          )}
        </div>
      </div>

      <div className="text-center mt-20">
        <code className="bg-white/20 px-8 py-4 rounded-full text-2xl text-white">
          /test-values
        </code>
      </div>
    </div>
  )
}