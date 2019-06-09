import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
// import { cold } from 'jasmine-marbles';

import { AuthGuard } from './auth.guard';
// import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthState, authReducer } from './store/auth.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';
import { SharedModule } from '../shared/shared.module';
// import { AuthRoutingModule } from './auth-routing.module';

describe('AuthGuard', () => {
  // let authStore: Store<AuthState>;
  let guard: AuthGuard;
  let authStore: MockStore<{ loggedIn: boolean }>;
  const initialState = { loggedIn: false };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        // HttpClientTestingModule,
        // RouterTestingModule,
        // StoreModule.forRoot({}),
        // EffectsModule.forFeature([AuthEffects]),
        // SharedModule,
        // AuthRoutingModule
      ],
      providers: [
        AuthGuard,
        provideMockStore({ initialState })
      ]
    });

    guard = TestBed.get(AuthGuard);
    authStore = TestBed.get(Store);
  });

  // it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
  //   expect(guard).toBeTruthy();
  // }));

  it('should return false if the user state is not logged in', () => {
    // const expected = cold('(a|)', { a: false });

    expect(guard.canActivate()).toBe(false);
  });

  it('should return true if the user state is logged in', () => {
    authStore.setState({ loggedIn: true });

    // const expected = cold('(a|)', { a: true });

    expect(guard.canActivate()).toBe(false);
  });
});
