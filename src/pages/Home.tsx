import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, ArrowRight, MapPin, Calendar, Info } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'motion/react';

export default function Home() {
  const { info, sermons, news } = useStore();
  const [sermonIndex, setSermonIndex] = useState(0);
  const [newsIndex, setNewsIndex] = useState(0);

  // Get top 3 latest items
  const topSermons = [...sermons].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);
  const topNews = [...news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const nextSermon = () => setSermonIndex((prev) => (prev + 1) % topSermons.length);
  const prevSermon = () => setSermonIndex((prev) => (prev - 1 + topSermons.length) % topSermons.length);

  const nextNews = () => setNewsIndex((prev) => (prev + 1) % topNews.length);
  const prevNews = () => setNewsIndex((prev) => (prev - 1 + topNews.length) % topNews.length);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-48 md:py-64 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://picsum.photos/seed/church/1920/1080?blur=10" 
            alt="background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter"
          >
            {info.name}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl text-slate-300 font-light tracking-widest uppercase"
          >
            {info.slogan}
          </motion.p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-20 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/intro" className="bg-white rounded-3xl p-10 shadow-2xl hover:shadow-green-700/10 transition-all hover:-translate-y-2 flex items-center justify-between group border border-gray-100">
            <div className="flex items-center space-x-6">
              <div className="bg-slate-50 p-5 rounded-2xl text-slate-600 group-hover:bg-green-50 group-hover:text-green-700 transition-colors">
                <Info size={32} />
              </div>
              <span className="text-2xl font-bold text-gray-900">교회 소개</span>
            </div>
            <ArrowRight className="text-gray-300 group-hover:text-green-700 transition-colors" size={28} />
          </Link>
          <Link to="/sermons" className="bg-green-700 rounded-3xl p-10 shadow-2xl hover:shadow-green-700/30 transition-all hover:-translate-y-2 flex items-center justify-between group text-white">
            <div className="flex items-center space-x-6">
              <div className="bg-green-600 p-5 rounded-2xl text-white">
                <Calendar size={32} />
              </div>
              <span className="text-2xl font-bold">예배 안내</span>
            </div>
            <ArrowRight className="text-green-300 group-hover:text-white transition-colors" size={28} />
          </Link>
          <Link to="/location" className="bg-white rounded-3xl p-10 shadow-2xl hover:shadow-green-700/10 transition-all hover:-translate-y-2 flex items-center justify-between group border border-gray-100">
            <div className="flex items-center space-x-6">
              <div className="bg-slate-50 p-5 rounded-2xl text-slate-600 group-hover:bg-green-50 group-hover:text-green-700 transition-colors">
                <MapPin size={32} />
              </div>
              <span className="text-2xl font-bold text-gray-900">오시는 길</span>
            </div>
            <ArrowRight className="text-gray-300 group-hover:text-green-700 transition-colors" size={28} />
          </Link>
        </div>
      </section>

      {/* Latest Sermon Slider */}
      {topSermons.length > 0 && (
        <section className="py-32 bg-slate-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight">최신 설교 영상</h2>
              <div className="flex space-x-4">
                <button 
                  onClick={prevSermon}
                  className="p-4 rounded-full bg-white shadow-md text-gray-400 hover:text-green-700 hover:shadow-lg transition-all active:scale-95"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextSermon}
                  className="p-4 rounded-full bg-white shadow-md text-gray-400 hover:text-green-700 hover:shadow-lg transition-all active:scale-95"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
            
            <div className="relative h-[500px] md:h-[600px]">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={topSermons[sermonIndex].id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="absolute inset-0 bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
                >
                  <div className="md:w-3/5 relative aspect-video md:aspect-auto bg-gray-900 group cursor-pointer overflow-hidden">
                    {topSermons[sermonIndex].imageUrl ? (
                      <img 
                        src={topSermons[sermonIndex].imageUrl} 
                        alt={topSermons[sermonIndex].title} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                        referrerPolicy="no-referrer"
                      />
                    ) : getYoutubeId(topSermons[sermonIndex].youtubeUrl) ? (
                      <img 
                        src={`https://img.youtube.com/vi/${getYoutubeId(topSermons[sermonIndex].youtubeUrl)}/maxresdefault.jpg`} 
                        alt={topSermons[sermonIndex].title} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                        <Play className="text-white w-24 h-24 opacity-50" />
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                        <Play className="text-green-700 w-10 h-10 ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/5 p-12 md:p-20 flex flex-col justify-center">
                    <span className="text-lg font-bold text-green-700 mb-6">{topSermons[sermonIndex].date}</span>
                    <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">{topSermons[sermonIndex].title}</h3>
                    <p className="text-xl text-gray-500 mb-12">{topSermons[sermonIndex].pastor} <span className="mx-2 text-gray-200">|</span> {topSermons[sermonIndex].passage}</p>
                    <Link to="/sermons" className="inline-flex items-center text-lg font-bold text-green-700 hover:text-green-800 transition-colors group">
                      전체 설교 보기 <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>
      )}

      {/* Church News Slider */}
      {topNews.length > 0 && (
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight">교회 소식</h2>
              <div className="flex space-x-4">
                <button 
                  onClick={prevNews}
                  className="p-4 rounded-full bg-slate-50 text-gray-400 hover:text-green-700 hover:bg-white hover:shadow-md transition-all active:scale-95"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextNews}
                  className="p-4 rounded-full bg-slate-50 text-gray-400 hover:text-green-700 hover:bg-white hover:shadow-md transition-all active:scale-95"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            <div className="relative h-[450px] md:h-[350px]">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={topNews[newsIndex].id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute inset-0 bg-white border border-gray-100 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all flex flex-col md:flex-row overflow-hidden"
                >
                  {topNews[newsIndex].imageUrl && (
                    <div className="md:w-1/3 h-48 md:h-full flex-shrink-0">
                      <img 
                        src={topNews[newsIndex].imageUrl} 
                        alt={topNews[newsIndex].title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <div className={clsx(
                    "flex-1 p-8 md:p-12 flex flex-col justify-center",
                    !topNews[newsIndex].imageUrl && "text-center items-center"
                  )}>
                    <span className="text-sm font-bold text-green-700 mb-4 block uppercase tracking-widest">{topNews[newsIndex].date}</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 line-clamp-1">{topNews[newsIndex].title}</h3>
                    <p className="text-lg text-gray-600 mb-8 line-clamp-2 leading-relaxed max-w-2xl">
                      {topNews[newsIndex].content}
                    </p>
                    <Link to="/news" className="inline-flex items-center text-lg font-bold text-green-700 hover:text-green-800 transition-colors group">
                      자세히 보기 <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
