import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WishlistViewComponent } from './screens/wishlist-view/wishlist-view.component';

const routes: Routes = [{ path: '', component: WishlistViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WishlistRoutingModule {}
