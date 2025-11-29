import React from 'react';
import { CinemaScreen } from '../types';

interface ComparisonCardsProps {
    screens: CinemaScreen[];
    onHover: (id: string | null) => void;
    highlightId?: string | null;
}

const ComparisonCards: React.FC<ComparisonCardsProps> = ({ screens, onHover, highlightId }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {screens.map((screen) => {
                const isHighlighted = highlightId === screen.id;
                return (
                    <div 
                        key={screen.id}
                        className={`
                            relative p-6 rounded-xl border transition-all duration-300
                            ${isHighlighted 
                                ? 'bg-slate-800 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.15)] scale-[1.02]' 
                                : 'bg-slate-900 border-slate-800 hover:border-slate-600'
                            }
                        `}
                        onMouseEnter={() => onHover(screen.id)}
                        onMouseLeave={() => onHover(null)}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className={`font-bold text-lg leading-tight ${isHighlighted ? 'text-cyan-400' : 'text-slate-100'}`}>
                                    {screen.name}
                                </h3>
                                <div className="text-xs text-slate-500 mt-1">{screen.location}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-white">{screen.area}<span className="text-sm text-slate-500 font-normal"> m²</span></div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between text-sm border-b border-slate-800 pb-2">
                                <span className="text-slate-400">Technology</span>
                                <span className="text-slate-200 font-medium">{screen.type}</span>
                            </div>
                            <div className="flex justify-between text-sm border-b border-slate-800 pb-2">
                                <span className="text-slate-400">Dimensions</span>
                                <span className="text-slate-200 font-mono">{screen.width}m × {screen.height}m</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Audio</span>
                                <span className="text-slate-200">{screen.audio}</span>
                            </div>
                        </div>

                        {/* Mini Visual Bar */}
                        <div className="mt-6">
                            <div className="flex justify-between text-xs text-slate-500 mb-1">
                                <span>Relative Width</span>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-2">
                                <div 
                                    className={`h-2 rounded-full ${isHighlighted ? 'bg-cyan-500' : 'bg-slate-600'}`} 
                                    style={{ width: `${(screen.width / 29.0) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ComparisonCards;
