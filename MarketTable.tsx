
import React from 'react';
import { CoinData } from './types';

interface MarketTableProps {
  coins: CoinData[];
  onAnalyze: (coin: CoinData) => void;
}

const MarketTable: React.FC<MarketTableProps> = ({ coins, onAnalyze }) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-50 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Daily Rates</h2>
          <p className="text-xs text-slate-400 mt-1">Updated in real-time for physical desk exchange</p>
        </div>
        <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold bg-emerald-50 px-3 py-1.5 rounded-full">
           <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
           LIVE SPREADS
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-gray-50">
              <th className="px-6 py-4">Asset</th>
              <th className="px-6 py-4 text-right">Reference Price</th>
              <th className="px-6 py-4 text-right">We Buy (Cash)</th>
              <th className="px-6 py-4 text-right">We Sell (Cash)</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {coins.map((coin) => (
              <tr key={coin.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-white text-[10px] font-bold">
                       {coin.symbol}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{coin.name}</div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{coin.symbol} / USD</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-right font-mono font-medium text-slate-400 text-sm">
                  ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-5 text-right font-mono font-bold text-slate-900">
                  ${(coin.price * 0.97).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-5 text-right font-mono font-bold text-slate-900">
                  ${(coin.price * 1.03).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => onAnalyze(coin)}
                      className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                      title="AI Market Insights"
                    >
                      <i className="fa-solid fa-chart-line"></i>
                    </button>
                    <button className="px-4 py-2 bg-slate-50 text-slate-900 text-xs font-bold rounded-lg border border-slate-100 hover:bg-slate-100 transition-colors">
                      Inquire
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketTable;
