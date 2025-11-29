import React, { useMemo } from 'react';
import { CinemaScreen } from '../types';
import { HUMAN_HEIGHT } from '../constants';

interface ScreenVisualizerProps {
  screens: CinemaScreen[];
  highlightId?: string | null;
}

const ScreenVisualizer: React.FC<ScreenVisualizerProps> = ({ screens, highlightId }) => {
  // Determine SVG viewbox dimensions based on the largest screen
  const maxDimensions = useMemo(() => {
    const maxWidth = Math.max(...screens.map(s => s.width), 30); // Min 30m width base
    const maxHeight = Math.max(...screens.map(s => s.height), 23); // Min 23m height base
    return { width: maxWidth * 1.1, height: maxHeight * 1.1 }; // Add padding
  }, [screens]);

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

  return (
    <div className="w-full aspect-video bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden flex items-end justify-center p-8 shadow-2xl">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      <svg
        viewBox={`0 0 ${maxDimensions.width} ${maxDimensions.height}`}
        className="w-full h-full filter drop-shadow-lg"
        preserveAspectRatio="xMidYBottom"
      >
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

            return (
              <g key={screen.id} className="transition-all duration-500">
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
                    {screen.name} ({screen.width}m x {screen.height}m)
                  </text>
                )}
              </g>
            );
        })}

        {/* Human Reference */}
        <g transform={`translate(${maxDimensions.width / 2 - 0.5}, ${maxDimensions.height - HUMAN_HEIGHT})`}>
             <rect width="0.4" height={HUMAN_HEIGHT} className="fill-yellow-400" rx="0.1" />
             <circle cx="0.2" cy="-0.3" r="0.2" className="fill-yellow-400" />
             <text x="1" y="1" className="fill-yellow-400 text-[0.5px]" style={{fontSize: '0.6px'}}>1.75m 人類</text>
        </g>
      </svg>
      
      <div className="absolute bottom-4 right-4 text-slate-500 text-xs font-mono">
        Scale: 1 grid ≈ 5 meters (approx)
      </div>
    </div>
  );
};

export default ScreenVisualizer;
