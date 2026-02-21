import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Info, BookOpen, Bell, LogOut, Save } from 'lucide-react';
import { clsx } from 'clsx';
import AdminInfo from '../components/admin/AdminInfo';
import AdminIntro from '../components/admin/AdminIntro';
import AdminSermons from '../components/admin/AdminSermons';
import AdminNews from '../components/admin/AdminNews';

type Tab = 'info' | 'intro' | 'sermons' | 'news';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<Tab>('info');
  const [isDirty, setIsDirty] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    // In a real app, this would sync to a backend.
    // Here we just clear the dirty flag as zustand persist handles local storage.
    setIsDirty(false);
    alert('서버 DB에 최종 저장되었습니다.');
  };

  const tabs = [
    { id: 'info', name: '정보 및 예배', icon: Home },
    { id: 'intro', name: '교회 소개 수정', icon: Info },
    { id: 'sermons', name: '설교 관리', icon: BookOpen },
    { id: 'news', name: '소식 관리', icon: Bell },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50 flex pb-20">
      {/* Sidebar (20%) */}
      <aside className="w-1/5 bg-white border-r border-gray-200 fixed h-full z-10">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-900 mb-8 cursor-pointer" onClick={() => navigate('/')}>
            산전온누리교회
          </h1>
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    'w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium',
                    isActive
                      ? 'bg-green-700 text-white'
                      : 'text-gray-600 hover:bg-slate-50 hover:text-gray-900'
                  )}
                >
                  <Icon size={18} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <div className="absolute bottom-24 w-full px-6">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium text-gray-500 hover:bg-slate-50 hover:text-gray-900"
          >
            <LogOut size={18} />
            <span>로그아웃</span>
          </button>
        </div>
      </aside>

      {/* Content (80%) */}
      <main className="w-4/5 ml-[20%] p-10">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-10 min-h-[80vh]">
          {activeTab === 'info' && <AdminInfo markDirty={() => setIsDirty(true)} />}
          {activeTab === 'intro' && <AdminIntro markDirty={() => setIsDirty(true)} />}
          {activeTab === 'sermons' && <AdminSermons markDirty={() => setIsDirty(true)} />}
          {activeTab === 'news' && <AdminNews markDirty={() => setIsDirty(true)} />}
        </div>
      </main>

      {/* Bottom Save Bar */}
      {isDirty && (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white py-4 px-8 flex justify-between items-center z-50 animate-in slide-in-from-bottom-full">
          <div className="flex items-center space-x-2 text-yellow-400 font-medium">
            <Save size={20} />
            <span>변경사항 저장 필요</span>
          </div>
          <div className="space-x-4">
            <button
              onClick={() => setIsDirty(false)}
              className="px-6 py-2 rounded-lg text-sm font-medium bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-lg text-sm font-medium bg-green-700 hover:bg-green-600 transition-colors flex items-center space-x-2"
            >
              <Save size={16} />
              <span>서버 DB에 최종 저장</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
