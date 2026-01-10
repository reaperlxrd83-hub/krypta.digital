
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './Navbar';
import MarketTable from './MarketTable';
import AIPanel from './AIPanel';
import ExchangeWidget from './ExchangeWidget';
import { CoinData, AIAnalysisResponse } from './types';
import { getMarketAnalysis } from './geminiService';

const INITIAL_COINS: CoinData[] = [
  { id: '1', symbol: 'BTC', name: 'Bitcoin', price: 68420.45, change24h: 2.45, volume24h: '$34.2B', marketCap: '$1.3T', sparkline: [] },
  { id: '2', symbol: 'ETH', name: 'Ethereum', price: 3450.12, change24h: -1.2, volume24h: '$15.8B', marketCap: '$412B', sparkline: [] },
  { id: '3', symbol: 'USDT', name: 'Tether', price: 1.00, change24h: 0.01, volume24h: '$45B', marketCap: '$110B', sparkline: [] },
  { id: '4', symbol: 'SOL', name: 'Solana', price: 145.89, change24h: 8.54, volume24h: '$4.1B', marketCap: '$65B', sparkline: [] },
  { id: '5', symbol: 'AVAX', name: 'Avalanche', price: 34.21, change24h: -0.45, volume24h: '$840M', marketCap: '$12B', sparkline: [] },
];

const FAQ_DATA = [
  {
    q: "What is KRYPTA.digital?",
    a: "KRYPTA.digital is a fast crypto exchange service. We convert crypto to cash and cash to crypto in minutes."
  },
  {
    q: "How fast are transactions?",
    a: "Most transactions are completed within minutes once payment and confirmations are received. Speed is the product."
  },
  {
    q: "How do transactions work?",
    a: "You send funds first — either crypto or cash. Once payment is received and verified, we execute the exchange and release the corresponding asset directly to you. Execution is fast, transparent, and finalized once completed."
  },
  {
    q: "What cryptocurrencies do you support?",
    a: "We support major cryptocurrencies. Availability may vary based on liquidity and network conditions. If it moves the market, we likely support it."
  },
  {
    q: "Is KRYPTA.digital secure?",
    a: "Yes. We follow strict operational and security procedures. Transactions are monitored, verified, and executed with risk controls in place."
  },
  {
    q: "What fees do you charge?",
    a: "Fees are built into the exchange rate and shown upfront. No hidden charges. No post-transaction surprises."
  },
  {
    q: "Who is this service for?",
    a: "Traders, businesses, and individuals who value speed, execution, and reliability over gimmicks."
  },
  {
    q: "How do I get started?",
    a: "Contact us through the website, confirm the rate, send funds, and get your crypto or cash. That’s it."
  }
];

const App: React.FC = () => {
  const [coins, setCoins] = useState<CoinData[]>(INITIAL_COINS);
  const [selectedCoin, setSelectedCoin] = useState<CoinData | null>(null);
  const [analysis, setAnalysis] = useState<AIAnalysisResponse | null>(null);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCoins(prevCoins => prevCoins.map(coin => {
        const volatility = 0.001;
        const change = 1 + (Math.random() * volatility * 2 - volatility);
        return {
          ...coin,
          price: coin.price * (coin.symbol === 'USDT' ? 1 : change),
        };
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleAnalyze = useCallback(async (coin: CoinData) => {
    setSelectedCoin(coin);
    setIsAnalysing(true);
    setAnalysis(null);
    try {
      const result = await getMarketAnalysis(coin.name);
      setAnalysis(result);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalysing(false);
    }
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const renderFaqItem = (item: typeof FAQ_DATA[0], index: number) => (
    <div 
      key={index} 
      className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm transition-all h-fit"
    >
      <button 
        onClick={() => toggleFaq(index)}
        className="w-full flex items-center justify-between px-6 py-5 text-left group transition-colors hover:bg-slate-50"
      >
        <span className={`text-base font-bold transition-colors ${openFaqIndex === index ? 'text-blue-600' : 'text-slate-900'}`}>
          {item.q}
        </span>
        <span className={`transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180 text-blue-600' : 'text-slate-400'}`}>
          <i className="fa-solid fa-chevron-down"></i>
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 text-slate-500 leading-relaxed text-sm">
          {item.a}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <header className="relative pt-24 pb-32 overflow-hidden border-b border-gray-50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
           <div className="absolute top-[-10%] left-[20%] w-[800px] h-[800px] bg-blue-50/40 rounded-full blur-[120px]"></div>
           <div className="absolute bottom-[-10%] right-[20%] w-[600px] h-[600px] bg-purple-50/40 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.05] mb-8">
                The Safest Way to <br/> 
                <span className="text-gradient-brand">Swap Crypto</span> for Cash
              </h1>
              <p className="text-xl text-slate-500 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                KRYPTA provides a secure, in-person exchange service delivering crypto and cash transactions quickly, transparently, and professionally.
              </p>
              
              <div className="flex flex-wrap gap-10 justify-center lg:justify-start">
                 <div>
                    <div className="text-2xl font-bold text-slate-900">Minutes</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Avg. Swap Time</div>
                 </div>
                 <div className="w-px h-10 bg-slate-200 hidden sm:block"></div>
                 <div>
                    <div className="text-2xl font-bold text-slate-900">3% Comm</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fixed Desk Fee</div>
                 </div>
              </div>
            </div>

            <div className="flex-shrink-0 animate-in fade-in slide-in-from-right-10 duration-1000">
               <ExchangeWidget coins={coins} />
            </div>
          </div>
        </div>
      </header>

      {/* Rates Table */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
         <MarketTable coins={coins} onAnalyze={handleAnalyze} />
      </main>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-gradient-brand mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              {FAQ_DATA.slice(0, 4).map((item, index) => renderFaqItem(item, index))}
            </div>
            <div className="space-y-4">
              {FAQ_DATA.slice(4).map((item, index) => renderFaqItem(item, index + 4))}
            </div>
          </div>
        </div>
      </section>

      {/* Security Banner */}
      <section className="bg-gradient-brand py-16 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <i className="fa-solid fa-shield-halved text-4xl mb-6"></i>
          <h2 className="text-3xl font-bold mb-4">Unmatched Security Standards</h2>
          <p className="text-white/80 leading-relaxed">
            All physical transactions take place in high-security, private rooms monitored by 24/7 security personnel. 
            We comply with all local regulations to ensure your peace of mind.
          </p>
        </div>
      </section>

      <AIPanel 
        coin={selectedCoin} 
        analysis={analysis} 
        loading={isAnalysing} 
        onClose={() => {
          setSelectedCoin(null);
          setAnalysis(null);
        }} 
      />

      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-3">
              <div className="flex items-center gap-2 mb-6">
                <svg width="240" height="60" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto grayscale brightness-200">
                  <path d="M21.5 5L38 14.5V33.5L21.5 43L5 33.5V14.5L21.5 5Z" stroke="white" strokeWidth="3" />
                  <path d="M14 15V33M14 24L26 15M14 24L26 33" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <text x="55" y="34" fill="white" style={{ font: 'bold 28px Inter, sans-serif', letterSpacing: '0.05em' }}>KRYPTA</text>
                </svg>
              </div>
              <p className="text-sm max-w-sm mb-6 leading-relaxed">
                KRYPTA provides a secure, in-person exchange service delivering crypto and cash transactions quickly, transparently, and professionally.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Contact</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-envelope text-blue-500"></i> 
                  help@krypta.digital
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-xs flex flex-col md:flex-row justify-between gap-4">
            <p>Copyright © KRYPTA 2026. All Rights Reserved</p>
            <p>Privacy Policy</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
