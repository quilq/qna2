import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedQuestionsComponent } from './featured-questions.component';

describe('FeaturedQuestionsComponent', () => {
  let component: FeaturedQuestionsComponent;
  let fixture: ComponentFixture<FeaturedQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
