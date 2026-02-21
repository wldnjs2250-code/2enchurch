import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Info, BookOpen, Bell, LogOut, Save, Lock, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { useStore } from '../store/useStore';
import AdminInfo from '../components/admin/AdminInfo';
import AdminIntro from '../components/admin/AdminIntro';
import AdminSermons from '../components/admin/AdminSermons';
import AdminNews from '../components/admin/AdminNews';
import { motion, AnimatePresence } from 'motion/react';

type Tab = 'info' | 'intro' | 'sermons' | 'news';

export default function Admin() {
  const { adminPassword } = useStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('info');
  const [isDirty, setIsDirty] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === adminPassword) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('비밀번호가 일치하지 않습니다.');
    }
  };

  const handleSave = () => {
    setIsDirty(false);
    alert('서버 DB에 최종 저장되었습니다.');
  };

  const tabs = [
    { id: 'info', name: '정보 및 예배', icon: Home },
    { id: 'intro', name: '교회 소개 수정', icon: Info },
    { id: 'sermons', name: '설교 관리', icon: BookOpen },
    { id: 'news', name: '소식 관리', icon: Bell },
  ] as const;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-2xl w-full max-w-md border border-gray-100"
        >
          <div className="text-center mb-10">
            <div className="bg-green-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-green-700">
              <Lock size={40} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">관리자 로그인</h1>
            <p className="text-gray-500">계정 보안을 위해 비밀번호를 입력해주세요.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="비밀번호"
                className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-700/10 focus:border-green-700 transition-all text-lg"
                autoFocus
              />
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 text-red-500 mt-3 text-sm font-medium"
                >
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </motion.div>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-5 bg-green-700 text-white rounded-2xl font-bold text-lg hover:bg-green-800 transition-all active:scale-95 shadow-xl shadow-green-700/20"
            >
              로그인
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row pb-32 md:pb-20">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:block w-1/5 bg-white border-r border-gray-200 fixed h-full z-10">
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
                      ? 'bg-green-700 text-white shadow-lg shadow-green-700/20'
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
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={18} />
            <span>로그아웃</span>
          </button>
        </div>
      </aside>

      {/* Bottom Nav (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex justify-around items-center z-40">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                'flex flex-col items-center space-y-1 transition-colors',
                isActive ? 'text-green-700' : 'text-gray-400'
              )}
            >
              <Icon size={20} />
              <span className="text-[10px] font-bold">{tab.name.split(' ')[0]}</span>
            </button>
          );
        })}
        <button
          onClick={() => setIsLoggedIn(false)}
          className="flex flex-col items-center space-y-1 text-gray-400"
        >
          <LogOut size={20} />
          <span className="text-[10px] font-bold">로그아웃</span>
        </button>
      </nav>

      {/* Content */}
      <main className="flex-1 md:ml-[20%] p-4 md:p-10">
        <div className="max-w-4xl mx-auto bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-gray-100 p-6 md:p-12 min-h-[80vh]">
          <div className="mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {tabs.find(t => t.id === activeTab)?.name}
            </h2>
          </div>
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
