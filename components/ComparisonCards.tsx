import React from 'react';
import { CinemaScreen } from '../types';

interface ComparisonCardsProps {
    screens: CinemaScreen[];
    onHover: (id: string | null) => void;
    highlightId?: string | null;
}

const ComparisonCards: React.FC<ComparisonCardsProps> = ({ screens, onHover, highlightId }) => {
    return (
        <div className="grid grid-cols-1 gap-3">
            {screens.map((screen) => {
                const isHighlighted = highlightId === screen.id;
                return (
                    <div 
                        key={screen.id}
                        className={`
                            relative p-4 rounded-lg border transition-all duration-200 cursor-pointer
                            ${isHighlighted 
                                ? 'bg-slate-800 border-cyan-500 shadow-lg scale-[1.02] z-10' 
                                : 'bg-slate-900 border-slate-800 hover:border-slate-600 hover:bg-slate-800/50'
                            }
                        `}
                        onMouseEnter={() => onHover(screen.id)}
                        onMouseLeave={() => onHover(null)}
                        onClick={() => onHover(isHighlighted ? null : screen.id)}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className={`font-bold text-sm leading-tight ${isHighlighted ? 'text-cyan-400' : 'text-slate-200'}`}>
                                    {screen.name}
                                </h3>
                                <div className="text-xs text-slate-500 mt-0.5">{screen.location}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-bold text-white leading-none">{screen.area}</div>
                                <div className="text-[10px] text-slate-500">m²</div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-2 mt-2">
                             <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-300">{screen.type}</span>
                             <span className="font-mono">{screen.width}m × {screen.height}m</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ComparisonCards;