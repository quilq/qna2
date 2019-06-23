import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth.reducers';

describe('AuthService', () => {
  let authServiceStub: Partial<AuthService>;
  let authService: AuthService;

  beforeEach(() => {
    // stub AuthService for test purposes
    authServiceStub = {
      isAuthenticated: true
    };

    TestBed.configureTestingModule({
      imports: [
        // StoreModule.forRoot({}),
        // StoreModule.forFeature('auth', authReducer),
        StoreModule.forRoot({ auth: authReducer }),
      ],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
      ]
    });

    authService = TestBed.get(AuthService);
  });


  it('should be created', () => {
    expect(authService).toBeTruthy();
  });
});
