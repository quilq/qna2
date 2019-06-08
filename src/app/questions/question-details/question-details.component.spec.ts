import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDetailsComponent } from './question-details.component';
import { SharedModule } from '../../shared/shared.module';
import { QuestionsRelatedComponent } from '../questions-related/questions-related.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('QuestionDetailsComponent', () => {
  let component: QuestionDetailsComponent;
  let fixture: ComponentFixture<QuestionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      declarations: [
        QuestionDetailsComponent,
        QuestionsRelatedComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
