import { useStore } from '../../store/useStore';
import { FileText } from 'lucide-react';

export default function AdminIntro({ markDirty }: { markDirty: () => void }) {
  const { intro, setIntro } = useStore();

  const handleChange = (field: keyof typeof intro, value: string) => {
    setIntro({ ...intro, [field]: value });
    markDirty();
  };

  return (
    <div className="space-y-12">
      <div className="flex items-center space-x-3 mb-8">
        <FileText className="text-green-700" size={24} />
        <h2 className="text-xl font-bold text-gray-900">교회 소개 정밀 수정</h2>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-8">
        {/* Greeting Section */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-48 h-48 rounded-3xl overflow-hidden bg-gray-100 flex-shrink-0">
            {intro.pastorImageUrl ? (
              <img 
                src={intro.pastorImageUrl} 
                alt="담임목사" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">이미지 없음</div>
            )}
          </div>
          <div className="flex-1 space-y-6">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2">1. 인사말 영역 대제목</label>
              <input
                type="text"
                value={intro.greetingTitle}
                onChange={(e) => handleChange('greetingTitle', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition-colors font-bold text-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2">2. 담임목사님 성함 및 직함</label>
              <input
                type="text"
                value={intro.pastorName}
                onChange={(e) => handleChange('pastorName', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition-colors font-medium text-gray-900"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-2">3. 핵심 인사말</label>
          <textarea
            rows={3}
            value={intro.greetingText}
            onChange={(e) => handleChange('greetingText', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-2">담임목사님 사진 이미지 URL</label>
          <input
            type="url"
            value={intro.pastorImageUrl}
            onChange={(e) => handleChange('pastorImageUrl', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition-colors font-mono text-sm"
          />
        </div>
      </div>

      {/* Vision Section */}
      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-8">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-2">4. 비전 영역 제목</label>
          <input
            type="text"
            value={intro.visionTitle}
            onChange={(e) => handleChange('visionTitle', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition-colors font-bold text-gray-900"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-2">5. 교회 비전 (소개 페이지용)</label>
          <input
            type="text"
            value={intro.visionSlogan}
            onChange={(e) => handleChange('visionSlogan', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition-colors font-medium text-gray-900"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-2">6. 상세 소개 본문</label>
          <textarea
            rows={8}
            value={intro.visionText}
            onChange={(e) => handleChange('visionText', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition-colors resize-none leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}
