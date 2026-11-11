
import { Wifi, User } from 'lucide-react';

type Tab = 'home' | 'profile';

interface NavBarProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

export default function NavBar({
  active,
  onChange,
}: NavBarProps) {
  return (
    <nav
      aria-label="Main navigation"
      className="pointer-events-none fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] left-0 right-0 z-40 px-4"
    >
      <div className="glass-header pointer-events-auto mx-auto flex w-full max-w-[300px] items-center gap-2 rounded-full border border-gray-800/90 bg-gray-900/90 p-1.5 shadow-2xl">

        {/* eSIM */}
        <button
          type="button"
          onClick={() => onChange('home')}
          aria-current={active === 'home' ? 'page' : undefined}
          className={`flex h-[52px] min-w-0 flex-1 items-center justify-center gap-2 rounded-full text-sm font-bold transition-all duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
            active === 'home'
              ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <Wifi className="h-5 w-5 shrink-0" />
          <span>eSIM</span>
        </button>

        {/* Profile */}
        <button
          type="button"
          onClick={() => onChange('profile')}
          aria-current={active === 'profile' ? 'page' : undefined}
          className={`flex h-[52px] min-w-0 flex-1 items-center justify-center gap-2 rounded-full text-sm font-bold transition-all duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
            active === 'profile'
              ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <User className="h-5 w-5 shrink-0" />
          <span>Profile</span>
        </button>

      </div>
    </nav>
  );
}
