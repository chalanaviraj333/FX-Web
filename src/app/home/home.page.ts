import { Component, OnInit } from '@angular/core';
import { CommonHttpService } from '../services/common-http.service';
import { ModelServiceService } from '../services/model-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public commonHttpService: CommonHttpService, private modelService: ModelServiceService) { }

  ngOnInit() {
    if (this.commonHttpService.allCurrencyPairs.length == 0) {
      this.commonHttpService.getAllCurrencyPairs();
    }

    if (this.commonHttpService.filteredFibTrades.length == 0) {
      this.commonHttpService.getAllFibTrades();
    }
  }

  async onClickMinViewTrade(key: string){
    await this.modelService.onClickMinViewTrade(key);
  }

}
