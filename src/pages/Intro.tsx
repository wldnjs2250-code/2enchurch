import { useStore } from '../store/useStore';

export default function Intro() {
  const { intro } = useStore();

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <section className="bg-slate-900 text-white py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">교회 소개</h1>
        <p className="text-slate-400">{intro.visionSlogan}</p>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 space-y-16">
        {/* Greeting Card */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
            <div className="w-48 h-48 rounded-3xl overflow-hidden shadow-md flex-shrink-0">
              <img src={intro.pastorImageUrl} alt="담임목사" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{intro.greetingTitle}</h2>
              <p className="text-lg font-semibold text-green-700 mb-6">{intro.pastorName}</p>
              <div className="w-12 h-1 bg-green-100 mb-6 mx-auto md:mx-0"></div>
              <p className="text-xl text-gray-600 italic leading-relaxed">
                {intro.greetingText}
              </p>
            </div>
          </div>
        </div>

        {/* Vision Card */}
        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full -mr-32 -mt-32 opacity-50"></div>
          <div className="relative z-10">
            <div className="bg-slate-50 rounded-3xl p-10 mb-12 text-center border border-slate-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{intro.visionTitle}</h2>
              <div className="inline-block px-6 py-2 bg-green-700 text-white rounded-full text-lg font-bold tracking-wider mb-2">VISION</div>
              <p className="text-2xl font-bold text-green-700 italic mt-4">"{intro.visionSlogan}"</p>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-xl max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap font-medium text-center">
                {intro.visionText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
