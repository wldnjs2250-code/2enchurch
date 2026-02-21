import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { User } from 'lucide-react';
import { clsx } from 'clsx';

export default function Header() {
  const { info } = useStore();
  const location = useLocation();

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
            <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight">
              {info.name}
            </Link>
          </div>
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
        </div>
      </div>
    </header>
  );
}
