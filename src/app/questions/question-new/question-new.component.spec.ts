import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionNewComponent } from './question-new.component';
import { SharedModule } from '../../shared/shared.module';

describe('QuestionNewComponent', () => {
  let component: QuestionNewComponent;
  let fixture: ComponentFixture<QuestionNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [ QuestionNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
