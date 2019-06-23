import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { QuestionsUnansweredComponent } from './questions-unanswered.component';
import { SharedModule } from '../../shared/shared.module';
import { questionReducer } from '../store/question.reducers';

describe('QuestionsUnansweredComponent', () => {
  let component: QuestionsUnansweredComponent;
  let fixture: ComponentFixture<QuestionsUnansweredComponent>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        StoreModule.forRoot({ question: questionReducer }),
      ],
      declarations: [ QuestionsUnansweredComponent ]
    });
    fixture = TestBed.createComponent(QuestionsUnansweredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
