export interface CurrencyPairDetails {
  key: string;
  name: string;
  winRate: number;
  totalGain: number;
  totalTradesCount: number;
  minHighestCandle: {value: number, key: string};
  minMomentumMovemet: {value: number, key: string};
  minStZeroMili: {value: number, key: string};
  minStZeroDuration: string;
  minMomentumMili: {value: number, key: string};
  minMomentumDuration: string;
}
