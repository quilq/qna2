import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularQuestionsComponent } from './popular-questions.component';

describe('PopularQuestionsComponent', () => {
  let component: PopularQuestionsComponent;
  let fixture: ComponentFixture<PopularQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
