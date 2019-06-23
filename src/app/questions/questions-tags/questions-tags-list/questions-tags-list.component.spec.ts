import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { QuestionsTagsListComponent } from './questions-tags-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { questionReducer } from '../../store/question.reducers';

describe('QuestionsTagsListComponent', () => {
  let component: QuestionsTagsListComponent;
  let fixture: ComponentFixture<QuestionsTagsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        StoreModule.forRoot({ question: questionReducer }),
        RouterTestingModule
      ],
      declarations: [ QuestionsTagsListComponent ]
    });
    fixture = TestBed.createComponent(QuestionsTagsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
