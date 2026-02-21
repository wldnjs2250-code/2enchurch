import { useStore } from '../store/useStore';
import { Youtube, Instagram, MessageCircle } from 'lucide-react';

export default function Footer() {
  const { info } = useStore();

  return (
    <footer className="bg-slate-50 border-t border-gray-200 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{info.name}</h3>
            <p className="text-base text-gray-600 mb-8 leading-relaxed">{info.slogan}</p>
            <div className="flex space-x-6">
              {info.youtube && info.youtubeVisible && (
                <a href={info.youtube} target="_blank" rel="noreferrer" className="bg-white p-3 rounded-xl shadow-sm text-red-600 hover:scale-110 transition-transform">
                  <Youtube size={24} />
                </a>
              )}
              {info.instagram && info.instagramVisible && (
                <a href={info.instagram} target="_blank" rel="noreferrer" className="bg-white p-3 rounded-xl shadow-sm text-pink-600 hover:scale-110 transition-transform">
                  <Instagram size={24} />
                </a>
              )}
              {info.kakao && info.kakaoVisible && (
                <a href={info.kakao} target="_blank" rel="noreferrer" className="bg-white p-3 rounded-xl shadow-sm text-yellow-500 hover:scale-110 transition-transform">
                  <MessageCircle size={24} />
                </a>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b-2 border-green-700 inline-block">연락처 및 위치</h4>
            <ul className="space-y-4 text-base text-gray-700 font-medium">
              <li className="flex items-start">
                <span className="mr-3 text-xl">📍</span>
                <span>{info.address}</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-xl">📞</span>
                <span>{info.phone}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b-2 border-green-700 inline-block">예배 안내</h4>
            <ul className="space-y-4 text-base text-gray-700 font-medium">
              {info.worshipTimes.map((worship) => (
                <li key={worship.id} className="flex justify-between border-b border-gray-100 pb-2">
                  <span>{worship.name}</span>
                  <span className="text-green-700">{worship.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 text-center md:text-left">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} {info.name}. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
