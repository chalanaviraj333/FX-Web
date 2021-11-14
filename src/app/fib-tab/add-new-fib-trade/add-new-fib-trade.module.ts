import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewFibTradePageRoutingModule } from './add-new-fib-trade-routing.module';

import { AddNewFibTradePage } from './add-new-fib-trade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNewFibTradePageRoutingModule
  ],
  declarations: [AddNewFibTradePage]
})
export class AddNewFibTradePageModule {}
