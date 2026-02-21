import { useStore } from '../../store/useStore';
import { MapPin, Info, Car } from 'lucide-react';

export default function AdminLocation({ markDirty }: { markDirty: () => void }) {
  const { info, setInfo } = useStore();

  const handleChange = (field: keyof typeof info, value: any) => {
    setInfo({ ...info, [field]: value });
    markDirty();
  };

  return (
    <div className="space-y-12">
      <section>
        <div className="flex items-center space-x-3 mb-6">
          <MapPin className="text-green-700" size={24} />
          <h2 className="text-xl font-bold text-gray-900">오시는 길 정보 수정</h2>
        </div>
        
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">교회 주소 (지도 연동)</label>
              <input
                type="text"
                value={info.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="예: 울산광역시 중구 산전길 103 (동동 162-4)"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">대표 연락처</label>
              <input
                type="text"
                value={info.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="예: 052-296-3550"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition-colors"
              />
            </div>
          </div>
          <p className="text-xs text-gray-400 italic">* 주소를 수정하면 카카오맵 큰지도 보기 및 길찾기 링크가 자동으로 업데이트됩니다.</p>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Info size={14} className="text-green-700" />
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">위치 설명</label>
            </div>
            <textarea
              value={info.locationDesc}
              onChange={(e) => handleChange('locationDesc', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition-colors resize-none"
              placeholder="교회 위치에 대한 자세한 설명을 입력하세요."
            />
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Car size={14} className="text-green-700" />
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">주차 안내</label>
            </div>
            <textarea
              value={info.parkingInfo}
              onChange={(e) => handleChange('parkingInfo', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition-colors resize-none"
              placeholder="주차 공간 및 이용 방법에 대해 입력하세요."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
