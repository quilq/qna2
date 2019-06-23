import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { UserComponent } from './user.component';
import { SharedModule } from '../../shared/shared.module';
import { authReducer } from '../store/auth.reducers';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
          SharedModule,
          RouterTestingModule,
          StoreModule.forRoot({auth: authReducer}),
          BrowserAnimationsModule
        ],
      declarations: [ UserComponent ]
    })
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
