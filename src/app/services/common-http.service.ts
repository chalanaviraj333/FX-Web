import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrencyPairDetails } from '../interfaces/currency-pair-details';
import { FibTrade } from '../interfaces/fib-trade';
import { SelectedfilterData } from '../interfaces/selectedfilter-data';

@Injectable({
  providedIn: 'root'
})
export class CommonHttpService {

  public allCurrencyPairs: Array<CurrencyPairDetails> = [];
  public filteredFibTrades: Array<FibTrade> = [];
  private allFibTrades: Array<FibTrade> = [];
  public selectedFilterData: SelectedfilterData = {
    selectedCurrencyPair: '', selectedTradeResult: ''
  }

  public selectedTrade: FibTrade = {key: '', image: '', totalMomentumDuration: '', totalTradeDuration: '', highestCandle: 0, totalCandle: 0, result: '',tradeType: '', tradeDirection: '',
    comments: '', news: '', gain: 0, momentStartDateTime: new Date(), tradeStartDateTime: new Date(), tradeFinishedDateTime: new Date(), starttoZeroHit: new Date(), starttoZeroHitDuration: '', week: '', pair: '', timeFrame: 0, clicktoview: true};

  constructor(private http: HttpClient) { }

  getAllFibTrades() {
    this.allFibTrades = [];

    this.http
      .get<{ [key: string]: FibTrade }>(
        'https://fx-web-3d3df-default-rtdb.firebaseio.com/fib-trades.json'
      ).subscribe((resData) => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            this.allFibTrades.push({
              key,
              image: resData[key].image,
              totalMomentumDuration: null,
              totalTradeDuration: null,
              highestCandle: resData[key].highestCandle,
              totalCandle: resData[key].totalCandle,
              result: resData[key].result,
              tradeType: resData[key].tradeType,
              tradeDirection: resData[key].tradeDirection,
              comments: resData[key].comments,
              news: resData[key].news,
              gain: resData[key].gain,
              momentStartDateTime: new Date(resData[key].momentStartDateTime),
              tradeStartDateTime: new Date(resData[key].tradeStartDateTime),
              tradeFinishedDateTime: new Date(resData[key].tradeFinishedDateTime),
              starttoZeroHit: new Date(resData[key].starttoZeroHit),
              starttoZeroHitDuration: null,
              week: resData[key].week,
              pair: resData[key].pair,
              timeFrame: resData[key].timeFrame,
              clicktoview: false
            });
          }

          // sort trade array
          this.allFibTrades.sort((a, b) => (a.tradeFinishedDateTime < b.tradeFinishedDateTime ? 1 : -1));

      // find current pair in all currnacy pair array
      const selectedPair: CurrencyPairDetails = this.allCurrencyPairs.find((i) => i.name == resData[key].pair);

        selectedPair.totalTradesCount++;
        selectedPair.totalGain = selectedPair.totalGain + resData[key].gain;

        if (resData[key].result == 'won') {
          selectedPair.winRate++;
        }
        if (selectedPair.minHighestCandle.value == 0) {
          selectedPair.minHighestCandle.value = resData[key].highestCandle;
          selectedPair.minHighestCandle.key = key;
        }
        else if (resData[key].highestCandle < selectedPair.minHighestCandle.value){
          selectedPair.minHighestCandle.value = resData[key].highestCandle;
          selectedPair.minHighestCandle.key = key;
        }

        if (selectedPair.minMomentumMovemet.value == 0) {
          selectedPair.minMomentumMovemet.value = resData[key].totalCandle;
          selectedPair.minMomentumMovemet.key = key;
        }
        else if (resData[key].totalCandle < selectedPair.minMomentumMovemet.value){
          selectedPair.minMomentumMovemet.value = resData[key].totalCandle;
          selectedPair.minMomentumMovemet.key = key;
        }

        // find min start to zero
        const currentMinStarttoZero: number = new Date(resData[key].starttoZeroHit).getTime() - new Date(resData[key].momentStartDateTime).getTime();

        if (selectedPair.minStZeroMili.value == 0) {
          selectedPair.minStZeroMili.value = currentMinStarttoZero;
          selectedPair.minStZeroMili.key = key;
        }
        else if (currentMinStarttoZero < selectedPair.minStZeroMili.value){
          selectedPair.minStZeroMili.value = currentMinStarttoZero;
          selectedPair.minStZeroMili.key = key;
        }
        selectedPair.minStZeroDuration = this.convertMS(selectedPair.minStZeroMili.value);

        // find min momentum
        const currentMomentum: number = new Date(resData[key].tradeFinishedDateTime).getTime() - new Date(resData[key].momentStartDateTime).getTime();

        if (selectedPair.minMomentumMili.value == 0) {
          selectedPair.minMomentumMili.value = currentMomentum;
          selectedPair.minMomentumMili.key = key;
        }
        else if (currentMomentum < selectedPair.minMomentumMili.value){
          selectedPair.minMomentumMili.value = currentMomentum;
          selectedPair.minMomentumMili.key = key;
        }
        selectedPair.minMomentumDuration = this.convertMS(selectedPair.minMomentumMili.value);

      }
        this.allFibTrades.forEach(trade => {
          const miliseconds: number = trade.starttoZeroHit.getTime() - trade.momentStartDateTime.getTime();
          trade.starttoZeroHitDuration = this.convertMS(miliseconds);
        });

