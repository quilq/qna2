import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MarkdownModule } from 'ngx-markdown';

import { NewAnswerComponent } from './new-answer.component';
import { MaterialModule } from 'src/app/material/material.module';
import { MarkdownPreviewComponent } from '../markdown-preview/markdown-preview.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterTestingModule } from '@angular/router/testing';

describe('NewAnswerComponent', () => {
  let component: NewAnswerComponent;
  let fixture: ComponentFixture<NewAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule,
        RouterTestingModule,
        MarkdownModule.forChild()
      ],
      declarations: [
        NewAnswerComponent,
        MarkdownPreviewComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
