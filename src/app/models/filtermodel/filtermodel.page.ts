import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SelectedfilterData } from 'src/app/interfaces/selectedfilter-data';
import { CommonHttpService } from 'src/app/services/common-http.service';

@Component({
  selector: 'app-filtermodel',
  templateUrl: './filtermodel.page.html',
  styleUrls: ['./filtermodel.page.scss'],
})
export class FiltermodelPage implements OnInit {

  private selectedFilterData: SelectedfilterData = this.commonHttpService.selectedFilterData;

  constructor(private modalController: ModalController, public commonHttpService: CommonHttpService) { }

  ngOnInit() {
  }

  _onClickDismiss() {
    this.modalController.dismiss();
  }

  onSelectCurrencyPair(event) {
    this.selectedFilterData.selectedCurrencyPair = event.target.value;

    this.commonHttpService.filterTrades(this.selectedFilterData);
  }

  onSelectTradeResult(event) {
    this.selectedFilterData.selectedTradeResult = event.target.value;

    this.commonHttpService.filterTrades(this.selectedFilterData);
  }

  onClickClear(clickValue: string) {
    if (clickValue == 'currencyPair') {
      this.selectedFilterData.selectedCurrencyPair = '';

      this.commonHttpService.filterTrades(this.selectedFilterData);
    } else if (clickValue == 'wonLose') {
      this.selectedFilterData.selectedTradeResult = '';

      this.commonHttpService.filterTrades(this.selectedFilterData);
    }
  }

}
