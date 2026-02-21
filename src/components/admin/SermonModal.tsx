import React, { useState, useEffect } from 'react';
import { X, Pin } from 'lucide-react';
import { Sermon } from '../../store/useStore';

interface SermonModalProps {
  isOpen: boolean;
  onClose: () => void;
  sermon?: Sermon | null;
  onSave: (sermon: Omit<Sermon, 'id'> | Sermon) => void;
}

export default function SermonModal({ isOpen, onClose, sermon, onSave }: SermonModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    pastor: '',
    passage: '',
    youtubeUrl: '',
    date: '',
    isPinned: false,
  });

  useEffect(() => {
    if (sermon) {
      setFormData({
        title: sermon.title,
        pastor: sermon.pastor,
        passage: sermon.passage,
        youtubeUrl: sermon.youtubeUrl,
        date: sermon.date,
        isPinned: sermon.isPinned || false,
      });
    } else {
      setFormData({
        title: '',
        pastor: '',
        passage: '',
        youtubeUrl: '',
        date: new Date().toISOString().split('T')[0],
        isPinned: false,
      });
    }
  }, [sermon, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(sermon ? { ...formData, id: sermon.id } : formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl w-full max-w-lg p-10 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">항목 수정</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={28} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">제목</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition-colors"
              placeholder="부르심, 보내심, 그리고 승리"
            />
          </div>

          <label className="flex items-center space-x-3 p-4 rounded-2xl border border-gray-200 cursor-pointer hover:bg-slate-50 transition-colors">
            <input
              type="checkbox"
              checked={formData.isPinned}
              onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
              className="w-5 h-5 text-green-700 rounded border-gray-300 focus:ring-green-700"
            />
            <div className="flex items-center space-x-2 text-gray-700 font-bold">
              <Pin size={18} />
              <span>상단 고정</span>
            </div>
          </label>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              required
              value={formData.pastor}
              onChange={(e) => setFormData({ ...formData, pastor: e.target.value })}
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition-colors"
              placeholder="이일우 목사"
            />
            <input
              type="text"
              required
              value={formData.passage}
              onChange={(e) => setFormData({ ...formData, passage: e.target.value })}
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition-colors"
              placeholder="사도행전 13 : 1 - 12"
            />
          </div>

          <input
            type="url"
            required
            value={formData.youtubeUrl}
            onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
            className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition-colors"
            placeholder="유튜브 임베드 URL"
          />

          <input
            type="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition-colors"
          />

          <button
            type="submit"
            className="w-full py-5 bg-green-700 text-white rounded-2xl font-bold hover:bg-green-800 transition-all active:scale-95 mt-4 shadow-lg shadow-green-700/20"
          >
            반영하기
          </button>
        </form>
      </div>
    </div>
  );
}
