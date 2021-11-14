import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewFibTradePage } from './add-new-fib-trade.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewFibTradePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewFibTradePageRoutingModule {}
