import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDetailsViewComponent } from './question-details-view.component';
import { MaterialModule } from 'src/app/material/material.module';
import { MarkdownModule } from 'ngx-markdown';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterTestingModule } from '@angular/router/testing';

describe('QuestionDetailsViewComponent', () => {
  let component: QuestionDetailsViewComponent;
  let fixture: ComponentFixture<QuestionDetailsViewComponent>;

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
      declarations: [ QuestionDetailsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
