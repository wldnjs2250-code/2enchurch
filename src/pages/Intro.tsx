import { useStore } from '../store/useStore';
import { motion } from 'motion/react';

export default function Intro() {
  const { intro } = useStore();

  return (
    <div className="bg-white min-h-screen pb-32">
      {/* Hero Header */}
      <section className="bg-slate-900 text-white py-48 md:py-64 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://picsum.photos/seed/church-intro/1920/1080?blur=5" 
            alt="background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            교회 소개
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-slate-300 font-light tracking-widest uppercase"
          >
            {intro.visionSlogan}
          </motion.p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        {/* Greeting Section */}
        <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden mb-32">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/5 relative h-[500px] lg:h-auto">
              <img 
                src={intro.pastorImageUrl} 
                alt="담임목사" 
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden"></div>
              <div className="absolute bottom-8 left-8 text-white lg:hidden">
                <p className="text-sm font-bold tracking-widest uppercase mb-1">Senior Pastor</p>
                <h3 className="text-3xl font-bold">{intro.pastorName}</h3>
              </div>
            </div>
            <div className="lg:w-3/5 p-12 md:p-20 flex flex-col justify-center">
              <div className="mb-12">
                <span className="inline-block px-4 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold tracking-widest uppercase mb-4">Welcome Message</span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                  {intro.greetingTitle}
                </h2>
                <div className="w-20 h-1.5 bg-green-700 rounded-full"></div>
              </div>
              
              <div className="prose prose-xl max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap font-light italic mb-12">
                {intro.greetingText}
              </div>

              <div className="hidden lg:block">
                <p className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-1">Senior Pastor</p>
                <h3 className="text-3xl font-bold text-gray-900">{intro.pastorName}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-16">
            <span className="inline-block px-4 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold tracking-widest uppercase mb-4">Our Vision</span>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-10">
              {intro.visionTitle}
            </h2>
            <div className="relative inline-block">
              <div className="absolute -inset-2 bg-green-50 rounded-lg -rotate-1"></div>
              <p className="relative text-2xl md:text-3xl font-bold text-green-700 italic leading-relaxed px-4">
                "{intro.visionSlogan}"
              </p>
            </div>
          </div>
          <div className="prose prose-2xl max-w-none text-gray-500 leading-relaxed whitespace-pre-wrap font-light">
            {intro.visionText}
          </div>
        </div>
      </div>
    </div>
  );
}
