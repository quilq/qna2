import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPrivateComponent } from './user-private/user-private.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';
import { UserPublicComponent } from './user-public/user-public.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: 'user/me', component: UserPrivateComponent, canActivate: [AuthGuard] },
  { path: 'user/list', component: UserListComponent },
  { path: 'user/:id', component: UserPublicComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'auth/signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }