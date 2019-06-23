import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';

import { QuestionsFeaturedComponent } from './questions-featured.component';
import { SharedModule } from '../../shared/shared.module';
import { questionReducer, QuestionState } from '../store/question.reducers';

describe('QuestionsFeaturedComponent', () => {
  let component: QuestionsFeaturedComponent;
  let fixture: ComponentFixture<QuestionsFeaturedComponent>;
  let questionStore: Store<QuestionState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        StoreModule.forRoot({ question: questionReducer }),
      ],
      declarations: [ QuestionsFeaturedComponent ]
    });

    questionStore = TestBed.get(Store);
    spyOn(questionStore, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(QuestionsFeaturedComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
