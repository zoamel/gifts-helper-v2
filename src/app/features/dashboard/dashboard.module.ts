import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './screens/dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    SharedModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    DashboardRoutingModule,
  ],
})
export class DashboardModule {}
