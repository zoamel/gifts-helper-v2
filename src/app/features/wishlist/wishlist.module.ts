import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';

import { SharedModule } from '../../shared/shared.module';
import { WishlistRoutingModule } from './wishlist-routing.module';
import { WishlistViewComponent } from './screens/wishlist-view/wishlist-view.component';
import { WishlistItemAddComponent } from './components/wishlist-item-add/wishlist-item-add.component';

@NgModule({
  declarations: [WishlistViewComponent, WishlistItemAddComponent],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
    MatExpansionModule,
    WishlistRoutingModule,
  ],
  exports: [],
})
export class WishlistModule {}
