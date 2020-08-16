import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { WishlistRoutingModule } from './wishlist-routing.module';
import { WishlistViewComponent } from './screens/wishlist-view/wishlist-view.component';
import { WishlistItemAddComponent } from './components/wishlist-item-add/wishlist-item-add.component';
import { WishlistItemEditComponent } from './components/wishlist-item-edit/wishlist-item-edit.component';

@NgModule({
  declarations: [
    WishlistViewComponent,
    WishlistItemAddComponent,
    WishlistItemEditComponent,
  ],
  imports: [ReactiveFormsModule, SharedModule, WishlistRoutingModule],
  exports: [],
})
export class WishlistModule {}
