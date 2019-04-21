import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDetailsViewComponent } from './question-details-view.component';

describe('QuestionDetailsViewComponent', () => {
  let component: QuestionDetailsViewComponent;
  let fixture: ComponentFixture<QuestionDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
