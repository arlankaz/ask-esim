import { Wifi, User } from 'lucide-react';

type Tab = 'home' | 'profile';

interface NavBarProps {
  active: Tab;
  onChange: (t: Tab) => void;
}

export default function NavBar({ active, onChange }: NavBarProps) {
  return (
    <nav className="fixed bottom-4 left-0 right-0 z-40 px-4 pointer-events-none">
      <div className="max-w-[220px] mx-auto bg-gray-900/90 glass-header border border-gray-800/90 p-1.5 rounded-full shadow-2xl flex items-center justify-between pointer-events-auto">
        <button
          onClick={() => onChange('home')}
          className={`flex-1 py-2 rounded-full font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
            active === 'home' ? 'bg-brand-500 text-white shadow-md' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Wifi className="w-4 h-4" />
          <span>eSIM</span>
        </button>
        <button
          onClick={() => onChange('profile')}
          className={`flex-1 py-2 rounded-full font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
            active === 'profile' ? 'bg-brand-500 text-white shadow-md' : 'text-gray-400 hover:text-white'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile</span>
        </button>
      </div>
    </nav>
  );
}
