import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { SharedModule } from '../../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './screens/login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressBarModule,
    AuthRoutingModule,
  ],
})
export class AuthModule {}
