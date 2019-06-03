import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsPopularComponent } from './questions-popular.component';

describe('QuestionsPopularComponent', () => {
  let component: QuestionsPopularComponent;
  let fixture: ComponentFixture<QuestionsPopularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsPopularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
