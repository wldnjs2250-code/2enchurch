import React, { useState, useEffect } from 'react';
import { X, Pin } from 'lucide-react';
import { News } from '../../store/useStore';

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  news?: News | null;
  onSave: (news: Omit<News, 'id'> | News) => void;
}

export default function NewsModal({ isOpen, onClose, news, onSave }: NewsModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    isPinned: false,
    imageUrl: '',
    content: '',
    date: '',
  });

  useEffect(() => {
    if (news) {
      setFormData({
        title: news.title,
        isPinned: news.isPinned,
        imageUrl: news.imageUrl || '',
        content: news.content,
        date: news.date,
      });
    } else {
      setFormData({
        title: '',
        isPinned: false,
        imageUrl: '',
        content: '',
        date: new Date().toISOString().split('T')[0],
      });
    }
  }, [news, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(news ? { ...formData, id: news.id } : formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">항목 수정</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">제목</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition-colors"
              placeholder="제목을 입력하세요"
            />
          </div>

          <label className="flex items-center space-x-3 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-slate-50 transition-colors">
            <input
              type="checkbox"
              checked={formData.isPinned}
              onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
              className="w-5 h-5 text-green-700 rounded border-gray-300 focus:ring-green-700"
            />
            <div className="flex items-center space-x-2 text-gray-700 font-medium">
              <Pin size={16} />
              <span>상단 고정</span>
            </div>
          </label>

          <div>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition-colors"
              placeholder="이미지 URL (선택사항)"
            />
          </div>

          <div>
            <textarea
              required
              rows={4}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition-colors resize-none"
              placeholder="내용을 입력하세요"
            />
          </div>

          <div>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-green-700 text-white rounded-xl font-bold hover:bg-green-800 transition-colors mt-8"
          >
            반영하기
          </button>
        </form>
      </div>
    </div>
  );
}
