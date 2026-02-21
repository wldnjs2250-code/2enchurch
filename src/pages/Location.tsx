import { useStore } from '../store/useStore';
import { MapPin, Phone, Clock } from 'lucide-react';

export default function Location() {
  const { info } = useStore();

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <section className="bg-slate-900 text-white py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">오시는 길</h1>
        <p className="text-slate-400">산전온누리교회는 언제나 당신의 방문을 기다립니다.</p>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-start space-x-6">
              <div className="bg-green-50 p-4 rounded-2xl text-green-700 flex-shrink-0">
                <MapPin size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">주소</h3>
                <p className="text-gray-600 mb-1">도로명: {info.address.split('(')[0].trim()}</p>
                <p className="text-sm text-gray-400 italic">지번: {info.address.match(/\((.*?)\)/)?.[1] || ''}</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-start space-x-6">
              <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 flex-shrink-0">
                <Phone size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">전화</h3>
                <p className="text-gray-600">{info.phone}</p>
              </div>
            </div>

            <div className="bg-slate-900 rounded-3xl p-8 shadow-md text-white">
              <div className="flex items-center space-x-4 mb-6">
                <Clock className="text-green-400" size={24} />
                <h3 className="text-lg font-bold">교회 안내</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">위치 설명</h4>
                  <p className="text-sm leading-relaxed text-slate-200">울산 중구 동동 산전마을 입구 부근에 위치하고 있습니다.</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">주차 안내</h4>
                  <p className="text-sm leading-relaxed text-slate-200">교회 전용 주차장 및 인근 공영주차장 이용이 가능합니다.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Area */}
          <div className="lg:col-span-2 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 h-[600px] relative">
            {/* Placeholder for actual map implementation (e.g., Google Maps, Kakao Maps) */}
            <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium">지도 API 연동 영역</p>
                <p className="text-sm text-gray-400 mt-2">{info.address}</p>
              </div>
            </div>
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
