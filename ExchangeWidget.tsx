
import React, { useState } from 'react';
import { CoinData } from '../types';

interface ExchangeWidgetProps {
  coins: CoinData[];
}

const ExchangeWidget: React.FC<ExchangeWidgetProps> = ({ coins }) => {
  const [amount, setAmount] = useState<string>("1000");
  const [direction, setDirection] = useState<'buy' | 'sell'>('sell'); // sell crypto for cash
  const [selectedCoinId, setSelectedCoinId] = useState<string>(coins[0]?.id || "1");

  const selectedCoin = coins.find(c => c.id === selectedCoinId) || coins[0];
  const rate = selectedCoin ? selectedCoin.price : 0;
  
  // OTC desks usually have a fixed spread/fee (now updated to 3%)
  const feeMultiplier = direction === 'sell' ? 0.97 : 1.03;
  const result = direction === 'sell' 
    ? (parseFloat(amount) || 0) * rate * feeMultiplier
    : (parseFloat(amount) || 0) / (rate * feeMultiplier);

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-blue-500/5 max-w-md w-full">
      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setDirection('sell')}
          className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${direction === 'sell' ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50 text-slate-400'}`}
        >
          Crypto to Cash
        </button>
        <button 
          onClick={() => setDirection('buy')}
          className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${direction === 'buy' ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50 text-slate-400'}`}
        >
          Cash to Crypto
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">You Give</label>
          <div className="relative">
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-xl font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <select 
              value={selectedCoinId}
              onChange={(e) => setSelectedCoinId(e.target.value)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white border border-slate-100 rounded-lg py-1 px-3 text-sm font-bold shadow-sm"
            >
              {coins.map(c => <option key={c.id} value={c.id}>{c.symbol}</option>)}
              <option value="usd">USD</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center -my-2 relative z-10">
          <div className="bg-white p-2 rounded-full border border-slate-100 shadow-sm text-blue-600">
            <i className="fa-solid fa-arrow-down"></i>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">You Receive (Estimated)</label>
          <div className="w-full bg-blue-50/50 rounded-2xl py-4 px-5">
            <div className="text-2xl font-bold text-blue-700">
              {direction === 'sell' ? '$' : ''}
              {result.toLocaleString(undefined, { maximumFractionDigits: direction === 'sell' ? 2 : 6 })}
              {direction === 'buy' ? ` ${selectedCoin.symbol}` : ''}
            </div>
            <div className="text-[10px] text-blue-400 mt-1 font-medium">
              Rate: 1 {selectedCoin.symbol} = ${rate.toLocaleString()} (Incl. 3% Desk Fee)
            </div>
          </div>
        </div>
      </div>

      <button className="w-full mt-8 py-4 bg-gradient-brand text-white rounded-2xl font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
        Book Appointment
      </button>
      <p className="text-center text-[10px] text-slate-400 mt-4">
        Rates are locked for 15 minutes after arrival at the office.
      </p>
    </div>
  );
};

export default ExchangeWidget;
