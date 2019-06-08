import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninComponent } from './signin.component';
import { SharedModule } from '../../shared/shared.module';
import { Store, StoreModule } from '@ngrx/store';
import { AuthState, authReducer } from '../store/auth.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../store/auth.effects';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let authStore: Store<AuthState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        // EffectsModule.forFeature([AuthEffects]),
        RouterTestingModule,
        SharedModule,
        BrowserAnimationsModule
      ],
      declarations: [ SigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    authStore = TestBed.get(Store);
    spyOn(authStore, 'dispatch').and.callThrough();
    
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
