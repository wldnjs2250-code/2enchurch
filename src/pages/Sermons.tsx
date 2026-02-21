import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Play, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'motion/react';

export default function Sermons() {
  const { sermons } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredSermons = sermons.filter(sermon => 
    sermon.title.includes(searchTerm) || 
    sermon.pastor.includes(searchTerm) ||
    sermon.passage.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredSermons.length / itemsPerPage);
  const currentSermons = filteredSermons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const renderPagination = () => {
    const pages = [];
    const startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
    const endPage = Math.min(startPage + 9, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={clsx(
            'w-10 h-10 rounded-full text-sm font-bold transition-all',
            currentPage === i ? 'bg-green-700 text-white shadow-lg' : 'text-gray-400 hover:text-green-700'
          )}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setCurrentPage(Math.max(1, startPage - 10))}
          disabled={startPage === 1}
          className="p-2 text-gray-400 hover:text-gray-900 disabled:opacity-30 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        {pages}
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, startPage + 10))}
          disabled={endPage === totalPages}
          className="p-2 text-gray-400 hover:text-gray-900 disabled:opacity-30 transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    );
  };

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Header */}
      <section className="bg-slate-900 text-white py-48 md:py-64 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://picsum.photos/seed/sermons/1920/1080?blur=5" 
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
            예배 및 설교
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-slate-300 font-light tracking-widest uppercase"
          >
            언제 어디서나 하나님의 말씀을 통해 영적인 성숙과 평안을 누리십시오.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="bg-white rounded-full shadow-2xl p-3 flex items-center max-w-3xl mx-auto mb-24 border border-gray-100">
          <Search className="text-gray-400 ml-4" size={20} />
          <input
            type="text"
            placeholder="검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 focus:outline-none bg-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentSermons.map((sermon) => (
            <div key={sermon.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 group cursor-pointer">
              <div className="relative aspect-video bg-gray-900">
                {sermon.imageUrl ? (
                  <img src={sermon.imageUrl} alt={sermon.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                ) : getYoutubeId(sermon.youtubeUrl) ? (
                  <img src={`https://img.youtube.com/vi/${getYoutubeId(sermon.youtubeUrl)}/maxresdefault.jpg`} alt={sermon.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                    <Play className="text-white w-12 h-12 opacity-50" />
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="text-green-700 w-5 h-5 ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <span className="text-xs font-bold text-green-700 mb-2 block">{sermon.date}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{sermon.title}</h3>
                <div className="flex justify-between items-center text-sm text-gray-500 mt-4 pt-4 border-t border-gray-50">
                  <span>{sermon.pastor}</span>
                  <span className="italic">{sermon.passage}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSermons.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            검색 결과가 없습니다.
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-20">
          {renderPagination()}
        </div>
      </div>
    </div>
  );
}
