import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WishlistViewComponent } from './screens/wishlist-view/wishlist-view.component';
import { ItemViewComponent } from './screens/item-view/item-view.component';

const routes: Routes = [
  { path: '', component: WishlistViewComponent },
  {
    path: 'item/:id',
    component: ItemViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WishlistRoutingModule {}
