import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FibTestListPage } from './fib-test-list.page';

const routes: Routes = [
  {
    path: '',
    component: FibTestListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FibTestListPageRoutingModule {}
