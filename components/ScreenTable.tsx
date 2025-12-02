import React from 'react';
import { CinemaScreen } from '../types';

interface ScreenTableProps {
  screens: CinemaScreen[];
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  highlightId?: string | null;
}

const ScreenTable: React.FC<ScreenTableProps> = ({ screens, onHover, onSelect, highlightId }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-800 shadow-lg bg-slate-900/50 backdrop-blur-sm">
      <table className="w-full text-xs text-left text-slate-400">
        <thead className="text-[10px] text-slate-400 uppercase bg-slate-800/80 border-b border-slate-700">
          <tr>
            <th scope="col" className="px-3 py-2">影廳</th>
            <th scope="col" className="px-2 py-2 text-right">尺寸</th>
            <th scope="col" className="px-3 py-2 text-right">面積</th>
          </tr>
        </thead>
        <tbody>
          {screens.map((screen) => (
            <tr 
                key={screen.id} 
                className={`border-b border-slate-800/50 transition-colors duration-150 cursor-pointer
                    ${highlightId === screen.id ? 'bg-cyan-900/30 text-white' : 'hover:bg-slate-800/50'}
                `}
                onMouseEnter={() => onHover(screen.id)}
                onMouseLeave={() => onHover(null)}
                onClick={() => onSelect(screen.id)}
            >
              <td className="px-3 py-2">
                <div className="font-medium text-slate-200">{screen.name}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{screen.type}</div>
              </td>
              <td className="px-2 py-2 text-right font-mono text-[11px] whitespace-nowrap">
                {screen.width} × {screen.height}
              </td>
              <td className="px-3 py-2 text-right font-bold text-cyan-500 text-sm">
                {screen.area}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScreenTable;