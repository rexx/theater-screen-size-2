import React, { useState, useMemo } from 'react';
import { SCREEN_DATA, REGIONS } from './constants';
import { SortOption, ViewMode, Region } from './types';
import ScreenVisualizer from './components/ScreenVisualizer';
import ScreenTable from './components/ScreenTable';
import ComparisonCards from './components/ComparisonCards';
import { Tv, List, Grid, Info, MapPin } from 'lucide-react';

const App: React.FC = () => {
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('area');
  const [viewMode, setViewMode] = useState<ViewMode>('table'); // Default to table
  const [selectedRegions, setSelectedRegions] = useState<Region[]>(['North']); // Default to North

  const toggleRegion = (regionId: Region) => {
    setSelectedRegions(prev => 
      prev.includes(regionId) 
        ? prev.filter(id => id !== regionId) 
        : [...prev, regionId]
    );
  };

  const sortedScreens = useMemo(() => {
    const filtered = SCREEN_DATA.filter(screen => selectedRegions.includes(screen.region));
    
    return filtered.sort((a, b) => {
      if (sortBy === 'area') return b.area - a.area;
      if (sortBy === 'width') return b.width - a.width;
      if (sortBy === 'height') return b.height - a.height;
      return 0;
    });
  }, [sortBy, selectedRegions]);

  return (
    <div className="h-screen bg-slate-950 text-slate-200 flex flex-col overflow-hidden font-sans">
      {/* Header */}
      <header className="flex-none h-14 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-4 lg:px-6 z-50">
          <div className="flex items-center gap-2">
            <Tv className="w-5 h-5 text-cyan-500" />
            <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent truncate">
              Cinema Screen War
            </h1>
          </div>
          <div className="flex items-center gap-4">
             <a 
                href="https://www.ptt.cc/bbs/Theater/M.1577599080.A.684.html" 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-500 hover:text-white transition-colors text-xs hidden sm:block"
             >
               Source: PTT (st40182)
             </a>
          </div>
      </header>

      {/* Main Content Dashboard Layout */}
      <main className="flex-1 flex flex-col landscape:flex-row lg:flex-row overflow-hidden relative">
        
        {/* LEFT PANEL: Visualizer (Main Focus) */}
        <div className="
            flex-none h-[40vh] landscape:h-auto landscape:flex-1 lg:h-auto lg:flex-1 
            flex flex-col 
            p-2 lg:p-6 
            overflow-hidden relative bg-slate-950 z-0
        ">
            {/* Intro / Title */}
            <div className="flex-none mb-2 lg:mb-4 flex justify-between items-end">
                <div>
                    <h2 className="text-lg lg:text-2xl font-extrabold text-white tracking-tight">
                        全台最大影廳銀幕比一比
                    </h2>
                    <p className="text-slate-400 text-xs lg:text-sm mt-0.5 lg:mt-1 hidden sm:block">
                        直觀比較頂級影廳尺寸，誰才是視覺霸主？
                    </p>
                </div>
                 <div className="text-xs text-slate-500 px-2 py-1 bg-slate-900 rounded border border-slate-800 hidden lg:block">
                      Hover list items to highlight
                 </div>
            </div>

            {/* Visualizer Container - Fills remaining height */}
            <div className="flex-1 relative min-h-0 bg-slate-900/30 rounded-xl lg:rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
                {sortedScreens.length > 0 ? (
                   <ScreenVisualizer screens={sortedScreens} highlightId={highlightId} />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500 flex-col gap-2">
                        <Grid className="w-8 h-8 opacity-20" />
                        <p className="text-sm">請於選單選擇區域</p>
                    </div>
                )}
            </div>

            {/* Footer Info */}
            <div className="flex-none mt-2 lg:mt-4 flex items-start gap-3 text-[10px] lg:text-xs text-slate-500">
                 <Info className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0 mt-0.5 text-cyan-500/50" />
                 <div>
                    <span className="mr-2">資料來源：<a href="https://www.ptt.cc/bbs/Theater/M.1577599080.A.684.html" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">PTT Theater 板</a></span>
                    <span className="hidden sm:inline"> | *標記為特殊規格或官方宣稱</span>
                 </div>
            </div>
        </div>

        {/* RIGHT PANEL: Sidebar (Controls & List) */}
        <div className="
            flex-1 lg:flex-none 
            w-full landscape:w-[320px] lg:w-[400px] xl:w-[460px] 
            flex flex-col 
            bg-slate-900/30 border-t border-slate-800 
            landscape:border-t-0 landscape:border-l lg:border-t-0 lg:border-l 
            lg:h-full z-10 
            shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)] landscape:shadow-xl lg:shadow-xl
        ">
            
            {/* Sidebar Controls (Sticky at top of sidebar) */}
            <div className="flex-none p-3 lg:p-4 space-y-3 lg:space-y-4 border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm">
                 {/* Region Select */}
                 <div className="space-y-2">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" />
                        REGIONS
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {REGIONS.map((region) => (
                            <button
                                key={region.id}
                                onClick={() => toggleRegion(region.id)}
                                className={`px-2 py-1 lg:px-2.5 lg:py-1 rounded text-[10px] lg:text-xs font-medium transition-all border ${
                                    selectedRegions.includes(region.id)
                                        ? 'bg-cyan-600/20 border-cyan-500/50 text-cyan-200'
                                        : 'bg-slate-800/50 border-transparent text-slate-400 hover:border-slate-700 hover:text-slate-300'
                                }`}
                            >
                                {region.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* View & Sort */}
                <div className="flex items-center justify-between gap-4">
                     <div className="flex bg-slate-800/50 p-0.5 rounded-lg border border-slate-700/50">
                        <button
                            onClick={() => setViewMode('table')}
                            className={`p-1.5 rounded-md transition-all ${
                                viewMode === 'table' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                            }`}
                            title="Table View"
                        >
                            <List className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('visual')}
                            className={`p-1.5 rounded-md transition-all ${
                                viewMode === 'visual' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                            }`}
                            title="Card View"
                        >
                            <Grid className="w-4 h-4" />
                        </button>
                    </div>

                    <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="bg-slate-800/50 border border-slate-700/50 text-slate-300 text-xs rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block p-1.5 outline-none"
                    >
                        <option value="area">Sort by Area</option>
                        <option value="width">Sort by Width</option>
                        <option value="height">Sort by Height</option>
                    </select>
                </div>
            </div>

            {/* Scrollable List Area */}
            <div className="flex-1 overflow-y-auto p-3 lg:p-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                 {sortedScreens.length === 0 ? (
                     <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-xl">
                        <p className="text-slate-600 text-sm">No regions selected</p>
                    </div>
                ) : (
                    <div className="animate-fade-in-up pb-safe">
                        {viewMode === 'visual' ? (
                            <ComparisonCards 
                                screens={sortedScreens} 
                                onHover={setHighlightId} 
                                highlightId={highlightId} 
                            />
                        ) : (
                            <ScreenTable 
                                screens={sortedScreens} 
                                onHover={setHighlightId}
                                highlightId={highlightId} 
                            />
                        )}
                    </div>
                )}
            </div>
        </div>

      </main>
    </div>
  );
};

export default App;