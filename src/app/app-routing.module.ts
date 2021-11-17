import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'fib-test-list',
    loadChildren: () => import('./fib-tab/fib-test-list/fib-test-list.module').then( m => m.FibTestListPageModule)
  },
  {
    path: 'add-new-fib-trade',
    loadChildren: () => import('./fib-tab/add-new-fib-trade/add-new-fib-trade.module').then( m => m.AddNewFibTradePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'quickviewtrade',
    loadChildren: () => import('./models/quickviewtrade/quickviewtrade.module').then( m => m.QuickviewtradePageModule)
  },
  {
    path: 'filtermodel',
    loadChildren: () => import('./models/filtermodel/filtermodel.module').then( m => m.FiltermodelPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