        this.allFibTrades.forEach(trade => {
          const miliseconds: number = trade.tradeFinishedDateTime.getTime() - trade.momentStartDateTime.getTime();
          trade.totalMomentumDuration = this.convertMS(miliseconds);
        });

        this.allFibTrades.forEach(trade => {
          const miliseconds: number = trade.tradeFinishedDateTime.getTime() - trade.tradeStartDateTime.getTime();
          trade.totalTradeDuration = this.convertMS(miliseconds);
        });
      });
      this.filteredFibTrades = this.allFibTrades;
  }

  // get all currency pairs
  getAllCurrencyPairs() {
    this.allCurrencyPairs = [];

    this.http
      .get<{ [key: string]: CurrencyPairDetails }>(
        'https://fx-web-3d3df-default-rtdb.firebaseio.com/currency-pairs.json'
      ).subscribe((resData) => {
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            this.allCurrencyPairs.push({
              key,
              name:resData[key].name,
              winRate: resData[key].winRate,
              totalGain: resData[key].totalGain,
              totalTradesCount: resData[key].totalTradesCount,
              minHighestCandle:resData[key].minHighestCandle,
              minMomentumMovemet: resData[key].minMomentumMovemet,
              minStZeroMili: resData[key].minStZeroMili,
              minStZeroDuration: resData[key].minStZeroDuration,
              minMomentumMili: resData[key].minMomentumMili,
              minMomentumDuration: resData[key].minMomentumDuration
            });
          }
        }
      });

  }

  clickToView(fibTrade: FibTrade) {
    const clickedFibTrade = this.allFibTrades.find((i) => i.key == fibTrade.key);

    clickedFibTrade.clicktoview = !clickedFibTrade.clicktoview;
  }

  databaseChanges() {
    this.allFibTrades.forEach(trade => {
      this.http
        .put(
          `https://fx-web-3d3df-default-rtdb.firebaseio.com/fib-trades/${trade.key}.json`,
          { ...trade, tradeFinishedDateTime: new Date, key: null }
        )
        .subscribe((resData) => {
          console.log(resData);
        });
    });
  }

  convertMS( milliseconds ) {
    let day, hour, minute, seconds;
    let returnValue: string = '';
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;

    if (day) {
      returnValue = returnValue.concat((day + "D ").toString());
    }
    if (hour) {
      returnValue = returnValue.concat((hour + "h ").toString());
    }
    if (minute) {
      returnValue = returnValue.concat((minute + "mins").toString());
    }
    return returnValue;
}

checkbutton() {
  this.allFibTrades.forEach(fibTrade => {
    const printValue = (fibTrade.tradeFinishedDateTime.getTime() - fibTrade.tradeStartDateTime.getTime())/(fibTrade.tradeFinishedDateTime.getTime() - fibTrade.momentStartDateTime.getTime());
    console.log(printValue);
  });
}

// find selected trade
findSelectedTrade(tradeKey : string) {
  this.selectedTrade = this.allFibTrades.find((i) => i.key == tradeKey);
}

// add new Currency Pair
addNewCurrPair(enteredCurrPair: string) {
  const newPair: CurrencyPairDetails = {
    key: null,
    name:enteredCurrPair,
    winRate: 0,
    totalGain: 0,
    totalTradesCount: 0,
    minHighestCandle: {value: 0, key: 'AA'},
    minMomentumMovemet: {value: 0, key: 'AA'},
    minStZeroMili: {value: 0, key: 'AA'},
    minStZeroDuration: '123hrs',
    minMomentumMili: {value: 0, key: 'AA'},
    minMomentumDuration: '123hrs',
  }

  this.http.post('https://fx-web-3d3df-default-rtdb.firebaseio.com/currency-pairs.json', newPair).subscribe(
    resData => {
      console.log(resData);
  });
}

filterTrades(selectedFilterData: SelectedfilterData) {
  this.selectedFilterData = selectedFilterData;

    this.filteredFibTrades = this.allFibTrades;

    if (this.selectedFilterData.selectedCurrencyPair != '') {
      this.filteredFibTrades = this.filteredFibTrades.filter(trade => trade.pair === this.selectedFilterData.selectedCurrencyPair);
    }
    if (this.selectedFilterData.selectedTradeResult != '') {
      this.filteredFibTrades = this.filteredFibTrades.filter(trade => trade.result === this.selectedFilterData.selectedTradeResult);
    }

}
}
