import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FibTrade } from 'src/app/interfaces/fib-trade';
import { CommonHttpService } from 'src/app/services/common-http.service';

@Component({
  selector: 'app-quickviewtrade',
  templateUrl: './quickviewtrade.page.html',
  styleUrls: ['./quickviewtrade.page.scss'],
})
export class QuickviewtradePage implements OnInit {

  @Input() tradeKey: string;
  public fullLengthDate = {weekday: 'long', year: 'numeric',month: 'long',day: 'numeric'};

  constructor(private modalController: ModalController, public commonHttpService: CommonHttpService) { }

  ngOnInit() {
    this.commonHttpService.findSelectedTrade(this.tradeKey);
  }

  _onClickDismiss() {
    this.modalController.dismiss();
  }

}
