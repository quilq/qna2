import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsRelatedComponent } from './questions-related.component';

describe('QuestionsRelatedComponent', () => {
  let component: QuestionsRelatedComponent;
  let fixture: ComponentFixture<QuestionsRelatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsRelatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsRelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
