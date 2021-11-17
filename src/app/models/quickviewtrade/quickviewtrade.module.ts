import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuickviewtradePageRoutingModule } from './quickviewtrade-routing.module';

import { QuickviewtradePage } from './quickviewtrade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuickviewtradePageRoutingModule
  ],
  declarations: [QuickviewtradePage]
})
export class QuickviewtradePageModule {}
