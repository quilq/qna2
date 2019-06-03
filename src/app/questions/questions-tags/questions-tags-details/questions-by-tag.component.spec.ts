import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsByTagComponent } from './questions-tags-details.component';

describe('QuestionsByTagComponent', () => {
  let component: QuestionsByTagComponent;
  let fixture: ComponentFixture<QuestionsByTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsByTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsByTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
