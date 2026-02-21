import { useState } from 'react';
import { useStore, Sermon } from '../../store/useStore';
import { Plus, Edit2, Trash2, ChevronLeft, ChevronRight, Pin } from 'lucide-react';
import SermonModal from './SermonModal';
import { clsx } from 'clsx';

export default function AdminSermons({ markDirty }: { markDirty: () => void }) {
  const { sermons, setSermons } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSermon, setEditingSermon] = useState<Sermon | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(sermons.length / itemsPerPage);
  const currentSermons = sermons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const renderPagination = () => {
    const pages = [];
    const startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
    const endPage = Math.min(startPage + 9, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={clsx(
            'w-8 h-8 rounded-full text-xs font-bold transition-all',
            currentPage === i ? 'bg-green-700 text-white shadow-md' : 'text-gray-400 hover:text-green-700'
          )}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex items-center space-x-1">
        <button
          onClick={() => setCurrentPage(Math.max(1, startPage - 10))}
          disabled={startPage === 1}
          className="p-1 text-gray-400 hover:text-gray-900 disabled:opacity-30 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        {pages}
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, startPage + 10))}
          disabled={endPage === totalPages}
          className="p-1 text-gray-400 hover:text-gray-900 disabled:opacity-30 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );
  };

  const handleSave = (sermonData: Omit<Sermon, 'id'> | Sermon) => {
    let updatedSermons;
    if ('id' in sermonData) {
      updatedSermons = sermons.map(s => s.id === sermonData.id ? sermonData : s);
    } else {
      const newSermon: Sermon = {
        ...sermonData,
        id: Date.now().toString(),
      };
      updatedSermons = [newSermon, ...sermons];
    }

    // Sort: pinned first, then by date desc
    updatedSermons.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    setSermons(updatedSermons);
    markDirty();
    setIsModalOpen(false);
  };

  const togglePin = (id: string) => {
    const updatedSermons = sermons.map(s => s.id === id ? { ...s, isPinned: !s.isPinned } : s);
    updatedSermons.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    setSermons(updatedSermons);
    markDirty();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      setSermons(sermons.filter(s => s.id !== id));
      markDirty();
    }
  };

  const openEditModal = (sermon: Sermon) => {
    setEditingSermon(sermon);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingSermon(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-gray-900">설교 관리</h2>
        <button
          onClick={openCreateModal}
          className="bg-green-700 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-green-800 transition-colors flex items-center space-x-2 shadow-sm"
        >
          <Plus size={18} />
          <span>추가</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
        <div className="space-y-4">
          {currentSermons.map((sermon) => (
            <div key={sermon.id} className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-transparent hover:border-gray-200 transition-colors group">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{sermon.title}</h3>
                <p className="text-sm text-gray-500">{sermon.date} • {sermon.pastor}</p>
              </div>
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => togglePin(sermon.id)}
                  className={clsx(
                    "p-2 rounded-lg shadow-sm transition-colors",
                    sermon.isPinned ? "text-green-700 bg-green-50" : "text-gray-400 bg-white hover:text-green-700"
                  )}
                >
                  <Pin size={18} />
                </button>
                <button
                  onClick={() => openEditModal(sermon)}
                  className="p-2 text-gray-400 hover:text-green-700 bg-white rounded-lg shadow-sm transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(sermon.id)}
                  className="p-2 text-gray-400 hover:text-red-600 bg-white rounded-lg shadow-sm transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          {currentSermons.length === 0 && (
            <div className="text-center py-12 text-gray-400">등록된 설교가 없습니다.</div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10">
            {renderPagination()}
          </div>
        )}
      </div>

      <SermonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sermon={editingSermon}
        onSave={handleSave}
      />
    </div>
  );
}
