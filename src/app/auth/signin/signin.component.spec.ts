import { TestBed, ComponentFixture } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SigninComponent } from './signin.component';
import { SharedModule } from '../../shared/shared.module';
import { authReducer } from '../store/auth.reducers';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({auth: authReducer}),
        // StoreModule.forFeature('auth', authReducer)
      ],
      declarations: [SigninComponent]
    });

    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should contain "Signin"', () => {
    const signinElement: HTMLElement = fixture.nativeElement;
    signinElement.querySelector('h3')
    expect(signinElement.textContent).toContain('Signin');
  })
});
