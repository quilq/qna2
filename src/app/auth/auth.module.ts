import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthRoutingModule } from './auth-routing.module';
import { UserPrivateComponent } from './user-private/user-private.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthEffects } from './store/auth.effects';
import { authReducer } from './store/auth.reducers';
import { SharedModule } from '../shared/shared.module';
import { UserPublicComponent } from './user-public/user-public.component';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    UserPrivateComponent,
    UserPublicComponent,
    UserListComponent
  ],
  imports: [
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
