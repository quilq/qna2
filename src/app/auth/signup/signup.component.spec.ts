import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthRoutingModule } from '../auth-routing.module';
import { StoreModule } from '@ngrx/store';
import { authReducer } from '../store/auth.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../store/auth.effects';
import { RouterTestingModule } from '@angular/router/testing';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forFeature([AuthEffects]),
        RouterTestingModule,
        SharedModule
      ],
      declarations: [ SignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
