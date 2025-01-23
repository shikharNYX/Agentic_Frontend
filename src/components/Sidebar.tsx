import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Bot,
  Library,
  BarChart2,
  Megaphone,
  Settings,
  Lightbulb
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: BarChart2, label: 'Analytics', path: '/analytics' },
  { icon: Megaphone, label: 'Campaigns', path: '/campaigns' },
  { icon: Lightbulb, label: 'AI Insights', path: '/ai-insights' },
  { icon: Bot, label: 'AI Assistant', path: '/ai-assistant' },
  { icon: Bot, label: 'AI Agents', path: '/ai-agents' },
  { icon: Library, label: 'Content Library', path: '/content-library' },
  { icon: Settings, label: 'Settings', path: '/settings' }
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="h-screen w-64 bg-[#1A0B2E] border-r border-[#6D28D9]/20 p-4 fixed left-0 top-0">
      {/* Logo Area */}
      <div className="mb-8 px-2">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400">
          Campaign Analytics
        </h1>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                isActive
                  ? 'bg-[#2D1B69] text-purple-200'
                  : 'text-purple-300/80 hover:bg-[#2D1B69]/50 hover:text-purple-200'
              )}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
