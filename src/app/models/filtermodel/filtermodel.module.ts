import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltermodelPageRoutingModule } from './filtermodel-routing.module';

import { FiltermodelPage } from './filtermodel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltermodelPageRoutingModule
  ],
  declarations: [FiltermodelPage]
})
export class FiltermodelPageModule {}
