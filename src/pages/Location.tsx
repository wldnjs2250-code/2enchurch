import { useStore } from '../store/useStore';
import { MapPin, Phone, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export default function Location() {
  const { info } = useStore();

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Header */}
      <section className="bg-slate-900 text-white py-48 md:py-64 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://picsum.photos/seed/church-building/1920/1080?blur=5" 
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
            오시는 길
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-slate-300 font-light tracking-widest uppercase"
          >
            산전온누리교회는 언제나 당신의 방문을 기다립니다.
          </motion.p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Cards */}
          <div className="lg:col-span-1 flex flex-col lg:h-[600px] space-y-4">
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center group hover:border-green-700 transition-colors flex-1">
              <div className="bg-green-50 p-4 rounded-2xl text-green-700 mb-4 group-hover:bg-green-700 group-hover:text-white transition-all">
                <MapPin size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">교회 주소</h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed">
                {info.address.split('(')[0].trim()}
              </p>
              <p className="text-[10px] text-gray-400 mt-1 italic">
                {info.address.match(/\((.*?)\)/)?.[1] || ''}
              </p>
            </div>

            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center group hover:border-blue-600 transition-colors flex-1">
              <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Phone size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">대표 전화</h3>
              <p className="text-xl font-bold text-gray-900 tracking-tight">
                {info.phone}
              </p>
            </div>

            <div className="bg-slate-900 rounded-[2rem] p-8 shadow-2xl text-white flex flex-col justify-center relative overflow-hidden flex-1">
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-700/20 rounded-full -mr-12 -mt-12"></div>
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                  <Clock className="text-green-400" size={24} />
                  <h3 className="text-lg font-bold">교회 안내</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">위치 설명</h4>
                    <p className="text-sm leading-relaxed text-slate-200 line-clamp-2">{info.locationDesc}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">주차 안내</h4>
                    <p className="text-sm leading-relaxed text-slate-200 line-clamp-2">{info.parkingInfo}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Area */}
          <div className="lg:col-span-2 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 h-[600px] relative">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(info.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              allowFullScreen
              title="Church Location Map"
            ></iframe>
            {/* Simulated Map UI Overlay */}
            <div className="absolute top-4 left-4 bg-white rounded-xl shadow-lg p-4 flex items-center space-x-4 z-10">
              <div className="bg-green-700 text-white p-2 rounded-lg">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">산전온누리교회 위치</h4>
                <a href={`https://map.kakao.com/link/search/${info.address}`} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline mt-1 inline-block">큰 지도 보기</a>
              </div>
              <div className="border-l border-gray-200 pl-4 ml-2">
                <a href={`https://map.kakao.com/link/to/${info.name},35.5683,129.3456`} target="_blank" rel="noreferrer" className="flex flex-col items-center text-gray-500 hover:text-gray-900 transition-colors">
                  <span className="text-xs font-medium mt-1">길찾기</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
