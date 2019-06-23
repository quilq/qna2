import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MarkdownModule } from 'ngx-markdown';
import { By } from '@angular/platform-browser';

import { QuestionDetailsViewComponent } from './question-details-view.component';
import { MaterialModule } from '../../material/material.module';
import { questionReducer } from '../../questions/store/question.reducers';
import { Question } from '../../questions/question.model';
import { User } from '../../auth/user/user.model';

describe('QuestionDetailsViewComponent', () => {
  let component: QuestionDetailsViewComponent;
  let fixture: ComponentFixture<QuestionDetailsViewComponent>;
  let testQuestion: Question;
  let questionElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule,
        RouterTestingModule,
        MarkdownModule.forRoot(),
        StoreModule.forRoot({ question: questionReducer }),
        HttpClientTestingModule
      ],
      declarations: [ QuestionDetailsViewComponent ]
    });
    fixture = TestBed.createComponent(QuestionDetailsViewComponent);
    component = fixture.componentInstance;

    // get question content element
    // questionElement = fixture.debugElement.query(By.css('p.question-content')).nativeElement;
    questionElement = fixture.nativeElement.querySelector('p.question-content');

    // mock the question content supplied by the parent component
    testQuestion = new Question(['tag'],'question title', 'question content', new User());

    // simulate the parent input property
    component.question = testQuestion;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display test question content // stand-alone', ()=>{
    expect(questionElement.textContent).toContain('question content');
  })
});
