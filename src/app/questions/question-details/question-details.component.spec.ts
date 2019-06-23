import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { QuestionDetailsComponent } from './question-details.component';
import { SharedModule } from '../../shared/shared.module';
import { QuestionsRelatedComponent } from '../questions-related/questions-related.component';
import { questionReducer } from '../store/question.reducers';

describe('QuestionDetailsComponent', () => {
  let component: QuestionDetailsComponent;
  let fixture: ComponentFixture<QuestionDetailsComponent>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        StoreModule.forRoot({ question: questionReducer }),
        RouterTestingModule
      ],
      declarations: [
        QuestionDetailsComponent,
        QuestionsRelatedComponent
      ]
    });

    fixture = TestBed.createComponent(QuestionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
