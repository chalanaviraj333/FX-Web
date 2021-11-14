import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FibTestListPageRoutingModule } from './fib-test-list-routing.module';

import { FibTestListPage } from './fib-test-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FibTestListPageRoutingModule
  ],
  declarations: [FibTestListPage]
})
export class FibTestListPageModule {}
