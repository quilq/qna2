import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsFeaturedComponent } from './questions-featured.component';

describe('QuestionsFeaturedComponent', () => {
  let component: QuestionsFeaturedComponent;
  let fixture: ComponentFixture<QuestionsFeaturedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsFeaturedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
