import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { QuestionsComponent } from './questions.component';
import { SharedModule } from '../shared/shared.module';
import { QuestionsFeaturedComponent } from './questions-featured/questions-featured.component';
import { questionReducer } from './store/question.reducers';

describe('QuestionsComponent', () => {
  let component: QuestionsComponent;
  let fixture: ComponentFixture<QuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({ question: questionReducer }),
      ],
      declarations: [
        QuestionsComponent,
        QuestionsFeaturedComponent
      ]
    });

    fixture = TestBed.createComponent(QuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
