
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { Video } from '@google/genai';
import React, { useCallback, useEffect, useState } from 'react';
import AdsViewer from './components/AdsViewer';
import ApiKeyDialog from './components/ApiKeyDialog';
import AssetStudio from './components/AssetStudio';
import ProjectWorkspace from './components/CreativeStudio'; 
import SystemInfo from './components/SystemInfo';
import { StoryboardGenerator } from './components/StoryboardGenerator';
import StoryboardStudio from './components/StoryboardStudio'; // Import new plugin
import Dashboard from './components/Dashboard';
import AudioHub from './components/AudioHub';
import BrandCenter from './components/BrandCenter';
import InfluencerCenter from './components/InfluencerCenter';
import ProductPortfolio from './components/ProductPortfolio';
import ContentCalendar from './components/ContentCalendar';
import LocationCenter from './components/LocationCenter';
import { AssetIcon, ClapperboardIcon, CogIcon, LibraryIcon, PresentationIcon, HomeIcon, ChevronRightIcon, XMarkIcon, MusicIcon, CubeIcon, UserIcon, MegaphoneIcon, CalendarDaysIcon, ShoppingBagIcon, MapIcon, FilmIcon } from './components/icons';
import { Asset, GenerateVideoParams } from './types';

type Tab = 'home' | 'workspace_new' | 'projects' | 'assets' | 'audio' | 'storyboard' | 'storyboard_studio' | 'system_info' | 'brands' | 'influencers' | 'products' | 'calendar' | 'locations';

