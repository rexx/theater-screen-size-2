import React, { useState, useMemo } from 'react';
import { SCREEN_DATA } from './constants';
import { SortOption, ViewMode } from './types';
import ScreenVisualizer from './components/ScreenVisualizer';
import ScreenTable from './components/ScreenTable';
import ComparisonCards from './components/ComparisonCards';
import { Tv, List, Grid, ArrowDownWideNarrow, Info } from 'lucide-react';

const App: React.FC = () => {
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('area');
  const [viewMode, setViewMode] = useState<ViewMode>('visual');

  const sortedScreens = useMemo(() => {
    return [...SCREEN_DATA].sort((a, b) => {
      if (sortBy === 'area') return b.area - a.area;
      if (sortBy === 'width') return b.width - a.width;
      if (sortBy === 'height') return b.height - a.height;
      return 0;
    });
  }, [sortBy]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tv className="w-6 h-6 text-cyan-500" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Cinema Screen War
            </h1>
          </div>
          <div className="flex items-center gap-4">
             <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors text-sm hidden sm:block">
               Data Source: Public Listings
             </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
                台灣最大影廳銀幕比一比
            </h2>
            <p className="text-slate-400 text-lg">
                直觀比較全台頂級影廳的銀幕尺寸。從 IMAX 雷射到 8K 巨幕，誰才是真正的視覺霸主？
            </p>
        </div>

        {/* Visualizer Section */}
        <section className="space-y-4">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Grid className="w-5 h-5 text-cyan-500" />
                    尺寸疊加比較
                </h3>
                <span className="text-xs text-slate-500 px-2 py-1 bg-slate-900 rounded border border-slate-800">
                  Tip: Hover over items below to highlight
                </span>
            </div>
            <ScreenVisualizer screens={SCREEN_DATA} highlightId={highlightId} />
        </section>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
            <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
                <button
                    onClick={() => setViewMode('visual')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        viewMode === 'visual' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                >
                    <Grid className="w-4 h-4" />
                    Cards View
                </button>
                <button
                    onClick={() => setViewMode('table')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        viewMode === 'table' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                >
                    <List className="w-4 h-4" />
                    Table View
                </button>
            </div>

            <div className="flex items-center gap-3">
                <span className="text-sm text-slate-400 flex items-center gap-1">
                    <ArrowDownWideNarrow className="w-4 h-4" /> Sort by:
                </span>
                <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="bg-slate-900 border border-slate-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block p-2.5"
                >
                    <option value="area">總面積 (Area)</option>
                    <option value="width">寬度 (Width)</option>
                    <option value="height">高度 (Height)</option>
                </select>
            </div>
        </div>

        {/* List/Table View */}
        <section className="animate-fade-in-up">
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
        </section>

        {/* Info Footer */}
        <div className="mt-12 bg-slate-900/50 p-6 rounded-xl border border-slate-800 flex items-start gap-4">
            <Info className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
            <div className="text-sm text-slate-400 space-y-2">
                <p>資料來源為網際網路公開資訊整理，實際尺寸可能因測量方式或官方更新略有出入。帶有「*」號標記為特殊規格或官方宣稱數據。</p>
                <p>IMAX (雷射) 通常指 Commercial IMAX Laser，TITAN 與 LUXE 均為自有品牌巨幕廳。</p>
            </div>
        </div>

      </main>
    </div>
  );
};

export default App;
