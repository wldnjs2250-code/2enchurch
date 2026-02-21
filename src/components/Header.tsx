import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { User, Menu, X } from 'lucide-react';
import { clsx } from 'clsx';

export default function Header() {
  const { info } = useStore();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: '홈', path: '/' },
    { name: '교회소개', path: '/intro' },
    { name: '예배/설교', path: '/sermons' },
    { name: '교제/소식', path: '/news' },
    { name: '오시는길', path: '/location' },
  ];

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
              {info.name}
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={clsx(
                  'text-sm font-medium transition-colors hover:text-green-700',
                  location.pathname === link.path ? 'text-green-700' : 'text-gray-600'
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/admin" className="text-gray-400 hover:text-green-700 transition-colors">
              <User size={20} />
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-green-700 transition-colors p-2"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 shadow-xl">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={clsx(
                  'text-lg font-bold px-4 py-2 rounded-xl transition-colors',
                  location.pathname === link.path ? 'bg-green-50 text-green-700' : 'text-gray-600'
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/admin" 
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-2 text-gray-400 px-4 py-2"
            >
              <User size={20} />
              <span className="font-bold">관리자</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
