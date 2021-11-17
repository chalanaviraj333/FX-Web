import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuickviewtradePage } from './quickviewtrade.page';

const routes: Routes = [
  {
    path: '',
    component: QuickviewtradePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuickviewtradePageRoutingModule {}
