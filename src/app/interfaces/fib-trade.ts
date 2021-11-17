export interface FibTrade {
  key: string;
  image: string;
  totalMomentumDuration: string;
  totalTradeDuration: string;
  highestCandle: number;
  totalCandle: number;
  result: string;
  tradeType: string;
  tradeDirection: string;
  comments: string;
  news: string;
  gain: number;
  momentStartDateTime: Date;
  tradeStartDateTime: Date;
  tradeFinishedDateTime: Date;
  starttoZeroHit: Date;
  starttoZeroHitDuration: string;
  week: string;
  pair: string;
  timeFrame: number;
  clicktoview: boolean;
}
