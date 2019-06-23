import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

import { QuestionsTagsDetailsComponent } from './questions-tags-details.component';
import { SharedModule } from '../../../shared/shared.module';
import { questionReducer } from '../../store/question.reducers';

describe('QuestionsTagsDetailsComponent', () => {
  let component: QuestionsTagsDetailsComponent;
  let fixture: ComponentFixture<QuestionsTagsDetailsComponent>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        StoreModule.forRoot({ question: questionReducer }),
      ],
      declarations: [ QuestionsTagsDetailsComponent ]
    });
    fixture = TestBed.createComponent(QuestionsTagsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
