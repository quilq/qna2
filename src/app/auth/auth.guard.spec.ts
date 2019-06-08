import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store, StoreModule } from '@ngrx/store';
// import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { AuthGuard } from './auth.guard';
// import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthState, authReducer } from './store/auth.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';
import { SharedModule } from '../shared/shared.module';
// import { AuthRoutingModule } from './auth-routing.module';

describe('AuthGuard', () => {
  let authStore: Store<AuthState>;
  // const initialState = {loggedIn: false};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        StoreModule.forRoot({}),
        EffectsModule.forFeature([AuthEffects]),
        SharedModule,
        // AuthRoutingModule
      ],
      providers: [
        AuthGuard,
        // provideMockStore({ initialState })
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
