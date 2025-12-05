import React, { useState, useMemo } from 'react';
import { SCREEN_DATA, REGIONS, UI_TEXT } from './constants';
import { SortOption, ViewMode, Region, Language } from './types';
import ScreenVisualizer from './components/ScreenVisualizer';
import ScreenTable from './components/ScreenTable';
import ComparisonCards from './components/ComparisonCards';
import { Clapperboard, List, Grid, MapPin, Info, Languages, Search, ChevronDown } from 'lucide-react';

const App: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('area');
  const [viewMode, setViewMode] = useState<ViewMode>('table'); // Default to table
  const [selectedRegions, setSelectedRegions] = useState<Region[]>(['North']); // Default to North
  const [language, setLanguage] = useState<Language>('zh');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleRegion = (regionId: Region) => {
    setSelectedRegions(prev => 
      prev.includes(regionId) 
        ? prev.filter(id => id !== regionId) 
        : [...prev, regionId]
    );
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh');
  };

  // Determine which ID to display: Hover takes precedence (preview), otherwise show Selected
  const displayId = hoveredId ?? selectedId;

  const handleHover = (id: string | null) => {
    setHoveredId(id);
  };

  const handleSelect = (id: string | null) => {
    // Clear hover state on click to prevent sticky hover on mobile
    setHoveredId(null);
    
    if (id === null) {
        setSelectedId(null);
        return;
    }
    // Toggle selection if clicking the same item
    setSelectedId(prev => prev === id ? null : id);
  };

  const sortedScreens = useMemo(() => {
    const filtered = SCREEN_DATA.filter(screen => {
        // 1. Region Filter
        if (!selectedRegions.includes(screen.region)) return false;

        // 2. Search Filter
        if (searchQuery.trim() !== '') {
            const q = searchQuery.toLowerCase();
            return (
                screen.name.toLowerCase().includes(q) ||
                screen.nameEn.toLowerCase().includes(q) ||
                screen.locationZh.includes(q) ||
                screen.location.toLowerCase().includes(q) ||
                screen.type.toLowerCase().includes(q) ||
                screen.typeEn.toLowerCase().includes(q)
            );
        }

        return true;
    });
    
    return filtered.sort((a, b) => {
      if (sortBy === 'area') return b.area - a.area;
      if (sortBy === 'width') return b.width - a.width;
      if (sortBy === 'height') return b.height - a.height;
      return 0;
    });
  }, [sortBy, selectedRegions, searchQuery]);

  const t = UI_TEXT;

  return (
    <div className="fixed inset-0 bg-slate-950 text-slate-200 flex flex-col overflow-hidden font-sans">
      {/* Header */}
      <header className="flex-none h-14 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-4 lg:px-6 z-50">
          <div className="flex items-center gap-2 min-w-0">
            <Clapperboard className="w-5 h-5 text-cyan-500 flex-shrink-0" />
            <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent truncate">
              {t.appTitle[language]}
            </h1>
          </div>
          
          <button 
            onClick={toggleLanguage}
            className="flex-none ml-2 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 transition-colors text-slate-300"
            title={language === 'zh' ? 'Switch to English' : '切換為中文'}
          >
            <Languages className="w-5 h-5" />
          </button>
      </header>

      {/* Main Content Dashboard Layout */}
      <main className="flex-1 flex flex-col landscape:flex-row lg:flex-row overflow-hidden relative">
        
        {/* LEFT PANEL: Visualizer (Main Focus) */}
        <div className="
            flex-none h-[40vh] landscape:h-auto landscape:flex-1 lg:h-auto lg:flex-1 
            flex flex-col 
            p-0
            overflow-hidden relative bg-slate-950 z-0
        ">
            {/* Visualizer Container - Fills remaining height */}
            <div className="flex-1 relative min-h-0 bg-slate-900/30 overflow-hidden">
                {sortedScreens.length > 0 ? (
                   <ScreenVisualizer 
                      screens={sortedScreens} 
                      highlightId={displayId} 
                      onSelect={handleSelect}
                      language={language}
                   />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500 flex-col gap-2">
                        <Grid className="w-8 h-8 opacity-20" />
                        <p className="text-sm">{t.noRegions[language]}</p>
                    </div>
                )}
            </div>
        </div>

        {/* RIGHT PANEL: Sidebar (Controls & List) */}
        <div className="
            flex-1 lg:flex-none 
            min-h-0
            w-full landscape:w-[320px] lg:w-[400px] xl:w-[460px] 
            flex flex-col 
            bg-slate-900/30 border-t border-slate-800 
            landscape:border-t-0 landscape:border-l lg:border-t-0 lg:border-l 
            lg:h-full z-10 
            shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)] landscape:shadow-xl lg:shadow-xl
        ">
            
            {/* Sidebar Controls (Sticky at top of sidebar) */}
            <div className="flex-none p-3 space-y-3 border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm z-20">
                 
                 {/* Row 1: Regions (Inline) */}
                 <div className="flex items-center gap-3">
                    <div className="flex-none text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" />
                        <span className="hidden xl:inline">{t.regionsLabel[language]}</span>
                    </div>
                    {/* Horizontal scrolling container for regions */}
                    <div 
                        className="flex-1 flex flex-nowrap gap-1.5 overflow-x-auto -mr-1 pr-1" 
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        <style>{`
                            div::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
                        {REGIONS.map((region) => (
                            <button
                                key={region.id}
                                onClick={() => toggleRegion(region.id)}
                                className={`flex-none whitespace-nowrap px-2.5 py-1 rounded text-[10px] lg:text-xs font-medium transition-all border ${
                                    selectedRegions.includes(region.id)
                                        ? 'bg-cyan-600/20 border-cyan-500/50 text-cyan-200'
                                        : 'bg-slate-800/50 border-transparent text-slate-400 hover:border-slate-700 hover:text-slate-300'
                                }`}
                            >
                                {language === 'zh' ? region.label : region.labelEn}
                            </button>
                        ))}
                    </div>
                 </div>

                 {/* Row 2: Tools rearranged: ViewToggle -> Search -> Sort */}
                 <div className="flex items-center gap-2">
                    
                    {/* 1. View Toggles (Moved to Left) */}
                    <div className="flex-none flex bg-slate-800/50 p-0.5 rounded-lg border border-slate-700/50">
                        <button
                            onClick={() => setViewMode('table')}
                            className={`p-1.5 rounded-md transition-all ${
                                viewMode === 'table' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                            }`}
                            title={t.tableView[language]}
                        >
                            <List className="w-3.5 h-3.5" />
                        </button>
                        <button
                            onClick={() => setViewMode('visual')}
                            className={`p-1.5 rounded-md transition-all ${
                                viewMode === 'visual' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                            }`}
                            title={t.cardView[language]}
                        >
                            <Grid className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    {/* 2. Search Input (Middle, Flex Grow) */}
                    <div className="relative flex-1 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                        <input 
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t.searchPlaceholder[language]}
                            className="w-full bg-slate-800/50 border border-slate-700/50 text-slate-200 text-xs rounded-lg pl-8 pr-2 py-1.5 outline-none focus:ring-1 focus:ring-cyan-500 placeholder-slate-600"
                        />
                    </div>

                    {/* 3. Sort Dropdown (Right) */}
                    <div className="relative flex-none">
                        <select 
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                            className="appearance-none bg-slate-800/50 border border-slate-700/50 text-slate-300 text-xs rounded-lg focus:ring-1 focus:ring-cyan-500 block py-1.5 pl-2 pr-6 outline-none cursor-pointer hover:bg-slate-800 transition-colors"
                        >
                            <option value="area">{t.sortByArea[language]}</option>
                            <option value="width">{t.sortByWidth[language]}</option>
                            <option value="height">{t.sortByHeight[language]}</option>
                        </select>
                        <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Scrollable List Area */}
            <div className="flex-1 overflow-y-auto p-3 lg:p-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                 {sortedScreens.length === 0 ? (
                     <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-xl">
                        <p className="text-slate-600 text-sm">{t.noRegions[language]}</p>
                    </div>
                ) : (
                    <div className="animate-fade-in-up pb-safe flex flex-col gap-4">
                        {viewMode === 'visual' ? (
                            <ComparisonCards 
                                screens={sortedScreens} 
                                onHover={handleHover} 
                                onSelect={handleSelect}
                                highlightId={displayId} 
                                language={language}
                            />
                        ) : (
                            <ScreenTable 
                                screens={sortedScreens} 
                                onHover={handleHover}
                                onSelect={handleSelect}
                                highlightId={displayId}
                                language={language}
                            />
                        )}
                        
                        {/* Disclaimer moved to bottom of list */}
                        <div className="text-[10px] text-slate-500 text-center py-2">
                            {t.disclaimer[language]}
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Source */}
            <div className="flex-none p-3 border-t border-slate-800 bg-slate-900/50 text-[10px] text-slate-500 flex flex-col items-center gap-2 text-center">
                <div className="flex items-center gap-1">
                     <Info className="w-3 h-3" />
                     <span>{t.source[language]}</span>
                     <a 
                        href="https://www.ptt.cc/bbs/Theater/M.1577599080.A.684.html" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="hover:text-cyan-400 transition-colors text-slate-400 underline decoration-slate-700 underline-offset-2"
                     >
                       PTT Theater 板 (st40182)
                     </a>
                </div>
            </div>
        </div>

      </main>
    </div>
  );
};

export default App;