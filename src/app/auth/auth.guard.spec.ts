import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { AuthGuard } from './auth.guard';
import { SharedModule } from '../shared/shared.module';
import { authReducer } from './store/auth.reducers';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        // StoreModule.forRoot({}),
        // StoreModule.forFeature('auth', authReducer),
        StoreModule.forRoot({auth: authReducer}),
        RouterTestingModule
      ],
      providers: [
        AuthGuard
      ]
    });

    guard = TestBed.get(AuthGuard);
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
