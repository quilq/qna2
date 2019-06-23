import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';;
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { questionReducer } from '../../questions/store/question.reducers';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({ question: questionReducer }),
        // StoreModule.forRoot({}),
        // StoreModule.forFeature('question', questionReducer)
      ],
      declarations: [ HomeComponent ]
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
