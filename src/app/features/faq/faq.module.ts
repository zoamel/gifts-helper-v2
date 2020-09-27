import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';

import { SharedModule } from '../../shared/shared.module';
import { FaqRoutingModule } from './faq-routing.module';
import { FaqComponent } from './components/faq/faq.component';

@NgModule({
  declarations: [FaqComponent],
  imports: [
    SharedModule,
    MatButtonModule,
    MatProgressBarModule,
    MatExpansionModule,
    FaqRoutingModule,
  ],
})
export class FaqModule {}
