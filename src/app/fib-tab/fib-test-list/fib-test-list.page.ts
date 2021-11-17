import { Component, OnInit } from '@angular/core';
import { FibTrade } from 'src/app/interfaces/fib-trade';
import { CommonHttpService } from 'src/app/services/common-http.service';
import { ModelServiceService } from 'src/app/services/model-service.service';

@Component({
  selector: 'app-fib-test-list',
  templateUrl: './fib-test-list.page.html',
  styleUrls: ['./fib-test-list.page.scss'],
})
export class FibTestListPage implements OnInit {

  public options = {year: 'numeric',month: 'long',day: 'numeric' };
  public dayOptions = {weekday: 'long'};
  public fullLengthDate = {weekday: 'long', year: 'numeric',month: 'long',day: 'numeric'};


  constructor(public commonHttpService: CommonHttpService, private modelService: ModelServiceService) { }

  ngOnInit() {
    if (this.commonHttpService.allCurrencyPairs.length == 0) {
      this.commonHttpService.getAllCurrencyPairs();
    }
    if (this.commonHttpService.filteredFibTrades.length == 0) {
      this.commonHttpService.getAllFibTrades();
    }
  }

  onClickViewMore(fibTrade: FibTrade) {
    this.commonHttpService.clickToView(fibTrade);
  }

  onClickFilter() {
    this.modelService.onClickFilter();
  }

}