const App: React.FC = () => {
  const [needsApiKey, setNeedsApiKey] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [breadcrumbExtra, setBreadcrumbExtra] = useState<string | null>(null);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  useEffect(() => {
    const checkApiKey = async () => {
      if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setNeedsApiKey(!hasKey);
      }
    };
    checkApiKey();
  }, []);

  const handleSelectApiKey = async () => {
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      try {
        await window.aistudio.openSelectKey();
        setNeedsApiKey(false);
      } catch (e) { console.error('Error opening API key selection:', e); }
    }
  };

  const handleNavigate = (tab: string) => {
      if (tab === 'workspace_new') {
          setEditingProjectId('new');
          setActiveTab('workspace_new');
      } else if (tab === 'storyboard') {
          setEditingProjectId(null);
          setActiveTab('storyboard');
      } else {
          setActiveTab(tab as Tab);
      }
      setIsMenuOpen(false);
  };

  const handleOpenProject = (id: string) => {
      setEditingProjectId(id);
      setActiveTab('workspace_new');
  };

  const handleOpenWizard = (id: string) => {
      setEditingProjectId(id);
      setActiveTab('storyboard');
  };

  const handleCreateNewProject = () => {
      setEditingProjectId(null);
      setActiveTab('storyboard');
  };
  
  const handleAssetsSelected = (assets: Asset[]) => {
      console.log(assets);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'workspace_new':
        return (
            <ProjectWorkspace 
                adId={editingProjectId} 
                onNewProject={() => setEditingProjectId('new')} 
                setBreadcrumb={setBreadcrumbExtra}
                onBackToLibrary={() => setActiveTab('projects')}
                onOpenWizard={handleOpenWizard}
            />
        );
      case 'projects':
        return <AdsViewer onGenerate={() => {}} onEdit={handleOpenProject} onCreateNew={handleCreateNewProject} onOpenWizard={handleOpenWizard} />;
      case 'storyboard':
        return <StoryboardGenerator adId={editingProjectId} onOpenInStudio={handleOpenProject} setBreadcrumb={setBreadcrumbExtra} />;
      case 'storyboard_studio': // New Plugin Route
        return <StoryboardStudio />;
      case 'brands':
        return <BrandCenter />;
      case 'influencers':
        return <InfluencerCenter />;
      case 'products':
        return <ProductPortfolio />;
      case 'locations':
        return <LocationCenter />;
      case 'calendar':
        return <ContentCalendar />;
      case 'assets':
        return <AssetStudio onAssetsSelected={handleAssetsSelected} />;
      case 'audio':
        return <AudioHub />;
      case 'system_info':
        return <SystemInfo />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };
  
  const TabButton: React.FC<{ tab: Tab; label: string; icon: React.ReactNode }> = ({ tab, label, icon }) => (
    <button
      onClick={() => { setActiveTab(tab); setEditingProjectId(null); setIsMenuOpen(false); }}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 w-full ${activeTab === tab ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}
    >
      <div className={`${activeTab === tab ? 'text-[#9063CD]' : 'text-gray-400 group-hover:text-gray-600'}`}>{icon}</div>
      <span className="whitespace-nowrap overflow-hidden">{label}</span>
    </button>
  );

  const GODREJ_LOGO = "https://nrxakqdgbomnfftvoaqy.supabase.co/storage/v1/object/public/RetailData/godrej/brand_logos/98e388d3-f43c-47d2-9a23-ed7dbd18a118/godrej_logo.jpeg";

  return (
    <div className="bg-gray-50 text-gray-900 h-screen flex flex-col font-sans overflow-hidden">
      {needsApiKey && <ApiKeyDialog onContinue={handleSelectApiKey} />}
      <header className="w-full bg-white border-b border-gray-200 shrink-0 z-40 h-14 flex items-center shadow-sm px-4 lg:hidden justify-between">
          <div className="flex items-center gap-3">
              <button onClick={() => setIsMenuOpen(true)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-900 transition-colors" aria-label="Open Menu">
                  <div className="space-y-1"><div className="w-5 h-0.5 bg-black"></div><div className="w-5 h-0.5 bg-black"></div><div className="w-5 h-0.5 bg-black"></div></div>
              </button>
              <img src={GODREJ_LOGO} alt="Godrej" className="h-8 w-auto rounded border border-gray-100" /><span className="font-bold text-sm truncate">Content Gen Platform</span>
          </div>
          {breadcrumbExtra && <span className="text-xs text-gray-500 truncate max-w-[150px]">{breadcrumbExtra}</span>}
      </header>
      {isMenuOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity" onClick={() => setIsMenuOpen(false)} />
            <nav className="relative bg-white w-64 h-full shadow-xl flex flex-col animate-slide-in-left">
               <div className="p-6 border-b border-gray-100 flex items-center justify-between"><div className="flex items-center gap-3"><img src={GODREJ_LOGO} alt="Godrej" className="h-8 w-auto rounded" /><span className="font-bold text-gray-900 text-sm">Content Gen</span></div><button onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-400"><XMarkIcon className="w-5 h-5" /></button></div>
               <div className="flex-1 overflow-y-auto p-4 space-y-2">
                 <TabButton tab="home" label="Dashboard" icon={<HomeIcon className="w-5 h-5"/>} />
                 <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-6 px-4">Studio</div>
                 <TabButton tab="projects" label="Projects" icon={<LibraryIcon className="w-5 h-5"/>} />
                 <TabButton tab="storyboard" label="Storyboard Generator" icon={<PresentationIcon className="w-5 h-5"/>} />
                 <TabButton tab="storyboard_studio" label="Storyboard Studio" icon={<FilmIcon className="w-5 h-5"/>} /> {/* New Plugin */}
                 <TabButton tab="calendar" label="Content Calendar" icon={<CalendarDaysIcon className="w-5 h-5"/>} />
                 <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-6 px-4">Talent & Assets</div>
                 <TabButton tab="influencers" label="Character Lab" icon={<MegaphoneIcon className="w-5 h-5"/>} />
                 <TabButton tab="locations" label="Location Hub" icon={<MapIcon className="w-5 h-5"/>} />
                 <TabButton tab="products" label="Product Portfolio" icon={<ShoppingBagIcon className="w-5 h-5"/>} />
                 <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-6 px-4">Resources</div>
                 <TabButton tab="brands" label="Brand Center" icon={<CubeIcon className="w-5 h-5"/>} />
                 <TabButton tab="assets" label="Asset Library" icon={<AssetIcon className="w-5 h-5"/>} />
                 <TabButton tab="audio" label="Audio Hub" icon={<MusicIcon className="w-5 h-5"/>} />
                 <div className="mt-auto pt-6"><TabButton tab="system_info" label="System Info" icon={<CogIcon className="w-5 h-5"/>} /></div>
               </div>
            </nav>
          </div>
      )}
      <div className="flex flex-1 overflow-hidden">
          <nav className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
               <div className="p-6 border-b border-gray-100"><div className="flex flex-col gap-3"><img src={GODREJ_LOGO} alt="Godrej" className="h-12 w-auto self-start rounded-md border border-gray-100" /><div><h2 className="text-lg font-bold text-gray-900 leading-none">Godrej</h2><p className="text-xs text-gray-500 font-medium">Content Generation Platform</p></div></div></div>
               <div className="flex-1 overflow-y-auto p-4 space-y-2">
                 <TabButton tab="home" label="Dashboard" icon={<HomeIcon className="w-5 h-5"/>} />
                 <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-6 px-4">Studio</div>
                 <TabButton tab="projects" label="Projects" icon={<LibraryIcon className="w-5 h-5"/>} />
                 <TabButton tab="storyboard" label="Storyboard Generator" icon={<PresentationIcon className="w-5 h-5"/>} />
                 <TabButton tab="storyboard_studio" label="Storyboard Studio" icon={<FilmIcon className="w-5 h-5"/>} /> {/* New Plugin */}
                 <TabButton tab="calendar" label="Content Calendar" icon={<CalendarDaysIcon className="w-5 h-5"/>} />
                 <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-6 px-4">Talent & Assets</div>
                 <TabButton tab="influencers" label="Character Lab" icon={<MegaphoneIcon className="w-5 h-5"/>} />
                 <TabButton tab="locations" label="Location Hub" icon={<MapIcon className="w-5 h-5"/>} />
                 <TabButton tab="products" label="Product Portfolio" icon={<ShoppingBagIcon className="w-5 h-5"/>} />
                 <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-6 px-4">Resources</div>
                 <TabButton tab="brands" label="Brand Center" icon={<CubeIcon className="w-5 h-5"/>} />
                 <TabButton tab="assets" label="Asset Library" icon={<AssetIcon className="w-5 h-5"/>} />
                 <TabButton tab="audio" label="Audio Hub" icon={<MusicIcon className="w-5 h-5"/>} />
                 <div className="mt-auto pt-6"><TabButton tab="system_info" label="System Info" icon={<CogIcon className="w-5 h-5"/>} /></div>
               </div>
               <div className="p-4 border-t border-gray-100 bg-gray-50"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">GU</div><div><p className="text-sm font-bold text-gray-900">Godrej User</p><p className="text-xs text-gray-500">Creative Team</p></div></div></div>
          </nav>
          <main className="flex-1 flex flex-col min-w-0 bg-white relative h-full overflow-hidden">{renderContent()}</main>
      </div>
    </div>
  );
};

export default App;