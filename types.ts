
export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: string;
  marketCap: string;
  sparkline: { value: number }[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface AIAnalysisResponse {
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  summary: string;
  keyLevels: string[];
  riskFactor: string;
}
