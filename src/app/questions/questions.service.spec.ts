import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { QuestionsService } from './questions.service';
import { questionReducer } from './store/question.reducers';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../auth/auth.service';

describe('QuestionsService', () => {
  let questionServiceStub: Partial<AuthService>;
  let questionService: AuthService;

  beforeEach(() => {
    questionServiceStub = {}

    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule,
        StoreModule.forRoot({ question: questionReducer }),
      ],
      providers: [{ provide: QuestionsService, useValue: questionServiceStub }]
    });

    questionService = TestBed.get(QuestionsService);
  });

  it('should be created', () => {
    expect(questionService).toBeTruthy();
  });
});
