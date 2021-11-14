import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FibTrade } from '../interfaces/fib-trade';

@Injectable({
  providedIn: 'root'
})
export class CommonHttpService {

  public filteredFibTrades: Array<FibTrade> = [];
  private allFibTrades: Array<FibTrade> = [];

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
              // totalTime: resData[key].totalTime,
              // totalTimeHrsVariable: resData[key].totalTimeHrsVariable,
              // totalTimeMinVariable: resData[key].totalTimeMinVariable,
              // tradeTime: resData[key].tradeTime,
              // tradeTimeHrsVariable: resData[key].tradeTimeHrsVariable,
              // tradeTimeMinsVariable: resData[key].tradeTimeMinsVariable,
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
}
