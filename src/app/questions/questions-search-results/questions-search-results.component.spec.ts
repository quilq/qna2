import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { QuestionsSearchResultsComponent } from './questions-search-results.component';
import { SharedModule } from '../../shared/shared.module';
import { questionReducer } from '../store/question.reducers';

describe('QuestionsSearchResultsComponent', () => {
  let component: QuestionsSearchResultsComponent;
  let fixture: ComponentFixture<QuestionsSearchResultsComponent>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        StoreModule.forRoot({ question: questionReducer }),
      ],
      declarations: [ QuestionsSearchResultsComponent ]
    });

    fixture = TestBed.createComponent(QuestionsSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
