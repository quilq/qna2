import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { UserComponent } from './user/user.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthEffects } from './store/auth.effects';
import { authReducer } from './store/auth.reducers';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    UserComponent,
    SigninComponent,
    SignupComponent
  ],

  imports: [
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
