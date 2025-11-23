import React, { useState } from 'react';
import SscMainLayout from './components/layout/SscMainLayout';
import OverviewTodaySection from './components/sections/OverviewTodaySection';
import ConfiguratorSection from './components/sections/ConfiguratorSection';
import { ViewId } from './types';
import { Construction } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewId>('dashboard');

  // Placeholder for views that are not the main focus of this specific generation step
  const PlaceholderView = ({ title }: { title: string }) => (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
        <Construction size={32} />
      </div>
      <h2 className="text-xl font-semibold text-ds-textMain">{title}</h2>
      <p className="text-ds-textMuted max-w-md">
        This module is part of the DEALER365 suite. Select the Configurator or Dashboard to see the implemented designs.
      </p>
      <button 
        onClick={() => setCurrentView('dashboard')}
        className="text-ds-primary hover:underline font-medium"
      >
        Return to Overview
      </button>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <OverviewTodaySection />;
      case 'configurator':
        // Pass onClose to allow returning to the Dashboard (Sales Mode)
        return <ConfiguratorSection onClose={() => setCurrentView('dashboard')} />;
      case 'pipeline':
        return <PlaceholderView title="Sales Pipeline (Kanban)" />;
      case 'inventory':
        return <PlaceholderView title="Inventory Management" />;
      default:
        return <PlaceholderView title="Module Under Construction" />;
    }
  };

  return (
    <SscMainLayout activeView={currentView} onNavigate={setCurrentView}>
      {renderContent()}
    </SscMainLayout>
  );
};

export default App;