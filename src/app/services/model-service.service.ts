import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FiltermodelPage } from '../models/filtermodel/filtermodel.page';
import { QuickviewtradePage } from '../models/quickviewtrade/quickviewtrade.page';

@Injectable({
  providedIn: 'root'
})
export class ModelServiceService {

  constructor(public modalController: ModalController) { }

  async onClickMinViewTrade(key: string) {
    const modal = await this.modalController.create({
      component: QuickviewtradePage,
      componentProps: {
        "tradeKey": key
      },
      cssClass: 'view-Remote-Details-class',
      swipeToClose: true,
    });
    return await modal.present();
  }

  async onClickFilter() {
    const modal = await this.modalController.create({
      component: FiltermodelPage,
      cssClass: 'view-Remote-Details-class',
      swipeToClose: true,
    });
    return await modal.present();
  }
}
