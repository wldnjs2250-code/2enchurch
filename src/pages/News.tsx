import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Pin, ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'motion/react';

export default function News() {
  const { news } = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(news.length / itemsPerPage);
  const currentNews = news.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Header */}
      <section className="bg-slate-900 text-white py-48 md:py-64 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://picsum.photos/seed/church-community/1920/1080?blur=5" 
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
            교제와 소식
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-slate-300 font-light tracking-widest uppercase"
          >
            산전온누리 공동체의 생생한 사역 현장과 소식을 전해드립니다.
          </motion.p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="space-y-12">
          {currentNews.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col md:flex-row gap-8">
              {item.imageUrl && (
                <div className="w-full md:w-64 h-48 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center space-x-3 mb-3">
                  {item.isPinned && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <Pin size={12} className="mr-1" /> 공지
                    </span>
                  )}
                  <span className="text-sm font-semibold text-gray-400">{item.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{item.content}</p>
              </div>
            </div>
          ))}
        </div>

        {news.length === 0 && (
          <div className="text-center py-24 text-gray-400 bg-white rounded-3xl border border-gray-100">
            등록된 소식이 없습니다.
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
