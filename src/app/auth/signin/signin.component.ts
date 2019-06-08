import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AuthState } from '../store/auth.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  hidePassword = true;
  
  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  
  constructor(private authStore: Store<AuthState>) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authStore.dispatch(new AuthActions.OnSignin({
      email: this.signinForm.value.email,
      password: this.signinForm.value.password
    }));
  }

}
