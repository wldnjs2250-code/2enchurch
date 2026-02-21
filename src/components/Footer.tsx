import { useStore } from '../store/useStore';
import { Youtube, Instagram, MessageCircle } from 'lucide-react';

export default function Footer() {
  const { info } = useStore();

  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{info.name}</h3>
            <p className="text-sm text-gray-500 mb-6">{info.slogan}</p>
            <div className="flex space-x-4">
              {info.youtube && (
                <a href={info.youtube} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-red-600 transition-colors">
                  <Youtube size={20} />
                </a>
              )}
              {info.instagram && (
                <a href={info.instagram} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-pink-600 transition-colors">
                  <Instagram size={20} />
                </a>
              )}
              {info.kakao && (
                <a href={info.kakao} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  <MessageCircle size={20} />
                </a>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">연락처 및 위치</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span>{info.address}</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                <span>{info.phone}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">예배 안내</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              {info.worshipTimes.map((worship) => (
                <li key={worship.id} className="flex justify-between">
                  <span>{worship.name}</span>
                  <span className="font-medium text-gray-900">{worship.time}</span>
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
