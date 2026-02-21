import { useStore } from '../../store/useStore';
import { Home, Share2, Clock, Lock, Plus, Trash2 } from 'lucide-react';

export default function AdminInfo({ markDirty }: { markDirty: () => void }) {
  const { info, setInfo, adminPassword, setAdminPassword } = useStore();

  const handleChange = (field: keyof typeof info, value: any) => {
    setInfo({ ...info, [field]: value });
    markDirty();
  };

  const handlePasswordChange = (value: string) => {
    setAdminPassword(value);
    markDirty();
  };

  const handleWorshipChange = (id: string, field: 'name' | 'time', value: string) => {
    const newTimes = info.worshipTimes.map(t => t.id === id ? { ...t, [field]: value } : t);
    setInfo({ ...info, worshipTimes: newTimes });
    markDirty();
  };

  const addWorshipTime = () => {
    const newTimes = [...info.worshipTimes, { id: Date.now().toString(), name: '', time: '' }];
    setInfo({ ...info, worshipTimes: newTimes });
    markDirty();
  };

  const removeWorshipTime = (id: string) => {
    const newTimes = info.worshipTimes.filter(t => t.id !== id);
    setInfo({ ...info, worshipTimes: newTimes });
    markDirty();
  };

  return (
    <div className="space-y-12">
      {/* Basic Info */}
      <section>
        <div className="flex items-center space-x-3 mb-6">
          <Home className="text-green-700" size={24} />
          <h2 className="text-xl font-bold text-gray-900">홈 화면 기본 정보 및 슬로건</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2">교회 명칭 (FOOTER 연동)</label>
            <input
              type="text"
              value={info.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2">홈 화면 메인 슬로건 (VISION - FOOTER 연동)</label>
            <input
              type="text"
              value={info.slogan}
              onChange={(e) => handleChange('slogan', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition-colors text-green-700 font-medium"
            />
          </div>
        </div>
      </section>

      {/* SNS Links */}
      <section>
        <div className="flex items-center space-x-3 mb-6">
          <Share2 className="text-green-700" size={24} />
          <h2 className="text-xl font-bold text-gray-900">SNS 연결 링크</h2>
        </div>
        
        <div className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center text-sm font-bold text-gray-700">
                <span className="text-red-500 mr-2">▶</span> 유튜브
              </label>
              <button 
                onClick={() => handleChange('youtubeVisible', !info.youtubeVisible)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  info.youtubeVisible ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {info.youtubeVisible ? '표시 중' : '숨김'}
              </button>
            </div>
            <input
              type="url"
              value={info.youtube}
              onChange={(e) => handleChange('youtube', e.target.value)}
              placeholder="https://youtube.com/..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition-colors bg-white"
            />
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center text-sm font-bold text-gray-700">
                <span className="text-pink-500 mr-2">📷</span> 인스타그램
              </label>
              <button 
                onClick={() => handleChange('instagramVisible', !info.instagramVisible)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  info.instagramVisible ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {info.instagramVisible ? '표시 중' : '숨김'}
              </button>
            </div>
            <input
              type="url"
              value={info.instagram}
              onChange={(e) => handleChange('instagram', e.target.value)}
              placeholder="https://instagram.com/..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition-colors bg-white"
            />
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center text-sm font-bold text-gray-700">
                <span className="text-yellow-500 mr-2">💬</span> 카카오톡 채널
              </label>
              <button 
                onClick={() => handleChange('kakaoVisible', !info.kakaoVisible)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  info.kakaoVisible ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {info.kakaoVisible ? '표시 중' : '숨김'}
              </button>
            </div>
            <input
              type="url"
              value={info.kakao}
              onChange={(e) => handleChange('kakao', e.target.value)}
              placeholder="https://pf.kakao.com/..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition-colors bg-white"
            />
          </div>
        </div>
      </section>

      {/* Worship Times */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Clock className="text-green-700" size={24} />
            <h2 className="text-xl font-bold text-gray-900">예배 시간 안내</h2>
          </div>
          <button onClick={addWorshipTime} className="flex items-center text-sm font-medium text-green-700 hover:text-green-800">
            <Plus size={16} className="mr-1" /> 시간 추가
          </button>
        </div>
        
        <div className="space-y-4">
          {info.worshipTimes.map((worship) => (
            <div key={worship.id} className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4 p-4 bg-slate-50 rounded-2xl border border-gray-100">
              <input
                type="text"
                value={worship.name}
                onChange={(e) => handleWorshipChange(worship.id, 'name', e.target.value)}
                placeholder="예배명 (예: 주일 1부 예배)"
                className="w-full md:flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition-colors bg-white"
              />
              <div className="flex w-full md:w-auto items-center space-x-2">
                <input
                  type="text"
                  value={worship.time}
                  onChange={(e) => handleWorshipChange(worship.id, 'time', e.target.value)}
                  placeholder="시간 (예: 오전 11:00)"
                  className="flex-1 md:w-48 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition-colors bg-white"
                />
                <button onClick={() => removeWorshipTime(worship.id)} className="p-3 text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Admin Password */}
      <section className="bg-orange-50 rounded-3xl p-10 border border-orange-100">
        <div className="flex items-center space-x-3 mb-8">
          <Lock className="text-orange-500" size={28} />
          <h2 className="text-xl font-bold text-orange-700">관리자 비밀번호 수정</h2>
        </div>
        <input
          type="password"
          value={adminPassword}
          onChange={(e) => handlePasswordChange(e.target.value)}
          placeholder="새로운 비밀번호 입력"
          className="w-full md:w-80 px-6 py-4 rounded-2xl border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors bg-white text-lg"
        />
      </section>
    </div>
  );
}
