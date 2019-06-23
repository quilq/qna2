import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownModule } from 'ngx-markdown';

import { NewAnswerComponent } from './new-answer.component';
import { MaterialModule } from '../../material/material.module';
import { MarkdownPreviewComponent } from '../markdown-preview/markdown-preview.component';
import { questionReducer } from '../../questions/store/question.reducers';

describe('NewAnswerComponent', () => {
  let component: NewAnswerComponent;
  let fixture: ComponentFixture<NewAnswerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MarkdownModule.forRoot(),
        StoreModule.forRoot({ question: questionReducer }),
        HttpClientTestingModule
      ],
      declarations: [
        NewAnswerComponent,
        MarkdownPreviewComponent
      ]
    });
    fixture = TestBed.createComponent(NewAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
