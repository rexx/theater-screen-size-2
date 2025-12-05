import React, { useMemo } from 'react';
import { CinemaScreen, Language } from '../types';
import { HUMAN_HEIGHT, UI_TEXT } from '../constants';

interface ScreenVisualizerProps {
  screens: CinemaScreen[];
  highlightId?: string | null;
  onSelect?: (id: string | null) => void;
  language: Language;
}

const GRID_SIZE = 5; // meters

const ScreenVisualizer: React.FC<ScreenVisualizerProps> = ({ screens, highlightId, onSelect, language }) => {
  const t = UI_TEXT;

  // Determine SVG viewbox dimensions based on the CURRENT screens
  const maxDimensions = useMemo(() => {
    // Default fallback if no screens exist
    if (screens.length === 0) return { width: 30, height: 23 };

    const maxWidth = Math.max(...screens.map(s => s.width));
    const maxHeight = Math.max(...screens.map(s => s.height));

    // Add reasonable padding (10-15%)
    // Use a small minimum floor (e.g., 10m width) so single small screens don't look awkwardly huge
    const calculatedWidth = Math.max(maxWidth, 10) * 1.1; 
    const calculatedHeight = Math.max(maxHeight, 8) * 1.2; // More height padding for labels/human

    return { width: calculatedWidth, height: calculatedHeight }; 
  }, [screens]);

  // Calculate grid alignment
  // We want the grid to align with the floor (maxDimensions.height)
  // Since pattern starts at (0,0), we offset it so a line lands exactly on maxDimensions.height
  const gridOffsetY = maxDimensions.height % GRID_SIZE;

  // Sort screens by area descending for "stacking" order (largest in back)
  const sortedScreens = useMemo(() => {
    return [...screens].sort((a, b) => b.area - a.area);
  }, [screens]);

  const getColor = (index: number, id: string) => {
    const isHighlighted = highlightId === id;
    if (highlightId && !isHighlighted) return 'stroke-slate-700 fill-transparent opacity-30';
    
    // Gradient of colors for the stack
    const colors = [
      'stroke-cyan-400 fill-cyan-400/10',
      'stroke-blue-400 fill-blue-400/10',
      'stroke-indigo-400 fill-indigo-400/10',
      'stroke-violet-400 fill-violet-400/10',
      'stroke-purple-400 fill-purple-400/10',
      'stroke-fuchsia-400 fill-fuchsia-400/10',
      'stroke-pink-400 fill-pink-400/10',
      'stroke-rose-400 fill-rose-400/10',
      'stroke-orange-400 fill-orange-400/10',
    ];
    return colors[index % colors.length];
  };

  // Human figure dimensions
  const headRadius = 0.15;
  const headDiameter = headRadius * 2;
  const bodyHeight = HUMAN_HEIGHT - headDiameter;

  return (
    <div 
        className="w-full h-full bg-slate-950 relative overflow-hidden flex items-end justify-center p-1 sm:p-2 lg:p-4"
        onClick={() => onSelect && onSelect(null)} // Click background to deselect
    >
      <svg
        viewBox={`0 0 ${maxDimensions.width} ${maxDimensions.height}`}
        className="w-full h-full filter drop-shadow-lg"
        preserveAspectRatio="xMidYMax"
      >
        <defs>
            {/* Grid Pattern: 5x5 units = 5x5 meters */}
            <pattern 
                id="gridPattern" 
                width={GRID_SIZE} 
                height={GRID_SIZE} 
                patternUnits="userSpaceOnUse"
                patternTransform={`translate(0, ${gridOffsetY})`}
            >
                <path d={`M ${GRID_SIZE} 0 L 0 0 0 ${GRID_SIZE}`} fill="none" stroke="#1e293b" strokeWidth="0.1" />
            </pattern>
        </defs>

        {/* Background Grid Layer */}
        <rect x="0" y="0" width="100%" height="100%" fill="url(#gridPattern)" />

        {/* Ground Line */}
        <line 
            x1="0" 
            y1={maxDimensions.height} 
            x2={maxDimensions.width} 
            y2={maxDimensions.height} 
            stroke="#475569" 
            strokeWidth="0.1" 
        />

        {/* Screens */}
        {sortedScreens.map((screen, index) => {
            const x = (maxDimensions.width - screen.width) / 2;
            const y = maxDimensions.height - screen.height;
            const styleClass = getColor(index, screen.id);
            const isActive = highlightId === screen.id;
            const name = language === 'zh' ? screen.name : screen.nameEn;

            return (
              <g 
                key={screen.id} 
                className="transition-all duration-500"
                onClick={(e) => {
                    e.stopPropagation();
                    if (onSelect) onSelect(screen.id);
                }}
              >
                <rect
                  x={x}
                  y={y}
                  width={screen.width}
                  height={screen.height}
                  className={`${styleClass} transition-all duration-300 hover:fill-opacity-30 cursor-pointer`}
                  strokeWidth={isActive ? 0.2 : 0.05}
                />
                {/* Label (Only show if highlighted or very few screens) */}
                {(isActive) && (
                  <text
                    x={maxDimensions.width / 2}
                    y={y - 0.5}
                    textAnchor="middle"
                    className="fill-white text-[1px] font-bold"
                    style={{ fontSize: '0.8px' }}
                  >
                    {name} ({screen.width}m x {screen.height}m)
                  </text>
                )}
              </g>
            );
        })}

        {/* Highlight Overlay (Rendered last to be on top of everything) */}
        {highlightId && (() => {
            const screen = screens.find(s => s.id === highlightId);
            if (!screen) return null;
            const x = (maxDimensions.width - screen.width) / 2;
            const y = maxDimensions.height - screen.height;
            
            return (
                <rect
                    x={x}
                    y={y}
                    width={screen.width}
                    height={screen.height}
                    className="stroke-cyan-300 fill-none pointer-events-none drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                    strokeWidth={0.25}
                />
            );
        })()}

        {/* Human Reference */}
        {/* Group positioned so that (0,0) is the TOP of the human figure */}
        <g transform={`translate(${maxDimensions.width / 2 - 0.2}, ${maxDimensions.height - HUMAN_HEIGHT})`}>
             {/* Head */}
             <circle cx="0.2" cy={headRadius} r={headRadius} className="fill-yellow-400" />
             {/* Body */}
             <rect x="0" y={headDiameter} width="0.4" height={bodyHeight} className="fill-yellow-400" rx="0.05" />
             
             <text x="0.6" y="1.2" className="fill-yellow-400 text-[0.5px]" style={{fontSize: '0.6px'}}>
                {t.humanLabel[language]}
             </text>
        </g>
      </svg>
      
      {/* Hover/Tap Hint - Overlay Top Left */}
      <div className="absolute top-2 left-2 lg:top-4 lg:left-4 text-slate-500 text-[10px] lg:text-xs px-2 py-1 bg-slate-900/50 rounded border border-slate-800/50 pointer-events-none backdrop-blur-sm">
        {t.clickHint[language]}
      </div>

      {/* Scale Legend - Overlay Top Right */}
      <div className="absolute top-2 right-2 lg:top-4 lg:right-4 text-slate-500 text-[10px] lg:text-xs font-mono bg-slate-950/50 px-2 py-1 rounded pointer-events-none backdrop-blur-sm">
        {t.scalePrefix[language]}{GRID_SIZE} {t.meters[language]}
      </div>
    </div>
  );
};

export default ScreenVisualizer;