import React from 'react';
import { NavItem, ViewId } from '../../types';
import { 
  LayoutDashboard, 
  KanbanSquare, 
  Car, 
  Settings2, 
  Users, 
  CalendarDays, 
  FileText, 
  LogOut, 
  Bell, 
  HelpCircle,
  Menu
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewId;
  onNavigate: (view: ViewId) => void;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard size={20} /> },
  { id: 'pipeline', label: 'Sales Pipeline', icon: <KanbanSquare size={20} />, badge: 3 },
  { id: 'inventory', label: 'Inventory', icon: <Car size={20} /> },
  { id: 'configurator', label: 'Car Configurator', icon: <Settings2 size={20} /> },
  { id: 'customers', label: 'Contacts', icon: <Users size={20} /> },
  { id: 'quotations', label: 'Quotations', icon: <FileText size={20} /> },
  { id: 'calendar', label: 'Calendar', icon: <CalendarDays size={20} /> },
];

const SscMainLayout: React.FC<LayoutProps> = ({ children, activeView, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const isConfiguratorMode = activeView === 'configurator';

  return (
    <div className="flex h-screen bg-ds-background overflow-hidden">
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation - HIDDEN in Configurator Mode */}
      {!isConfiguratorMode && (
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-30
          w-64 bg-ds-sidebar text-white transform transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col shadow-xl lg:shadow-none
        `}>
          {/* Logo Area */}
          <div className="h-16 flex items-center px-6 border-b border-gray-700 bg-gray-900/50">
              <div className="w-8 h-8 bg-ds-primary rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-ds-primary/20">
                  <span className="font-bold text-white text-lg">D</span>
              </div>
              <span className="font-bold text-lg tracking-tight">DEALER<span className="text-ds-primary">365</span></span>
          </div>

          {/* User Profile Mini */}
          <div className="px-6 py-6">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <img src="https://picsum.photos/40/40?grayscale" alt="User" className="w-9 h-9 rounded-full border border-gray-600" />
                  <div className="overflow-hidden">
                      <p className="text-sm font-medium text-white truncate">Yudha S.</p>
                      <p className="text-xs text-gray-400 truncate">Senior Consultant</p>
                  </div>
              </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
              {NAV_ITEMS.map((item) => {
                  const isActive = activeView === item.id;
                  return (
                      <button
                          key={item.id}
                          onClick={() => {
                              onNavigate(item.id);
                              setMobileMenuOpen(false);
                          }}
                          className={`
                              w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
                              ${isActive 
                                  ? 'bg-ds-primary text-white shadow-md shadow-ds-primary/20' 
                                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                              }
                          `}
                      >
                          <div className="flex items-center gap-3">
                              <span className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-white transition-colors'}>
                                  {item.icon}
                              </span>
                              {item.label}
                          </div>
                          {item.badge && (
                              <span className={`px-2 py-0.5 text-xs rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-ds-primary/20 text-ds-primary'}`}>
                                  {item.badge}
                              </span>
                          )}
                      </button>
                  );
              })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-gray-700 space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg text-sm transition-colors">
                  <HelpCircle size={18} />
                  <span>Support</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg text-sm transition-colors">
                  <LogOut size={18} />
                  <span>Logout</span>
              </button>
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-white">
        {/* Top Header - HIDDEN in Configurator Mode */}
        {!isConfiguratorMode && (
            <header className="h-16 bg-white border-b border-ds-border flex items-center justify-between px-6 shrink-0 lg:hidden">
                <button 
                    onClick={() => setMobileMenuOpen(true)}
                    className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                    <Menu size={24} />
                </button>
                <div className="w-8 h-8 bg-ds-primary rounded-lg flex items-center justify-center">
                    <span className="font-bold text-white text-lg">D</span>
                </div>
                <button className="p-2 -mr-2 text-gray-600 relative">
                     <Bell size={20} />
                     <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
            </header>
        )}

        {/* Scrollable View Content - Full width/height in Configurator Mode */}
        <div className={`flex-1 overflow-auto ${isConfiguratorMode ? 'p-0' : 'p-4 md:p-8'}`}>
            <div className={isConfiguratorMode ? 'h-full w-full' : 'max-w-7xl mx-auto'}>
                {children}
            </div>
        </div>
      </main>
    </div>
  );
};

export default SscMainLayout;