import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { UserPrivateComponent } from './user-private.component';
import { SharedModule } from '../../shared/shared.module';
import { authReducer } from '../store/auth.reducers';

describe('UserComponent', () => {
  let component: UserPrivateComponent;
  let fixture: ComponentFixture<UserPrivateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
          SharedModule,
          RouterTestingModule,
          StoreModule.forRoot({auth: authReducer}),
          BrowserAnimationsModule
        ],
      declarations: [ UserPrivateComponent ]
    })
    fixture = TestBed.createComponent(UserPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
