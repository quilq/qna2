import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsSearchResultsComponent } from './questions-search-results.component';

describe('QuestionsSearchResultsComponent', () => {
  let component: QuestionsSearchResultsComponent;
  let fixture: ComponentFixture<QuestionsSearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsSearchResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
