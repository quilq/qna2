import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { QuestionViewComponent } from './question-view.component';
import { MaterialModule } from '../../material/material.module';

describe('QuestionViewComponent', () => {
  let component: QuestionViewComponent;
  let fixture: ComponentFixture<QuestionViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule,
        RouterTestingModule
      ],
      declarations: [ QuestionViewComponent ]
    });
    fixture = TestBed.createComponent(QuestionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // perform data binding
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
