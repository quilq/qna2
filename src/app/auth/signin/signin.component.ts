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

  constructor(private store: Store<AuthState>) { }

  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  hidePassword = true;

  ngOnInit() {
  }

  onSubmit(email: string, password: string) {
    // console.log(this.signinForm.value.email, this.signinForm.value.password);
    this.store.dispatch(new AuthActions.OnSignin({
      email: this.signinForm.value.email,
      password: this.signinForm.value.password
    }));
  }

}
