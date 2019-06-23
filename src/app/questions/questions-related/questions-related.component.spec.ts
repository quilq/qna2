import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { QuestionsRelatedComponent } from './questions-related.component';
import { SharedModule } from '../../shared/shared.module';
import { questionReducer } from '../store/question.reducers';

describe('QuestionsRelatedComponent', () => {
  let component: QuestionsRelatedComponent;
  let fixture: ComponentFixture<QuestionsRelatedComponent>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        StoreModule.forRoot({ question: questionReducer }),
      ],
      declarations: [ QuestionsRelatedComponent ]
    });

    fixture = TestBed.createComponent(QuestionsRelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
