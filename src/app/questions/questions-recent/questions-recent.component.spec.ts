import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { QuestionsRecentComponent } from './questions-recent.component';
import { SharedModule } from '../../shared/shared.module';
import { questionReducer } from '../store/question.reducers';

describe('QuestionsRecentComponent', () => {
  let component: QuestionsRecentComponent;
  let fixture: ComponentFixture<QuestionsRecentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        StoreModule.forRoot({ question: questionReducer }),
      ],
      declarations: [ QuestionsRecentComponent ]
    });
    fixture = TestBed.createComponent(QuestionsRecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
