import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { QuestionNewComponent } from './question-new.component';
import { SharedModule } from '../../shared/shared.module';
import { questionReducer } from '../store/question.reducers';

describe('QuestionNewComponent', () => {
  let component: QuestionNewComponent;
  let fixture: ComponentFixture<QuestionNewComponent>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        SharedModule,
        StoreModule.forRoot({ question: questionReducer }),
      ],
      declarations: [ QuestionNewComponent ]
    });
    fixture = TestBed.createComponent(QuestionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });
  
  afterEach(() => {
    fixture.destroy();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
