
import React from 'react';
import { AIAnalysisResponse, CoinData } from '../types';

interface AIPanelProps {
  coin: CoinData | null;
  analysis: AIAnalysisResponse | null;
  loading: boolean;
  onClose: () => void;
}

const AIPanel: React.FC<AIPanelProps> = ({ coin, analysis, loading, onClose }) => {
  if (!coin && !loading) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] w-[380px] max-w-[90vw] animate-in slide-in-from-bottom-10 fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden">
        <div className="p-4 bg-gradient-brand flex justify-between items-center">
          <div className="flex items-center gap-2 text-white">
            <i className="fa-solid fa-robot text-lg"></i>
            <span className="font-bold">KRYPTA Intelligence</span>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="text-sm text-slate-500 font-medium">Analyzing market data for {coin?.name}...</p>
            </div>
          ) : analysis ? (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{coin?.name} Sentiment</h3>
                  <p className="text-xs text-slate-400">Analysis provided by Gemini 3.0</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  analysis.sentiment === 'Bullish' ? 'bg-emerald-50 text-emerald-600' : 
                  analysis.sentiment === 'Bearish' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-600'
                }`}>
                  {analysis.sentiment}
                </span>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed italic border-l-4 border-blue-100 pl-3">
                "{analysis.summary}"
              </p>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Key Levels</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.keyLevels.map((level, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-50 border border-slate-100 rounded text-xs font-mono text-slate-700">
                      {level}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-50">
                <div className="flex items-center gap-2 text-amber-600 mb-1">
                  <i className="fa-solid fa-triangle-exclamation text-xs"></i>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Risk Factor</span>
                </div>
                <p className="text-sm font-semibold text-slate-800">{analysis.riskFactor}</p>
              </div>

              <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
                Execute Trade
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AIPanel;
