import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { QuestionsPopularComponent } from './questions-popular.component';
import { SharedModule } from '../../shared/shared.module';
import { questionReducer } from '../store/question.reducers';

describe('QuestionsPopularComponent', () => {
  let component: QuestionsPopularComponent;
  let fixture: ComponentFixture<QuestionsPopularComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        StoreModule.forRoot({ question: questionReducer }),
      ],
      declarations: [ QuestionsPopularComponent ]
    });
    fixture = TestBed.createComponent(QuestionsPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
