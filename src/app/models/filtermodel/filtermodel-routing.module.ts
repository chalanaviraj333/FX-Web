import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiltermodelPage } from './filtermodel.page';

const routes: Routes = [
  {
    path: '',
    component: FiltermodelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiltermodelPageRoutingModule {}
