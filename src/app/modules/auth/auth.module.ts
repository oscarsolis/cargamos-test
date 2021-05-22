import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { SharedModule } from '@modules/shared/shared.module';
import { AuthRoutingModule } from '@modules/auth/auth-routing.module';
import { SignInComponent } from '@modules/auth/components/sign-in/sign-in.component';
import { SignUpComponent } from '@modules/auth/components/sign-up/sign-up.component';
import { MainContainerComponent } from './components/main-container/main-container.component';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    MainContainerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
