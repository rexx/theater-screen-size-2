import React from 'react';
import { CinemaScreen } from '../types';

interface ScreenTableProps {
  screens: CinemaScreen[];
  onHover: (id: string | null) => void;
  highlightId?: string | null;
}

const ScreenTable: React.FC<ScreenTableProps> = ({ screens, onHover, highlightId }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-800 shadow-xl bg-slate-900/50 backdrop-blur-sm">
      <table className="w-full text-sm text-left text-slate-400">
        <thead className="text-xs text-slate-200 uppercase bg-slate-800 border-b border-slate-700">
          <tr>
            <th scope="col" className="px-6 py-4">影廳</th>
            <th scope="col" className="px-6 py-4">種類</th>
            <th scope="col" className="px-6 py-4 hidden md:table-cell">聲道</th>
            <th scope="col" className="px-6 py-4 text-right">尺寸 (寬x高)</th>
            <th scope="col" className="px-6 py-4 text-right">面積 (m²)</th>
          </tr>
        </thead>
        <tbody>
          {screens.map((screen) => (
            <tr 
                key={screen.id} 
                className={`border-b border-slate-800 transition-colors duration-150 cursor-default
                    ${highlightId === screen.id ? 'bg-cyan-900/30 text-white' : 'hover:bg-slate-800/50'}
                `}
                onMouseEnter={() => onHover(screen.id)}
                onMouseLeave={() => onHover(null)}
            >
              <td className="px-6 py-4 font-medium text-slate-100 whitespace-nowrap">
                {screen.name}
              </td>
              <td className="px-6 py-4">
                <span className="bg-slate-700 text-slate-300 text-xs font-medium px-2.5 py-0.5 rounded border border-slate-600">
                    {screen.type}
                </span>
              </td>
              <td className="px-6 py-4 hidden md:table-cell">{screen.audio}</td>
              <td className="px-6 py-4 text-right font-mono">
                {screen.width.toFixed(1)}m × {screen.height.toFixed(1)}m
              </td>
              <td className="px-6 py-4 text-right font-bold text-cyan-400">
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
