import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsUnansweredComponent } from './questions-unanswered.component';

describe('QuestionsUnansweredComponent', () => {
  let component: QuestionsUnansweredComponent;
  let fixture: ComponentFixture<QuestionsUnansweredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsUnansweredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsUnansweredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
