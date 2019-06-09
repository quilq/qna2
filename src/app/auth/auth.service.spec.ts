import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({providers: [AuthService]}));
  const service: AuthService = TestBed.get(AuthService);

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
});
